/* eslint-disable security/detect-non-literal-fs-filename */

import { readFile, readdir, writeFile } from 'fs/promises';
import { join } from 'path';

export default async function injectXsltCss() {
  const homepage = await readFile('dist/index.html', 'utf-8');
  const cssUrl = homepage.match(/href="(\/assets\/style-.+?\.css)"/)?.[1];
  const noscriptStyle = homepage.match(/<noscript><style>(.+?)<\/style><\/noscript>/)?.[1];
  if (!cssUrl || !noscriptStyle) {
    throw new Error('Failed to find CSS URL in index.html');
  }
  const assets = 'dist/assets';
  const files = await readdir(assets);
  await Promise.all(files.map(async (file) => {
    if (file.endsWith('.xsl')) {
      const path = join(assets, file);
      const content = await readFile(path, 'utf-8');
      const withCss = content
        .replace('%CSS_URL%', () => cssUrl)
        .replace('%NOSCRIPT_STYLE%', () => noscriptStyle);
      await writeFile(path, withCss);
    }
  }));
}
