import { SITE } from '@/lib/site'

/**
 * Contenu de la politique de confidentialité RGPD.
 *
 * ⚠️ AVIS : ce texte est une base rédigée avec sérieux mais NE remplace
 * pas une relecture par un conseil juridique belge spécialisé en
 * protection des données avant mise en ligne définitive — en particulier
 * la liste des sous-traitants, les durées de conservation exactes et la
 * base légale retenue pour chaque traitement doivent être confirmées avec
 * le client.
 */

export const PRIVACY_UPDATED = '2026-08-31'

export interface ProcessingRow {
  purpose: string
  legalBasis: string
  data: string
  retention: string
}

export interface PrivacyDictionary {
  responsibleTitle: string
  responsibleText: string
  tableTitle: string
  tableIntro: string
  tableHeaders: { purpose: string; legalBasis: string; data: string; retention: string }
  processing: ProcessingRow[]
  recipientsTitle: string
  recipientsIntro: string
  recipients: string[]
  retentionTitle: string
  retentionText: string[]
  rightsTitle: string
  rightsIntro: string
  rights: string[]
  rightsHow: string
  complaintTitle: string
  complaintText: string
  cookiesTitle: string
  cookiesText: string
  securityTitle: string
  securityText: string
  contactTitle: string
  contactText: string
}

export const PRIVACY_FR: PrivacyDictionary = {
  responsibleTitle: 'Responsable du traitement',
  responsibleText: `Le responsable du traitement des données à caractère personnel collectées sur ce site est ${SITE.legalName}, ${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}, ${SITE.vat}, joignable à ${SITE.email} ou au ${SITE.phone}.`,

  tableTitle: 'Les traitements effectués',
  tableIntro:
    "Le tableau ci-dessous décrit les traitements de données à caractère personnel réalisés dans le cadre de ce site, conformément au Règlement général sur la protection des données (RGPD, règlement (UE) 2016/679).",
  tableHeaders: { purpose: 'Finalité', legalBasis: 'Base légale', data: 'Données traitées', retention: 'Durée de conservation' },
  processing: [
    {
      purpose: 'Traitement des demandes envoyées via le formulaire de contact',
      legalBasis:
        "Mesures précontractuelles à la demande de la personne concernée (art. 6.1.b RGPD) ou intérêt légitime à répondre à une demande d'information (art. 6.1.f RGPD)",
      data: 'Nom, adresse email, téléphone (facultatif), entreprise (facultatif), contenu du message',
      retention: "3 ans après le dernier contact, sauf entrée en relation contractuelle (voir « Conservation »)",
    },
    {
      purpose: "Mesure d'audience du site, à des fins d'amélioration du contenu et de la navigation",
      legalBasis: "Intérêt légitime à comprendre l'usage du site (art. 6.1.f RGPD)",
      data: 'Pages consultées, durée de visite, type d’appareil, données statistiques agrégées et anonymisées — aucune adresse IP complète ni identifiant publicitaire ne sont conservés',
      retention: '13 mois maximum',
    },
  ],

  recipientsTitle: 'Destinataires et sous-traitants',
  recipientsIntro:
    "Les données collectées sont destinées exclusivement au personnel habilité de {name} et, le cas échéant, aux prestataires techniques suivants, agissant en tant que sous-traitants au sens de l'article 28 du RGPD, dans le cadre strict des finalités décrites ci-dessus :".replace(
      '{name}',
      SITE.legalName,
    ),
  recipients: [
    "L'hébergeur du site [nom et localisation de l'hébergeur à compléter]",
    "Le prestataire de messagerie électronique utilisé pour la réception des messages du formulaire de contact",
    "Le cas échéant, un outil de mesure d'audience respectueux de la vie privée, sans dépôt de cookie",
  ],

  retentionTitle: 'Durée de conservation et anti-blanchiment',
  retentionText: [
    "Les données des personnes qui nous contactent sans devenir clientes sont conservées 3 ans maximum à compter du dernier échange, puis supprimées ou anonymisées.",
    "Lorsqu'un prospect devient client du cabinet, ses données d'identification et les documents relatifs à la relation d'affaires sont conservés conformément à la loi du 18 septembre 2017 relative à la prévention du blanchiment de capitaux et du financement du terrorisme, dont l'article 60 impose une conservation de 10 ans à compter de la fin de la relation d'affaires.",
  ],

  rightsTitle: 'Vos droits',
  rightsIntro: 'Conformément au RGPD, vous disposez des droits suivants sur vos données à caractère personnel :',
  rights: [
    "Droit d'accès : obtenir la confirmation que vos données sont traitées et en recevoir une copie",
    'Droit de rectification : faire corriger des données inexactes ou incomplètes',
    "Droit à l'effacement : demander la suppression de vos données, dans les limites prévues par la loi (notamment les obligations légales de conservation)",
    'Droit à la limitation du traitement : demander la suspension temporaire du traitement dans certains cas',
    "Droit d'opposition : vous opposer à un traitement fondé sur l'intérêt légitime, pour des raisons tenant à votre situation particulière",
    'Droit à la portabilité : recevoir vos données dans un format structuré et couramment utilisé, ou les faire transmettre à un tiers',
    'Droit de retirer votre consentement à tout moment, lorsque le traitement repose sur celui-ci, sans affecter la licéité du traitement antérieur',
  ],
  rightsHow: `Pour exercer ces droits, contactez-nous à ${SITE.email} ou par courrier à l'adresse du siège social ci-dessus, en joignant une preuve de votre identité. Nous répondons dans un délai maximal d'un mois.`,

  complaintTitle: "Réclamation auprès de l'autorité de contrôle",
  complaintText:
    "Si vous estimez que le traitement de vos données ne respecte pas la réglementation en vigueur, vous pouvez introduire une réclamation auprès de l'Autorité de protection des données (APD) : Rue de la Presse 35, 1000 Bruxelles — contact@apd-gba.be — www.autoriteprotectiondonnees.be.",

  cookiesTitle: 'Cookies',
  cookiesText:
    "Ce site ne dépose aucun cookie, qu'il soit de mesure d'audience, publicitaire ou fonctionnel. Aucun consentement n'est donc requis à cet égard lors de votre navigation.",

  securityTitle: 'Sécurité des données',
  securityText:
    "Nous mettons en œuvre des mesures techniques et organisationnelles appropriées (accès restreint, chiffrement des échanges via HTTPS, hébergement sécurisé) pour protéger vos données contre tout accès non autorisé, perte ou divulgation.",

  contactTitle: 'Contact',
  contactText: `Pour toute question relative à la présente politique de confidentialité, écrivez-nous à ${SITE.email}.`,
}

