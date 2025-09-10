// Plugin pour l'analytics Vercel
import { inject } from '@vercel/analytics'

export default defineNuxtPlugin(() => {
  // Injecter l'analytics Vercel
  inject()
})


