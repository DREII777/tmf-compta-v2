/**
 * Frise « Notre histoire », 2014 → 2026.
 * Les entrées 2014, 2015, 2016 et 2022 reprennent le texte du site actuel
 * (page « À propos »). L'entrée 2025-2026 formule la continuité juridique
 * de l'équipe vers TMF Compta SRL, conformément à la SPEC (§0) : ce n'est
 * pas une création, c'est une restructuration.
 */

import type { TimelineItem } from './types'

export const TIMELINE: TimelineItem[] = [
  {
    id: 'fondation',
    year: '2014',
    fr: {
      title: 'Fondation',
      description:
        "TMF Compta est fondée, marquant le début de notre parcours dans le domaine de la comptabilité et des services financiers.",
    },
    ro: {
      title: 'Înființare',
      description:
        "TMF Compta ia naștere, marcând începutul parcursului nostru în domeniul contabilității și al serviciilor financiare.",
    },
  },
  {
    id: 'confiance',
    year: '2015',
    fr: {
      title: 'Confiance grandissante',
      description:
        "Grâce à notre approche centrée sur le client et à notre engagement envers l'excellence, nous gagnons la confiance de nombreuses entreprises qui bénéficient de nos conseils et de notre expertise.",
    },
    ro: {
      title: 'Încredere în creștere',
      description:
        "Datorită abordării centrate pe client și angajamentului nostru pentru excelență, câștigăm încrederea a numeroase companii care beneficiază de sfaturile și expertiza noastră.",
    },
  },
  {
    id: 'nouveaux-locaux',
    year: '2016',
    fr: {
      title: 'Nouveaux locaux',
      description:
        "Nous déménageons vers de nouveaux locaux, renforçant notre capacité à offrir des services de qualité supérieure à nos clients.",
    },
    ro: {
      title: 'Sediu nou',
      description:
        "Ne mutăm într-un sediu nou, care ne întărește capacitatea de a oferi clienților servicii de calitate superioară.",
    },
  },
  {
    id: 'pme',
    year: '2022',
    fr: {
      title: 'Une PME à part entière',
      description:
        "TMF Compta franchit une étape majeure de son évolution en devenant une PME à part entière. Ce jalon témoigne de notre croissance continue et de notre engagement à offrir des services de qualité supérieure à une clientèle de plus en plus diversifiée. Nous sommes fiers d'accompagner les entreprises, petites et moyennes, dans leur développement financier et de contribuer à leur réussite.",
    },
    ro: {
      title: 'O PME cu drepturi depline',
      description:
        "TMF Compta trece o etapă esențială în evoluția sa, devenind o PME cu drepturi depline. Acest reper confirmă creșterea noastră constantă și angajamentul de a oferi servicii de calitate superioară unei clientele tot mai diverse. Suntem mândri să însoțim întreprinderile mici și mijlocii în dezvoltarea lor financiară și să contribuim la reușita lor.",
    },
  },
  {
    id: 'srl-itaa',
    year: '2025-2026',
    fr: {
      title: 'TMF Compta SRL',
      description:
        "Le cabinet passe de la société en nom collectif à la société à responsabilité limitée. Ce changement de forme juridique impose de refaire l'intégralité du processus d'inscription à l'ITAA : l'agrément, ininterrompu depuis 2014, est reporté sur la nouvelle structure. Même adresse à Zaventem, même équipe, même expertise — seule l'enveloppe juridique change.",
    },
    ro: {
      title: 'TMF Compta SRL',
      description:
        "Cabinetul trece de la societatea în nume colectiv la societatea cu răspundere limitată. Această schimbare de formă juridică impune reluarea integrală a procesului de înscriere la ITAA: acreditarea, neîntreruptă din 2014, este transferată noii structuri. Aceeași adresă în Zaventem, aceeași echipă, aceeași expertiză — se schimbă doar învelișul juridic.",
    },
  },
]
