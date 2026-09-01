/**
 * Les 9 services de TMF Compta.
 *
 * Les 7 premiers reprennent intégralement les textes du site actuel
 * (https://tmfcompta.be/fr/general-accounting), à deux corrections près :
 * le mot roumain « pentru » qui s'était glissé deux fois dans le texte
 * français source (services « Accompagnement de la personne » et
 * « Social ») a été remplacé par « pour ».
 *
 * Les services 8 (Peppol) et 9 (Contrôles fiscaux) sont nouveaux.
 *
 * La teinte (`hue`) suit l'ordre déjà réservé dans globals.css — ne pas
 * réordonner sans mettre à jour les commentaires du design system.
 */

import type { Service } from './types'

export const SERVICES: Service[] = [
  {
    id: 'tenue-comptabilite',
    hue: 'c1',
    icon: 'ledger',
    fr: {
      slug: 'tenue-de-comptabilite',
      title: 'Tenue de comptabilité',
      summary:
        "Une comptabilité tenue avec rigueur, de la saisie quotidienne aux états financiers, pour des chiffres fiables à tout moment.",
      description: [
        "Simplifiez la gestion de votre comptabilité grâce à notre service de tenue de comptabilité. Nous prenons en charge tous les aspects liés à votre comptabilité, des opérations quotidiennes à la préparation des états financiers. Avec notre expertise approfondie et notre souci du détail, nous veillons à ce que vos registres financiers soient précis, à jour et conformes aux normes comptables en vigueur.",
        "Vous pouvez ainsi vous concentrer sur le développement de votre entreprise en toute tranquillité d'esprit, sachant que vos données financières sont gérées de manière rigoureuse et professionnelle. Faites confiance à notre équipe compétente pour une tenue de comptabilité efficace et fiable.",
      ],
      bullets: [
        "Encodage et suivi des pièces comptables (achats, ventes, notes de frais)",
        "Déclarations TVA périodiques, mensuelles ou trimestrielles",
        "Tenue des journaux et du grand livre",
        "Rapprochements bancaires réguliers",
        "Situations comptables intermédiaires sur demande",
        "Préparation du bilan et du compte de résultats",
        "Suivi des immobilisations et des amortissements",
      ],
      metaTitle: "Tenue de comptabilité à Zaventem, TVA incluse | TMF Compta",
      metaDescription:
        "Tenue de comptabilité complète pour indépendants et sociétés à Zaventem : encodage, TVA, rapprochements bancaires et états financiers fiables et à jour.",
    },
    ro: {
      slug: 'tinerea-contabilitatii',
      title: 'Ținerea contabilității',
      summary:
        "O contabilitate ținută cu rigurozitate, de la înregistrarea zilnică până la situațiile financiare, pentru cifre pe care vă puteți baza oricând.",
      description: [
        "Simplificați gestionarea contabilității afacerii dumneavoastră cu serviciul nostru de ținere a contabilității. Preluăm toate aspectele contabile, de la operațiunile zilnice până la pregătirea situațiilor financiare. Datorită expertizei noastre aprofundate și atenției la detalii, ne asigurăm că registrele dumneavoastră financiare sunt exacte, la zi și conforme cu normele contabile în vigoare.",
        "Vă puteți concentra astfel pe dezvoltarea afacerii cu liniște deplină, știind că datele dumneavoastră financiare sunt gestionate riguros și profesionist. Aveți încredere în echipa noastră competentă pentru o contabilitate curentă eficientă și de încredere.",
      ],
      bullets: [
        "Înregistrarea și urmărirea documentelor contabile (achiziții, vânzări, note de cheltuieli)",
        "Declarații TVA periodice, lunare sau trimestriale",
        "Ținerea jurnalelor și a registrului general",
        "Reconcilieri bancare regulate",
        "Situații contabile intermediare, la cerere",
        "Pregătirea bilanțului și a contului de rezultate",
        "Urmărirea imobilizărilor și a amortizărilor",
      ],
      metaTitle: "Ținerea contabilității în Zaventem, TVA inclusă | TMF Compta",
      metaDescription:
        "Contabilitate curentă completă pentru independenți și societăți în Zaventem: înregistrare, TVA, reconcilieri bancare și situații financiare la zi.",
    },
  },
  {
    id: 'conseil-fiscal',
    hue: 'c2',
    icon: 'percent',
    fr: {
      slug: 'conseil-fiscal',
      title: 'Conseil fiscal',
      summary:
        "Une expertise fiscale solide pour optimiser légalement votre charge d'impôt et sécuriser chacune de vos décisions.",
      description: [
        "Obtenez une expertise fiscale solide grâce à notre service de conseil fiscal. Notre équipe hautement qualifiée vous accompagne dans la gestion optimale de vos obligations fiscales. Nous vous aidons à naviguer dans la complexité des lois fiscales, à identifier les opportunités d'optimisation et à minimiser les risques.",
        "Que vous ayez besoin de conseils en matière de déclarations fiscales, de planification successorale ou de structuration fiscale, nous sommes là pour vous fournir des solutions adaptées à votre situation spécifique. Faites confiance à notre savoir-faire en matière de conseil fiscal pour maximiser vos avantages fiscaux et assurer une conformité optimale.",
      ],
      bullets: [
        "Analyse de votre situation fiscale et recommandations personnalisées",
        "Optimisation fiscale légale (structure, rémunération, investissements)",
        "Conseil en planification successorale",
        "Structuration fiscale de votre activité",
        "Veille sur les évolutions de la législation fiscale belge",
        "Simulations d'impact avant toute décision importante",
        "Coordination avec vos autres conseils (notaire, avocat)",
      ],
      metaTitle: "Conseil fiscal à Zaventem | Optimisation, TMF Compta",
      metaDescription:
        "Conseil fiscal sur mesure à Zaventem : optimisation fiscale légale, planification successorale et structuration adaptées à votre situation d'indépendant.",
    },
    ro: {
      slug: 'consultanta-fiscala',
      title: 'Consultanță fiscală',
      summary:
        "O expertiză fiscală solidă pentru a vă optimiza legal sarcina fiscală și a securiza fiecare decizie importantă.",
      description: [
        "Beneficiați de o expertiză fiscală solidă prin serviciul nostru de consultanță fiscală. Echipa noastră înalt calificată vă însoțește în gestionarea optimă a obligațiilor fiscale. Vă ajutăm să vă orientați în complexitatea legislației fiscale, să identificați oportunitățile de optimizare și să reduceți riscurile.",
        "Fie că aveți nevoie de sfaturi privind declarațiile fiscale, planificarea succesorală sau structurarea fiscală a activității, suntem alături de dumneavoastră cu soluții adaptate situației dumneavoastră specifice. Aveți încredere în expertiza noastră fiscală pentru a vă maximiza avantajele fiscale și a asigura o conformitate optimă.",
      ],
      bullets: [
        "Analiza situației dumneavoastră fiscale și recomandări personalizate",
        "Optimizare fiscală legală (structură, remunerare, investiții)",
        "Consultanță în planificare succesorală",
        "Structurarea fiscală a activității dumneavoastră",
        "Monitorizarea evoluțiilor legislației fiscale belgiene",
        "Simulări de impact înainte de orice decizie importantă",
        "Coordonare cu ceilalți consilieri ai dumneavoastră (notar, avocat)",
      ],
      metaTitle: "Consultanță fiscală în Zaventem | Optimizare, TMF Compta",
      metaDescription:
        "Consultanță fiscală personalizată în Zaventem: optimizare fiscală legală, planificare succesorală și structurare adaptate situației dumneavoastră.",
    },
  },
  {
    id: 'creation-entreprise',
    hue: 'c3',
    icon: 'rocket',
    fr: {
      slug: 'conseil-creation-entreprise',
      title: "Conseil en création d'entreprise",
      summary:
        "Un accompagnement complet, de l'idée à l'immatriculation, pour démarrer votre activité sur des bases solides.",
      description: [
        "Créez votre entreprise en toute confiance avec notre service de conseil spécialisé en création d'entreprise. Avec une grande expérience, nous vous accompagnons dans toutes les étapes de votre projet entrepreneurial, de la planification initiale à l'établissement des structures juridiques.",
        "Notre équipe expérimentée met à votre disposition son expertise approfondie pour vous aider à réaliser vos ambitions entrepreneuriales et à bâtir une entreprise solide et prospère.",
      ],
      bullets: [
        "Choix de la forme juridique la mieux adaptée (indépendant, SRL…)",
        "Élaboration du plan financier requis pour la constitution",
        "Mise en relation avec notaire et guichet d'entreprises",
        "Inscription à la Banque-Carrefour des Entreprises (BCE) et à la TVA",
        "Mise en place de la comptabilité dès le premier jour",
        "Conseils sur le statut social du dirigeant",
        "Accompagnement lors des premières décisions stratégiques",
      ],
      metaTitle: "Création de SRL et d'entreprise à Zaventem | TMF Compta",
      metaDescription:
        "Créer votre entreprise à Zaventem : forme juridique, plan financier, immatriculation BCE et TVA. Un accompagnement complet dès le premier jour.",
    },
    ro: {
      slug: 'infiintare-firma',
      title: 'Consultanță în înființarea firmei',
      summary:
        "Un sprijin complet, de la idee până la înmatriculare, pentru a vă porni activitatea pe baze solide.",
      description: [
        "Înființați-vă firma cu deplină încredere alături de serviciul nostru specializat de consultanță în înființarea de firme. Cu o experiență vastă, vă însoțim în toate etapele proiectului dumneavoastră antreprenorial, de la planificarea inițială până la stabilirea structurilor juridice.",
        "Echipa noastră experimentată vă pune la dispoziție expertiza sa aprofundată pentru a vă ajuta să vă realizați ambițiile antreprenoriale și să construiți o afacere solidă și prosperă.",
      ],
      bullets: [
        "Alegerea formei juridice celei mai potrivite (independent, SRL…)",
        "Elaborarea planului financiar necesar constituirii societății",
        "Punerea în legătură cu notarul și ghișeul de întreprinderi",
        "Înscrierea la Banca-Răscruce a Întreprinderilor (BCE) și la TVA",
        "Punerea în funcțiune a contabilității chiar din prima zi",
        "Consiliere privind statutul social al administratorului",
        "Însoțire în primele decizii strategice",
      ],
      metaTitle: "Consultanță înființare firmă și SRL, Zaventem | TMF Compta",
      metaDescription:
        "Înființați-vă firma în Zaventem: alegerea formei juridice, plan financiar, înmatriculare la BCE și la TVA. Un sprijin complet încă din prima zi de activitate.",
    },
  },
  {
    id: 'aide-gestion',
    hue: 'c4',
    icon: 'compass',
    fr: {
      slug: 'aide-a-la-gestion',
      title: 'Aide à la gestion',
      summary: "Un partenaire de gestion au quotidien, pour transformer vos chiffres en décisions concrètes.",
      description: [
        "Optimisez la gestion de votre entreprise grâce à notre service d'aide à la gestion. Nous travaillons en étroite collaboration avec vous pour comprendre vos objectifs, identifier les opportunités d'amélioration et mettre en place des stratégies efficaces.",
        "Que ce soit pour la gestion financière, la planification budgétaire, l'optimisation des processus ou la prise de décision éclairée, notre équipe compétente et expérimentée est là pour vous fournir les conseils et les outils dont vous avez besoin. Libérez votre potentiel de croissance avec notre expertise en gestion d'entreprise.",
      ],
      bullets: [
        "Tableaux de bord et indicateurs de suivi financier",
        "Planification et suivi budgétaire",
        "Analyse de rentabilité par activité ou par projet",
        "Optimisation des processus internes",
        "Aide à la prise de décision (investissement, recrutement, prix)",
        "Prévisions de trésorerie",
        "Préparation de dossiers pour vos partenaires financiers (banque, investisseurs)",
      ],
      metaTitle: "Aide à la gestion d'entreprise à Zaventem | TMF Compta",
      metaDescription:
        "Un accompagnement en gestion à Zaventem : tableaux de bord, budgets, trésorerie et aide à la décision pour piloter votre entreprise sereinement.",
    },
    ro: {
      slug: 'asistenta-in-gestiune',
      title: 'Asistență în gestiune',
      summary: "Un partener de gestiune în activitatea zilnică, care transformă cifrele în decizii concrete.",
      description: [
        "Optimizați gestiunea afacerii dumneavoastră cu serviciul nostru de asistență în gestiune. Colaborăm îndeaproape cu dumneavoastră pentru a vă înțelege obiectivele, a identifica oportunitățile de îmbunătățire și a pune în aplicare strategii eficiente.",
        "Fie că este vorba de gestiune financiară, planificare bugetară, optimizarea proceselor sau luarea unor decizii informate, echipa noastră competentă și experimentată vă oferă sfaturile și instrumentele de care aveți nevoie. Valorificați-vă potențialul de creștere cu expertiza noastră în gestiunea afacerilor.",
      ],
      bullets: [
        "Tablouri de bord și indicatori de urmărire financiară",
        "Planificare și urmărire bugetară",
        "Analiza rentabilității pe activitate sau pe proiect",
        "Optimizarea proceselor interne",
        "Sprijin în luarea deciziilor (investiții, angajări, prețuri)",
        "Previziuni de trezorerie",
        "Pregătirea dosarelor pentru partenerii dumneavoastră financiari (bancă, investitori)",
      ],
      metaTitle: "Asistență în gestiunea afacerii, Zaventem | TMF Compta",
      metaDescription:
        "Asistență în gestiune la Zaventem: tablouri de bord, bugete, trezorerie și sprijin decizional pentru a vă conduce afacerea cu încredere, zi de zi.",
    },
  },
  {
    id: 'social',
    hue: 'c5',
    icon: 'users',
    fr: {
      slug: 'social',
      title: 'Social',
      summary: "Un repère fiable pour vos obligations sociales et celles de vos employés, de l'embauche à la retraite.",
      description: [
        "Nos experts comptables sont là pour vous accompagner dans la compréhension des règles et réglementations relatives aux régimes de sécurité sociale, tels que les régimes de retraite et les régimes d'assurance-maladie.",
        "De plus, ils sont en mesure de vous éclairer sur les obligations légales liées à l'embauche et à la gestion des employés. Faites appel à nos services pour bénéficier de leur expertise et vous assurer d'une gestion efficace et conforme à toutes les exigences.",
      ],
      bullets: [
        "Explication des régimes de sécurité sociale (indépendants et salariés)",
        "Obligations légales liées à l'embauche d'un premier employé",
        "Suivi des cotisations sociales",
        "Coordination avec votre secrétariat social",
        "Conseils sur les régimes de pension complémentaire",
        "Information sur les couvertures d'assurance-maladie",
        "Veille sur les évolutions de la réglementation sociale belge",
      ],
      metaTitle: "Volet social pour indépendants et PME | TMF Compta",
      metaDescription:
        "Accompagnement social à Zaventem : sécurité sociale, embauche, cotisations et pension complémentaire, pour rester en règle en toute sérénité.",
    },
    ro: {
      slug: 'secretariat-social',
      title: 'Consiliere socială',
      summary:
        "Un reper de încredere pentru obligațiile sociale ale dumneavoastră și ale angajaților, de la angajare până la pensie.",
      description: [
        "Experții noștri contabili vă însoțesc în înțelegerea regulilor și reglementărilor privind regimurile de securitate socială, precum regimurile de pensii și cele de asigurări de sănătate.",
        "În plus, aceștia vă pot lămuri cu privire la obligațiile legale legate de angajare și de gestionarea personalului. Apelați la serviciile noastre pentru a beneficia de expertiza lor și pentru a vă asigura o gestiune eficientă și conformă tuturor cerințelor.",
      ],
      bullets: [
        "Explicarea regimurilor de securitate socială (independenți și salariați)",
        "Obligații legale legate de angajarea primului salariat",
        "Urmărirea contribuțiilor sociale",
        "Coordonare cu secretariatul dumneavoastră social",
        "Consiliere privind regimurile de pensie complementară",
        "Informații despre acoperirile de asigurare de sănătate",
        "Monitorizarea evoluțiilor reglementării sociale belgiene",
      ],
      metaTitle: "Consiliere socială pentru independenți și PME | TMF Compta",
      metaDescription:
        "Consiliere socială la Zaventem: securitate socială, angajare, contribuții sociale și pensie complementară, pentru a fi mereu în regulă cu obligațiile.",
    },
  },
  {
    id: 'accompagnement-personne',
    hue: 'c6',
    icon: 'handshake',
    fr: {
      slug: 'accompagnement-de-la-personne',
      title: 'Accompagnement de la personne',
      summary: "Un accompagnement personnalisé pour construire, au-delà de l'entreprise, votre avenir financier.",
      description: [
        "Nous offrons un accompagnement personnalisé pour vous aider à atteindre vos objectifs financiers et professionnels. Notre approche centrée sur la personne met l'accent sur le développement de vos compétences, la gestion de carrière et la réalisation de votre plein potentiel.",
        "Que vous ayez besoin de conseils en matière de gestion financière personnelle, de planification de la retraite ou de conseils pour les investissements, notre équipe dédiée est là pour vous guider à chaque étape du chemin. Profitez d'un accompagnement bienveillant et expert pour bâtir un avenir financier solide et épanouissant.",
      ],
      bullets: [
        "Conseils en gestion financière personnelle",
        "Planification de la retraite et de la pension complémentaire",
        "Éclairage sur les options d'investissement",
        "Accompagnement lors des transitions professionnelles",
        "Conseils en gestion de carrière pour dirigeants",
        "Aide à la structuration de votre patrimoine",
        "Un interlocuteur unique et disponible sur la durée",
      ],
      metaTitle: "Accompagnement de la personne à Zaventem | TMF Compta",
      metaDescription:
        "Un accompagnement personnalisé à Zaventem pour vos objectifs financiers et professionnels : retraite, investissements et gestion de carrière.",
    },
    ro: {
      slug: 'consiliere-personala',
      title: 'Consiliere personală',
      summary: "Un sprijin personalizat pentru a vă construi, dincolo de afacere, viitorul financiar.",
      description: [
        "Oferim o consiliere personalizată pentru a vă ajuta să vă atingeți obiectivele financiare și profesionale. Abordarea noastră centrată pe persoană pune accentul pe dezvoltarea competențelor dumneavoastră, gestionarea carierei și valorificarea întregului potențial.",
        "Fie că aveți nevoie de sfaturi privind gestiunea financiară personală, planificarea pensionării sau opțiunile de investiții, echipa noastră dedicată vă ghidează la fiecare pas. Beneficiați de o consiliere atentă și expertă pentru a construi un viitor financiar solid.",
      ],
      bullets: [
        "Consiliere în gestiunea financiară personală",
        "Planificarea pensionării și a pensiei complementare",
        "Lămuriri privind opțiunile de investiții",
        "Sprijin în perioadele de tranziție profesională",
        "Consiliere în gestionarea carierei pentru administratori",
        "Sprijin în structurarea patrimoniului dumneavoastră",
        "Un singur interlocutor, disponibil pe termen lung",
      ],
      metaTitle: "Consiliere personală și patrimonială, Zaventem | TMF Compta",
      metaDescription:
        "Consiliere personalizată în Zaventem pentru obiectivele dumneavoastră financiare și profesionale: pensionare, investiții, carieră și gestiune patrimonială.",
    },
  },
  {
    id: 'missions-speciales',
    hue: 'c7',
    icon: 'shield',
    fr: {
      slug: 'missions-speciales',
      title: 'Missions spéciales',
      summary: "Une expertise comptable pointue pour vos dossiers les plus exigeants, audits et évaluations compris.",
      description: [
        "Nous excellons dans la réalisation de missions spéciales qui exigent une expertise comptable pointue. Que ce soit pour des audits approfondis, des évaluations financières précises ou des conseils en gestion fiscale, notre équipe expérimentée est prête à relever tous les défis.",
        "Avec une approche personnalisée et une attention méticuleuse aux détails, nous nous engageons à fournir des solutions sur mesure qui répondent aux besoins spécifiques de nos clients. Faites appel à notre savoir-faire pour des missions spéciales réussies.",
      ],
      bullets: [
        "Audits comptables et financiers approfondis",
        "Évaluations d'entreprise (cession, transmission, reprise)",
        "Missions de due diligence",
        "Conseils lors de restructurations ou fusions",
        "Rapports spéciaux à destination de tiers (banques, actionnaires)",
        "Analyse de dossiers complexes ou litigieux",
        "Accompagnement sur mesure selon la nature du dossier",
      ],
      metaTitle: "Missions spéciales et audits à Zaventem | TMF Compta",
      metaDescription:
        "Missions comptables sur mesure à Zaventem : audits financiers, évaluations d'entreprise et due diligence menés par une équipe expérimentée et rigoureuse.",
    },
    ro: {
      slug: 'misiuni-speciale',
      title: 'Misiuni speciale',
      summary: "O expertiză contabilă avansată pentru dosarele dumneavoastră cele mai exigente, audituri și evaluări incluse.",
      description: [
        "Excelăm în realizarea misiunilor speciale care necesită o expertiză contabilă avansată. Fie că este vorba de audituri aprofundate, evaluări financiare precise sau consultanță în gestiune fiscală, echipa noastră experimentată este pregătită să răspundă oricărei provocări.",
        "Printr-o abordare personalizată și o atenție meticuloasă la detalii, ne angajăm să oferim soluții adaptate nevoilor specifice ale clienților noștri. Apelați la expertiza noastră pentru misiuni speciale duse la bun sfârșit.",
      ],
      bullets: [
        "Audituri contabile și financiare aprofundate",
        "Evaluări de întreprindere (cesiune, transmitere, preluare)",
        "Misiuni de due diligence",
        "Consultanță în cadrul restructurărilor sau fuziunilor",
        "Rapoarte speciale destinate terților (bănci, acționari)",
        "Analiza dosarelor complexe sau litigioase",
        "Sprijin personalizat, adaptat naturii dosarului",
      ],
      metaTitle: "Misiuni speciale și audituri, Zaventem | TMF Compta",
      metaDescription:
        "Misiuni contabile personalizate în Zaventem: audituri financiare, evaluări de întreprindere și due diligence, realizate de o echipă experimentată.",
    },
  },
  {
    id: 'peppol',
    hue: 'c8',
    icon: 'send',
    fr: {
      slug: 'facturation-electronique-peppol',
      title: 'Facturation électronique Peppol',
      summary:
        "La facturation électronique via Peppol est obligatoire entre assujettis belges depuis le 1ᵉʳ janvier 2026 — nous vous mettons en conformité.",
      description: [
        "Depuis le 1ᵉʳ janvier 2026, la facturation électronique structurée via le réseau Peppol est obligatoire entre entreprises assujetties à la TVA en Belgique. La facture papier ou le simple PDF ne suffisent plus pour vos transactions B2B : la loi impose l'émission et la réception de factures électroniques conformes au format Peppol BIS, sous peine de sanctions.",
        "Nous vous accompagnons dans cette transition : choix et paramétrage d'un accès Peppol adapté à votre activité, intégration avec votre logiciel de facturation ou de comptabilité, et vérification de votre conformité. Bonne nouvelle pour les PME qui investissent dans un système de facturation électronique : la déduction fiscale pour investissement est majorée à 120 % sur les frais liés à cette mise en conformité, une opportunité à ne pas laisser passer.",
      ],
      bullets: [
        "Vérification de votre obligation Peppol selon votre statut TVA",
        "Choix et activation d'un point d'accès Peppol adapté",
        "Paramétrage de vos logiciels de facturation et de comptabilité",
        "Intégration du flux Peppol dans votre gestion quotidienne",
        "Information sur les sanctions encourues en cas de non-conformité",
        "Optimisation de la déduction majorée à 120 % pour les PME",
        "Assistance continue en cas de question ou d'incident technique",
      ],
      metaTitle: "Facturation électronique Peppol à Zaventem | TMF Compta",
      metaDescription:
        "Facturation électronique Peppol obligatoire depuis 2026 : mise en conformité, choix de l'outil et déduction fiscale majorée à 120 % pour les PME.",
    },
    ro: {
      slug: 'facturare-electronica-peppol',
      title: 'Facturare electronică Peppol',
      summary:
        "Facturarea electronică prin Peppol este obligatorie între plătitori de TVA belgieni din 1 ianuarie 2026 — vă aducem la conformitate.",
      description: [
        "Începând cu 1 ianuarie 2026, facturarea electronică structurată prin rețeaua Peppol este obligatorie între întreprinderile plătitoare de TVA din Belgia. Factura pe hârtie sau simplul PDF nu mai sunt suficiente pentru tranzacțiile dumneavoastră B2B: legea impune emiterea și primirea facturilor electronice conforme cu formatul Peppol BIS, sub sancțiunea unor penalități.",
        "Vă însoțim în această tranziție: alegerea și configurarea unui acces Peppol adaptat activității dumneavoastră, integrarea cu programul de facturare sau de contabilitate și verificarea conformității dumneavoastră. O veste bună pentru IMM-urile care investesc într-un sistem de facturare electronică: deducerea fiscală pentru investiții este majorată la 120 % pentru cheltuielile legate de această conformare — o oportunitate de nepierdut.",
      ],
      bullets: [
        "Verificarea obligației dumneavoastră Peppol în funcție de statutul TVA",
        "Alegerea și activarea unui punct de acces Peppol adaptat",
        "Configurarea programelor de facturare și de contabilitate",
        "Integrarea fluxului Peppol în gestiunea zilnică",
        "Informații privind sancțiunile în caz de neconformitate",
        "Optimizarea deducerii majorate la 120 % pentru IMM-uri",
        "Asistență continuă pentru orice întrebare sau incident tehnic",
      ],
      metaTitle: "Facturare electronică Peppol în Zaventem | TMF Compta",
      metaDescription:
        "Facturare electronică Peppol obligatorie din 2026: conformitate, alegerea instrumentului potrivit și deducere fiscală majorată la 120 % pentru IMM-uri.",
    },
  },
  {
    id: 'controles-fiscaux',
    hue: 'c9',
    icon: 'search-check',
    fr: {
      slug: 'controles-fiscaux',
      title: 'Contrôles fiscaux',
      summary:
        "Une assistance déterminée avant, pendant et après un contrôle fiscal, pour défendre vos intérêts avec méthode.",
      description: [
        "Un contrôle fiscal ne s'improvise pas. Nous vous préparons en amont en vérifiant la cohérence de vos dossiers, vous assistons pendant les échanges avec l'administration et défendons votre position avec les arguments juridiques et comptables appropriés, que le contrôle porte sur la TVA, l'impôt des personnes physiques ou l'impôt des sociétés.",
        "Notre connaissance des procédures fiscales belges et notre présence à vos côtés vous permettent d'aborder un contrôle avec sérénité plutôt qu'avec inquiétude. En cas de désaccord avec l'administration, nous vous accompagnons également dans les phases de réclamation et de recours.",
      ],
      bullets: [
        "Préparation et vérification de vos dossiers avant contrôle",
        "Présence et représentation lors des échanges avec l'administration fiscale",
        "Défense argumentée de votre position (TVA, IPP, ISOC)",
        "Analyse des avis de rectification reçus",
        "Accompagnement dans les procédures de réclamation",
        "Négociation de plans d'apurement si nécessaire",
        "Conseils pour prévenir un futur contrôle",
      ],
      metaTitle: "Assistance contrôle fiscal à Zaventem | TMF Compta",
      metaDescription:
        "Assistance et défense lors de contrôles fiscaux à Zaventem : préparation, représentation face à l'administration et gestion des réclamations.",
    },
    ro: {
      slug: 'controale-fiscale',
      title: 'Controale fiscale',
      summary:
        "O asistență fermă înainte, în timpul și după un control fiscal, pentru a vă apăra interesele cu metodă.",
      description: [
        "Un control fiscal nu se improvizează. Vă pregătim din timp verificând coerența dosarelor dumneavoastră, vă asistăm în timpul discuțiilor cu administrația și vă apărăm poziția cu argumentele juridice și contabile potrivite, indiferent dacă este vorba de TVA, impozitul pe persoane fizice sau impozitul pe societăți.",
        "Cunoașterea noastră a procedurilor fiscale belgiene și prezența noastră alături de dumneavoastră vă permit să abordați un control cu liniște, nu cu îngrijorare. În caz de dezacord cu administrația, vă însoțim și în etapele de contestație și de recurs.",
      ],
      bullets: [
        "Pregătirea și verificarea dosarelor înainte de control",
        "Prezență și reprezentare în discuțiile cu administrația fiscală",
        "Apărarea argumentată a poziției dumneavoastră (TVA, IPP, ISOC)",
        "Analiza avizelor de rectificare primite",
        "Sprijin în procedurile de contestație",
        "Negocierea unor planuri de eșalonare, dacă este necesar",
        "Sfaturi pentru prevenirea unui viitor control",
      ],
      metaTitle: "Asistență la control fiscal în Zaventem | TMF Compta",
      metaDescription:
        "Asistență și apărare în cazul controalelor fiscale la Zaventem: pregătire, reprezentare în fața administrației și gestionarea contestațiilor.",
    },
  },
]

