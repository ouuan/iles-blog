/* eslint-disable no-param-reassign */

import { Plugin } from 'unified';
import { Content, Root } from 'mdast';
import {
  BUNDLED_LANGUAGES,
  Lang,
  getHighlighter,
} from 'shiki';
// eslint-disable-next-line import/no-relative-packages
import darkThemeJson from '../../third_party/night-owl-vscode-theme/themes/Night Owl-color-theme-noitalic.json';
// eslint-disable-next-line import/no-relative-packages
import lightThemeJson from '../../third_party/night-owl-vscode-theme/themes/Night Owl-Light-color-theme-noitalic.json';

const darkTheme = {
  name: 'dark',
  type: 'dark',
  colors: darkThemeJson.colors as any,
  fg: darkThemeJson.colors['editor.foreground'],
  bg: darkThemeJson.colors['editor.background'],
  settings: darkThemeJson.tokenColors,
} as const;

const lightTheme = {
  name: 'light',
  type: 'light',
  colors: lightThemeJson.colors as any,
  fg: lightThemeJson.colors['editor.foreground'],
  bg: lightThemeJson.colors['editor.background'],
  settings: lightThemeJson.tokenColors,
} as const;

const highlighterPromise = getHighlighter({
  themes: [darkTheme, lightTheme],
  langs: [],
});

function isBundledLanguage(name: string): name is Lang {
  return BUNDLED_LANGUAGES.find(
    (lang) => lang.id === name || lang.aliases?.includes(name),
  ) !== undefined;
}

async function highlight(code: string, lang: string | null | undefined) {
  if (!lang) {
    return {
      dark: `<pre class="shiki dark" style="color: ${darkTheme.fg}; background-color: ${darkTheme.bg}"><code>${code}</code></pre>`,
      light: `<pre class="shiki light" style="color: ${lightTheme.fg}; background-color: ${lightTheme.bg}"><code>${code}</code></pre>`,
    };
  }
  if (!isBundledLanguage(lang)) {
    return {
      dark: `unsupported language ${lang}`,
      light: `unsupported language ${lang}`,
    };
  }
  const highlighter = await highlighterPromise;
  if (!highlighter.getLoadedLanguages().includes(lang)) {
    await highlighter.loadLanguage(lang);
  }
  return {
    dark: highlighter.codeToHtml(code, { lang, theme: 'dark' }),
    light: highlighter.codeToHtml(code, { lang, theme: 'light' }),
  };
}

async function processNode(child: Content, index: number, siblings: Content[]) {
  if (child.type !== 'code') {
    const { children } = child as { children: Content[] };
    if (children) {
      await Promise.all(children.map(processNode));
    }
    return;
  }

  const { lang, value } = child;
  const html = await highlight(value, lang);

  siblings[index] = {
    type: 'mdxJsxFlowElement',
    name: 'CodeBlock',
    attributes: [{
      type: 'mdxJsxAttribute',
      name: 'lang',
      value: lang || 'plain text',
    }],
    children: [{
      type: 'html',
      value: `<div class="shiki-dark">${html.dark}</div>
<div class="shiki-light" style="display: none;">${html.light}</div>`,
    }],
  } as any;
}

const remarkShiki: Plugin<[], Root> = () => async (root) => {
  await Promise.all(root.children.map(processNode));
};

export default remarkShiki;