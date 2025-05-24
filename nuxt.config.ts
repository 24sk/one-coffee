// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['/assets/css/main.css'],
  modules: [
    '@nuxt/scripts',
    '@nuxt/ui-pro',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],
  supabase: { redirect: false },
  runtimeConfig: {
    openai: {
      apiKey: process.env.NUXT_OPENAI_API_KEY,
    },
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY,
    },
  },
});
