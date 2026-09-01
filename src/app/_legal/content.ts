import type { PostBlock } from '@/content/types'
import { SITE } from '@/lib/site'

/**
 * Corps des pages légales (mentions légales, confidentialité), en blocs
 * typés `PostBlock` — même format que les articles d'actualités, pour
 * réutiliser `renderBlocks` sans dépendance de parsing supplémentaire.
 *
 * ⚠️ Le contenu RGPD (confidentialité) et les clauses juridiques (mentions
 * légales) sont rédigés avec sérieux mais DOIVENT être relus et validés
 * par un conseil juridique belge avant mise en ligne définitive — en
 * particulier le paragraphe sur le règlement extrajudiciaire des litiges
 * et les clauses de compétence territoriale.
 */

export const LEGAL_UPDATED = '2026-08-31'

export const LEGAL_FR: PostBlock[] = [
  { type: 'h2', text: 'Éditeur du site' },
  {
    type: 'p',
    text: `Le présent site est édité par ${SITE.legalName}, ${SITE.legalForm} de droit belge, dont le siège est établi ${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city} (${SITE.address.countryLabel}).`,
  },
  {
    type: 'ul',
    items: [
      `Numéro d'entreprise (BCE) : ${SITE.vat}`,
      `Téléphone : ${SITE.phone}`,
      `Email : ${SITE.email}`,
      `Responsable de la publication : Michel Tamine, administrateur.`,
    ],
  },
  {
    type: 'p',
    text: `${SITE.legalName} poursuit, sous ce nom, l'activité d'un cabinet d'expertise comptable et fiscale exercée par la même équipe depuis 2014 ; la constitution de la société en 2025 est une restructuration juridique de cette activité, non une création d'entreprise.`,
  },

  { type: 'h2', text: 'Profession réglementée' },
  {
    type: 'p',
    text: `${SITE.legalName} exerce sous le titre professionnel protégé d'expert-comptable (fiscaliste), agréé par l'ITAA sans interruption depuis ${SITE.itaaSince}. Le passage de la société en nom collectif à la société à responsabilité limitée a imposé de refaire le processus d'inscription pour la nouvelle entité, enregistrée à ce titre à la Banque-Carrefour des Entreprises le 26 mars 2026. Ce titre est réglementé et contrôlé par l'Institut des Conseillers fiscaux et des Experts-comptables (ITAA), institut public créé par la loi du 17 mars 2019.`,
  },
  {
    type: 'ul',
    items: [
      "Autorité de contrôle : ITAA — Institut des Conseillers fiscaux et des Experts-comptables, Boulevard Emile Jacqmain 135/2, 1000 Bruxelles.",
      "Vérification de l'inscription : search.itaa.be",
      "Règles professionnelles applicables : Code de déontologie de l'ITAA et loi du 17 mars 2019 organisant la profession et l'institut.",
      "Titre professionnel utilisé : expert-comptable (fiscaliste), au sens de l'article 3 de la loi du 17 mars 2019.",
    ],
  },
  {
    type: 'p',
    text: "Le cabinet est couvert par une assurance responsabilité civile professionnelle souscrite conformément aux exigences de l'ITAA, sous la police n° [numéro de police à compléter], auprès de [compagnie d'assurance à compléter], couvrant le territoire de l'Union européenne.",
  },

  { type: 'h2', text: 'Hébergement du site' },
  {
    type: 'p',
    text: "Le site tmfcompta.be est hébergé par [nom de l'hébergeur, adresse et coordonnées à compléter par le client]. Cette information sera précisée dès la finalisation du choix d'hébergement.",
  },

  { type: 'h2', text: 'Propriété intellectuelle' },
  {
    type: 'p',
    text: `L'ensemble des éléments du site (textes, structure, mise en page, logo, identité visuelle) est la propriété de ${SITE.legalName} ou de ses partenaires, et protégé par le droit belge et international de la propriété intellectuelle. Toute reproduction, représentation, modification ou exploitation, totale ou partielle, sans autorisation écrite préalable, est interdite.`,
  },

  { type: 'h2', text: 'Liens hypertextes' },
  {
    type: 'p',
    text: `Le site peut contenir des liens vers des sites tiers (dont celui de notre société sœur ${SITE.sister.name}). ${SITE.legalName} n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu. La mise en place d'un lien hypertexte vers le présent site est soumise à autorisation préalable écrite.`,
  },

  { type: 'h2', text: 'Limitation de responsabilité' },
  {
    type: 'p',
    text: "Les informations diffusées sur ce site ont un caractère général et informatif. Elles ne constituent pas un avis comptable, fiscal ou juridique personnalisé et ne sauraient engager la responsabilité du cabinet en l'absence d'une mission contractuelle formalisée. Nous nous efforçons d'assurer l'exactitude des informations publiées, sans garantir leur exhaustivité ou leur actualité permanente.",
  },

  { type: 'h2', text: 'Droit applicable et juridiction compétente' },
  {
    type: 'p',
    text: "Le présent site et les relations qu'il génère sont soumis au droit belge. En cas de litige et à défaut de solution amiable, les tribunaux de l'arrondissement judiciaire du Brabant flamand (division Hal-Vilvorde), lieu du siège social du cabinet, seront seuls compétents, sous réserve des règles impératives de compétence territoriale applicables aux consommateurs.",
  },

  { type: 'h2', text: 'Règlement extrajudiciaire des litiges' },
  {
    type: 'p',
    text: "En cas de désaccord persistant avec le cabinet, le client peut recourir à un mode de résolution amiable des litiges avant toute action judiciaire, notamment auprès du Service de Médiation pour le Consommateur (SPF Économie), point de contact belge en matière de règlement extrajudiciaire des litiges de consommation (mediationconsommateur.be). Ce recours est facultatif et sans préjudice du droit de saisir les tribunaux compétents.",
  },

  { type: 'h2', text: 'Contact' },
  {
    type: 'p',
    text: `Pour toute question relative aux présentes mentions légales, vous pouvez nous écrire à ${SITE.email} ou par courrier à l'adresse du siège social mentionnée ci-dessus.`,
  },
]

