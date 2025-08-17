export default defineEventHandler(async (event) => {
  try {
    console.log('🔍 API À propos appelée')

    // Données de la page À propos
    const aboutData = {
      success: true,
      data: {
        profile: {
          title: "✨ Votre hypnothérapeute certifiée et passionnée",
          description: "Passionnée par l'accompagnement humain, je me suis formée aux meilleures approches de l'hypnothérapie pour vous offrir un accompagnement personnalisé et bienveillant.",
          experience: "Mon parcours m'a permis de développer une expertise dans l'hypnose ericksonienne et classique, avec une approche centrée sur vos besoins spécifiques et votre rythme personnel.",
          philosophy: "Chaque personne est unique, et c'est pourquoi j'adapte mes techniques pour vous aider à découvrir et mobiliser vos propres ressources intérieures.",
          signature: "Avec bienveillance, Sophie Davesne"
        },
        hypnosisTypes: {
          ericksonian: {
            title: "🌀 Hypnose Ericksonienne",
            description: "L'hypnose ericksonienne est aujourd'hui l'approche la plus répandue et la plus utilisée. Elle est souple, respectueuse et entièrement personnalisée : le praticien utilise vos propres expériences, images et émotions pour favoriser le changement.",
            benefits: "Idéale pour la gestion du stress, des phobies, de l'anxiété, des douleurs ou encore pour renforcer la confiance en soi."
          },
          classical: {
            title: "🎯 Hypnose Classique",
            description: "L'hypnose classique repose sur des suggestions directes, simples et puissantes.",
            benefits: [
              "L'arrêt du tabac",
              "La motivation",
              "La gestion des habitudes (grignotage, addictions légères)",
              "La performance et la concentration"
            ]
          },
          humanistic: {
            title: "🌍 Hypnose Humaniste",
            description: "L'hypnose humaniste permet un travail plus symbolique et spirituel, axé sur la conscience élargie et la compréhension de soi."
          }
        },
        benefits: [
          {
            title: "Réduire le stress",
            subtitle: "et l'anxiété",
            icon: "heart",
            color: "blue"
          },
          {
            title: "Retrouver un sommeil",
            subtitle: "réparateur",
            icon: "moon",
            color: "green"
          },
          {
            title: "Se libérer du tabac",
            subtitle: "et d'autres habitudes",
            icon: "x-circle",
            color: "yellow"
          },
          {
            title: "Reprendre confiance",
            subtitle: "en soi",
            icon: "lightbulb",
            color: "purple"
          },
          {
            title: "Dépasser les blocages",
            subtitle: "émotionnels",
            icon: "zap",
            color: "pink"
          }
        ],
        approach: {
          title: "🤝 Mon approche",
          quote: "Chaque séance est un espace bienveillant où je vous guide avec l'hypnose ericksonienne ou classique selon vos besoins, afin de créer un changement durable et respectueux de votre rythme.",
          values: ["Bienveillance", "Personnalisation", "Respect"]
        },
        cta: {
          title: "📞 Prêt(e) à transformer votre vie ?",
          subtitle: "Vous souhaitez découvrir comment l'hypnose peut vous aider ?",
          buttonText: "🗓️ Réservez votre séance"
        }
      }
    }

    console.log('✅ Données À propos récupérées avec succès')
    return aboutData

  } catch (error) {
    console.error('❌ Erreur récupération données À propos:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la récupération des données À propos',
      data: error
    })
  }
})
