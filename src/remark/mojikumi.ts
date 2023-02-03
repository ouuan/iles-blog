import type { Plugin } from 'unified';
import type { Content, Parent, Root } from 'mdast';
import { all, Handlers } from 'mdast-util-to-hast';

// https://www.w3.org/TR/jlreq/#positioning_of_consecutive_opening_brackets_closing_brackets_comma_full_stops_and_middle_dots

const openingBrackets = '‘“（〔［｛〈《「『【｟〘〖«〝';
const closingBrackets = '’”）〕］｝〉》」』】｠〙〗»〟';
const middleDots = '・';
const colons = '：；';
const fullStops = '。．';
const commas = '、，';
const halfWidthPauseOrStop = `${commas}${colons}${fullStops}`;
const space = ' ';

const leftRules = [
  [halfWidthPauseOrStop, closingBrackets],
  [closingBrackets, halfWidthPauseOrStop],
  [halfWidthPauseOrStop, openingBrackets],
  [closingBrackets, openingBrackets],
  [closingBrackets, closingBrackets],
  [closingBrackets, middleDots],
  [halfWidthPauseOrStop, space],
  [closingBrackets, space],
] as const;

const leftWbrRules = [
  [halfWidthPauseOrStop, openingBrackets],
  [closingBrackets, openingBrackets],
] as const;

const rightRules = [
  [openingBrackets, openingBrackets],
  [middleDots, openingBrackets],
  [space, openingBrackets],
] as const;

const rightWbrRules = [
  [middleDots, openingBrackets],
] as const;

const lineStartRule = openingBrackets;
const lineEndRule = `${closingBrackets}${halfWidthPauseOrStop}`;

function dfs(u: Parent) {
  const children: Content[] = [];

  for (const v of u.children) {
    if (v.type !== 'text') {
      // skip LXGW Wenkai in blockquote
      if (v.type !== 'blockquote' && 'children' in v) dfs(v);
      children.push(v);
    } else {
      const s = v.value;

      let lastIndex = 0;

      for (let i = 1; i < s.length; i += 1) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const l = s[i - 1]!;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const r = s[i]!;

        function matches(rule: ReadonlyArray<Readonly<[string, string]>>) {
          return rule.some(([a, b]) => a.includes(l) && b.includes(r));
        }

        const leftRuleMatched = matches(leftRules);
        const rightRuleMatched = matches(rightRules);
        if (rightRuleMatched) i += 1;

        if (rightRuleMatched || leftRuleMatched) {
          if (i - 1 > lastIndex) {
            children.push({
              type: 'text',
              value: s.slice(lastIndex, i - 1),
            });
          }

          if (rightRuleMatched && matches(rightWbrRules)) {
            children.push({
              type: 'html',
              value: '<wbr>',
            });
          }

          children.push({
            type: 'mojikumi',
            children: [{
              type: 'text',
              value: s[i - 1],
            }],
          } as any);

          if (leftRuleMatched && matches(leftWbrRules)) {
            children.push({
              type: 'html',
              value: '<wbr>',
            });
          }

          lastIndex = i;
        } else if (lineStartRule.includes(l) || lineEndRule.includes(l)) {
          if (i - 1 > lastIndex) {
            children.push({
              type: 'text',
              value: s.slice(lastIndex, i - 1),
            });
          }

          children.push({
            type: lineStartRule.includes(l) ? 'mojikumi-line-start' : 'mojikumi-line-end',
            children: [{
              type: 'text',
              value: s[i - 1],
            }],
          } as any);

          lastIndex = i;
        }
      }

      if (lastIndex < s.length) {
        children.push({
          type: 'text',
          value: s.slice(lastIndex),
        });
      }
    }
  }

  // eslint-disable-next-line no-param-reassign
  u.children = children;
}

export const remarkMojikumi: Plugin<[], Root> = () => dfs;

export const remarkRehypeMojikumi: Handlers = {
  mojikumi: (h, node) => h(node, 'span', { className: 'mojikumi' }, all(h, node)),
  'mojikumi-line-start': (h, node) => h(node, 'span', { className: 'mojikumi mojikumi-line-start' }, all(h, node)),
  'mojikumi-line-end': (h, node) => h(node, 'span', { className: 'mojikumi mojikumi-line-end' }, all(h, node)),
};
