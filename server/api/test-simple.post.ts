export default defineEventHandler(async (event) => {
  try {
    console.log('🧪 API Test Simple - Création Témoignage')
    
    // Récupérer le body de la requête
    const body = await readBody(event)
    console.log('Body reçu:', body)
    
    // Test simple - juste retourner les informations
    return {
      success: true,
      message: 'Test simple réussi',
      receivedData: body,
      timestamp: new Date().toISOString(),
      endpoint: '/api/test-simple',
      note: 'Cet endpoint ne crée rien, il teste juste la réception des données'
    }
    
  } catch (error) {
    console.error('❌ Erreur API Test Simple:', error)
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    }
  }
})


