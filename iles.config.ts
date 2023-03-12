/* eslint-disable no-param-reassign */

import { stat } from 'fs/promises';
import { defineConfig } from 'iles';
import excerpt from '@islands/excerpt';
import feed from '@islands/feed';
import headings from '@islands/headings';
import images, { formatPreset } from '@islands/images';
import { simpleGit } from 'simple-git';
import got from 'got';

import { all as m2hAll } from 'mdast-util-to-hast';
import { remarkDefinitionList, defListHastHandlers } from 'remark-definition-list';

import remarkShiki from './src/remark/remarkShiki';
import addHeadingForCard from './src/remark/addHeadingForCard';
import { remarkMojikumi, remarkRehypeMojikumi } from './src/remark/mojikumi';
import setHeadingLevels from './src/remark/setHeadingLevels';
import checkRelativeLinks from './src/remark/checkRelativeLinks';

import breakLongCode from './src/rehype/breakLongCode';
import wrapTableOverflowAuto from './src/rehype/wrapTableOverflowAuto';

import generateFonts from './src/misc/font';
import generateSitemap from './src/misc/sitemap';

export default defineConfig({
  siteUrl: 'https://ouuan.moe/',
  turbo: false,
  modules: [
    excerpt(),
    feed(),
    headings(),
    images({
      normal: formatPreset({
        formats: {
          webp: { quality: 80 },
          original: {},
        },
        inferDimensions: true,
      }),
    }),
  ],
  async extendFrontmatter(frontmatter, filename) {
    if (filename.includes('/post/')) {
      frontmatter.layout ||= 'post';
    } else if (filename.includes('/hidden/')) {
      frontmatter.layout ||= 'hidden';
    }

    frontmatter.tags = frontmatter.tags?.length
      ? Array.from(new Set(frontmatter.tags)).filter((tag) => tag) : null;

    const { image } = frontmatter;
    if (typeof image === 'string' && image && !image.includes('/')) {
      frontmatter.image = filename
        .replace('src/pages/post/', '/images/')
        .replace(/[^/]+$/, () => image);
    }

    const log = (await simpleGit().log({
      file: filename,
      strictDate: true,
    })).all.filter((commit) => !commit.body.includes('[log skip]'));

    const latestCommit = log[0];
    const firstCommit = log.at(-1);

    if (latestCommit && firstCommit) {
      frontmatter.lastUpdated = new Date(latestCommit.date);
      frontmatter.published = new Date(firstCommit.date);
    } else {
      const { birthtime, mtime } = await stat(filename);
      frontmatter.lastUpdated = mtime;
      frontmatter.published = birthtime;
    }

    const postHref = filename.match(/^src\/pages\/(.*)\.mdx?$/)?.[1]?.toLowerCase();
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
    remarkPlugins: [
      'remark-math',
      'remark-gfm',
      remarkDefinitionList,
      checkRelativeLinks,
      remarkMojikumi,
      // the following order matters!
      remarkShiki,
      setHeadingLevels,
      addHeadingForCard,
    ],
    remarkRehypeOptions: {
      handlers: {
        emphasis(h, node) {
          return h(node, 'i', m2hAll(h, node));
        },
        delete(h, node) {
          return h(node, 's', m2hAll(h, node));
        },
        heading(h, node) {
          return h(node, `h${node.depth}`, [h(node, 'span', m2hAll(h, node))]);
        },
        ...remarkRehypeMojikumi,
        ...defListHastHandlers,
      },
    },
    rehypePlugins: [
      breakLongCode,
      wrapTableOverflowAuto,
      'rehype-plugin-image-native-lazy-loading',
      'rehype-katex',
    ],
  },
  ssg: {
    sitemap: false,

    manualChunks(id) {
      if (id.includes('fuse.js@')) return 'fuse-js';
      return null;
    },

    async onSiteRendered({ pages }) {
      await Promise.all([
        generateFonts(pages),
        generateSitemap(pages),
      ]);
    },
  },
});
