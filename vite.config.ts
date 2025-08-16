import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // Forcer les chemins relatifs
        assetFileNames: '_nuxt/[name]-[hash][extname]',
        chunkFileNames: '_nuxt/[name]-[hash].js',
        entryFileNames: '_nuxt/[name]-[hash].js'
      }
    }
  },
  // Configuration des chemins
  base: '/',
  // Éviter les chemins absolus
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
