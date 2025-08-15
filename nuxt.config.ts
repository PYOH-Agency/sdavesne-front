// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/strapi',
    '@pinia/nuxt',
    '@sentry/nuxt/module'
  ],
  strapi: {
    url: process.env.NODE_ENV === 'production' 
      ? (process.env.NUXT_PUBLIC_STRAPI_URL || 'https://abundant-horse-f9e91a1796.strapiapp.com')
      : 'http://localhost:1337',
    prefix: '/api',
    version: 'v4',
    cookie: {},
    cookieName: 'strapi_jwt'
  },
  // Configuration Sentry
  sentry: {
    dsn: process.env.NUXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development',
    integrations: [],
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  },
  runtimeConfig: {
    public: {
      strapiUrl: process.env.NODE_ENV === 'production' 
        ? (process.env.NUXT_PUBLIC_STRAPI_URL || 'https://abundant-horse-f9e91a1796.strapiapp.com')
        : 'http://localhost:1337',
      strapiToken: process.env.NUXT_PUBLIC_STRAPI_TOKEN || '',
      sentryDsn: process.env.NUXT_PUBLIC_SENTRY_DSN || '',
      gtmId: process.env.NUXT_PUBLIC_GTM_ID || '',
      plausibleDomain: process.env.NUXT_PUBLIC_PLAUSIBLE_DOMAIN || ''
    }
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Template Nuxt + Strapi',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Template Nuxt 3 avec intégration Strapi' }
      ]
    }
  }
})
