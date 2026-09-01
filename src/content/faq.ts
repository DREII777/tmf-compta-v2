/**
 * FAQ — 12 questions, en FR et en RO, couvrant les sujets attendus :
 * TVA, Peppol, changement de comptable, accompagnement en roumain,
 * indépendant vs société, honoraires, délais, contrôle fiscal, comptes
 * annuels, création de SRL, documents à fournir, prise de rendez-vous.
 */

import type { FaqItem } from './types'

export const FAQ: FaqItem[] = [
  {
    id: 'tva-frequence',
    category: 'tva',
    fr: {
      question: 'À quelle fréquence dois-je déposer ma déclaration TVA ?',
      answer:
        "La périodicité dépend de votre chiffre d'affaires : dépôt mensuel au-delà d'un certain seuil de chiffre d'affaires annuel, ou pour certains secteurs sensibles, trimestriel en dessous de ce seuil sous conditions. Nous déterminons avec vous la périodicité applicable et prenons en charge la préparation et le dépôt de chaque déclaration dans les délais légaux.",
    },
    ro: {
      question: 'Cât de des trebuie să depun declarația de TVA?',
      answer:
        "Periodicitatea depinde de cifra de afaceri anuală: depunere lunară peste un anumit prag, sau pentru sectoare sensibile, trimestrială sub acest prag, în anumite condiții. Stabilim împreună periodicitatea aplicabilă situației dumneavoastră și ne ocupăm de pregătirea și depunerea fiecărei declarații în termenele legale.",
    },
  },
  {
    id: 'peppol-obligation',
    category: 'peppol',
    fr: {
      question: 'La facturation électronique Peppol est-elle vraiment obligatoire pour moi ?',
      answer:
        "Oui, si vous êtes assujetti à la TVA en Belgique et que vous facturez d'autres assujettis belges (B2B) : depuis le 1ᵉʳ janvier 2026, l'émission et la réception de factures électroniques structurées via Peppol sont obligatoires, sous peine de sanctions. Nous vérifions votre situation et mettons en place l'outil adapté.",
    },
    ro: {
      question: 'Facturarea electronică Peppol este chiar obligatorie pentru mine?',
      answer:
        "Da, dacă sunteți plătitor de TVA în Belgia și facturați către alți plătitori de TVA belgieni (B2B): din 1 ianuarie 2026, emiterea și primirea facturilor electronice structurate prin Peppol sunt obligatorii, sub sancțiunea unor penalități. Vă verificăm situația și instalăm instrumentul potrivit.",
    },
  },
  {
    id: 'changement-comptable',
    category: 'changement',
    fr: {
      question: 'Comment se passe un changement de comptable en cours d’année ?',
      answer:
        "Le changement de comptable est plus simple qu'on ne le pense : nous nous chargeons du contact avec votre comptable actuel pour récupérer les dossiers, données comptables et mandats nécessaires, sans interruption de service. Vous pouvez changer de comptable à tout moment de l'année, même en cours d'exercice.",
    },
    ro: {
      question: 'Cum decurge o schimbare de contabil în cursul anului?',
      answer:
        "Schimbarea contabilului este mai simplă decât pare: preluăm legătura cu contabilul dumneavoastră actual pentru a recupera dosarele, datele contabile și mandatele necesare, fără întrerupere de serviciu. Puteți schimba contabilul în orice moment al anului, chiar și în cursul exercițiului financiar.",
    },
  },
  {
    id: 'accompagnement-roumain',
    category: 'roumain',
    fr: {
      question: 'Puis-je être suivi en roumain ?',
      answer:
        "Oui. Notre équipe échange couramment en roumain, à l'oral comme à l'écrit, pour tous vos échanges et documents comptables. De nombreux entrepreneurs roumains installés en Belgique nous font confiance depuis 2014, comme en témoignent nos avis clients.",
    },
    ro: {
      question: 'Pot fi asistat în limba română?',
      answer:
        "Da. Echipa noastră comunică fluent în limba română, atât verbal cât și în scris, pentru toate schimburile și documentele contabile. Numeroși antreprenori vorbitori de română stabiliți în Belgia ne acordă încrederea lor din 2014, așa cum arată recenziile clienților noștri.",
    },
  },
  {
    id: 'independant-ou-societe',
    category: 'statut',
    fr: {
      question: 'Dois-je démarrer en tant qu’indépendant ou créer directement une société ?',
      answer:
        "Cela dépend de votre activité, de vos revenus prévisionnels et de votre tolérance au risque. L'indépendant en personne physique est plus simple et moins coûteux à démarrer ; la société (SRL) protège votre patrimoine personnel et peut être plus avantageuse fiscalement au-delà d'un certain niveau de bénéfice. Nous analysons votre situation pour vous orienter vers le statut le plus adapté.",
    },
    ro: {
      question: 'Ar trebui să pornesc ca independent sau să înființez direct o societate?',
      answer:
        "Depinde de activitatea dumneavoastră, de veniturile estimate și de toleranța la risc. Statutul de independent, persoană fizică, este mai simplu și mai puțin costisitor la pornire; societatea (SRL) vă protejează patrimoniul personal și poate fi mai avantajoasă fiscal peste un anumit nivel de profit. Analizăm situația dumneavoastră pentru a vă orienta spre statutul cel mai potrivit.",
    },
  },
  {
    id: 'honoraires',
    category: 'honoraires',
    fr: {
      question: 'Comment sont fixés vos honoraires ?',
      answer:
        "Nos honoraires sont établis sur devis, en fonction du volume de votre activité, de la complexité de votre dossier et des services choisis (comptabilité, TVA, fiscal, social…). Nous vous proposons une offre claire et transparente avant tout engagement, sans frais cachés.",
    },
    ro: {
      question: 'Cum sunt stabilite onorariile dumneavoastră?',
      answer:
        "Onorariile noastre sunt stabilite pe bază de ofertă, în funcție de volumul activității dumneavoastră, de complexitatea dosarului și de serviciile alese (contabilitate, TVA, fiscal, social…). Vă propunem o ofertă clară și transparentă înainte de orice angajament, fără costuri ascunse.",
    },
  },
  {
    id: 'delais-fiscaux',
    category: 'delais',
    fr: {
      question: 'Quels sont les délais habituels pour mes déclarations fiscales ?',
      answer:
        "Les échéances varient selon le type de déclaration : la déclaration à l'impôt des personnes physiques (IPP) se dépose généralement entre juin et octobre, la déclaration à l'impôt des sociétés (ISOC) dans les sept mois suivant la clôture de l'exercice, et les déclarations TVA chaque mois ou trimestre selon votre périodicité. Nous suivons ces échéances pour vous et vous alertons à temps.",
    },
    ro: {
      question: 'Care sunt termenele obișnuite pentru declarațiile mele fiscale?',
      answer:
        "Termenele variază în funcție de tipul declarației: declarația privind impozitul pe persoane fizice (IPP) se depune, în general, între iunie și octombrie, declarația privind impozitul pe societăți (ISOC) în cele șapte luni de la închiderea exercițiului financiar, iar declarațiile de TVA lunar sau trimestrial, în funcție de periodicitatea dumneavoastră. Urmărim aceste termene în locul dumneavoastră și vă alertăm din timp.",
    },
  },
  {
    id: 'avis-controle-fiscal',
    category: 'controle',
    fr: {
      question: 'Que faire si je reçois un avis de contrôle fiscal ?',
      answer:
        "Contactez-nous dès réception de l'avis : nous préparons votre dossier, vérifions sa cohérence et vous accompagnons pendant tout l'échange avec l'administration. Notre présence à vos côtés vous permet d'aborder ce contrôle avec méthode et sérénité plutôt que dans l'urgence.",
    },
    ro: {
      question: 'Ce fac dacă primesc o notificare de control fiscal?',
      answer:
        "Contactați-ne imediat ce primiți notificarea: vă pregătim dosarul, îi verificăm coerența și vă însoțim pe tot parcursul discuțiilor cu administrația. Prezența noastră alături de dumneavoastră vă permite să abordați acest control cu metodă și liniște, nu în grabă.",
    },
  },
  {
    id: 'comptes-annuels-obligation',
    category: 'comptes-annuels',
    fr: {
      question: 'Dois-je déposer des comptes annuels si j’ai une société ?',
      answer:
        "Oui, toute société (SRL, SA…) doit établir et déposer ses comptes annuels à la Banque nationale de Belgique dans les délais légaux après l'approbation par l'assemblée générale. Nous rédigeons vos comptes annuels selon le schéma applicable à votre taille d'entreprise et nous nous chargeons du dépôt.",
    },
    ro: {
      question: 'Trebuie să depun conturi anuale dacă am o societate?',
      answer:
        "Da, orice societate (SRL, SA…) trebuie să întocmească și să depună conturile anuale la Banca Națională a Belgiei, în termenele legale, după aprobarea lor de către adunarea generală. Redactăm conturile anuale conform schemei aplicabile dimensiunii societății dumneavoastră și ne ocupăm de depunere.",
    },
  },
  {
    id: 'creation-srl',
    category: 'creation',
    fr: {
      question: 'Quelles sont les étapes pour créer une SRL en Belgique ?',
      answer:
        "La création d'une SRL passe par plusieurs étapes : choix du nom et de l'objet social, élaboration d'un plan financier, passage devant notaire pour l'acte constitutif, inscription à la Banque-Carrefour des Entreprises et à la TVA, puis mise en place de la comptabilité. Nous vous accompagnons à chacune de ces étapes.",
    },
    ro: {
      question: 'Care sunt etapele pentru înființarea unei SRL în Belgia?',
      answer:
        "Înființarea unei SRL parcurge mai multe etape: alegerea numelui și a obiectului de activitate, elaborarea unui plan financiar, semnarea actului constitutiv în fața notarului, înscrierea la Banca-Răscruce a Întreprinderilor și la TVA, apoi organizarea contabilității. Vă însoțim la fiecare dintre aceste etape.",
    },
  },
  {
    id: 'documents-mensuels',
    category: 'documents',
    fr: {
      question: 'Quels documents dois-je vous fournir chaque mois ?',
      answer:
        "En général : vos factures d'achat et de vente, vos extraits de compte bancaire, vos notes de frais et, le cas échéant, vos fiches de paie. Nous vous indiquons précisément la liste adaptée à votre activité et pouvons mettre en place un outil pour simplifier cette transmission.",
    },
    ro: {
      question: 'Ce documente trebuie să vă transmit în fiecare lună?',
      answer:
        "În general: facturile de achiziție și de vânzare, extrasele de cont bancar, notele de cheltuieli și, dacă este cazul, fluturașii de salariu. Vă indicăm exact lista adaptată activității dumneavoastră și putem instala un instrument care să simplifice această transmitere.",
    },
  },
  {
    id: 'prise-de-rdv',
    category: 'rdv',
    fr: {
      question: 'Comment prendre rendez-vous avec votre cabinet ?',
      answer:
        "Le plus simple est de nous appeler ou de remplir notre formulaire de contact en ligne : nous vous recontactons sous 24 heures ouvrées pour convenir d'un premier échange, dans nos bureaux de Zaventem ou à distance.",
    },
    ro: {
      question: 'Cum pot programa o întâlnire cu cabinetul dumneavoastră?',
      answer:
        "Cel mai simplu este să ne sunați sau să completați formularul nostru de contact online: vă recontactăm în 24 de ore lucrătoare pentru a stabili o primă discuție, la biroul nostru din Zaventem sau la distanță.",
    },
  },
]
