/* eslint-disable no-param-reassign */

import type { Plugin } from 'unified';
import type { Root } from 'hast';
import { selectAll } from 'hast-util-select';

function maxPartLength(parts: string[]) {
  return parts.reduce((max, part) => Math.max(max, part.length), 0);
}

const breakLongCode: Plugin<[], Root> = () => (root) => {
  selectAll(':not(pre) > code', root).forEach((node) => {
    if (node.children.length !== 1) return;
    const child = node.children[0];
    if (child?.type !== 'text') return;
    if (maxPartLength(child.value.split(/\s/)) <= 10) return;
    let parts = child.value.split(/\b/);
    if (maxPartLength(parts) > 12) {
      parts = child.value.split(/\b|(?<=_)/);
    }
    if (maxPartLength(parts) <= 15) {
      node.children = [];
      parts.forEach((part) => {
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
