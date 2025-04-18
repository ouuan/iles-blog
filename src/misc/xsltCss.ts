import { readdir, readFile, writeFile } from 'fs/promises';

export default async function injectXsltCss() {
  const homepage = await readFile('dist/index.html', 'utf-8');
  const cssUrl = homepage.match(/href="(\/assets\/style-.+?\.css)"/)?.[1];
  const noscriptStyle = homepage.match(/<noscript><style>(.+?)<\/style><\/noscript>/)?.[1];
  if (!cssUrl || !noscriptStyle) {
    throw new Error('Failed to find CSS URL in index.html');
  }
  process.chdir('dist/assets');
  const files = await readdir('.');
  await Promise.all(files.map(async (file) => {
    if (file.endsWith('.xsl')) {
      const content = await readFile(file, 'utf-8');
      const withCss = content.replace('%CSS_URL%', () => cssUrl).replace('%NOSCRIPT_STYLE%', () => noscriptStyle);
      await writeFile(file, withCss);
    }
  }));
}
