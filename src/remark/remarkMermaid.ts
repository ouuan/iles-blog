/* eslint-disable no-param-reassign */

import type { Plugin } from 'unified';
import type { Content, Root } from 'mdast';
import puppeteer from 'puppeteer';
import { renderMermaid } from '@mermaid-js/mermaid-cli';

async function digestMessage(message: string) {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  return btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
}

async function processNode(child: Content, index: number, siblings: Content[]) {
  if (child.type !== 'code') {
    if ('children' in child) {
      await Promise.all(child.children.map(processNode));
    }
    return;
  }

  const { lang, value } = child;

  if (lang !== 'mermaid') return;

  const hash = await digestMessage(value);

  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--no-zygote',
    ],
  });

  async function render(theme: 'default' | 'dark') {
    const { data } = await renderMermaid(browser, value, 'svg', {
      backgroundColor: 'transparent',
      mermaidConfig: { theme },
      svgId: `__mermaid-${theme}-${hash.slice(0, 5)}`,
    });
    return data.toString();
  }

  const lightSvg = await render('default');
  const darkSvg = await render('dark');

  await browser.close();

  siblings[index] = {
    type: 'mdxJsxFlowElement',
    name: 'Mermaid',
    children: [],
    attributes: [{
      type: 'mdxJsxAttribute',
      name: 'lightSvg',
      value: lightSvg,
    }, {
      type: 'mdxJsxAttribute',
      name: 'darkSvg',
      value: darkSvg,
    }],
  };
}

const remarkMermaid: Plugin<[], Root> = () => async (root: Root) => {
  await Promise.all(root.children.map(processNode));
};

export default remarkMermaid;
