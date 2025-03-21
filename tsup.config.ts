import { defineConfig } from "tsup";
import vuePlugin from "esbuild-plugin-vue3";
import stylePlugin from "esbuild-style-plugin";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/extensions/fancyBorder/index.ts",
    "src/extensions/starter/index.ts",
    "src/components/SlashMenu.vue",
  ],
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  outDir: "dist",
  external: ["vue", "@tiptap/core", "@tiptap/vue-3"],
  // @ts-ignore
  esbuildPlugins: [vuePlugin(), stylePlugin({ postcss: true })],
  esbuildOptions(options) {
    options.banner = {
      js: '"use strict";',
    };

    options.loader = {
      ...options.loader,
      ".vue": "js",
    };
  },
});
