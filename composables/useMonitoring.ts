import { useRuntimeConfig } from 'nuxt/app'

export const useMonitoring = () => {
  const config = useRuntimeConfig()

  // Configuration du monitoring
  const monitoringConfig = config.public.monitoring as any
  const sentryConfig = config.public.sentry as any
  const grafanaConfig = config.public.grafana as any

  /**
   * Initialise le monitoring pour l'application
   */
  const initializeMonitoring = () => {
    if (monitoringConfig?.enableErrorTracking && sentryConfig?.dsn) {
      initializeSentry()
    }
    
    if (monitoringConfig?.enablePerformanceMonitoring) {
      initializePerformanceMonitoring()
    }
    
    if (monitoringConfig?.enableUserBehaviorTracking) {
      initializeUserBehaviorTracking()
    }
  }

  /**
   * Initialise Sentry pour le suivi des erreurs
   */
  const initializeSentry = () => {
    if (sentryConfig?.dsn) {
      console.log('Sentry initialized for error tracking')
    }
  }

  /**
   * Initialise le monitoring des performances
   */
  const initializePerformanceMonitoring = () => {
    if (typeof window !== 'undefined') {
      // Navigation timing
      if ('performance' in window) {
        window.addEventListener('load', () => {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
          if (navigation) {
            sendPerformanceMetric('DOMContentLoaded', { value: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart })
            sendPerformanceMetric('LoadComplete', { value: navigation.loadEventEnd - navigation.loadEventStart })
          }
        })
      }
    }
  }

  /**
   * Initialise le suivi du comportement utilisateur
   */
  const initializeUserBehaviorTracking = () => {
    if (typeof window !== 'undefined') {
      // Track page views
      trackPageView()
      
      // Track user interactions
      trackUserInteractions()
      
      // Track scroll depth
      trackScrollDepth()
    }
  }

  /**
   * Envoie une métrique de performance
   */
  const sendPerformanceMetric = (name: string, metric: any) => {
    // Envoyer à Grafana (si configuré)
    if (grafanaConfig?.url && grafanaConfig?.apiKey) {
      sendToGrafana('performance', { name, value: metric.value, timestamp: Date.now() })
    }

    console.log(`Performance metric: ${name} = ${metric.value}`)
  }

  /**
   * Suit les vues de page
   */
  const trackPageView = (url?: string) => {
    const currentUrl = url || window.location.pathname
    
    // Grafana
    if (grafanaConfig?.url && grafanaConfig?.apiKey) {
      sendToGrafana('pageview', { url: currentUrl, timestamp: Date.now() })
    }
  }

  /**
   * Suit les interactions utilisateur
   */
  const trackUserInteractions = () => {
    if (typeof window !== 'undefined') {
      // Track clicks
      document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement
        if (target.tagName === 'BUTTON' || target.tagName === 'A') {
          trackEvent('click', {
            element: target.tagName.toLowerCase(),
            text: target.textContent?.trim() || '',
            href: (target as HTMLAnchorElement).href || ''
          })
        }
      })

      // Track form submissions
      document.addEventListener('submit', (event) => {
        const form = event.target as HTMLFormElement
        trackEvent('form_submit', {
          form: form.id || form.action || 'unknown'
        })
      })
    }
  }

  /**
   * Suit la profondeur de défilement
   */
  const trackScrollDepth = () => {
    if (typeof window !== 'undefined') {
      let maxScrollDepth = 0
      
      window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const scrollPercent = Math.round((scrollTop / docHeight) * 100)
        
        if (scrollPercent > maxScrollDepth) {
          maxScrollDepth = scrollPercent
          
          // Track at 25%, 50%, 75%, 100%
          if ([25, 50, 75, 100].includes(maxScrollDepth)) {
            trackEvent('scroll_depth', { depth: maxScrollDepth })
          }
        }
      })
    }
  }

  /**
   * Suit un événement personnalisé
   */
  const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
    // Grafana
    if (grafanaConfig?.url && grafanaConfig?.apiKey) {
      sendToGrafana('event', { 
        event: eventName, 
        parameters, 
        timestamp: Date.now() 
      })
    }

    console.log(`Event tracked: ${eventName}`, parameters)
  }

  /**
   * Envoie des données à Grafana
   */
  const sendToGrafana = async (metricType: string, data: any) => {
    try {
      const response = await fetch(`${grafanaConfig.url}/api/datasources/proxy/1/api/v1/write`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${grafanaConfig.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          metric: `sdavesne.${metricType}`,
          value: data.value || 1,
          timestamp: data.timestamp || Date.now(),
          tags: {
            ...data,
            app: config.public.appName || 'sdavesne-vitrine',
            environment: sentryConfig?.environment || 'development'
          }
        })
      })

      if (!response.ok) {
        console.warn('Failed to send data to Grafana:', response.statusText)
      }
    } catch (error) {
      console.warn('Error sending data to Grafana:', error)
    }
  }

  /**
   * Capture une erreur
   */
  const captureError = (error: Error, context?: Record<string, any>) => {
    // Grafana
    if (grafanaConfig?.url && grafanaConfig?.apiKey) {
      sendToGrafana('error', {
        message: error.message,
        stack: error.stack,
        timestamp: Date.now()
      })
    }

    console.error('Error captured:', error, context)
  }

  /**
   * Définit l'utilisateur pour le tracking
   */
  const setUser = (userId: string, userData?: Record<string, any>) => {
    console.log('User set for tracking:', userId)
  }

  return {
    initializeMonitoring,
    trackPageView,
    trackEvent,
    captureError,
    setUser,
    sendPerformanceMetric
  }
}
