/* eslint-disable no-param-reassign */

import type { Plugin } from 'unified';
import type { Root } from 'hast';

const hideHeadingForCard: Plugin<[], Root> = () => (root) => {
  root.children.forEach((child) => {
    if (child.type === 'element' && child.tagName === 'h6') {
      if (!child.properties) child.properties = {};
      child.properties.style = 'position: absolute; visibility: hidden;';
    }
  });
};

export default hideHeadingForCard;
