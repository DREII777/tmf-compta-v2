/**
 * Dictionnaire d'interface — FR et RO.
 *
 * Contrairement aux collections de contenu (services, faq, timeline,
 * posts), ce fichier est un dictionnaire plat consommé par locale entière :
 * `UI[locale].nav.home`. C'est l'exception documentée dans types.ts.
 *
 * Les textes « Qui sommes-nous », « Notre mission » et les 6 points
 * « Pourquoi nous choisir » sont repris verbatim du site actuel
 * (tmfcompta.be/fr et /ro).
 */

import type { Locale } from '@/lib/i18n'

export interface UiDictionary {
  skipToContent: string

  nav: {
    home: string
    services: string
    about: string
    method: string
    contact: string
    faq: string
    local: string
    romanian: string
    news: string
    legal: string
    privacy: string
  }

  langSwitch: {
    label: string
    fr: string
    ro: string
  }

  header: {
    phoneLabel: string
    cta: string
    menuOpen: string
    menuClose: string
  }

  footer: {
    tagline: string
    servicesTitle: string
    companyTitle: string
    resourcesTitle: string
    contactTitle: string
    itaaBadge: string
    sisterCompanyText: string
    sisterCompanyLink: string
    hoursTitle: string
    rightsReserved: string
  }

  home: {
    heroEyebrow: string
    heroTitle: string
    heroAccroche: string
    heroCtaPrimary: string
    heroCtaSecondary: string
    heroBadgeItaa: string
    heroTrustPoints: [string, string, string]
    heroFloatingSince: string
    heroFloatingPeppol: string
    stats: [
      { value: string; label: string },
      { value: string; label: string },
      { value: string; label: string },
      { value: string; label: string },
    ]
    methodTitle: string
    methodSubtitle: string
    methodSteps: [
      { title: string; text: string },
      { title: string; text: string },
      { title: string; text: string },
      { title: string; text: string },
    ]
    methodStepOf: string
    methodProgress: string
    phasesTitle: string
    phaseCreation: string
    phaseGestion: string
    phaseExpansion: string
    aboutTitle: string
    aboutText: string
    missionTitle: string
    missionText: string
    whyUsTitle: string
    whyUsIntro: string
    whyUsPoints: [string, string, string, string, string, string]
    servicesTitle: string
    servicesSubtitle: string
    reviewsTitle: string
    reviewsSubtitle: string
    timelineTitle: string
    faqTeaserTitle: string
    faqTeaserLink: string
    ctaBandTitle: string
    ctaBandText: string
    ctaBandButton: string
    metaTitle: string
    metaDescription: string
  }

  servicesPage: {
    title: string
    intro: string
    metaTitle: string
    metaDescription: string
  }

  aboutPage: {
    title: string
    metaTitle: string
    metaDescription: string
  }

  methodPage: {
    title: string
    intro: string
    steps: [
      { title: string; text: string },
      { title: string; text: string },
      { title: string; text: string },
      { title: string; text: string },
    ]
    metaTitle: string
    metaDescription: string
  }

  contactPage: {
    title: string
    intro: string
    formTitle: string
    mapLabel: string
    hoursTitle: string
    metaTitle: string
    metaDescription: string
  }

  faqPage: {
    title: string
    intro: string
    metaTitle: string
    metaDescription: string
  }

  localPage: {
    title: string
    intro: string
    areaServedTitle: string
    metaTitle: string
    metaDescription: string
  }

  romanianPage: {
    title: string
    intro: string
    metaTitle: string
    metaDescription: string
  }

  newsPage: {
    title: string
    intro: string
    readMore: string
    publishedOn: string
    minRead: string
    metaTitle: string
    metaDescription: string
  }

  legalPage: {
    title: string
    metaTitle: string
    metaDescription: string
  }

  privacyPage: {
    title: string
    intro: string
    metaTitle: string
    metaDescription: string
  }

  notFound: {
    title: string
    text: string
    backHome: string
  }

