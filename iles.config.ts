/* eslint-disable no-param-reassign */

import { stat } from 'fs/promises';
import { defineConfig } from 'iles';
import excerpt from '@islands/excerpt';
import feed from '@islands/feed';
import headings from '@islands/headings';
import images, { formatPreset } from '@islands/images';
import { simpleGit } from 'simple-git';
import got from 'got';
import { preview } from 'vite';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { sub as subDate } from 'date-fns';
import { PageInfo, FontInfo, glyphSegregator } from 'glyph-segregator';

import { all as m2hAll } from 'mdast-util-to-hast';
import { remarkDefinitionList, defListHastHandlers } from 'remark-definition-list';

import remarkShiki from './src/remark/remarkShiki';
import addHeadingForCard from './src/remark/addHeadingForCard';
import { remarkMojikumi, remarkRehypeMojikumi } from './src/remark/mojikumi';

import breakLongCode from './src/rehype/breakLongCode';
import wrapTableOverflowAuto from './src/rehype/wrapTableOverflowAuto';
import hideHeadingForCard from './src/rehype/hideHeadingForCard';

const DIRNAME = dirname(fileURLToPath(import.meta.url));

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
      }),
    }),
  ],
  async extendFrontmatter(frontmatter, filename) {
    if (filename.includes('/post/')) {
      frontmatter.layout ||= 'post';
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

    const postHref = filename.match(/^src\/pages\/(post\/.*)\.mdx?$/)?.[1]?.toLowerCase();
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
      remarkMojikumi,
      addHeadingForCard,
      remarkShiki,
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
      hideHeadingForCard,
      'rehype-plugin-image-native-lazy-loading',
      'rehype-katex',
    ],
  },
  ssg: {
    manualChunks(id) {
      if (id.includes('fuse.js@')) return 'fuse-js';
      return null;
    },

    async onSiteRendered({ pages }) {
      const updateCommonGlyphs = Boolean(process.env.UPDATE_COMMON_GLYPHS);

      const now = new Date();
      const fromDate = subDate(now, { days: 90 }).toISOString().slice(0, 10);
      const nowDate = now.toISOString().slice(0, 10);

      const breakdown = updateCommonGlyphs ? await got.get(
        `https://plausible.ouuan.moe/api/v1/stats/breakdown?${[
          'site_id=ouuan.moe',
          'property=event:page',
          'period=custom',
          `date=${fromDate},${nowDate}`,
          'limit=1000',
        ].join('&')}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.PLAUSIBLE_TOKEN}`,
          },
        },
      ).json<{
        results: {
          page: string;
          visitors: number;
        }[]
      }>() : { results: [] };
      let maxVisitor = 0;
      const visitorMap = breakdown.results.reduce((map, result) => {
        const path = new URL(result.page, 'https://ouuan.moe').pathname;
        const visitor = (map.get(path) || 0) + result.visitors;
        maxVisitor = Math.max(maxVisitor, visitor);
        map.set(path, visitor);
        return map;
      }, new Map<string, number>());

      const previewServer = await preview();

      const pagesInfo: PageInfo[] = pages.filter((page) => page.outputFilename.endsWith('.html')).map((page) => ({
        url: new URL(page.path, previewServer.resolvedUrls.local?.[0]?.replace('localhost', '127.0.0.1') || 'http://127.0.0.1:4173').href,
        filePath: resolve(DIRNAME, 'dist', page.outputFilename),
        probability: ((visitorMap.get(page.path) || 0) + 1) / (maxVisitor + 2),
      }));

      const fonts: FontInfo[] = [{
        fontFamily: '"Noto Serif SC", "Noto Serif CJK SC", "Source Han Serif SC", "Source Han Serif CN", 思源宋体, "Noto Serif SC Web Font", "Noto Serif CJK TC", "Source Han Serif TC", "Source Han Serif TW", "Noto Serif", Georgia, "Times New Roman", Times, STSong, SimSun, serif, "Apple Color Emoji", "Noto Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        webFontName: 'Noto Serif SC Web Font',
        variants: [{
          fontWeight: 400,
          fontDisplay: 'swap',
          fontStyle: 'normal',
          outputFileName: 'NotoSerifSC-Regular',
          originalFontPath: resolve(DIRNAME, 'third_party/fonts/NotoSerifSC-Regular.otf'),
        }, {
          fontWeight: 700,
          fontDisplay: 'swap',
          fontStyle: 'normal',
          outputFileName: 'NotoSerifSC-Bold',
          originalFontPath: resolve(DIRNAME, 'third_party/fonts/NotoSerifSC-Bold.otf'),
        }],
      }, {
        fontFamily: '"XiaWu Punctuations", "LXGW WenKai", "LXGW WenKai Lite", 霞鹜文楷, "LXGW WenKai Web Font", STKaiTi, KaiTi, "Noto Serif SC", "Noto Serif CJK SC", "Source Han Serif SC", "Source Han Serif CN", 思源宋体, "Noto Serif SC Web Font", "Noto Serif CJK TC", "Source Han Serif TC", "Source Han Serif TW", "Noto Serif", Georgia, "Times New Roman", Times, STSong, SimSun, serif, "Apple Color Emoji", "Noto Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        webFontName: 'LXGW WenKai Web Font',
        variants: [{
          fontWeight: 400,
          fontDisplay: 'swap',
          fontStyle: 'normal',
          outputFileName: 'LXGWWenKai-Regular',
          originalFontPath: resolve(DIRNAME, 'third_party/fonts/LXGWWenKai-Regular.ttf'),
        }, {
          fontWeight: 700,
          fontDisplay: 'swap',
          fontStyle: 'normal',
          outputFileName: 'LXGWWenKai-Bold',
          originalFontPath: resolve(DIRNAME, 'third_party/fonts/LXGWWenKai-Bold.ttf'),
        }],
      }];

      await glyphSegregator({
        pages: pagesInfo,
        fonts,
        rootPath: resolve(DIRNAME, 'dist'),
        assetsPath: 'assets/fonts',
        useCache: !updateCommonGlyphs,
        cachePath: resolve(DIRNAME, '.fonts-cache.json'),
      });

      previewServer.httpServer.close();
    },
  },
});
