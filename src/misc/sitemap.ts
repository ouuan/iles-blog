import { writeFile } from 'fs/promises';
import { dirname, resolve } from 'path';
import { Readable } from 'stream';
import { fileURLToPath } from 'url';
import type { RouteToRender } from 'iles';
import {
  ErrorLevel,
  SitemapStream,
  streamToPromise,
  type SitemapItemLoose,
} from 'sitemap';
import xmlFormat from 'xml-formatter';

const rootPath = dirname(dirname(dirname(fileURLToPath(import.meta.url))));

export default async function generateSitemap(pages: RouteToRender[]) {
  const items = pages.filter((page) => {
    if (!page.outputFilename.endsWith('.html')) return false;
    if (page.rendered.includes('<meta name="robots" content="noindex')) return false;
    const canonical = page.rendered.match(/<link rel="canonical" href="(.+?)">/)?.[1];
    if (canonical === undefined) return true;
    const canonicalPath = new URL(canonical).pathname;
    return canonicalPath === page.path;
  }).map<SitemapItemLoose>((page) => {
    const LASTMOD_REGEX = /<meta property="article:modified_time" content="(.+?)">/;
    const lastmod = page.rendered.match(LASTMOD_REGEX)?.[1];

    let priority;
    if (page.path === '/') priority = 1;
    else if (page.path === '/about') priority = 0.9;
    else if (page.path.startsWith('/post/')) {
      priority = Math.max(
        0.3,
        0.8 - (new Date().valueOf() - new Date(lastmod || '2020').valueOf()) / 5e11,
      );
    } else if (page.path.startsWith('/page/')) priority = 0.7;
    else if (page.path === '/sponsor') priority = 0.6;
    else if (page.path.startsWith('/tag/')) priority = 0.5;
    else if (page.path === '/posts') priority = 0.5;
    else if (page.path.startsWith('/posts/')) priority = 0.5;
    else if (page.path === '/tags') priority = 0.4;
    else throw new Error(`Unknown path: ${page.path}`);

    if (page.path.includes('/page/')) priority -= 0.1;

    return {
      url: page.path,
      lastmod,
      priority,
    };
  }).sort((lhs, rhs) => (
    lhs.priority === rhs.priority
      ? lhs.url.localeCompare(rhs.url)
      : (rhs.priority ?? 0.5) - (lhs.priority ?? 0.5)
  ));

  const stream = new SitemapStream({
    hostname: 'https://ouuan.moe',
    level: ErrorLevel.THROW,
  });
  const data = await streamToPromise(Readable.from(items).pipe(stream));
  const formatted = xmlFormat(data.toString(), {
    collapseContent: true,
    lineSeparator: '\n',
  });
  await writeFile(resolve(rootPath, 'dist/sitemap.xml'), formatted);
}
