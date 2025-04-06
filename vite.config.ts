import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/**/*.ts', 'src/**/*.d.ts', 'src/**/*.vue'],
      exclude: ['node_modules', 'dist', '.nuxt', 'app.vue', 'pages', 'components', 'assets'],
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        fancyBorder: resolve(__dirname, 'src/extensions/fancyBorder/index.ts'),
        imageSelector: resolve(__dirname, 'src/extensions/imageSelector/index.ts'),
        starter: resolve(__dirname, 'src/extensions/starter/index.ts'),
        SlashMenu: resolve(__dirname, 'src/components/SlashMenu.vue'),
      },
      formats: ['es', 'cjs'],
    },
    sourcemap: true,
    rollupOptions: {
      external: ['vue', '@tiptap/core', '@tiptap/vue-3'],
      output: {
        globals: {
          vue: 'Vue',
          '@tiptap/core': 'TiptapCore',
          '@tiptap/vue-3': 'TiptapVue3',
        },
        assetFileNames: 'style.[ext]',
        entryFileNames: '[name].[format].js',
        chunkFileNames: '[name]-[hash].[format].js',
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});