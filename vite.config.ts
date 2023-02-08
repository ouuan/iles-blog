import { defineConfig } from 'vite';

import unocss from 'unocss/vite';
import viteCompression from 'vite-plugin-compression';
import analyze from 'rollup-plugin-analyzer';
import buildInfo from 'vite-plugin-info';

import { stat } from 'fs/promises';
import glob from 'glob-promise';
import { simpleGit } from 'simple-git';
import { builtinModules } from 'module';

export default defineConfig({
  plugins: [
    unocss(),
    viteCompression({
      algorithm: 'brotliCompress',
      filter: /\.(js|map|json|css|html|wasm|txt|xml)$/i,
    }),
    analyze({ limit: 10 }),
    (async () => {
      const gitLog = await simpleGit().log({
        maxCount: 1,
        format: {
          sha: '%H',
          committerDate: '%cI',
        },
      });
      const { sha, committerDate } = gitLog.latest || { sha: '', committerDate: '' };
      const files = await glob('posts/**/*.md{,x}');
      const sizes = await Promise.all(files.map(async (file) => (await stat(file)).size));
      const totalSize = sizes.reduce((a, b) => a + b, 0);
      return buildInfo({
        meta: {
          sha,
          committerDate,
          totalSize,
        },
      });
    })(),
  ],
  base: '',
  build: {
    target: 'es2016',
    minify: 'terser',
    rollupOptions: {
      external: builtinModules,
    },
  },
});
