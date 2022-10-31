/* eslint-disable no-param-reassign */

import { stat } from 'fs/promises';

import { defineConfig } from 'iles';

import excerpt from '@islands/excerpt';
import feed from '@islands/feed';
import headings from '@islands/headings';
import images, { widthPreset } from '@islands/images';
import prism from '@islands/prism';
import { simpleGit } from 'simple-git';
import got from 'got';

import breakLongCode from './src/unified/breakLongCode';
import wrapTableOverflowAuto from './src/unified/wrapTableOverflowAuto';

export default defineConfig({
  siteUrl: 'https://ouuan.moe/',
  turbo: false,
  modules: [
    excerpt(),
    feed(),
    headings(),
    images({
      half: widthPreset({
        widths: [290, 435, 580, 770],
        sizes: '40vw',
        density: 1.6,
        formats: {
          webp: { quality: 80 },
          original: {},
        },
      }),
      normal: widthPreset({
        widths: [720, 1080, 1440, 1920],
        sizes: '90vw',
        density: 1.6,
        formats: {
          webp: { quality: 80 },
          original: {},
        },
      }),
    }),
    prism(),
  ],
  async extendFrontmatter(frontmatter, filename) {
    if (filename.includes('/post/')) {
      frontmatter.layout ||= 'post';
    }

    frontmatter.tags = frontmatter.tags?.length
      ? Array.from(new Set(frontmatter.tags)).filter((tag) => tag) : null;

    const log = await simpleGit().log({
      file: filename,
      strictDate: true,
    });
    if (log.total) {
      frontmatter.lastUpdated = new Date(log.all[0].date);
      frontmatter.published = new Date(log.all[log.all.length - 1].date);
    } else {
      const { birthtime, mtime } = await stat(filename);
      frontmatter.lastUpdated = mtime;
      frontmatter.published = birthtime;
    }

    const postHref = filename.match(/^src\/pages\/(post\/.*)\.mdx?$/)?.[1];
    if (process.env.NODE_ENV === 'production' && postHref) {
      const data = await got.get(
        new URL(
          `/api/visitors/${encodeURIComponent(postHref)}`,
          'https://blog-visitor-count.ouuan.moe',
        ).href,
      ).json<{ visitors: number; }>();
      frontmatter.visitor = data.visitors;
    } else {
      frontmatter.visitor = 0;
    }
  },
  markdown: {
    withImageSrc(src, file) {
      const prefix = /^[@~]/.test(src) ? '' : file.path
        .replace(__dirname, '')
        .replace('/src/pages/post', '@/images')
        .replace(/[^/]+$/, '');
      const suffix = src.includes('?') ? '' : '?preset=normal';
      return `${prefix}${src}${suffix}`;
    },
    remarkPlugins: ['remark-gfm', 'remark-math'],
    rehypePlugins: [breakLongCode, wrapTableOverflowAuto, 'rehype-katex'],
  },
  ssg: {
    manualChunks(id) {
      if (id.includes('fuse.js@')) return 'fuse-js';
      return null;
    },
  },
});