export const LEGAL_RO: PostBlock[] = [
  { type: 'h2', text: 'Editorul site-ului' },
  {
    type: 'p',
    text: `Acest site este editat de ${SITE.legalName}, ${SITE.legalForm.toLowerCase()} de drept belgian, cu sediul la ${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city} (Belgia).`,
  },
  {
    type: 'ul',
    items: [
      `Număr de întreprindere (BCE) : ${SITE.vat}`,
      `Telefon : ${SITE.phone}`,
      `Email : ${SITE.email}`,
      `Responsabil de publicare : Michel Tamine, administrator.`,
    ],
  },
  {
    type: 'p',
    text: `${SITE.legalName} continuă, sub acest nume, activitatea unui cabinet de expertiză contabilă și fiscală desfășurată de aceeași echipă din 2014 ; constituirea societății în 2025 este o restructurare juridică a acestei activități, nu înființarea unei noi afaceri.`,
  },

  { type: 'h2', text: 'Profesie reglementată' },
  {
    type: 'p',
    text: `${SITE.legalName} exercită sub titlul profesional protejat de expert-contabil (fiscalist), acreditat de ITAA fără întrerupere din ${SITE.itaaSince}. Trecerea de la societatea în nume colectiv la societatea cu răspundere limitată a impus reluarea procesului de înscriere pentru noua entitate, înregistrată în această calitate la Banca-Răscruce a Întreprinderilor la 26 martie 2026. Acest titlu este reglementat și controlat de Institutul Consilierilor Fiscali și al Experților-Contabili (ITAA), institut public creat prin legea din 17 martie 2019.`,
  },
  {
    type: 'ul',
    items: [
      'Autoritate de control : ITAA — Institutul Consilierilor Fiscali și al Experților-Contabili, Boulevard Emile Jacqmain 135/2, 1000 Bruxelles.',
      'Verificarea înscrierii : search.itaa.be',
      'Reguli profesionale aplicabile : Codul de deontologie al ITAA și legea din 17 martie 2019 privind organizarea profesiei și a institutului.',
      'Titlu profesional utilizat : expert-contabil (fiscalist), în sensul articolului 3 din legea din 17 martie 2019.',
    ],
  },
  {
    type: 'p',
    text: 'Cabinetul dispune de o asigurare de răspundere civilă profesională, încheiată în conformitate cu cerințele ITAA, sub polița nr. [de completat], la [compania de asigurări de completat], acoperind teritoriul Uniunii Europene.',
  },

  { type: 'h2', text: 'Găzduirea site-ului' },
  {
    type: 'p',
    text: 'Site-ul tmfcompta.be este găzduit de [numele furnizorului de găzduire, adresa și datele de contact, de completat de client]. Această informație va fi precizată odată cu finalizarea alegerii furnizorului de găzduire.',
  },

  { type: 'h2', text: 'Proprietate intelectuală' },
  {
    type: 'p',
    text: `Toate elementele site-ului (texte, structură, machetare, logo, identitate vizuală) sunt proprietatea ${SITE.legalName} sau a partenerilor săi și sunt protejate de dreptul belgian și internațional al proprietății intelectuale. Orice reproducere, reprezentare, modificare sau exploatare, totală sau parțială, fără autorizație scrisă prealabilă, este interzisă.`,
  },

  { type: 'h2', text: 'Legături către alte site-uri' },
  {
    type: 'p',
    text: `Site-ul poate conține legături către site-uri terțe (inclusiv cel al societății noastre soră, ${SITE.sister.name}). ${SITE.legalName} nu exercită niciun control asupra acestor site-uri și declină orice răspundere privind conținutul lor. Plasarea unei legături către acest site este supusă autorizării scrise prealabile.`,
  },

  { type: 'h2', text: 'Limitarea răspunderii' },
  {
    type: 'p',
    text: 'Informațiile publicate pe acest site au un caracter general și informativ. Ele nu constituie un aviz contabil, fiscal sau juridic personalizat și nu pot angaja răspunderea cabinetului în absența unei misiuni contractuale formalizate. Depunem eforturi pentru a asigura exactitatea informațiilor publicate, fără a garanta exhaustivitatea sau actualitatea lor permanentă.',
  },

  { type: 'h2', text: 'Drept aplicabil și instanța competentă' },
  {
    type: 'p',
    text: 'Acest site și raporturile pe care le generează sunt supuse dreptului belgian. În caz de litigiu și în absența unei soluții amiabile, instanțele din arondismentul judiciar Brabantul Flamand (diviziunea Hal-Vilvorde), locul sediului social al cabinetului, vor fi singurele competente, sub rezerva regulilor imperative de competență teritorială aplicabile consumatorilor.',
  },

  { type: 'h2', text: 'Soluționarea extrajudiciară a litigiilor' },
  {
    type: 'p',
    text: 'În caz de dezacord persistent cu cabinetul, clientul poate recurge la un mod amiabil de soluționare a litigiilor înainte de orice acțiune în justiție, în special la Serviciul de Mediere pentru Consumatori (SPF Economie), punctul de contact belgian pentru soluționarea extrajudiciară a litigiilor de consum (mediationconsommateur.be). Acest recurs este facultativ și nu aduce atingere dreptului de a sesiza instanțele competente.',
  },

  { type: 'h2', text: 'Contact' },
  {
    type: 'p',
    text: `Pentru orice întrebare privind aceste informații legale, ne puteți scrie la ${SITE.email} sau prin poștă la adresa sediului social menționată mai sus.`,
  },
]
