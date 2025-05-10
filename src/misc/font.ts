import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { sub as subDate } from 'date-fns';
import type { FontInfo, PageInfo } from 'glyph-segregator';
import { glyphSegregator } from 'glyph-segregator';
import got from 'got';
import type { RouteToRender } from 'iles';
import { preview } from 'vite';

const rootPath = dirname(dirname(dirname(fileURLToPath(import.meta.url))));

export default async function generateFonts(pages: RouteToRender[]) {
  const updateCommonGlyphs = Boolean(process.env.UPDATE_COMMON_GLYPHS);

  const now = new Date();
  const fromDate = subDate(now, { days: 90 }).toISOString().slice(0, 10);
  const nowDate = now.toISOString().slice(0, 10);
  const token = process.env.PLAUSIBLE_TOKEN;

  const breakdown = updateCommonGlyphs
    ? await got.get(
      `https://plausible.ouuan.moe/api/v1/stats/breakdown?${[
        'site_id=ouuan.moe',
        'property=event:page',
        'period=custom',
        `date=${fromDate},${nowDate}`,
        'limit=1000',
      ].join('&')}`,
      {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      },
    ).json<{
      results: {
        page: string;
        visitors: number;
      }[];
    }>()
    : { results: [] };

  let maxVisitor = 0;
  const visitorMap = breakdown.results.reduce((map, result) => {
    const path = new URL(result.page, 'https://ouuan.moe').pathname;
    const visitor = (map.get(path) ?? 0) + result.visitors;
    maxVisitor = Math.max(maxVisitor, visitor);
    map.set(path, visitor);
    return map;
  }, new Map<string, number>());

  const previewServer = await preview({ server: { host: '127.0.0.1' } });
  const host = previewServer.resolvedUrls.local[0];

  const pagesInfo: PageInfo[] = pages.filter(
    (page) => page.outputFilename.endsWith('.html'),
  ).map((page) => ({
    url: new URL(page.path, host).href,
    filePath: resolve(rootPath, 'dist', page.outputFilename),
    probability: ((visitorMap.get(page.path) ?? 0) + 1) / (maxVisitor + 2),
  }));

  const fonts: FontInfo[] = [
    {
      // eslint-disable-next-line @stylistic/max-len
      fontFamily: '"Noto Serif SC Web Font", "Noto Serif SC", "Noto Serif CJK SC", "Source Han Serif SC", "Source Han Serif CN", 思源宋体, "Noto Serif CJK TC", "Source Han Serif TC", "Source Han Serif TW", "Noto Serif", Georgia, "Times New Roman", Times, STSong, SimSun, serif, "Apple Color Emoji", "Noto Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      webFontName: 'Noto Serif SC Web Font',
      variants: [{
        fontWeight: 400,
        fontDisplay: 'swap',
        fontStyle: 'normal',
        outputFileName: 'NotoSerifSC-Regular',
        originalFontPath: resolve(
          rootPath,
          'third_party/fonts/NotoSerifCJK/NotoSerifSC-Regular.otf',
        ),
      }, {
        fontWeight: 700,
        fontDisplay: 'swap',
        fontStyle: 'normal',
        outputFileName: 'NotoSerifSC-Bold',
        originalFontPath: resolve(rootPath, 'third_party/fonts/NotoSerifCJK/NotoSerifSC-Bold.otf'),
      }],
    },
    {
      // eslint-disable-next-line @stylistic/max-len
      fontFamily: '"LXGW WenKai Web Font", "LXGW WenKai", "LXGW WenKai Lite", 霞鹜文楷, STKaiti, KaiTi, serif, "Apple Color Emoji", "Noto Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      webFontName: 'LXGW WenKai Web Font',
      variants: [{
        fontWeight: 400,
        fontDisplay: 'swap',
        fontStyle: 'normal',
        outputFileName: 'LXGWWenKai-Regular',
        originalFontPath: resolve(rootPath, 'third_party/fonts/LXGWWenKai/LXGWWenKai-Regular.ttf'),
      }, {
        fontWeight: 700,
        fontDisplay: 'swap',
        fontStyle: 'normal',
        outputFileName: 'LXGWWenKai-Medium',
        originalFontPath: resolve(rootPath, 'third_party/fonts/LXGWWenKai/LXGWWenKai-Medium.ttf'),
      }],
    },
    {
      // eslint-disable-next-line @stylistic/max-len
      fontFamily: '"Noto Serif JP Web Font", "Noto Serif JP", "Noto Serif CJK JP", "Source Han Serif JP", "Noto Serif SC Web Font", "Noto Serif SC", "Noto Serif CJK SC", "Source Han Serif SC", "Source Han Serif CN", 思源宋体, "Noto Serif CJK TC", "Source Han Serif TC", "Source Han Serif TW", "Noto Serif", Georgia, "Times New Roman", Times, STSong, SimSun, serif, "Apple Color Emoji", "Noto Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      webFontName: 'Noto Serif JP Web Font',
      variants: [{
        fontWeight: 400,
        fontDisplay: 'swap',
        fontStyle: 'normal',
        outputFileName: 'NotoSerifJP-Regular',
        originalFontPath: resolve(
          rootPath,
          'third_party/fonts/NotoSerifCJK/NotoSerifJP-Regular.otf',
        ),
      }, {
        fontWeight: 700,
        fontDisplay: 'swap',
        fontStyle: 'normal',
        outputFileName: 'NotoSerifJP-Bold',
        originalFontPath: resolve(rootPath, 'third_party/fonts/NotoSerifCJK/NotoSerifJP-Bold.otf'),
      }],
    },
    {
      // eslint-disable-next-line @stylistic/max-len
      fontFamily: '"Klee One Web Font", "Klee One", "LXGW WenKai Web Font", "LXGW WenKai", "LXGW WenKai Lite", 霞鹜文楷, STKaiti, KaiTi, serif, "Apple Color Emoji", "Noto Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      webFontName: 'Klee One Web Font',
      variants: [{
        fontWeight: 400,
        fontDisplay: 'swap',
        fontStyle: 'normal',
        outputFileName: 'KleeOne-Regular',
        originalFontPath: resolve(rootPath, 'third_party/fonts/KleeOne/KleeOne-Regular.ttf'),
      }, {
        fontWeight: 600,
        fontDisplay: 'swap',
        fontStyle: 'normal',
        outputFileName: 'KleeOne-SemiBold',
        originalFontPath: resolve(rootPath, 'third_party/fonts/KleeOne/KleeOne-SemiBold.ttf'),
      }],
    },
  ];

  await glyphSegregator({
    pages: pagesInfo,
    fonts,
    rootPath: resolve(rootPath, 'dist'),
    assetsPath: 'assets/fonts',
    useCache: !updateCommonGlyphs,
    cachePath: resolve(rootPath, '.fonts-cache.json'),
    concurrency: 8,
  });

  previewServer.httpServer.close();
}
