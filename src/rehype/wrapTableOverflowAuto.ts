/* eslint-disable no-param-reassign */

import { Plugin } from 'unified';
import { Root } from 'hast';

const wrapTableOverflowAuto: Plugin<[], Root> = () => (root) => {
  root.children.forEach((child, index) => {
    if (child.type === 'element' && child.tagName === 'table') {
      root.children[index] = {
        type: 'element',
        tagName: 'div',
        properties: { className: 'overflow-auto my-6' },
        children: [child],
      };
    }
  });
};

export default wrapTableOverflowAuto;
