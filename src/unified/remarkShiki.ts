/* eslint-disable no-param-reassign */

import { Plugin } from 'unified';
import { Content, Root } from 'mdast';
import { fileURLToPath } from 'url';
import { resolve } from 'path';
import {
  BUNDLED_LANGUAGES,
  Highlighter,
  ILanguageRegistration,
  Lang,
  getHighlighter,
  renderToHtml,
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

const CUSTOM_LANGUAGES = {
  'hcl-csapp': {
    id: 'hcl-csapp',
    scopeName: 'source.hcl.csapp',
    path: resolve(fileURLToPath(import.meta.url), '../../../third_party/hcl-syntax-highlight/hcl.tmLanguage.json'),
  },
} as { [id: string]: ILanguageRegistration | undefined };

function isBundledLanguage(name: string): name is Lang {
  return BUNDLED_LANGUAGES.find(
    (lang) => lang.id === name || lang.aliases?.includes(name),
  ) !== undefined;
}

function highlightWithTheme(highlighter: Highlighter, code: string, lang: string, theme: 'dark' | 'light', from: number, to: number) {
  const tokens = lang === 'plain' ? code.split('\n').map((line) => [{ content: line }]) : highlighter.codeToThemedTokens(code, lang, theme);

  const themeConfig = theme === 'dark' ? darkTheme : lightTheme;

  return renderToHtml(tokens, {
    themeName: theme,
    fg: themeConfig.fg,
    bg: themeConfig.bg,
    elements: {
      line({ index, children }) {
        if (from === 0) return `<span>${children}</span>`;
        if (index < from || index > to) return `<span class="dim">${children}</span>`;
        return `<span class="highlighted">${children}</span>`;
      },
    },
  });
}

async function highlight(code: string, lang: string, from: number, to: number) {
  const highlighter = await highlighterPromise;
  const customLanguage = CUSTOM_LANGUAGES[lang];
  if (customLanguage) {
    if (!highlighter.getLoadedLanguages().includes(lang as Lang)) {
      await highlighter.loadLanguage(customLanguage);
    }
  } else if (lang !== 'plain') {
    if (!isBundledLanguage(lang)) {
      return {
        dark: `unsupported language ${lang}`,
        light: `unsupported language ${lang}`,
      };
    }
    if (!highlighter.getLoadedLanguages().includes(lang)) {
      await highlighter.loadLanguage(lang);
    }
  }
  return {
    dark: highlightWithTheme(highlighter, code, lang, 'dark', from, to),
    light: highlightWithTheme(highlighter, code, lang, 'light', from, to),
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

  const { lang, value, meta } = child;

  let [from, to] = [0, 0];
  if (meta && /^\d+-\d+$/.test(meta)) {
    [from, to] = meta.split('-').map((n) => parseInt(n, 10));
  }

  const html = await highlight(value, lang || 'plain', from, to);

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
