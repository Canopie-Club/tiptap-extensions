import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  outDir: 'dist',
  external: ['vue', '@tiptap/core', '@tiptap/vue-3'],
  esbuildOptions(options) {
    options.banner = {
      js: '"use strict";',
    }
  }
})