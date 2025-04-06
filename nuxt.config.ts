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
  vite: {
    configFile: false
  }
})