/** Recherche un service par sa clé stable (id). */
export function getServiceById(id: string): Service | undefined {
  return SERVICES.find((s) => s.id === id)
}

/**
 * Regroupement des services par moment de la vie de l'entreprise.
 *
 * Source unique : la page « Nos services » s'en sert pour ses trois blocs,
 * et chaque page de service pour proposer des services voisins. Les voisins
 * sont ainsi thématiques — un service de création renvoie vers la création —
 * là où un simple décalage d'index renvoyait vers le service suivant du
 * tableau, sans rapport de sujet.
 */
export const SERVICE_GROUPS = {
  creation: ['creation-entreprise', 'tenue-comptabilite'],
  gestion: ['aide-gestion', 'conseil-fiscal', 'social', 'peppol'],
  expansion: ['missions-speciales', 'controles-fiscaux', 'accompagnement-personne'],
} as const satisfies Record<string, readonly string[]>

/**
 * Services voisins de `id` : d'abord ceux de son groupe, complétés au besoin
 * par les suivants dans l'ordre du site pour toujours en proposer `count`.
 */
export function relatedServices(id: string, count = 3): Service[] {
  const group = Object.values(SERVICE_GROUPS).find((ids) => ids.includes(id as never)) ?? []
  const ordered = [
    ...group.filter((other) => other !== id),
    ...SERVICES.map((s) => s.id).filter((other) => other !== id && !group.includes(other as never)),
  ]
  return ordered
    .slice(0, count)
    .map((serviceId) => getServiceById(serviceId))
    .filter((service): service is Service => service !== undefined)
}
