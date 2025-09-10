// @ts-nocheck
export const useStrapiData = () => {
  // Récupérer les services
  const getServices = async () => {
    try {
      const response = await $fetch('/api/services')
      return response?.data || []
    } catch (error) {
      console.error('Erreur lors de la récupération des services:', error)
      return []
    }
  }

  // Récupérer les services en vedette
  const getFeaturedServices = async () => {
    try {
      const services = await getServices()
      return services.filter(service => service.featured === true)
    } catch (error) {
      console.error('Erreur lors de la récupération des services en vedette:', error)
      return []
    }
  }

  // Récupérer les témoignages
  const getTestimonials = async () => {
    try {
      const response = await $fetch('/api/testimonials', {
        method: 'GET'
      })
      return response?.data || []
    } catch (error) {
      console.error('Erreur lors de la récupération des témoignages:', error)
      return []
    }
  }

  return {
    getServices,
    getFeaturedServices,
    getTestimonials
  }
}
