/* eslint-disable no-param-reassign */

import { stat } from 'fs/promises';

import { defineConfig } from 'iles';

import excerpt from '@islands/excerpt';
import feed from '@islands/feed';
import headings from '@islands/headings';
import images, { hdPreset } from '@islands/images';
import prism from '@islands/prism';
import { simpleGit } from 'simple-git';
import got from 'got';

export default defineConfig({
  siteUrl: 'https://ouuan.moe/',
  turbo: true,
  modules: [
    excerpt(),
    feed(),
    headings(),
    images({
      post: hdPreset({
        widths: [440, 758],
        formats: {
          webp: { quality: 80 },
          original: {},
        },
      }),
    }),
    prism({ showLineNumbers: true }),
  ],
  async extendFrontmatter(frontmatter, filename) {
    if (filename.includes('/post/')) {
      frontmatter.layout ||= 'post';
    }

    frontmatter.tags = frontmatter.tags?.length
      ? Array.from(new Set(frontmatter.tags)).filter((tag) => tag) : null;

    const log = await simpleGit().log({
      file: filename,
      maxCount: 1,
      strictDate: true,
    });
    const { latest } = log;
    if (latest) {
      frontmatter.lastUpdated ||= new Date(latest.date);
      frontmatter.commitHash ||= latest.hash;
    } else {
      const { mtime } = await stat(filename);
      frontmatter.lastUpdated = mtime;
    }

    const postHref = filename.match(/^src\/pages\/(post\/.*)\.mdx?$/)?.[1];
    if (postHref) {
      const data = await got.get(
        new URL(
          `/api/visitors/${encodeURIComponent(postHref)}`,
          'https://blog-visitor-count.ouuan.moe',
        ).href,
      ).json<{ visitors: number; }>();
      frontmatter.visitor = data.visitors;
    }
  },
  markdown: {
    withImageSrc(src) {
      if (!src.includes('?')) return `${src}?preset=post`;
      return src;
    },
    remarkPlugins: ['remark-gfm', 'remark-math'],
    rehypePlugins: ['rehype-katex'],
  },
  ssg: {
    manualChunks(id) {
      if (id.includes('fuse.js@')) return 'fuse-js';
      return null;
    },
  },
});
