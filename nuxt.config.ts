// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['/assets/css/main.css'],
  modules: ['@nuxt/scripts', '@nuxt/ui-pro', '@nuxtjs/supabase'],
  supabase: { redirect: false },
  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
    },
  },
});
