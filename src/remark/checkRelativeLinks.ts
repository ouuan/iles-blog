import type { Plugin } from 'unified';
import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';

const checkRelativeLinks: Plugin<[], Root> = () => (root: Root) => {
  visit(root, 'link', (node) => {
    const { url } = node;
    if (!url.startsWith('/') && !url.startsWith('https://') && !url.startsWith('http://') && !url.startsWith('#')) {
      throw new Error(`Please use root-relative links instead of relative links. Link: ${url}`);
    }
  });
};

export default checkRelativeLinks;
