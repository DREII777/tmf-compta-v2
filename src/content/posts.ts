/**
 * Articles du blog / actualités. Corps en blocs typés (voir PostBlock dans
 * types.ts) plutôt qu'en markdown, pour un rendu sémantique garanti sans
 * dépendance de parsing.
 *
 * L'article Peppol et l'article « Devenir indépendant » ont leur version
 * roumaine complète (le lectorat roumain est un public cible du
 * cabinet) ; l'article sur les échéances fiscales est pour l'instant
 * disponible en français uniquement.
 */

import type { Post } from './types'

export const POSTS: Post[] = [
  {
    id: 'peppol-facturation-electronique',
    date: '2026-01-05',
    readingMinutes: 6,
    fr: {
      slug: 'facturation-electronique-peppol-ce-qui-change',
      title: 'Facturation électronique Peppol : ce qui change pour votre entreprise',
      excerpt:
        "Depuis le 1ᵉʳ janvier 2026, la facture électronique via Peppol est obligatoire entre assujettis belges. Voici ce que cela signifie concrètement pour vous.",
      metaTitle: 'Facturation Peppol : ce qui change en 2026 | TMF Compta',
      metaDescription:
        'Peppol obligatoire depuis 2026 : qui est concerné, quelles sanctions, comment vous mettre en conformité et profiter de la déduction majorée à 120 %.',
      body: [
        { type: 'h2', text: 'Une obligation entrée en vigueur le 1ᵉʳ janvier 2026' },
        {
          type: 'p',
          text: "Depuis le 1ᵉʳ janvier 2026, toute entreprise assujettie à la TVA en Belgique doit émettre et recevoir ses factures B2B sous forme électronique structurée, via le réseau Peppol. La facture papier scannée ou le simple fichier PDF envoyé par email ne suffisent plus : ils ne répondent pas à la définition légale de facture électronique.",
        },
        { type: 'h2', text: 'Qui est concerné ?' },
        {
          type: 'p',
          text: "Toutes les entreprises assujetties à la TVA établies en Belgique sont concernées pour leurs transactions avec d'autres assujettis belges (B2B). Les opérations avec des particuliers (B2C) et certaines opérations exonérées restent, pour l'instant, hors du champ de l'obligation.",
        },
        { type: 'h2', text: 'Comment fonctionne le réseau Peppol ?' },
        {
          type: 'p',
          text: "Peppol (Pan-European Public Procurement OnLine) est un réseau d'échange sécurisé qui transmet vos factures dans un format structuré (UBL, selon le standard Peppol BIS) directement entre les systèmes comptables de l'émetteur et du destinataire, sans ressaisie manuelle. Concrètement, une fois raccordé, vous continuez à facturer depuis votre logiciel habituel : c'est lui qui se charge de la transmission via un point d'accès Peppol.",
        },
        {
          type: 'ul',
          items: [
            'Émission automatique dans le format requis',
            'Réception directement intégrée à votre comptabilité',
            "Traçabilité complète de l'envoi et de la réception",
            'Moins d’erreurs de ressaisie et de retards de paiement',
          ],
        },
        { type: 'h2', text: 'Quelles sanctions en cas de non-conformité ?' },
        {
          type: 'p',
          text: "L'administration fiscale peut sanctionner l'émission de factures non conformes au format électronique requis. Au-delà du risque financier, une facture non conforme peut également remettre en cause le droit à déduction de la TVA pour votre client, ce qui fragilise votre relation commerciale.",
        },
        { type: 'h2', text: 'Une bonne nouvelle pour les PME : la déduction majorée à 120 %' },
        {
          type: 'p',
          text: "Pour encourager cette transition, le législateur a prévu une déduction fiscale pour investissement majorée à 120 % sur les frais engagés par les PME pour se mettre en conformité avec l'obligation de facturation électronique. Une opportunité à intégrer dans votre planification fiscale de l'année.",
        },
        { type: 'h2', text: 'Comment nous vous accompagnons' },
        {
          type: 'p',
          text: "Nous vérifions si votre activité est concernée, vous aidons à choisir et paramétrer un point d'accès Peppol compatible avec votre logiciel de facturation, et nous nous assurons que votre comptabilité intègre correctement ce nouveau flux. Contactez-nous pour faire le point sur votre situation.",
        },
      ],
    },
    ro: {
      slug: 'facturare-electronica-peppol-ce-se-schimba',
      title: 'Facturarea electronică Peppol: ce se schimbă pentru afacerea dumneavoastră',
      excerpt:
        'Din 1 ianuarie 2026, factura electronică prin Peppol este obligatorie între plătitorii de TVA belgieni. Iată ce înseamnă concret pentru dumneavoastră.',
      metaTitle: 'Facturare electronică Peppol: ce se schimbă | TMF Compta',
      metaDescription:
        'Peppol obligatoriu din 2026: cine este vizat, ce sancțiuni există, cum vă puneți în conformitate și cum beneficiați de deducerea majorată la 120 %.',
      body: [
        { type: 'h2', text: 'O obligație intrată în vigoare la 1 ianuarie 2026' },
        {
          type: 'p',
          text: 'Din 1 ianuarie 2026, orice întreprindere plătitoare de TVA în Belgia trebuie să emită și să primească facturile B2B în format electronic structurat, prin rețeaua Peppol. Factura pe hârtie scanată sau simplul fișier PDF trimis prin email nu mai sunt suficiente: ele nu îndeplinesc definiția legală a facturii electronice.',
        },
        { type: 'h2', text: 'Cine este vizat?' },
        {
          type: 'p',
          text: 'Toate întreprinderile plătitoare de TVA stabilite în Belgia sunt vizate pentru tranzacțiile cu alți plătitori de TVA belgieni (B2B). Operațiunile cu persoane fizice (B2C) și anumite operațiuni scutite rămân, deocamdată, în afara obligației.',
        },
        { type: 'h2', text: 'Cum funcționează rețeaua Peppol?' },
        {
          type: 'p',
          text: 'Peppol (Pan-European Public Procurement OnLine) este o rețea securizată care transmite facturile dumneavoastră într-un format structurat (UBL, conform standardului Peppol BIS) direct între sistemele contabile ale emitentului și destinatarului, fără reintroducere manuală. Practic, odată conectat, continuați să facturați din programul dumneavoastră obișnuit: acesta se ocupă de transmitere printr-un punct de acces Peppol.',
        },
        {
          type: 'ul',
          items: [
            'Emitere automată în formatul necesar',
            'Primire integrată direct în contabilitate',
            'Trasabilitate completă a trimiterii și primirii',
            'Mai puține erori de reintroducere și întârzieri la plată',
          ],
        },
        { type: 'h2', text: 'Ce sancțiuni există în caz de neconformitate?' },
        {
          type: 'p',
          text: 'Administrația fiscală poate sancționa emiterea de facturi neconforme cu formatul electronic cerut. Dincolo de riscul financiar, o factură neconformă poate pune în discuție dreptul de deducere a TVA pentru clientul dumneavoastră, ceea ce afectează relația comercială.',
        },
        { type: 'h2', text: 'O veste bună pentru IMM-uri: deducerea majorată la 120 %' },
        {
          type: 'p',
          text: 'Pentru a încuraja această tranziție, legiuitorul a prevăzut o deducere fiscală pentru investiții majorată la 120 % pentru cheltuielile făcute de IMM-uri pentru a se conforma obligației de facturare electronică. O oportunitate de inclus în planificarea dumneavoastră fiscală.',
        },
        { type: 'h2', text: 'Cum vă însoțim' },
        {
          type: 'p',
          text: 'Verificăm dacă activitatea dumneavoastră este vizată, vă ajutăm să alegeți și să configurați un punct de acces Peppol compatibil cu programul de facturare și ne asigurăm că, contabilitatea dumneavoastră integrează corect noul flux. Contactați-ne pentru a face un bilanț al situației dumneavoastră.',
        },
      ],
    },
  },
  {
    id: 'echeances-fiscales-belges',
    date: '2026-02-10',
    readingMinutes: 5,
    fr: {
      slug: 'echeances-fiscales-belges',
      title: 'Les échéances fiscales belges à ne pas manquer',
      excerpt:
        "TVA, impôt des personnes physiques, impôt des sociétés, comptes annuels : le calendrier des grandes échéances fiscales à connaître en Belgique.",
      metaTitle: 'Les échéances fiscales belges à connaître | TMF Compta',
      metaDescription:
        'Le calendrier des principales échéances fiscales belges : TVA, IPP, ISOC et comptes annuels, avec les conseils de TMF Compta pour ne rien manquer.',
      body: [
        { type: 'h2', text: 'La déclaration TVA : mensuelle ou trimestrielle' },
        {
          type: 'p',
          text: "Selon votre chiffre d'affaires et votre secteur d'activité, votre déclaration TVA est déposée mensuellement ou trimestriellement, avant le 20 du mois suivant la période concernée. Un acompte est parfois dû en décembre pour les assujettis mensuels.",
        },
        { type: 'h2', text: 'L’impôt des personnes physiques (IPP)' },
        {
          type: 'p',
          text: "La déclaration à l'impôt des personnes physiques concerne les indépendants en personne physique et les dirigeants qui perçoivent une rémunération. Elle se dépose généralement entre juin et octobre selon que vous déclarez en ligne (Tax-on-web) ou via un mandataire, avec un délai souvent prolongé pour les déclarations introduites par un professionnel.",
        },
        { type: 'h2', text: 'L’impôt des sociétés (ISOC)' },
        {
          type: 'p',
          text: "Les sociétés doivent déposer leur déclaration à l'impôt des sociétés dans les sept mois suivant la date de clôture de leur exercice comptable. Une société qui clôture au 31 décembre dispose ainsi, en règle générale, jusqu'à fin juillet de l'année suivante.",
        },
        { type: 'h2', text: 'Le dépôt des comptes annuels' },
        {
          type: 'p',
          text: "Les comptes annuels doivent être approuvés par l'assemblée générale dans les six mois de la clôture de l'exercice, puis déposés à la Banque nationale de Belgique dans le mois qui suit leur approbation.",
        },
        { type: 'h2', text: "Versements anticipés : un levier d'optimisation" },
        {
          type: 'p',
          text: "Pour les indépendants et les sociétés, effectuer des versements anticipés d'impôt aux dates fixées chaque année permet d'éviter une majoration d'impôt. C'est un point que nous vérifions systématiquement avec nos clients en cours d'exercice.",
        },
        { type: 'h2', text: 'Notre rôle : anticiper pour vous' },
        {
          type: 'p',
          text: 'Nous suivons l’ensemble de ces échéances pour chacun de nos clients et vous alertons suffisamment à l’avance pour réunir les documents nécessaires, sans stress de dernière minute.',
        },
      ],
    },
  },
  {
    id: 'devenir-independant-belgique',
    date: '2026-03-03',
    readingMinutes: 7,
    fr: {
      slug: 'devenir-independant-en-belgique',
      title: 'Devenir indépendant en Belgique : les étapes essentielles',
      excerpt:
        "De l'idée à la première facture : les démarches administratives, sociales et fiscales pour démarrer une activité indépendante en Belgique.",
      metaTitle: 'Devenir indépendant en Belgique : les étapes | TMF Compta',
      metaDescription:
        "Les étapes pour devenir indépendant en Belgique : guichet d'entreprises, caisse d'assurances sociales, TVA et choix comptable, expliqués simplement.",
      body: [
        { type: 'h2', text: 'Indépendant à titre principal ou complémentaire ?' },
        {
          type: 'p',
          text: "Avant toute démarche, il faut déterminer votre statut : indépendant à titre principal si c'est votre activité professionnelle unique ou majoritaire, ou à titre complémentaire si vous conservez un emploi salarié en parallèle. Ce choix influence vos cotisations sociales et certaines obligations.",
        },
        { type: 'h2', text: "L'inscription à la Banque-Carrefour des Entreprises" },
        {
          type: 'p',
          text: "Toute activité indépendante doit être inscrite à la Banque-Carrefour des Entreprises (BCE) via un guichet d'entreprises agréé. Cette inscription attribue un numéro d'entreprise, indispensable pour facturer et pour toutes vos démarches administratives.",
        },
        { type: 'h2', text: "L'affiliation à une caisse d'assurances sociales" },
        {
          type: 'p',
          text: "L'affiliation à une caisse d'assurances sociales est obligatoire avant le début de l'activité. Elle calcule et perçoit vos cotisations sociales, qui financent votre couverture santé, vos allocations familiales et votre future pension.",
        },
        { type: 'h2', text: 'L’identification à la TVA' },
        {
          type: 'p',
          text: "Selon votre activité, une identification à la TVA est généralement requise. Certaines activités bénéficient d'un régime particulier ou d'une exonération sous conditions de chiffre d'affaires, à examiner au cas par cas.",
        },
        { type: 'h2', text: 'Choisir son statut : personne physique ou société ?' },
        {
          type: 'p',
          text: "Démarrer en personne physique est plus simple et moins coûteux. Créer une société, comme une SRL, protège votre patrimoine personnel et peut devenir fiscalement avantageux au-delà d'un certain niveau de bénéfice. Ce choix mérite une analyse chiffrée de votre situation.",
        },
        { type: 'h2', text: 'Mettre en place sa comptabilité dès le premier jour' },
        {
          type: 'p',
          text: "Une comptabilité bien organisée dès le départ vous évite bien des difficultés : suivi de la TVA, des charges déductibles, des versements anticipés d'impôt et de votre rentabilité réelle. Nous accompagnons chaque nouvel indépendant dans cette mise en place, de l'inscription à la BCE jusqu'à la première déclaration.",
        },
        {
          type: 'quote',
          text: 'Un projet bien préparé se lance avec confiance : anticiper les démarches administratives, sociales et fiscales est le meilleur point de départ pour un indépendant.',
          cite: 'TMF Compta',
        },
      ],
    },
    ro: {
      slug: 'cum-devii-independent-in-belgia',
      title: 'Cum devii independent în Belgia: etapele esențiale',
      excerpt:
        'De la idee până la prima factură: demersurile administrative, sociale și fiscale pentru a începe o activitate independentă în Belgia.',
      metaTitle: 'Cum devii independent în Belgia, pas cu pas | TMF Compta',
      metaDescription:
        'Etapele pentru a deveni independent în Belgia: ghișeul de întreprinderi, casa de asigurări sociale, TVA și alegerea contabilului, explicate simplu.',
      body: [
        { type: 'h2', text: 'Independent cu titlu principal sau complementar?' },
        {
          type: 'p',
          text: 'Înainte de orice demers, trebuie stabilit statutul dumneavoastră: independent cu titlu principal, dacă este activitatea dumneavoastră profesională unică sau majoritară, sau cu titlu complementar, dacă păstrați un loc de muncă salariat în paralel. Această alegere influențează contribuțiile sociale și anumite obligații.',
        },
        { type: 'h2', text: 'Înscrierea la Banca-Răscruce a Întreprinderilor' },
        {
          type: 'p',
          text: 'Orice activitate independentă trebuie înscrisă la Banca-Răscruce a Întreprinderilor (BCE), printr-un ghișeu de întreprinderi autorizat. Această înscriere atribuie un număr de întreprindere, indispensabil pentru facturare și pentru toate demersurile administrative.',
        },
        { type: 'h2', text: 'Afilierea la o casă de asigurări sociale' },
        {
          type: 'p',
          text: 'Afilierea la o casă de asigurări sociale este obligatorie înainte de începerea activității. Aceasta calculează și percepe contribuțiile dumneavoastră sociale, care finanțează asigurarea de sănătate, alocațiile familiale și viitoarea dumneavoastră pensie.',
        },
        { type: 'h2', text: 'Identificarea la TVA' },
        {
          type: 'p',
          text: 'În funcție de activitate, identificarea la TVA este, în general, necesară. Anumite activități beneficiază de un regim special sau de o scutire, în funcție de cifra de afaceri, de analizat de la caz la caz.',
        },
        { type: 'h2', text: 'Ce statut alegeți: persoană fizică sau societate?' },
        {
          type: 'p',
          text: 'A porni ca persoană fizică este mai simplu și mai puțin costisitor. Înființarea unei societăți, precum o SRL, vă protejează patrimoniul personal și poate deveni avantajoasă fiscal peste un anumit nivel de profit. Această alegere merită o analiză concretă a situației dumneavoastră.',
        },
        { type: 'h2', text: 'Organizați-vă contabilitatea chiar din prima zi' },
        {
          type: 'p',
          text: 'O contabilitate bine organizată de la început vă scutește de multe dificultăți: urmărirea TVA, a cheltuielilor deductibile, a plăților anticipate de impozit și a rentabilității reale. Însoțim fiecare independent nou-înființat în această organizare, de la înscrierea la BCE până la prima declarație.',
        },
        {
          type: 'quote',
          text: 'Un proiect bine pregătit pornește cu încredere: anticiparea demersurilor administrative, sociale și fiscale este cel mai bun punct de plecare pentru un independent.',
          cite: 'TMF Compta',
        },
      ],
    },
  },
]

/** Recherche un article par sa clé stable (id). */
export function getPostById(id: string): Post | undefined {
  return POSTS.find((p) => p.id === id)
}
