import { defineConfig } from 'tsup';
import { dependencies, devDependencies } from '../package.json';

export default defineConfig({
  minify: true,
  format: 'esm',
  target: 'esnext',
  outDir: 'dist/functions',
  noExternal: Object.keys(dependencies).concat(Object.keys(devDependencies)),
});
