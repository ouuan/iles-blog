/* eslint-disable no-param-reassign */

import { Plugin } from 'unified';
import { Root } from 'mdast';

const addHeadingForCard: Plugin<[], Root> = () => (root) => {
  let hasH2 = false;
  root.children = root.children.reduce((children, child: any) => {
    if (child.type === 'heading' && child.depth === 2) {
      hasH2 = true;
    } else if (hasH2 && child.type === 'mdxJsxFlowElement' && child.name === 'Card') {
      children.push({
        type: 'heading',
        depth: 6,
        children: [{
          type: 'text',
          value: child.attributes?.find((attr: any) => attr.name === 'title')?.value
            || child.attributes?.find((attr: any) => attr.name === 'type')?.value
            || 'Note',
        }],
      });
    }
    children.push(child);
    return children;
  }, [] as typeof root.children);
};

export default addHeadingForCard;
