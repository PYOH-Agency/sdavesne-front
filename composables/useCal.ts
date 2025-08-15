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
  
  const initInlineCalendar = (containerId: string, calUsername: string, eventType?: string) => {
    if (process.client) {
      const container = document.getElementById(containerId)
      if (!container) return
      
      // Créer l'iframe Cal.com avec embed
      const calUrl = eventType ? `${calUsername}/${eventType}` : calUsername
      const iframe = document.createElement('iframe')
      iframe.src = `https://cal.com/${calUrl}?embed=true&theme=light`
      iframe.width = '100%'
      iframe.height = '600'
      iframe.style.border = 'none'
      iframe.style.borderRadius = '12px'
      iframe.style.backgroundColor = 'white'
      
      // Remplacer le contenu du container
      container.innerHTML = ''
      container.appendChild(iframe)
      
      // Écouter les messages de Cal.com pour ajuster la hauteur
      const handleMessage = (event: MessageEvent) => {
        if (event.origin === 'https://cal.com' && event.data?.height) {
          iframe.style.height = `${event.data.height}px`
        }
      }
      
      window.addEventListener('message', handleMessage)
      
      // Nettoyer l'event listener quand le composant est détruit
      return () => {
        window.removeEventListener('message', handleMessage)
      }
    }
  }

  return { openCalPopup, getCalUrl, initInlineCalendar }
}
