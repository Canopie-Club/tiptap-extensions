import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import type { ConfigEnv, UserConfig } from "vite";

export default defineConfig(async ({ command, mode }: ConfigEnv): Promise<UserConfig> => {
  function rel(path: string) {
    return resolve(__dirname, path);
  }

  process.env.POSTCSS_CONFIG_PATH = rel("postcss.lib.config.js");

  return {
    plugins: [
      vue(),
      dts({
        include: ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.vue"],
        exclude: [
          "node_modules",
          "dist",
          ".nuxt",
          "app.vue",
          "pages",
          "components",
          "assets",
        ],
      }),
    ],
    build: {
      lib: {
        entry: rel("src/index.ts"),
        formats: ["es", "cjs"],
        fileName: (format) => `index.${format}.js`, // Ensure this matches package.json exports
      },
      sourcemap: true,
      rollupOptions: {
        external: ["vue", "@tiptap/core", "@tiptap/vue-3", "@tiptap/pm"], // Added @tiptap/pm
        output: {
          globals: {
            vue: "Vue",
            "@tiptap/core": "TiptapCore",
            "@tiptap/vue-3": "TiptapVue3",
            "@tiptap/pm": "ProseMirror", // Added @tiptap/pm global
          },
          assetFileNames: "style.[ext]",
          // Removed entry/chunk filenames to use default vite lib mode behavior or fileName function
        },
      },
      outDir: "dist",
      emptyOutDir: true,
    },
    resolve: {
      alias: {
        "@": rel("src"),
      },
      // Add dedupe configuration
      dedupe: ["vue", "@tiptap/core", "@tiptap/vue-3", "@tiptap/pm"],
    },
  };
});
