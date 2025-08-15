export default defineNuxtPlugin(() => {
  const { setupAnalytics, setupWebVitals, trackEvent } = useMonitoring()

  // Initialisation des analytics
  setupAnalytics()
  
  // Initialisation du monitoring des Core Web Vitals
  setupWebVitals()

  // Tracking de la page vue initiale
  trackEvent('page_view', {
    page_title: document.title,
    page_location: window.location.href
  })

  // Tracking des navigations (pour SPA)
  const router = useRouter()
  router.afterEach((to) => {
    nextTick(() => {
      trackEvent('page_view', {
        page_title: document.title,
        page_location: to.fullPath,
        page_referrer: document.referrer
      })
    })
  })

  // Monitoring des erreurs globales non gérées
  window.addEventListener('error', (event) => {
    const { trackError } = useMonitoring()
    trackError(event.error, {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    })
  })

  // Monitoring des promesses rejetées
  window.addEventListener('unhandledrejection', (event) => {
    const { trackError } = useMonitoring()
    trackError(new Error(event.reason), {
      type: 'unhandled_promise_rejection'
    })
  })
})
