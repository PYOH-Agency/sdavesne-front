export default defineEventHandler(async (event) => {
  try {
    console.log('🔍 API Contact appelée')

    // Données de la page Contact
    const contactData = {
      success: true,
      data: {
        coordinates: {
          address: {
            title: "Cabinet d'hypnothérapie",
            street: "123 Rue de la Paix",
            city: "75000 Paris, France",
            metro: "Métro : Station de la Paix (ligne 1)"
          },
          phone: {
            number: "+33 1 23 45 67 89",
            hours: "Du lundi au vendredi, 9h-18h"
          },
          email: {
            address: "sophie.davesne@example.com",
            response: "Réponse sous 24h"
          },
          hours: {
            weekdays: "Lundi - Vendredi : 9h00 - 18h00",
            saturday: "Samedi : 9h00 - 12h00",
            sunday: "Dimanche : Fermé"
          }
        },
        practicalInfo: [
          "Première consultation gratuite (30 min)",
          "Séances en cabinet ou à distance",
          "Durée moyenne : 1h à 1h30",
          "Paiement par carte, chèque ou espèces",
          "Remboursement possible selon votre mutuelle"
        ],
        consultationTypes: [
          { value: "premiere", label: "Première consultation gratuite" },
          { value: "stress", label: "Gestion du stress et anxiété" },
          { value: "sommeil", label: "Troubles du sommeil" },
          { value: "tabac", label: "Arrêt du tabac" },
          { value: "confiance", label: "Confiance en soi" },
          { value: "phobies", label: "Phobies et peurs" },
          { value: "douleurs", label: "Gestion des douleurs" },
          { value: "autre", label: "Autre (à préciser)" }
        ],
        cta: {
          title: "🚀 Prêt(e) à commencer votre transformation ?",
          subtitle: "La première consultation est gratuite et sans engagement",
          buttons: [
            { text: "📞 Appeler maintenant", action: "call" },
            { text: "📧 Envoyer un email", action: "email" }
          ]
        }
      }
    }

    console.log('✅ Données Contact récupérées avec succès')
    return contactData

  } catch (error) {
    console.error('❌ Erreur récupération données Contact:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la récupération des données Contact',
      data: error
    })
  }
})


