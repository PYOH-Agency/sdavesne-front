export default defineEventHandler(async (event) => {
  try {
    console.log('🔍 API Soumission Contact appelée')

    // Récupérer le body de la requête
    const body = await readBody(event)
    console.log('Body reçu:', body)

    // Validation des champs requis
    if (!body.firstName || !body.lastName || !body.email || !body.consultationType) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Champs requis manquants',
        data: { 
          required: ['firstName', 'lastName', 'email', 'consultationType'],
          received: Object.keys(body)
        }
      })
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Format d\'email invalide',
        data: { email: body.email }
      })
    }

    // Préparer les données pour traitement
    const contactData = {
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      email: body.email.trim(),
      phone: body.phone?.trim() || '',
      consultationType: body.consultationType,
      message: body.message?.trim() || '',
      preferences: {
        remote: body.preferences?.remote || false,
        newsletter: body.preferences?.newsletter || false
      },
      submittedAt: new Date().toISOString(),
      ip: getRequestHeader(event, 'x-forwarded-for') || getRequestHeader(event, 'x-real-ip') || 'unknown'
    }

    console.log('✅ Données de contact validées:', contactData)

    // Ici vous pourriez :
    // 1. Sauvegarder dans une base de données
    // 2. Envoyer un email de notification
    // 3. Envoyer un email de confirmation au client
    // 4. Intégrer avec un CRM

    // Simulation de traitement
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Retourner la confirmation
    return {
      success: true,
      message: 'Votre demande de contact a été reçue avec succès',
      data: {
        reference: `CONT-${Date.now()}`,
        submittedAt: contactData.submittedAt,
        estimatedResponse: '24h'
      },
      nextSteps: [
        'Vous recevrez un email de confirmation dans les prochaines minutes',
        'Je vous recontacte dans les 24h pour confirmer le rendez-vous',
        'Préparez vos questions pour la première consultation'
      ]
    }

  } catch (error) {
    console.error('❌ Erreur traitement contact:', error)
    
    // Si c'est une erreur de validation, la retourner telle quelle
    if (error.statusCode === 400) {
      throw error
    }

    // Sinon, créer une erreur générique
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors du traitement de votre demande de contact',
      data: {
        error: error.message,
        timestamp: new Date().toISOString()
      }
    })
  }
})
