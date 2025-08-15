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

  return { openCalPopup, getCalUrl }
}
