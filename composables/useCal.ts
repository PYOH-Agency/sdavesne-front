export const useCal = () => {
  const openCalPopup = (calUsername: string, eventType?: string) => {
    if (process.client) {
      const calUrl = eventType ? `${calUsername}/${eventType}` : calUsername
      const url = `https://app.cal.com/${calUrl}`
      window.open(url, "_blank")
    }
  }

  const getCalUrl = (calUsername: string, eventType?: string) => {
    const calUrl = eventType ? `${calUsername}/${eventType}` : calUsername
    return `https://app.cal.com/${calUrl}`
  }
  
  const initInlineCalendar = (containerId: string, calUsername: string = 'cal', eventType?: string) => {
    if (process.client) {
      const container = document.getElementById(containerId)
      if (!container) return
      
      // Utiliser le script embed officiel de Cal.com
      container.innerHTML = `
        <div class="cal-inline-widget" data-cal-link="${calUsername}${eventType ? '/' + eventType : ''}" data-cal-config='{"layout":"month_view","theme":"light"}' style="width:100%;height:600px;overflow:auto">
          <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f9fafb; border-radius: 12px;">
            <div style="text-align: center;">
              <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #2563eb, #059669); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
                <svg style="width: 24px; height: 24px; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <p style="color: #6b7280; margin: 0;">Chargement du calendrier...</p>
            </div>
          </div>
        </div>
      `
      
      // Charger le script Cal.com si pas déjà chargé
      if (!document.querySelector('script[src*="embed.js"]')) {
        const script = document.createElement('script')
        script.src = 'https://app.cal.com/embed/embed.js'
        script.async = true
        document.head.appendChild(script)
        
        script.onload = () => {
          // Initialiser Cal après chargement du script
          if (window.Cal) {
            window.Cal('init', {
              origin: 'https://app.cal.com'
            })
          }
        }
      } else {
        // Si le script est déjà chargé, initialiser directement
        if (window.Cal) {
          window.Cal('init', {
            origin: 'https://app.cal.com'
          })
        }
      }
    }
  }

  return { openCalPopup, getCalUrl, initInlineCalendar }
}