  form: {
    name: string
    email: string
    phone: string
    company: string
    subject: string
    message: string
    consent: string
    submit: string
    sending: string
    successTitle: string
    successText: string
    errorTitle: string
    errorText: string
    requiredMark: string
    optional: string
  }

  common: {
    readMore: string
    discoverService: string
    viewAllServices: string
    callUs: string
    emailUs: string
    bookAppointment: string
    viewOnMap: string
    back: string
    breadcrumbHome: string
    allRightsReserved: string
  }
}

export const UI: Record<Locale, UiDictionary> = {
  fr: {
    skipToContent: 'Aller au contenu principal',

    nav: {
      home: 'Accueil',
      services: 'Services',
      about: 'À propos',
      method: 'Notre méthode',
      contact: 'Contact',
      faq: 'FAQ',
      local: 'Comptable à Zaventem',
      romanian: 'Nous parlons roumain',
      news: 'Actualités',
      legal: 'Mentions légales',
      privacy: 'Confidentialité',
    },

    langSwitch: {
      label: 'Choisir la langue',
      fr: 'Français',
      ro: 'Română',
    },

    header: {
      phoneLabel: 'Appelez-nous',
      cta: 'Prendre rendez-vous',
      menuOpen: 'Ouvrir le menu',
      menuClose: 'Fermer le menu',
    },

    footer: {
      tagline: 'Votre cabinet comptable de confiance à Zaventem, depuis 2014.',
      servicesTitle: 'Services',
      companyTitle: 'Cabinet',
      resourcesTitle: 'Ressources',
      contactTitle: 'Contact',
      itaaBadge: 'Expert-comptable (fiscaliste) — agréé ITAA depuis 2014',
      sisterCompanyText: 'Notre société sœur TMF Assist propose des services complémentaires.',
      sisterCompanyLink: 'Découvrir TMF Assist',
      hoursTitle: 'Horaires',
      rightsReserved: 'Tous droits réservés.',
    },

    home: {
      heroEyebrow: 'Cabinet d’expertise comptable et fiscale',
      heroTitle: 'Comptable-Fiscaliste, Situé à Zaventem',
      heroAccroche:
        "Optimisez la santé financière de votre entreprise avec l'expertise d'un cabinet d'expert comptable de confiance.",
      heroCtaPrimary: 'Prendre rendez-vous',
      heroCtaSecondary: 'Découvrir nos services',
      heroBadgeItaa: 'Expert-comptable (fiscaliste) ITAA',
      heroTrustPoints: [
        'Une équipe active depuis 2014',
        'Expert-comptable (fiscaliste) ITAA',
        'Réponse sous 24 h ouvrées',
      ],
      heroFloatingSince: 'Depuis 2014',
      heroFloatingPeppol: 'Conformes Peppol 2026',
      stats: [
        { value: '2014', label: 'Sur le marché depuis' },
        { value: 'ITAA', label: 'Expert-comptable agréé' },
        { value: '24 h', label: 'Délai de réponse moyen' },
        { value: 'FR / RO', label: 'Accompagnement bilingue' },
      ],
      methodTitle: 'Comment ça se passe',
      methodSubtitle: 'Quatre étapes simples, du premier contact au suivi de vos échéances.',
      methodSteps: [
        {
          title: 'On fait le point',
          text: "Un premier échange, par téléphone ou dans nos bureaux de Zaventem, pour comprendre votre activité et vos besoins.",
        },
        {
          title: 'On reprend votre dossier',
          text: "Nous contactons votre comptable actuel et récupérons vos données, sans interruption de service.",
        },
        {
          title: 'Vous envoyez vos pièces',
          text: "Factures, extraits bancaires, notes de frais : vous nous transmettez vos documents au fil de l'eau.",
        },
        {
          title: 'On gère les échéances',
          text: "TVA, impôts, comptes annuels : nous suivons chaque échéance et vous tenons informé, sans mauvaise surprise.",
        },
      ],
      methodStepOf: 'Étape {n} sur {total}',
      methodProgress: 'Les étapes de notre méthode',
      phasesTitle: 'À chaque phase de votre entreprise',
      phaseCreation: 'Création',
      phaseGestion: 'Gestion',
      phaseExpansion: 'Expansion',
      aboutTitle: 'Qui sommes-nous ?',
      aboutText:
        "Notre cabinet comptable à Zaventem cumule plus de 10 années d'expérience dans le domaine, offrant des services comptables fiables et personnalisés pour les entreprises de toutes tailles. Notre équipe d'experts dévoués met tout en œuvre pour vous aider à atteindre vos objectifs financiers et vous accompagne dans la réussite de votre entreprise.",
      missionTitle: 'Notre mission',
      missionText:
        "Chez TMF Compta, notre mission est votre succès financier. Nous vous accompagnons avec expertise et solutions personnalisées pour optimiser votre gestion, vos décisions stratégiques et votre croissance. Faites confiance à notre équipe expérimentée pour atteindre vos objectifs entrepreneuriaux.",
      whyUsTitle: 'Pourquoi nous choisir ?',
      whyUsIntro: 'Nous offrons des services sur mesure pour répondre efficacement à vos besoins spécifiques.',
      whyUsPoints: [
        'Gestion de comptabilité et déclarations TVA',
        'Établissement de situations comptables',
        'Rédaction et dépôt de déclarations fiscales (IPP/ISOC)',
        'Pour sociétés, rédaction et dépôt de comptes annuels',
        'Conseils en fiscalité et optimisation fiscale',
        'Assistance et défense lors de contrôles fiscaux',
      ],
      servicesTitle: 'Un service en 360°',
      servicesSubtitle:
        "Découvrez l'ensemble de nos services, votre passerelle vers une gestion comptable et financière optimale.",
      reviewsTitle: 'Ils nous font confiance',
      reviewsSubtitle: 'Les avis de nos clients, tels que publiés sur Google.',
      timelineTitle: 'Notre histoire',
      faqTeaserTitle: 'Vous avez des questions ?',
      faqTeaserLink: 'Consulter la FAQ',
      ctaBandTitle: 'Déléguez votre comptabilité',
      ctaBandText:
        'Laissez-nous votre adresse email pour être recontacté rapidement. Ensemble, trouvons la solution comptable la mieux adaptée à votre activité.',
      ctaBandButton: 'Envoyer',
      metaTitle: 'Comptable à Zaventem – Expert-comptable ITAA, TMF Compta',
      metaDescription:
        "Cabinet d'expertise comptable et fiscale à Zaventem. Comptabilité, TVA, fiscalité et conseil pour indépendants et sociétés, en français et en roumain.",
    },

    servicesPage: {
      title: 'Nos services',
      intro:
        "Un service en 360° : découvrez nos 9 domaines d'expertise et accédez à une prise en charge spécialisée, de la tenue de comptabilité à la facturation électronique Peppol.",
      metaTitle: 'Services comptables et fiscaux à Zaventem | TMF Compta',
      metaDescription:
        "Les 9 services de TMF Compta à Zaventem : comptabilité, fiscalité, création d'entreprise, social, Peppol, contrôles fiscaux et missions spéciales.",
    },

    aboutPage: {
      title: 'À propos de TMF Compta',
      metaTitle: 'Cabinet comptable à Zaventem | À propos de TMF Compta',
      metaDescription:
        "Une équipe qui accompagne indépendants et PME depuis 2014, aujourd'hui réunie au sein de TMF Compta SRL, Expert-comptable (fiscaliste) ITAA.",
    },

    methodPage: {
      title: 'Notre méthode',
      intro: 'Un accompagnement structuré en quatre étapes, pensé pour vous faire gagner du temps dès le premier contact.',
      steps: [
        {
          title: 'Premier échange',
          text: "Nous discutons de votre activité, de vos besoins et de vos échéances, par téléphone ou dans nos bureaux de Zaventem.",
        },
        {
          title: 'Proposition sur mesure',
          text: "Nous vous transmettons une offre claire, adaptée à votre statut et à votre volume d'activité, sans frais cachés.",
        },
        {
          title: 'Mise en place',
          text: "Nous récupérons vos dossiers si vous changez de comptable, et mettons en place vos outils comptables sans interruption.",
        },
        {
          title: 'Suivi continu',
          text: "Comptabilité, TVA, fiscalité, social : nous suivons vos échéances et restons disponibles tout au long de l'année.",
        },
      ],
      metaTitle: 'Notre méthode de travail comptable à Zaventem | TMF Compta',
      metaDescription:
        "Comment nous travaillons chez TMF Compta : premier échange, offre sur mesure, mise en place sans interruption et suivi continu de votre dossier comptable.",
    },

    contactPage: {
      title: 'Contactez-nous',
      intro:
        "Une question, un projet de création d'entreprise, un changement de comptable ? Écrivez-nous ou appelez-nous, nous répondons sous 24 heures ouvrées.",
      formTitle: 'Laissez-nous un message',
      mapLabel: 'Notre bureau à Zaventem',
      hoursTitle: "Horaires d'ouverture",
      metaTitle: 'Cabinet comptable à Zaventem | Contactez TMF Compta',
      metaDescription:
        "Contactez TMF Compta à Zaventem : téléphone, email ou formulaire en ligne. Nous vous répondons sous 24 heures ouvrées pour un premier échange.",
    },

    faqPage: {
      title: 'Questions fréquentes',
      intro: 'Les réponses aux questions que nos clients nous posent le plus souvent.',
      metaTitle: 'FAQ comptable à Zaventem : TVA, Peppol | TMF Compta',
      metaDescription:
        'TVA, Peppol, honoraires, création de société, contrôle fiscal : les réponses claires aux questions les plus fréquentes sur nos services comptables.',
    },

    localPage: {
      title: 'Comptable à Zaventem',
      intro:
        'Installé Sterrebeekstraat 154 à Zaventem, notre cabinet accompagne les indépendants et PME de Zaventem et des communes voisines depuis 2014.',
      areaServedTitle: 'Nous intervenons aussi à',
      metaTitle: 'Comptable à Zaventem et Bruxelles | Expert-comptable TMF',
      metaDescription:
        'Cabinet comptable à Zaventem : comptabilité, TVA et fiscalité pour indépendants et sociétés, à Zaventem, Diegem, Woluwe et dans le Brabant flamand.',
    },

    romanianPage: {
      title: 'Votre comptable parle roumain',
      intro:
        "Nous échangeons couramment en roumain, à l'oral comme à l'écrit. Statut d'indépendant, création de SRL, TVA, construction : vos obligations belges vous sont expliquées dans votre langue.",
      metaTitle: 'Comptable qui parle roumain à Zaventem | TMF Compta',
      metaDescription:
        'Cabinet comptable à Zaventem où l’on parle roumain : comptabilité, TVA et fiscalité expliquées dans votre langue, pour indépendants et sociétés en Belgique.',
    },

    newsPage: {
      title: 'Actualités',
      intro: 'Nos analyses sur la fiscalité, la comptabilité et la réglementation belge, expliquées simplement.',
      readMore: 'Lire l’article',
      publishedOn: 'Publié le',
      minRead: 'min de lecture',
      metaTitle: 'Actualités comptables et fiscales à Zaventem | TMF Compta',
      metaDescription:
        'Les actualités fiscales et comptables belges décryptées par TMF Compta : facturation Peppol, échéances fiscales et création d’entreprise en Belgique.',
    },

    legalPage: {
      title: 'Mentions légales',
      metaTitle: 'Mentions légales | TMF Compta SRL, cabinet à Zaventem',
      metaDescription:
        "Identité légale, coordonnées et informations réglementaires de TMF Compta SRL, cabinet d'expertise comptable et fiscale situé à Zaventem, Belgique.",
    },

    privacyPage: {
      title: 'Politique de confidentialité',
      intro:
        'Comment TMF Compta collecte, utilise et protège vos données personnelles lors de votre navigation et de vos échanges avec le cabinet.',
      metaTitle: 'Politique de confidentialité | TMF Compta, Zaventem',
      metaDescription:
        'La politique de confidentialité de TMF Compta : quelles données personnelles sont collectées, pourquoi, combien de temps et comment exercer vos droits.',
    },

    notFound: {
      title: 'Page introuvable',
      text: "La page que vous cherchez n'existe pas ou a été déplacée.",
      backHome: "Retour à l'accueil",
    },

    form: {
      name: 'Nom complet',
      email: 'Adresse email',
      phone: 'Téléphone',
      company: 'Entreprise',
      subject: 'Sujet',
      message: 'Votre message',
      consent: "J'accepte que mes données soient utilisées pour traiter ma demande.",
      submit: 'Envoyer',
      sending: 'Envoi en cours…',
      successTitle: 'Message envoyé',
      successText: 'Merci, nous vous répondons sous 24 heures ouvrées.',
      errorTitle: 'Une erreur est survenue',
      errorText: 'Votre message n’a pas pu être envoyé. Merci de réessayer ou de nous appeler directement.',
      requiredMark: 'obligatoire',
      optional: 'facultatif',
    },

    common: {
      readMore: 'En savoir plus',
      discoverService: 'Découvrir ce service',
      viewAllServices: 'Voir tous les services',
      callUs: 'Nous appeler',
      emailUs: 'Nous écrire',
      bookAppointment: 'Prendre rendez-vous',
      viewOnMap: 'Voir sur la carte',
      back: 'Retour',
      breadcrumbHome: 'Accueil',
      allRightsReserved: 'Tous droits réservés.',
    },
  },

  ro: {
    skipToContent: 'Sari la conținutul principal',

    nav: {
      home: 'Acasă',
      services: 'Servicii',
      about: 'Despre noi',
      method: 'Metoda noastră',
      contact: 'Contact',
      faq: 'Întrebări frecvente',
      local: 'Contabil în Zaventem',
      romanian: 'Vorbim româneşte',
      news: 'Noutăți',
      legal: 'Informații legale',
      privacy: 'Confidențialitate',
    },

    langSwitch: {
      label: 'Alegeți limba',
      fr: 'Franceză',
      ro: 'Română',
    },

    header: {
      phoneLabel: 'Sunați-ne',
      cta: 'Programează o întâlnire',
      menuOpen: 'Deschide meniul',
      menuClose: 'Închide meniul',
    },

    footer: {
      tagline: 'Cabinetul dumneavoastră contabil de încredere din Zaventem, din 2014.',
      servicesTitle: 'Servicii',
      companyTitle: 'Cabinet',
      resourcesTitle: 'Resurse',
      contactTitle: 'Contact',
      itaaBadge: 'Expert-contabil (fiscalist) — acreditat ITAA din 2014',
      sisterCompanyText: 'Societatea noastră soră, TMF Assist, oferă servicii complementare.',
      sisterCompanyLink: 'Descoperă TMF Assist',
      hoursTitle: 'Program',
      rightsReserved: 'Toate drepturile rezervate.',
    },

    home: {
      heroEyebrow: 'Cabinet de expertiză contabilă și fiscală',
      heroTitle: 'Contabil-Fiscalist, Localizat în Zaventem',
      heroAccroche:
        'Optimizați sănătatea financiară a afacerii dumneavoastră cu expertiza unui cabinet de expertiză contabilă de încredere.',
      heroCtaPrimary: 'Programează o întâlnire',
      heroCtaSecondary: 'Descoperă serviciile noastre',
      heroBadgeItaa: 'Expert-contabil (fiscalist) ITAA',
      heroTrustPoints: [
        'O echipă activă din 2014',
        'Expert-contabil (fiscalist) ITAA',
        'Răspuns în 24 de ore lucrătoare',
      ],
      heroFloatingSince: 'Din 2014',
      heroFloatingPeppol: 'Conformi Peppol 2026',
      stats: [
        { value: '2014', label: 'Pe piață din' },
        { value: 'ITAA', label: 'Expert-contabil autorizat' },
        { value: '24 h', label: 'Timp mediu de răspuns' },
        { value: 'FR / RO', label: 'Asistență bilingvă' },
      ],
      methodTitle: 'Cum decurge colaborarea',
      methodSubtitle: 'Patru etape simple, de la primul contact până la urmărirea termenelor dumneavoastră.',
      methodSteps: [
        {
          title: 'Facem un bilanț',
          text: 'O primă discuție, la telefon sau la biroul nostru din Zaventem, pentru a înțelege activitatea și nevoile dumneavoastră.',
        },
        {
          title: 'Preluăm dosarul dumneavoastră',
          text: 'Contactăm contabilul dumneavoastră actual și recuperăm datele contabile, fără întrerupere de serviciu.',
        },
        {
          title: 'Ne trimiteți documentele',
          text: 'Facturi, extrase bancare, note de cheltuieli: ne transmiteți documentele pe măsură ce apar.',
        },
        {
          title: 'Gestionăm termenele',
          text: 'TVA, impozite, conturi anuale: urmărim fiecare termen și vă ținem la curent, fără surprize neplăcute.',
        },
      ],
      methodStepOf: 'Etapa {n} din {total}',
      methodProgress: 'Etapele metodei noastre',
      phasesTitle: 'La fiecare etapă a afacerii dumneavoastră',
      phaseCreation: 'Înființare',
      phaseGestion: 'Administrare',
      phaseExpansion: 'Extindere',
      aboutTitle: 'Cine suntem?',
      aboutText:
        'Cabinetul nostru de contabilitate din Zaventem are peste 10 ani de experiență în domeniu, oferind servicii contabile de încredere și personalizate pentru companii de toate dimensiunile. Echipa noastră de experți dedicați face tot posibilul pentru a vă ajuta să atingeți obiectivele financiare și vă însoțește în succesul afacerii dumneavoastră.',
      missionTitle: 'Misiunea noastră',
      missionText:
        'La TMF Compta, misiunea noastră este succesul dumneavoastră financiar. Vă însoțim cu expertiză și soluții personalizate pentru a optimiza gestionarea, deciziile strategice și creșterea afacerii dumneavoastră. Aveți încredere în echipa noastră experimentată pentru a vă atinge obiectivele antreprenoriale.',
      whyUsTitle: 'De ce să ne alegeți?',
      whyUsIntro: 'Oferim servicii personalizate pentru a răspunde eficient nevoilor dumneavoastră specifice.',
      whyUsPoints: [
        'Gestiunea contabilității și declarațiile TVA',
        'Întocmirea situațiilor financiare',
        'Pregătirea și depunerea declarațiilor fiscale (IPP/ISOC)',
        'Pentru companii, redactarea și depunerea bilanțurilor anuale',
        'Consultanță fiscală și optimizare fiscală',
        'Asistență și reprezentare în timpul controalelor fiscale',
      ],
      servicesTitle: 'Un serviciu complet de 360°',
      servicesSubtitle:
        'Descoperiți toate serviciile noastre, poarta dumneavoastră către o gestionare contabilă și financiară optimă.',
      reviewsTitle: 'Ne acordă încredere',
      reviewsSubtitle: 'Recenziile clienților noștri, așa cum apar pe Google.',
      timelineTitle: 'Istoria noastră',
      faqTeaserTitle: 'Aveți întrebări?',
      faqTeaserLink: 'Consultați întrebările frecvente',
      ctaBandTitle: 'Delegați contabilitatea',
      ctaBandText:
        'Lăsați-ne adresa dumneavoastră de email pentru a fi contactat rapid. Împreună, găsim soluția contabilă cea mai potrivită pentru activitatea dumneavoastră.',
      ctaBandButton: 'Trimite',
      metaTitle: 'Contabil în Zaventem – Expert-contabil ITAA, TMF Compta',
      metaDescription:
        'Cabinet de expertiză contabilă și fiscală în Zaventem. Contabilitate, TVA, fiscalitate și consultanță pentru independenți și societăți, în franceză și română.',
    },

    servicesPage: {
      title: 'Serviciile noastre',
      intro:
        'Un serviciu complet de 360°: descoperiți cele 9 domenii de expertiză ale noastre, de la ținerea contabilității până la facturarea electronică Peppol.',
      metaTitle: 'Servicii contabile și fiscale în Zaventem | TMF Compta',
      metaDescription:
        'Cele 9 servicii TMF Compta în Zaventem: contabilitate, fiscalitate, înființare de firme, social, Peppol, controale fiscale și misiuni speciale.',
    },

    aboutPage: {
      title: 'Despre TMF Compta',
      metaTitle: 'Cabinet contabil în Zaventem | Despre noi, TMF Compta',
      metaDescription:
        'O echipă care însoțește independenți și PME-uri din 2014, reunită astăzi sub TMF Compta SRL, înscrisă la ITAA ca Expert-contabil (fiscalist).',
    },

    methodPage: {
      title: 'Metoda noastră',
      intro: 'Un sprijin structurat în patru etape, gândit să vă economisească timp încă din primul contact.',
      steps: [
        {
          title: 'Prima discuție',
          text: 'Discutăm despre activitatea, nevoile și termenele dumneavoastră, la telefon sau la biroul nostru din Zaventem.',
        },
        {
          title: 'Ofertă personalizată',
          text: 'Vă transmitem o ofertă clară, adaptată statutului și volumului activității dumneavoastră, fără costuri ascunse.',
        },
        {
          title: 'Punere în funcțiune',
          text: 'Preluăm dosarele dumneavoastră dacă schimbați contabilul și instalăm instrumentele contabile fără întrerupere.',
        },
        {
          title: 'Urmărire continuă',
          text: 'Contabilitate, TVA, fiscalitate, social: urmărim termenele dumneavoastră și rămânem disponibili pe tot parcursul anului.',
        },
      ],
      metaTitle: 'Metoda noastră de lucru contabil în Zaventem | TMF Compta',
      metaDescription:
        'Cum lucrăm la TMF Compta, cabinet contabil în Zaventem: prima discuție, ofertă personalizată, punere în funcțiune și urmărire continuă a dosarului.',
    },

    contactPage: {
      title: 'Contactați-ne',
      intro:
        'O întrebare, un proiect de înființare a unei firme, o schimbare de contabil? Scrieți-ne sau sunați-ne, răspundem în 24 de ore lucrătoare.',
      formTitle: 'Lăsați-ne un mesaj',
      mapLabel: 'Biroul nostru din Zaventem',
      hoursTitle: 'Program de lucru',
      metaTitle: 'Cabinet contabil în Zaventem | Contactați TMF Compta',
      metaDescription:
        'Contactați cabinetul contabil TMF Compta din Zaventem: telefon, email sau formular online. Vă răspundem în 24 de ore lucrătoare pentru o primă discuție.',
    },

    faqPage: {
      title: 'Întrebări frecvente',
      intro: 'Răspunsurile la întrebările pe care ni le adresează cel mai des clienții noștri.',
      metaTitle: 'FAQ contabil în Zaventem: TVA, Peppol | TMF Compta',
      metaDescription:
        'TVA, Peppol, onorarii, înființare de societate, control fiscal: răspunsurile clare la cele mai frecvente întrebări despre serviciile noastre contabile.',
    },

    localPage: {
      title: 'Contabil în Zaventem',
      intro:
        'Situat pe Sterrebeekstraat 154 în Zaventem, cabinetul nostru însoțește independenți și PME-uri din Zaventem și din comunele învecinate din 2014.',
      areaServedTitle: 'Intervenim și în',
      metaTitle: 'Contabil în Zaventem și comunele vecine | TMF Compta',
      metaDescription:
        'Cabinet contabil în Zaventem: contabilitate, TVA și fiscalitate pentru independenți și societăți, în Zaventem, Diegem, Woluwe și Brabantul Flamand.',
    },

    romanianPage: {
      title: 'Contabilul dumneavoastră vorbește româna',
      intro: 'Comunicăm fluent în limba română, verbal și în scris. Statut de independent, înființare SRL, TVA, construcții: obligațiile belgiene vă sunt explicate în limba dumneavoastră.',
      metaTitle: 'Contabil român în Belgia, la Zaventem | TMF Compta',
      metaDescription: 'Cabinet contabil în Zaventem unde se vorbește româna: contabilitate, TVA și fiscalitate explicate pe limba dumneavoastră, pentru independenți și firme.',
    },

    newsPage: {
      title: 'Noutăți',
      intro: 'Analizele noastre despre fiscalitate, contabilitate și reglementarea belgiană, explicate simplu.',
      readMore: 'Citește articolul',
      publishedOn: 'Publicat la',
      minRead: 'min de citit',
      metaTitle: 'Noutăți fiscale și contabile din Zaventem | TMF Compta',
      metaDescription:
        'Noutățile fiscale și contabile din Belgia, explicate simplu de echipa TMF Compta din Zaventem: facturare Peppol, termene fiscale și înființarea unei firme.',
    },

    legalPage: {
      title: 'Informații legale',
      metaTitle: 'Informații legale | TMF Compta SRL, cabinet în Zaventem',
      metaDescription:
        'Identitatea legală, datele de contact și informațiile de reglementare ale TMF Compta SRL, cabinet de expertiză contabilă acreditat ITAA în Zaventem.',
    },

    privacyPage: {
      title: 'Politica de confidențialitate',
      intro:
        'Cum colectează, utilizează și protejează TMF Compta datele dumneavoastră personale în timpul navigării și al schimburilor cu cabinetul.',
      metaTitle: 'Politica de confidențialitate | TMF Compta, Zaventem',
      metaDescription:
        'Politica de confidențialitate a TMF Compta: ce date personale sunt colectate, de ce, cât timp sunt păstrate și cum vă puteți exercita drepturile.',
    },

    notFound: {
      title: 'Pagină negăsită',
      text: 'Pagina pe care o căutați nu există sau a fost mutată.',
      backHome: 'Înapoi la pagina principală',
    },

    form: {
      name: 'Nume complet',
      email: 'Adresă de email',
      phone: 'Telefon',
      company: 'Companie',
      subject: 'Subiect',
      message: 'Mesajul dumneavoastră',
      consent: 'Sunt de acord ca datele mele să fie folosite pentru a răspunde cererii mele.',
      submit: 'Trimite',
      sending: 'Se trimite…',
      successTitle: 'Mesaj trimis',
      successText: 'Mulțumim, vă răspundem în 24 de ore lucrătoare.',
      errorTitle: 'A apărut o eroare',
      errorText: 'Mesajul dumneavoastră nu a putut fi trimis. Vă rugăm să reîncercați sau să ne sunați direct.',
      requiredMark: 'obligatoriu',
      optional: 'opțional',
    },

    common: {
      readMore: 'Aflați mai multe',
      discoverService: 'Descoperă acest serviciu',
      viewAllServices: 'Vezi toate serviciile',
      callUs: 'Sună-ne',
      emailUs: 'Scrie-ne',
      bookAppointment: 'Programează o întâlnire',
      viewOnMap: 'Vezi pe hartă',
      back: 'Înapoi',
      breadcrumbHome: 'Acasă',
      allRightsReserved: 'Toate drepturile rezervate.',
    },
  },
}
