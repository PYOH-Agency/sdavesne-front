// @ts-nocheck
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
  
  const initInlineCalendar = (containerId: string, calUsername: string = 'paul-bugeon-el1oht', eventType?: string) => {
    if (process.client) {
      const container = document.getElementById(containerId)
      if (!container) return
      
      // Créer l'iframe Cal.com directement avec l'URL embed
      const calUrl = eventType ? `${calUsername}/${eventType}` : calUsername
      
      container.innerHTML = `
        <iframe 
          src="https://cal.com/${calUrl}?embed=true&theme=light" 
          width="100%" 
          height="600" 
          frameborder="0"
          style="border-radius: 12px; background: white;"
          allow="geolocation; microphone; camera; fullscreen"
        ></iframe>
      `
      
      // Fallback : afficher un lien si l'iframe ne fonctionne pas
      setTimeout(() => {
        const iframe = container.querySelector('iframe')
        if (iframe) {
          iframe.onerror = () => {
            container.innerHTML = `
              <div style="display: flex; align-items: center; justify-content: center; height: 600px; background: #f9fafb; border-radius: 12px; border: 2px dashed #e5e7eb;">
                <div style="text-align: center; padding: 2rem;">
                  <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #2563eb, #059669); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
                    <svg style="width: 24px; height: 24px; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <h3 style="color: #374151; margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">Réserver un rendez-vous</h3>
                  <p style="color: #6b7280; margin: 0 0 16px 0;">Cliquez ci-dessous pour accéder au calendrier</p>
                  <a 
                    href="https://cal.com/${calUrl}" 
                    target="_blank" 
                    style="display: inline-block; background: linear-gradient(135deg, #2563eb, #059669); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;"
                  >
                    Ouvrir le calendrier
                  </a>
                </div>
              </div>
            `
          }
        }
      }, 3000)
    }
  }

  return { openCalPopup, getCalUrl, initInlineCalendar }
}
