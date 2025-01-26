import { defineConfig } from 'vite';

import unocss from 'unocss/vite';
import viteCompression from 'vite-plugin-compression';
import analyze from 'rollup-plugin-analyzer';

export default defineConfig({
  plugins: [
    unocss(),
    viteCompression({
      algorithm: 'brotliCompress',
      filter: /\.(js|map|json|css|html|wasm|txt|xml)$/i,
    }),
    analyze({ limit: 10 }),
  ],
  base: '',
  build: {
    target: 'es2016',
    minify: 'terser',
  },
  define: {
    'import.meta.env.MEILI_URL': JSON.stringify(process.env.MEILI_URL),
    'import.meta.env.MEILI_SEARCH_KEY': JSON.stringify(process.env.MEILI_SEARCH_KEY),
  },
});
