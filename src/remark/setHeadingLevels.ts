// set heading levels for (nested) <Card> and <CodeBlock>

import type { Plugin } from 'unified';
import type { Content, Root } from 'mdast';

function dfs(u: Content, level: number) {
  let childLevel = level;

  if (u.type === 'mdxJsxFlowElement' && (u.name === 'Card' || u.name === 'CodeBlock')) {
    childLevel = level + 1;
    u.attributes.push({
      type: 'mdxJsxAttribute',
      name: 'headingLevel',
      value: level.toString(),
    });
  }

  if ('children' in u) {
    u.children.forEach((child) => {
      dfs(child, childLevel);
    });
  }
}

const setHeadingLevels: Plugin<[], Root> = () => (root) => {
  let level = 1;
  for (const child of root.children) {
    if (child.type === 'heading') {
      level = child.depth;
    }
    dfs(child, level + 1);
  }
};

export default setHeadingLevels;
