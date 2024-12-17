/* eslint-disable no-param-reassign */

import type { Plugin } from 'unified';
import type { Root } from 'mdast';
import { JSDOM } from 'jsdom';

const addHeadingForCard: Plugin<[], Root> = () => (root: Root) => {
  let hasH2 = false;
  root.children = root.children.reduce((children, child) => {
    if (child.type === 'heading' && child.depth === 2) {
      hasH2 = true;
    } else if (hasH2 && child.type === 'mdxJsxFlowElement' && child.name === 'Card') {
      const title = child.attributes?.find((attr: any) => attr.name === 'title')?.value;
      if (typeof title === 'string') {
        const dom = new JSDOM(title);
        const value = dom.window.document.body.textContent || title;
        children.push({
          type: 'heading',
          depth: 6,
          children: [{
            type: 'text',
            value,
          }],
        });
      }
    }
    children.push(child);
    return children;
  }, [] as typeof root.children);
};

export default addHeadingForCard;
