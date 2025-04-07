// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt'],
  // Explicitly set Nuxt to ignore the library configuration files
  postcss: {
    // Use default postcss config for Nuxt
    configPath: undefined
  },
  // Make sure Nuxt doesn't try to use vite.lib.config.ts
  // BUT add deduplication for shared dependencies
  vite: {
    configFile: false,
    resolve: {
      dedupe: [
        'vue',
        '@tiptap/core',
        '@tiptap/vue-3',
        '@tiptap/pm',
      ],
    },
    // Optional: Optimize dependencies if issues persist
    // optimizeDeps: {
    //   exclude: [
    //     'vue',
    //     '@tiptap/core',
    //     '@tiptap/vue-3',
    //     '@tiptap/pm',
    //     '@canopie-club/tiptap-extensions' // Exclude the linked package itself
    //   ]
    // }
  }
})
