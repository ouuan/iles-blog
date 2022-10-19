/* eslint-disable no-param-reassign */

import { Plugin } from 'unified';
import { Root } from 'hast';
import { selectAll } from 'hast-util-select';

const breakLongCode: Plugin<[], Root> = () => (root) => {
  selectAll(':not(pre) > code', root).forEach((node) => {
    if (node.children.length !== 1) return;
    const child = node.children[0];
    if (child.type !== 'text') return;
    if (child.value.split(/\s/).reduce((max, part) => Math.max(max, part.length), 0) <= 10) return;
    const wordBreakSplitParts = child.value.split(/\b/);
    if (wordBreakSplitParts.reduce((max, part) => Math.max(max, part.length), 0) <= 15) {
      node.children = [];
      wordBreakSplitParts.forEach((part) => {
        node.children.push({
          type: 'text',
          value: part,
        });
        node.children.push({
          type: 'element',
          tagName: 'wbr',
          children: [],
        });
      });
      node.children.pop();
    } else {
      if (!node.properties) node.properties = {};
      if (!node.properties.className) node.properties.className = 'break-all';
      else node.properties.className += ' break-all';
    }
  });
};

export default breakLongCode;