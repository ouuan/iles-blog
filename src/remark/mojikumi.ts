import type { Plugin } from 'unified';
import type { Content, Parent, Root } from 'mdast';
import { all, type Handlers } from 'mdast-util-to-hast';

// https://www.w3.org/TR/jlreq/#positioning_of_consecutive_opening_brackets_closing_brackets_comma_full_stops_and_middle_dots

const openingBrackets = '‘“（〈《「『【〖';
const closingBrackets = '’”）〉》」』】〗';
const middleDots = '・';
const colons = '：；';
const fullStops = '。．';
const commas = '、，';
const halfWidthPauseOrStop = `${commas}${colons}${fullStops}`;
const space = ' ';
const asciiPauseOrStop = '.,:;?!';
const leftSingleQuote = '‘';
const rightSingleQuote = '’';
const latin = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const leftRules = [
  [halfWidthPauseOrStop, closingBrackets],
  [closingBrackets, halfWidthPauseOrStop],
  [halfWidthPauseOrStop, openingBrackets],
  [closingBrackets, openingBrackets],
  [closingBrackets, closingBrackets],
  [closingBrackets, middleDots],
  [halfWidthPauseOrStop, space],
  [closingBrackets, space],
  [rightSingleQuote, latin],
  [closingBrackets, asciiPauseOrStop],
] as const;

const leftNarrowRules = [
  [rightSingleQuote, space],
  [rightSingleQuote, latin],
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

const rightNarrowRules = [
  [space, leftSingleQuote],
] as const;

const lineStartRule = openingBrackets;
const lineEndRule = `${closingBrackets}${halfWidthPauseOrStop}`;

function dfs(u: Parent) {
  const children: Content[] = [];

  for (const v of u.children) {
    if (v.type !== 'text') {
      if ('children' in v) dfs(v);
      children.push(v);
    } else {
      const s = v.value;

      let lastIndex = 0;

      function checkLineStartEnd(index: number) {
        if (lastIndex > index) return;
        const c = s[index];
        if (!c) return;
        if (lineStartRule.includes(c) || lineEndRule.includes(c)) {
          if (index > lastIndex) {
            children.push({
              type: 'text',
              value: s.slice(lastIndex, index),
            });
          }

          children.push({
            type: lineStartRule.includes(c) ? 'mojikumi-line-start' : 'mojikumi-line-end',
            children: [{
              type: 'text',
              value: c,
            }],
          } as any);

          lastIndex = index + 1;
        }
      }

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

          let type = 'mojikumi';
          if (matches(leftNarrowRules)) type = 'mojikumi-narrow-left';
          else if (matches(rightNarrowRules)) type = 'mojikumi-narrow-right';

          children.push({
            type,
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

          if (rightRuleMatched) i -= 1;
        } else {
          checkLineStartEnd(i - 1);
        }
      }

      if (lastIndex < s.length) {
        checkLineStartEnd(s.length - 1);
        if (lastIndex < s.length) {
          children.push({
            type: 'text',
            value: s.slice(lastIndex),
          });
        }
      }
    }
  }

  // eslint-disable-next-line no-param-reassign
  u.children = children;
}

export const remarkMojikumi: Plugin<[], Root> = () => dfs;

export const remarkRehypeMojikumi: Handlers = Object.fromEntries([
  'mojikumi',
  'mojikumi-narrow-left',
  'mojikumi-narrow-right',
  'mojikumi-line-start',
  'mojikumi-line-end',
].map((type) => [type, (h, node) => h(node, 'span', { className: type }, all(h, node))]));
