import * as Sentry from '@sentry/nuxt'

export const useMonitoring = () => {
  const config = useRuntimeConfig()

  // Configuration Analytics
  const setupAnalytics = () => {
    // Google Tag Manager
    if (config.public.gtmId && process.client) {
      useHead({
        script: [
          {
            innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${config.public.gtmId}');`
          }
        ]
      })
    }

    // Plausible Analytics (Alternative privacy-friendly)
    if (config.public.plausibleDomain && process.client) {
      useHead({
        script: [
          {
            defer: true,
            'data-domain': config.public.plausibleDomain,
            src: 'https://plausible.io/js/script.js'
          }
        ]
      })
    }
  }

  // Tracking des erreurs personnalisé
  const trackError = (error: Error, context?: Record<string, any>) => {
    if (process.client) {
      Sentry.captureException(error, {
        contexts: {
          custom: context
        }
      })
    }
  }

  // Tracking des performances
  const trackPerformance = (name: string, duration: number, metadata?: Record<string, any>) => {
    if (process.client) {
      Sentry.addBreadcrumb({
        category: 'performance',
        message: `${name}: ${duration}ms`,
        level: 'info',
        data: metadata
      })
    }
  }

  // Tracking des événements utilisateur
  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    if (process.client) {
      // Sentry Event
      Sentry.addBreadcrumb({
        category: 'user-action',
        message: eventName,
        level: 'info',
        data: properties
      })

      // Google Analytics 4
      if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties)
      }

      // Plausible
      if (typeof plausible !== 'undefined') {
        plausible(eventName, { props: properties })
      }
    }
  }

  // Monitoring des API calls
  const trackApiCall = async (apiName: string, url: string, method: string = 'GET') => {
    const startTime = Date.now()
    
    try {
      const response = await $fetch(url, { method })
      const duration = Date.now() - startTime
      
      trackPerformance(`API: ${apiName}`, duration, {
        url,
        method,
        status: 'success'
      })
      
      return response
    } catch (error) {
      const duration = Date.now() - startTime
      
      trackError(error as Error, {
        apiName,
        url,
        method,
        duration
      })
      
      throw error
    }
  }

  // Monitoring des Core Web Vitals
  const setupWebVitals = () => {
    if (process.client) {
      // CLS (Cumulative Layout Shift)
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            trackPerformance('CLS', entry.value, {
              metric: 'layout-shift',
              sources: entry.sources?.map(s => s.node)
            })
          }
        }
      }).observe({ type: 'layout-shift', buffered: true })

      // LCP (Largest Contentful Paint)
      new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        trackPerformance('LCP', lastEntry.startTime, {
          metric: 'largest-contentful-paint',
          element: lastEntry.element
        })
      }).observe({ type: 'largest-contentful-paint', buffered: true })

      // FID (First Input Delay)
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          trackPerformance('FID', entry.processingStart - entry.startTime, {
            metric: 'first-input-delay',
            eventType: entry.name
          })
        }
      }).observe({ type: 'first-input', buffered: true })
    }
  }

  return {
    setupAnalytics,
    trackError,
    trackPerformance,
    trackEvent,
    trackApiCall,
    setupWebVitals
  }
}

// Types pour TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    plausible: (eventName: string, options?: { props?: Record<string, any> }) => void
  }
}