export const PRIVACY_RO: PrivacyDictionary = {
  responsibleTitle: 'Operatorul de date',
  responsibleText: `Operatorul de date cu caracter personal colectate pe acest site este ${SITE.legalName}, ${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}, ${SITE.vat}, ce poate fi contactat la ${SITE.email} sau la ${SITE.phone}.`,

  tableTitle: 'Prelucrările efectuate',
  tableIntro:
    'Tabelul de mai jos descrie prelucrările de date cu caracter personal realizate în cadrul acestui site, în conformitate cu Regulamentul general privind protecția datelor (RGPD, regulamentul (UE) 2016/679).',
  tableHeaders: { purpose: 'Scop', legalBasis: 'Temei juridic', data: 'Date prelucrate', retention: 'Durata de păstrare' },
  processing: [
    {
      purpose: 'Prelucrarea cererilor trimise prin formularul de contact',
      legalBasis:
        'Măsuri precontractuale la cererea persoanei vizate (art. 6.1.b RGPD) sau interes legitim de a răspunde unei cereri de informații (art. 6.1.f RGPD)',
      data: 'Nume, adresă de email, telefon (opțional), companie (opțională), conținutul mesajului',
      retention: 'Maximum 3 ani de la ultimul contact, cu excepția intrării într-o relație contractuală (a se vedea „Păstrarea datelor”)',
    },
    {
      purpose: 'Măsurarea audienței site-ului, în scopul îmbunătățirii conținutului și a navigării',
      legalBasis: 'Interes legitim de a înțelege utilizarea site-ului (art. 6.1.f RGPD)',
      data: 'Pagini vizitate, durata vizitei, tip de dispozitiv, date statistice agregate și anonimizate — nu se păstrează nicio adresă IP completă sau identificator publicitar',
      retention: 'Maximum 13 luni',
    },
  ],

  recipientsTitle: 'Destinatari și persoane împuternicite',
  recipientsIntro: `Datele colectate sunt destinate exclusiv personalului autorizat al ${SITE.legalName} și, dacă este cazul, următorilor prestatori tehnici, care acționează ca persoane împuternicite în sensul articolului 28 din RGPD, strict în cadrul scopurilor descrise mai sus:`,
  recipients: [
    'Furnizorul de găzduire a site-ului [numele și localizarea furnizorului, de completat]',
    'Furnizorul de servicii de mesagerie electronică utilizat pentru primirea mesajelor din formularul de contact',
    'Dacă este cazul, un instrument de măsurare a audienței respectuos al vieții private, fără plasarea de cookie-uri',
  ],

  retentionTitle: 'Durata de păstrare și legislația anti-spălare a banilor',
  retentionText: [
    'Datele persoanelor care ne contactează fără a deveni clienți sunt păstrate maximum 3 ani de la ultimul schimb, apoi șterse sau anonimizate.',
    'Atunci când un prospect devine client al cabinetului, datele sale de identificare și documentele referitoare la relația de afaceri sunt păstrate în conformitate cu legea belgiană din 18 septembrie 2017 privind prevenirea spălării banilor și finanțării terorismului, al cărei articol 60 impune o păstrare de 10 ani de la încheierea relației de afaceri.',
  ],

  rightsTitle: 'Drepturile dumneavoastră',
  rightsIntro: 'În conformitate cu RGPD, aveți următoarele drepturi asupra datelor dumneavoastră cu caracter personal:',
  rights: [
    'Dreptul de acces : să obțineți confirmarea că datele dumneavoastră sunt prelucrate și să primiți o copie a acestora',
    'Dreptul la rectificare : să corectați date inexacte sau incomplete',
    'Dreptul la ștergere : să solicitați ștergerea datelor dumneavoastră, în limitele prevăzute de lege (în special obligațiile legale de păstrare)',
    'Dreptul la restricționarea prelucrării : să solicitați suspendarea temporară a prelucrării în anumite cazuri',
    'Dreptul la opoziție : să vă opuneți unei prelucrări bazate pe interesul legitim, din motive legate de situația dumneavoastră particulară',
    'Dreptul la portabilitate : să primiți datele dumneavoastră într-un format structurat și utilizat în mod curent, sau să le transmiteți unui terț',
    'Dreptul de a vă retrage consimțământul în orice moment, atunci când prelucrarea se bazează pe acesta, fără a afecta legalitatea prelucrării anterioare',
  ],
  rightsHow: `Pentru a exercita aceste drepturi, contactați-ne la ${SITE.email} sau prin poștă la adresa sediului social de mai sus, atașând o dovadă a identității dumneavoastră. Răspundem în termen de maximum o lună.`,

  complaintTitle: 'Reclamație la autoritatea de supraveghere',
  complaintText:
    'Dacă considerați că prelucrarea datelor dumneavoastră nu respectă reglementările în vigoare, puteți depune o reclamație la Autoritatea de Protecție a Datelor din Belgia (APD) : Rue de la Presse 35, 1000 Bruxelles — contact@apd-gba.be — www.autoriteprotectiondonnees.be.',

  cookiesTitle: 'Module cookie',
  cookiesText:
    'Acest site nu plasează niciun cookie, fie de măsurare a audienței, publicitar sau funcțional. Nu este necesar niciun consimțământ în acest sens în timpul navigării dumneavoastră.',

  securityTitle: 'Securitatea datelor',
  securityText:
    'Punem în aplicare măsuri tehnice și organizatorice adecvate (acces restricționat, criptarea schimburilor prin HTTPS, găzduire securizată) pentru a proteja datele dumneavoastră împotriva accesului neautorizat, pierderii sau divulgării.',

  contactTitle: 'Contact',
  contactText: `Pentru orice întrebare privind această politică de confidențialitate, scrieți-ne la ${SITE.email}.`,
}
