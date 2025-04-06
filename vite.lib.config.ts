import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import { loadConfigFromFile } from "vite";

export default defineConfig(async ({ command, mode }) => {
  function rel(path: string) {
    return resolve(__dirname, path);
  }

  // Custom PostCSS config path for library build
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
        entry: {
          index: rel("src/index.ts"),
          fancyBorder: rel("src/extensions/fancyBorder/index.ts"),
          imageSelector: rel("src/extensions/imageSelector/index.ts"),
          starter: rel("src/extensions/starter/index.ts"),
          SlashMenu: rel("src/components/SlashMenu.vue"),
        },
        // formats: ["es", "cjs"],
      },
      sourcemap: true,
      rollupOptions: {
        external: ["vue", "@tiptap/core", "@tiptap/vue-3"],
        output: {
          globals: {
            vue: "Vue",
            "@tiptap/core": "TiptapCore",
            "@tiptap/vue-3": "TiptapVue3",
          },
          assetFileNames: "style.[ext]",
          entryFileNames: "[name].[format].js",
          chunkFileNames: "[name]-[hash].[format].js",
        },
      },
      outDir: "dist",
      emptyOutDir: true,
    },
    resolve: {
      alias: {
        "@": rel("src"),
      },
    },
    css: {
      postcss: {
        // Use the custom PostCSS config for the library
        config: rel("postcss.lib.config.js"),
      },
    },
  };
});
