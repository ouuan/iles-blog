/* eslint-disable no-param-reassign */

import { Plugin } from 'unified';
import { Root } from 'hast';

const hideHeadingForCard: Plugin<[], Root> = () => (root) => {
  root.children.forEach((child) => {
    if (child.type === 'element' && child.tagName === 'h6') {
      if (!child.properties) child.properties = {};
      child.properties.style = 'position: absolute; visibility: hidden;';
    }
  });
};

export default hideHeadingForCard;
