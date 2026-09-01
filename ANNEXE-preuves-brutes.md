# DOSSIER DE PREUVES BRUTES — tmfcompta.be (collecté le 2026-08-31)

## Identité
- TMF Compta SNC — Sterrebeekstraat 154A (mentions légales) / 154 (page contact), 1930 Zaventem, Belgique
- BCE/TVA: BE0505985850 — Directeur publication: Marius Trufin
- Tel +32 (0)27 05 80 99 — info@tmfcompta.be
- Domaine .be enregistré 2022-04-12, registrar IONOS SE, NS = ui-dns (IONOS)
- Site fait par Kago Group SRL (kago-group.com)

## Infra
- IP 54.37.231.69 (RIPE / plage OVH), PAS d'IPv6, PAS de CDN
- TLS Let's Encrypt, valide 2026-08-06 → 2026-11-04, SAN = tmfcompta.be
- CORRECTION VERIFIEE: www.tmfcompta.be possède SON PROPRE certificat (CN=www.tmfcompta.be, SAN www uniquement).
  Deux certificats mono-domaine distincts. www fonctionne en HTTPS sans erreur.
- MAIS: www ET non-www servent tous deux le site en 200, SANS redirection canonique entre eux,
  et SANS balise canonical => duplicate content www/non-www
- Pas d'OCSP stapling ("OCSP responses: no responses sent")
- HTTP/2 + alt-svc h3 annoncé
- Next.js App Router + Turbopack, self-hosted (x-powered-by: Next.js)
- MX: Google Workspace (smtp.google.com)
- TXT: uniquement google-site-verification. AUCUN SPF.
- AUCUN enregistrement DMARC (_dmarc.tmfcompta.be vide)
- AUCUN enregistrement CAA

## Headers HTTP
Présents: HSTS (max-age=63072000; includeSubDomains; preload), X-Content-Type-Options, X-Frame-Options SAMEORIGIN, Referrer-Policy origin-when-cross-origin, Permissions-Policy (camera/microphone/geolocation), X-XSS-Protection (obsolète), X-DNS-Prefetch-Control
MANQUANTS: Content-Security-Policy, COOP, CORP, COEP, X-Permitted-Cross-Domain-Policies
- cache-control HTML: private, no-cache, no-store, must-revalidate (aucun cache/ISR)
- Assets statiques: public, max-age=31536000, immutable + gzip/br OK

## Routes
Sitemap = 10 URL : /fr, /fr/about, /fr/contact, /fr/general-accounting, /fr/legal + équivalents /ro
- / → 307 → /fr/ → 308 → /fr
- /nl → 307 (redirigé, pas de version NL)
- /en → 307 (pas de version EN)
- /api/contact POST vide → 500
- Le middleware i18n réécrit TOUS les chemins, y compris /.well-known/* :
    /.well-known/security.txt → 307 → /fr/.well-known/security.txt → 404
    idem /.env, /package.json, /manifest.json, /apple-touch-icon.png, /sitemap_index.xml
  => aucun fichier .well-known n'est atteignable (security.txt, assetlinks, apple-app-site-association)
- Page 404 = page Next.js par DEFAUT : <html> SANS attribut lang, titre "404: This page could not be found."
  EN ANGLAIS, aucune navigation, aucun branding, aucune localisation FR/RO.
  C'est ce que voient les visiteurs qui cliquent sur les liens cassés du footer.
- lastmod sitemap: TOUTES les URL = 2026-03-01T20:03:11Z (date de build, pas de vraie date de modif)

## BUG CRITIQUE — liens footer cassés (sur les 10 pages)
Le bloc de navigation bas de footer contient:
  /fr/services   (libellé "Comptabilité générale")  → HTTP 404
  /fr/projects   (libellé "À propos")               → HTTP 404
  /ro/services   (libellé "Contabilitate generală") → HTTP 404
  /ro/projects   (libellé "Despre noi")             → HTTP 404
=> 2 liens morts × 10 pages = 20 liens 404 internes. Le footer contient DEUX menus:
   un correct (au-dessus) et un cassé (en dessous) — duplication + erreur.

## SEO on-page
- AUCUNE balise canonical (0/10 pages)
- AUCUN Open Graph (0 balise og:), AUCUNE Twitter Card
- AUCUN JSON-LD / donnée structurée (0/10) — pas de LocalBusiness/AccountingService/FAQPage/BreadcrumbList
- hreflang RELATIFS (invalide, doit être absolu):
    pages FR: <link hreflang="fr" href="/"> + <link hreflang="ro" href="/ro">
    pages RO: <link hreflang="fr" href="/fr"> + <link hreflang="ro" href="/ro">
  => incohérence FR ("/" vs "/fr"), pas de x-default, pas d'auto-référence correcte
- hreflang IDENTIQUE sur toutes les pages (pointe toujours vers les accueils, jamais vers l'équivalent de la page)
  ex: /fr/contact déclare hreflang ro → /ro (accueil) au lieu de /ro/contact
- Hiérarchie de titres: H1 puis H3 directement, AUCUN H2 (sauf page legal). Saut de niveau.
- Titles/descriptions présents et corrects sur les 10 pages
- Pas de favicon moderne (uniquement /favicon.ico), pas d'apple-touch-icon, pas de manifest, pas de theme-color
- robots.txt minimal OK (Allow /, Disallow /api/, Sitemap déclaré)

## Contenu / rédaction
### BUG DE TRADUCTION — mot roumain dans la page FRANÇAISE /fr/general-accounting
  "notre équipe dédiée est là **pentru** vous guider à chaque étape du chemin"
  "Nos experts comptables sont là **pentru** vous accompagner dans la compréhension..."
  ("pentru" = "pour" en roumain — fuite de traduction visible par tout visiteur francophone)
### Page /ro/legal : H1 = "Mentions legale" (français/roumain hybride) au lieu de "Mențiuni legale"
### Footer RO : lien "Mentions legale" (idem, sur les 5 pages RO)
### RO : "Formă juridică: Societate în nume" — tronqué (manque "colectiv")
### FR : "Forme juridique : Société en nom" — tronqué (manque "collectif")
### RO /ro/about, fautes: "continuăa creșterii", "devenind o companie de PME",
    "Ne mutăm în noi locuri" (calque de "nouveaux locaux"),
    "Ne bucurăm de a vă însoți companii mici și mijlocii" (grammaire)
### Copyright figé "© 2023-2025" alors qu'on est en 2026 (sur les 10 pages)
### Témoignages dupliqués 3× dans le DOM (boucle carousel) = contenu dupliqué
### Avis datés "il y a 3 ans" / "acum un an" — figés en dur, non mis à jour
### Avis RO d'un client contenant du français : "Après 11 ans, le chapeau,"
### Page /fr/general-accounting = 7 sections de texte générique sans preuve, prix, ni délai
### Page about : "plus de 10 années d'expérience", frise 2014→2022, rien après 2022

## Contradictions dans les mentions légales (FR + RO)
1. "Le site est hébergé par : IONOS" — FAUX: l'IP 54.37.231.69 est une plage OVH.
2. "Le site utilise Google Analytics" + "cookies analytiques via Google Analytics" — FAUX:
   le site charge Umami (https://umami.kago-group.com/script.js) et n'utilise AUCUN cookie
   (document.cookie vide, localStorage vide vérifié en navigateur).
   => déclaration RGPD inexacte dans les deux sens.
3. Adresse siège "Sterrebeekstraat 154A" vs page contact "Sterrebeekstraat 154"
4. ABSENTS des mentions légales:
   - droits RGPD (accès, rectification, effacement, opposition, portabilité, limitation)
   - base légale du traitement / responsable de traitement identifié comme tel
   - droit de réclamation auprès de l'APD (Autorité de protection des données, Bruxelles)
   - durée de conservation des données analytiques
   - DPO / point de contact vie privée
   - numéro ITAA (obligatoire pour comptable-fiscaliste agréé en Belgique) et autorité de tutelle
   - assurance RC professionnelle
   - lien vers règlement extrajudiciaire des litiges / ODR
   - conditions générales de service distinctes
5. Formulaire de contact ET formulaire email: AUCUNE case de consentement, AUCUN lien
   vers une politique de confidentialité, aucune mention de finalité au point de collecte

## Analytics
- Umami self-hosted chez le prestataire (umami.kago-group.com) — fonctionne (script.js + /api/send OK)
- Cookieless confirmé: document.cookie = "" et localStorage = [] après chargement
- Pas de bannière cookies (cohérent avec cookieless, MAIS incohérent avec les mentions légales)
- Données analytiques hébergées chez Kago Group, pas de mention dans les mentions légales
- Pas de Google Analytics malgré la déclaration
- Pas de Google Tag Manager, pas de pixel Meta, pas de suivi de conversion

## Performance (mesuré en navigateur, connexion rapide)
- TTFB: 171 ms (bon)
- DOMContentLoaded: 239 ms
- Load: 554 ms
- FCP: 2 724 ms  → "Poor" (seuil Google: >3 000 ms poor, 1 800-3 000 needs improvement)
- LCP: 5 012 ms  → "POOR" (seuil: >4 000 ms)
- CLS: 0 (excellent)
- Élément LCP = <img class="w-[60%] md:w[85%] lg:w-[70%] mx-auto"> (illustration hero)
- CAUSE: l'image LCP et tous les blocs sont rendus côté serveur avec style="opacity:0"
  et animés à l'entrée => le LCP ne peut pas se déclencher avant la fin de l'animation JS.
- Poids total page d'accueil: 445 KB transférés / 31 requêtes
    JS: 321 KB transférés (~1 006 KB décompressés) sur 13 chunks
    dont un chunk unique de 117 KB transférés / 325 KB brut
    images: 83 KB, CSS: 1,6 KB(?), fonts/link: 40 KB
- HTML accueil: 227 KB brut / 68 KB transférés (très lourd — payload RSC + témoignages ×3)
- Aucun cache HTML (no-store) — chaque visite refait le rendu serveur complet
- Images servies en WebP via /_next/image (OK), mais srcset plafonné: w=1080, 1920 et 3840
  renvoient tous le MÊME fichier de 15 396 B => les descripteurs 2x/3x sont inutiles
- Police Manrope auto-hébergée, 1 woff2 préchargé (OK)
- react-slick / slick-carousel chargé (woff slick.woff) pour le carousel d'avis

## BUG CSS
class="w-[60%] md:w[85%] lg:w-[70%]" — `md:w[85%]` : tiret manquant (doit être `md:w-[85%]`).
Classe Tailwind invalide => aucune largeur appliquée au breakpoint md sur l'image hero (LCP).
Présent dans le HTML servi.

## Accessibilité (WCAG 2.2)
- AUCUN landmark sémantique sur AUCUNE page:
    <main>=0, <nav>=0, <header>=0, <footer>=0, <article>=0, <aside>=0, <address>=0
    (<section> = 0 partout sauf 1 sur /contact)
  => 209 <div> sur l'accueil. Navigation lecteur d'écran impossible. WCAG 1.3.1
- AUCUN lien d'évitement ("skip to content") — WCAG 2.4.1
- 37 des 38 éléments focusables testés N'ONT AUCUN indicateur de focus visible
  (CSS ne contient que 4 règles :focus dont `.focus:outline-none{outline:2px solid #0000}`,
   ZÉRO règle :focus-visible) — WCAG 2.4.7 échec
- Saut de niveau de titre H1→H3 — WCAG 1.3.1
- Puces du carousel d'avis: 20×20 px (< 24×24 minimum WCAG 2.5.8), libellé "1".."5"
  en couleur transparente rgba(0,0,0,0) → ratio 1.45:1, aucun nom accessible
- Liens de navigation: hauteur 19 px (cible tactile insuffisante) — 15 cibles < 24 px
- ZÉRO règle @media (prefers-reduced-motion) alors que tout le site est animé — WCAG 2.3.3
- ZÉRO @media (prefers-color-scheme) — pas de mode sombre
- Formulaire de contact: labels correctement liés (for/id) OK, MAIS
    0 attribut `required`, 0 attribut `autocomplete`, pas d'aria-describedby,
    pas de role="alert" pour les erreurs, astérisque "*" sans légende
- 74 occurrences de `opacity:0` dans le HTML servi de l'accueil => sans JavaScript,
  la quasi-totalité du contenu est invisible
- Toutes les <img> ont un attribut alt (0 manquant) — point positif
- lang correct par locale (fr/ro) — point positif

## Conversion / UX
- AUCUN bouton d'appel à l'action dans le hero (uniquement du texte)
- AUCUN numéro de téléphone dans l'en-tête ni le pied de page (uniquement sur /contact)
- AUCUN bouton CTA dans l'en-tête sur les 10 pages
- Le seul CTA récurrent = champ email "Déléguez votre comptabilité" en bas de page
- Bulle Messenger flottante en http:// (non sécurisé) vers m.me/100089820520694
- Pas d'horaires d'ouverture nulle part
- Pas de carte/plan d'accès (juste un lien g.co vers la fiche Google)
- Pas de page tarifs, pas de grille de prix, pas de devis en ligne
- Pas de prise de rendez-vous en ligne
- Pas de photos de l'équipe ni de bios (page "À propos" sans aucun visage)
- Pas de FAQ
- Pas de blog / contenu / actualités fiscales
- Pas de témoignages avec logo/nom d'entreprise cliente vérifiable
- Pas de badges de confiance (ITAA, certifications, logiciels partenaires)
- Les 5 logos du slider (slider-logo-1..5.svg) ne sont pas identifiés
- Navigation: seulement 4 entrées, 1 seule page service pour ~7 métiers décrits
- Le "service en 360°" (roue interactive) exige un clic pour révéler le contenu = friction + SEO

## Marché / positionnement
- Zaventem est en Région flamande (Vlaams-Brabant): AUCUNE version néerlandaise (NL)
- Aucune version anglaise alors que Zaventem = aéroport de Bruxelles + expatriés + sièges internationaux
- Positionnement FR + RO uniquement (communauté roumaine de Belgique = niche réelle et défendable)

# ===== COMPLEMENT DE RECONNAISSANCE (2e passe, verifie) =====

## Duplicate content www / non-www (VERIFIE)
- https://www.tmfcompta.be/fr et https://tmfcompta.be/fr renvoient tous deux HTTP 200
- Contenu OCTET POUR OCTET IDENTIQUE (227 547 octets des deux cotes, diff = vide)
- AUCUNE redirection de l'un vers l'autre, AUCUNE balise canonical
- Deux certificats Let's Encrypt mono-domaine distincts (CN=tmfcompta.be et CN=www.tmfcompta.be)
=> Google voit deux copies completes du site. Dilution de signal, cannibalisation.
- Pas d'OCSP stapling ("OCSP responses: no responses sent")

## Page 404 (VERIFIE)
- Page Next.js par DEFAUT: <html> SANS attribut lang, <title>404: This page could not be found.</title>
- EN ANGLAIS sur un site FR/RO. Aucune navigation, aucun logo, aucun lien de retour, aucun branding.
- Contient un @media (prefers-color-scheme:dark) — ironiquement la SEULE regle de mode sombre du site.
- C'est exactement ce que voient les visiteurs qui cliquent les liens casses du footer.

## Middleware i18n trop large (VERIFIE)
Le middleware prefixe TOUS les chemins par la locale, y compris les chemins reserves:
  /.well-known/security.txt -> 307 -> /fr/.well-known/security.txt -> 404
  /.env, /package.json, /manifest.json, /apple-touch-icon.png, /sitemap_index.xml : idem
=> aucun fichier /.well-known/ n'est servable (security.txt, assetlinks.json,
   apple-app-site-association, et potentiellement les challenges ACME HTTP-01).
=> pas une fuite de donnees (tout finit en 404), mais un defaut de configuration reel.

## Selecteur de langue non crawlable (VERIFIE)
Markup servi: <button class="px-2 py-1 rounded bg-[#002859] text-white">FR</button>
              <button class="px-2 py-1 rounded bg-gray-200 text-gray-700">RO</button>
- Ce sont des <button>, PAS des <a href>. Aucun href, aucun lang, aucun hreflang,
  aucun aria-pressed, aucun aria-current, aucun aria-label.
- Comportement JS verifie: depuis /fr/contact, le clic sur RO mene bien a /ro/contact
  (le chemin est preserve — bon point UX).
- MAIS Googlebot ne peut suivre aucun lien entre les deux langues: pas de href.
  Le seul pont FR<->RO est le sitemap + des hreflang relatifs invalides.
- Impossible d'ouvrir l'autre langue dans un nouvel onglet (clic milieu / clic droit).

## hreflang faux sur TOUTES les pages internes (VERIFIE en navigateur)
Sur /ro/contact, les balises resolvent vers:
  hreflang="fr" -> https://tmfcompta.be/fr    (ACCUEIL, pas /fr/contact)
  hreflang="ro" -> https://tmfcompta.be/ro    (ACCUEIL, pas /ro/contact)
=> les hreflang pointent vers les accueils depuis chaque page. Ils ne declarent
   jamais l'equivalent traduit de la page courante. Signal contradictoire pour Google.
- Titres identiques entre langues sur /contact ("Contact | TMF Compta" des deux cotes).

## Parite de contenu FR/RO (VERIFIE, en mots visibles)
  accueil              FR 634  / RO 602   (-32)
  about                FR 286  / RO 258   (-28)
  contact              FR  54  / RO  54   ( 0)
  general-accounting   FR 705  / RO 629   (-76)
  legal                FR 431  / RO 387   (-44)
=> la version RO est systematiquement plus courte (langue plus concise, mais a verifier
   qu'aucun bloc ne manque).

## Fuites de traduction — INVENTAIRE COMPLET (VERIFIE)
Roumain dans les pages FRANCAISES — 2 occurrences, toutes dans /fr/general-accounting:
  1. section "Accompagnement de la personne":
     "...ou de conseils pour les investissements, notre equipe dediee est la PENTRU vous guider..."
  2. section "Social":
     "Nos experts comptables sont la PENTRU vous accompagner dans la comprehension des regles..."
Francais dans les pages ROUMAINES — 6 occurrences:
  "Mentions legale" (au lieu de "Mentiuni legale") — dans le footer des 5 pages RO
  + en H1 de /ro/legal
=> Aucune autre fuite detectee apres balayage de 24 mots-sondes dans les deux sens.

## Diacritiques roumains: CORRECTION D'UNE FAUSSE PISTE (VERIFIE)
Le HTML RO utilise correctement les diacritiques a virgule (s, t) et non les cedilles
obsoletes: 73 occurrences correctes, 0 obsolete. Bon point.
La police Manrope EST correctement decoupee en 6 sous-ensembles par graisse.
MAIS repartition verifiee des glyphes:
  sous-ensemble "latin"     (a343f882..., 24 Ko, PRECHARGE) : contient a-circonflexe et i-circonflexe, PAS a-breve ni s/t-virgule
  sous-ensemble "latin-ext" (6ab0db14..., 15 Ko, NON precharge) : contient a-breve et s/t-virgule
=> le texte roumain a besoin des DEUX fichiers.
=> Or le header Link de preload est IDENTIQUE sur /fr et sur /ro: il precharge uniquement
   le sous-ensemble "latin". Sur les pages RO, le fichier latin-ext necessaire a
   137 caracteres (64 a-breve + 33 s-virgule + 40 t-virgule sur l'accueil) est decouvert
   tardivement. Avec font-display:swap => FOUT visible sur les diacritiques roumains.
=> Defaut d'i18n reel mais d'impact modere. Le preload devrait etre dependant de la locale.

## Polices: exces et vestiges (VERIFIE)
- 43 declarations @font-face: Manrope en 8 graisses (200,300,400,500,600,700,800,900)
  x 6 sous-ensembles. Le site n'utilise visiblement que 2-3 graisses.
  (impact runtime limite grace a unicode-range, mais signale un next/font non configure)
- font-display:swap partout (42 occurrences) — correct.
- slick-carousel embarque une police d'icones en 4 formats HERITES, tous servis en 200:
    slick.eot  2048 o  (Internet Explorer, mort depuis 2022)
    slick.woff 1380 o  (effectivement telecharge dans la trace reseau)
    slick.ttf  1892 o
    slick.svg  2152 o  (format SVG fonts, supprime des navigateurs)
- react-toastify present dans le bundle (variable CSS --toastify-font-family)

## Formulaires — analyse du markup servi (VERIFIE)
FORMULAIRE DE CONTACT (/fr/contact, /ro/contact):
  + points positifs: <label for> correctement lie a chaque <input id>, types corrects
    (email, tel), placeholders presents
  - AUCUN attribut required (0 occurrence) — validation uniquement en JS
  - AUCUN attribut autocomplete (0 occurrence) => echec WCAG 1.3.5 (AA)
    devrait etre: family-name, given-name, email, tel, organization
  - AUCUN aria-required, aria-describedby, aria-invalid
  - Champs obligatoires signales UNIQUEMENT par <span class="text-red-500">*</span>
    sans legende expliquant l'asterisque, et par la couleur seule
  - Aucun honeypot, aucun captcha, aucune protection anti-spam visible dans le markup
  - Aucune case de consentement RGPD, aucun lien vers une politique de confidentialite
FORMULAIRE EMAIL (bas de toutes les pages):
  <form><input type="email" placeholder="john.doe@gmail.com" name="email"/>
        <button type="submit">Envoyer</button></form>
  - AUCUN <label> du tout: le seul nom accessible est le placeholder
    => echec WCAG 3.3.2 et 4.1.2. Un placeholder n'est pas une etiquette.
  - Aucun consentement, aucune finalite indiquee au point de collecte

## Menu burger mobile (VERIFIE dans le HTML servi)
  <button class="md:hidden" aria-label="Menu" style="opacity:0">
  - aria-label present (bon), MAIS:
  - aucun aria-expanded, aucun aria-controls, aucun type="button"
  - rendu a opacity:0 dans le HTML servi (depend du JS pour apparaitre)
  - taille mesuree 24x24 px = strict minimum WCAG 2.5.8
  NOTE: le comportement d'ouverture n'a PAS pu etre teste de facon fiable
        (l'onglet du navigateur etait en visibilityState "hidden", les animations
         d'entree et IntersectionObserver ne se declenchent pas). A tester manuellement.

## Carousel d'avis react-slick (VERIFIE dans le HTML servi)
  - 8 slides "slick-cloned" (clones pour la boucle infinie) => contenu triplique dans le DOM
  - 26 attributs tabindex="-1", 10 aria-hidden="true"
  - dir="ltr" code en dur sur le conteneur
  - AUCUN attribut role sur TOUTE la page d'accueil (0 occurrence de role=)
  - aucun bouton pause/lecture visible dans le markup => si defilement automatique,
    echec WCAG 2.2.2 (Pause, Stop, Hide)
  - .slick-track fait 3773 px mais .slick-list a overflow:hidden et 343 px
    => PAS de debordement horizontal. (Une mesure initiale suggerait un debordement de
       4 px: NON REPRODUITE a la seconde mesure, a ecarter.)

## Mesures NON fiables — a ne PAS reporter comme faits
- L'onglet de navigateur etait en visibilityState "hidden" pendant plusieurs mesures.
- Consequence: les elements a opacity:0 ne se revelent pas (IntersectionObserver inactif),
  le clic sur le burger n'ouvre rien, le defilement programmatique ne declenche rien.
- Ce sont des ARTEFACTS D'ENVIRONNEMENT, pas des bugs de production.
- En revanche, le FAIT QUE LE HTML SERVI CONTIENNE 74 opacity:0 EST reel et verifie,
  de meme que l'absence de prefers-reduced-motion et l'absence des attributs ARIA.
- LCP 5012 ms / FCP 2724 ms ont ete mesures AVANT que l'onglet ne passe en hidden,
  sur un chargement normal: ces mesures sont retenues, mais a reconfirmer avec
  PageSpeed Insights / donnees terrain CrUX.

# ===== 3e PASSE — LIGHTHOUSE 12.8.2 LOCAL + AUDIT DES IMAGES (source independante) =====

## CORRECTION DE MES PROPRES MESURES
Mes mesures navigateur (FCP 2724 ms, LCP 5012 ms) etaient GONFLEES par l'environnement
d'automatisation. Lighthouse 12.8.2 en local, profil mobile avec bridage reseau, donne:

  Performance     89/100        First Contentful Paint    1,2 s   (BON,   score 0,99)
  Accessibilite   95/100        Largest Contentful Paint  3,8 s   (MAUVAIS, score 0,55)
  Bonnes pratiques 100/100      Total Blocking Time        10 ms  (EXCELLENT)
  SEO             92/100        Cumulative Layout Shift     0     (PARFAIT)
                                Speed Index               2,2 s   (BON)
                                Time to Interactive       3,8 s
                                Reponse serveur            70 ms  (EXCELLENT)

=> CE SONT LES CHIFFRES A RETENIR. Le site n'est PAS lent globalement.
   Le probleme est CIBLE et unique: le LCP.
=> Aucune donnee terrain CrUX disponible (API PSI en quota depasse), donc pas de
   confirmation sur trafic reel. A verifier dans la Search Console.

## CAUSE RACINE DU LCP — TROUVEE ET PROUVEE
L'image hero, qui EST l'element LCP, porte loading="lazy":

  <img alt="working" loading="lazy" width="663" height="497" decoding="async"
       data-nimg="1" class="w-[60%] md:w[85%] lg:w-[70%] mx-auto"
       style="color:transparent" srcSet="...home-illustration...">

Audit Lighthouse "Largest Contentful Paint image was lazily loaded" : ECHEC (score 0).
Audit "LCP request discovery" : ECHEC. Audit "Preload LCP image" : ECHEC.

C'est le comportement PAR DEFAUT de next/image quand on omet la prop `priority`.
CORRECTIF: ajouter `priority` sur ce <Image>. UNE LIGNE.
  <Image src={homeIllustration} alt="..." priority />
Gain attendu: LCP de 3,8 s vers ~1,5-2,0 s. C'est le meilleur rapport gain/effort du site.

STATISTIQUE ACCABLANTE, verifiee sur les 10 pages:
  loading="lazy"       : 102 images sur 102
  loading="eager"      : 0
  fetchpriority="high" : 0
=> la prop `priority` de next/image n'est utilisee NULLE PART sur le site.

## LE BUG CSS EST CONFIRME PAR LIGHTHOUSE
Le snapshot DOM de Lighthouse contient textuellement class="w-[60%] md:w[85%] lg:w-[70%]".
`md:w[85%]` : tiret manquant. Classe Tailwind invalide, donc absente du CSS compile.
Consequence: entre 768 px et 1024 px, l'image hero garde w-[60%] au lieu de 85%.

## TEXTES ALTERNATIFS — je corrige mon constat initial
J'avais note "toutes les images ont un alt : point positif". C'est vrai FORMELLEMENT
mais faux sur le fond. Inventaire complet des valeurs alt du site:

   20x  "Image descriptive"   <-- texte de remplissage, ne decrit RIEN
   10x  ""  (vide)            <-- dont le logo, DANS UN LIEN (voir ci-dessous)
    6x  "Logo 1" ... "Logo 5" <-- les 5 logos partenaires, non identifies
    2x  "working"             <-- en ANGLAIS, sur l'image hero d'un site FR/RO
    2x  "Contact"
   ~30x noms des auteurs d'avis (corrects)
    6x  "Creation"/"Gestion"/"Expansion" + equivalents RO (corrects)

=> "Image descriptive" x20 est le pire cas: passe les controles automatiques,
   n'apporte ZERO information a un lecteur d'ecran ni a Google Images.

## LIEN LOGO SANS NOM ACCESSIBLE (WCAG 2.4.4 / 4.1.2)
  <a href="/fr"><img alt="" loading="lazy" width="171" height="62" ... logo.svg"/></a>
Le lien ne contient qu'une image a alt vide => le lien n'a AUCUN nom accessible.
Un lecteur d'ecran annonce "lien" sans rien d'autre. Present sur les 10 pages.
CORRECTIF: alt="TMF Compta — Accueil" (ou aria-label sur le <a>).

## LA ROUE DE SERVICES 360 — ANALYSE COMPLETE
Structure: un <svg viewBox="0 0 658 658"> inline contenant 15 elements <a>,
chacun enveloppant un simple <path> geometrique.
  - Le <svg> n'a NI role, NI aria-label, NI <title>. Totalement opaque.
  - Les 15 <a> n'ont NI texte, NI aria-label, NI <title> => 15 liens sans nom accessible.
    Lighthouse: "Links do not have a discernible name" — ECHEC.
    Un utilisateur au clavier traverse 15 liens annonces "lien" sans savoir ou ils menent.
  - 15 liens pour seulement 7 destinations (chaque service est lie ~2x:
    anneau exterieur colore + anneau interieur blanc).
  - BUG DE DUPLICATION: les segments 2 et 3 ont des donnees de trace `d` STRICTEMENT
    IDENTIQUES et pointent tous deux vers #section2, avec des remplissages differents
    (#D0E3FF puis #BDD8FF). Deux formes superposees au meme endroit; la seconde
    recouvre la premiere. Copier-coller non corrige: la teinte #BDD8FF prevue pour
    un segment propre est appliquee a un doublon.
  - POINT POSITIF: les 7 ancres cibles (#section1 a #section7) existent bien sur
    /fr/general-accounting. Les liens fonctionnent.
  - Le contenu de chaque service n'est donc atteignable que par un clic dans une roue
    non etiquetee => friction UX + contenu invisible pour l'exploration semantique.

## AUTRES AUDITS LIGHTHOUSE EN ECHEC (confirmations independantes)
  - "Document doesn't have a valid hreflang" — ECHEC. Lighthouse cite textuellement:
        <link rel="alternate" hreflang="fr" href="/" />
        <link rel="alternate" hreflang="ro" href="/ro" />
    => confirme independamment que les hreflang relatifs sont invalides.
  - "Heading elements are not in a sequentially-descending order" — ECHEC.
    Noeud incrimine: <h3 class="text-2xl md:text-3xl text-center font-normal">
    => confirme le saut H1 -> H3.
  - "Eliminate render-blocking resources" — 100 ms a gagner
    (le CSS 4814eb297add952b.css bloque le rendu, 150 ms, 6448 octets)
  - "Preconnect to required origins" — 140 ms a gagner sur umami.kago-group.com
    (le script est preload mais l'origine n'est pas preconnectee)
  - "Avoid serving legacy JavaScript to modern browsers" — 14 Kio
    (chunk 82f86bbf1a6afe9a.js: 13 772 octets de polyfills inutiles)
  - "Reduce unused JavaScript" — 23 Kio inutilises dans 82f86bbf1a6afe9a.js
    (23 465 octets sur 67 264 = 35% du chunk jamais execute)
  - "Ensure text remains visible during webfont load" / "Font display" — 30 ms
    Fichier en cause: slick.265d68e3.woff (la police d'icones du carousel, sans font-display)
  - "Improve image delivery" — 13 Kio

## NUANCE IMPORTANTE SUR LE SCORE D'ACCESSIBILITE
Lighthouse donne 95/100 en accessibilite. C'est un score FLATTEUR:
les controles automatises ne couvrent qu'environ 30% des criteres WCAG.
Ils ne detectent PAS: l'absence de landmarks semantiques, l'absence de lien d'evitement,
l'absence d'indicateur de focus visible, l'absence de prefers-reduced-motion,
la pertinence reelle des textes alternatifs ("Image descriptive"), ni l'utilisabilite
au clavier de la roue SVG.
=> Les deux constats coexistent: 95/100 automatique, mais plusieurs echecs WCAG 2.2 AA
   averes en audit manuel. Ne pas se fier au seul score.

## IDs presents dans le HTML (indice d'architecture)
  id="header", id="header-logo", id="logo" existent
  => il y a bien un conteneur d'en-tete, mais c'est un <div id="header">,
     PAS un element <header>. Meme logique pour tout le reste.

# ===== 4e PASSE — LIGHTHOUSE MULTI-PAGES + LA CARTE GOOGLE MAPS =====

## Scores Lighthouse par page (source: Lighthouse 12.8.2 en local)
  PAGE                                PERF  A11Y   BP  SEO      FCP     LCP     TBT   CLS
  /fr (mobile)                          89    95  100   92    1,2 s   3,8 s   10 ms     0
  /fr (DESKTOP)                         99    95  100   92    0,3 s   0,8 s    0 ms     0
  /ro (mobile)                          89    95  100   92    1,2 s   3,8 s    0 ms     0
  /fr/general-accounting (mobile)       96    94  100   92    1,1 s   2,7 s   10 ms     0
  /fr/contact (mobile)                  79    90  100   92    0,9 s   5,8 s    0 ms     0

ENSEIGNEMENTS:
- En DESKTOP le site est excellent (99/100, LCP 0,8 s). Le probleme est MOBILE-SPECIFIQUE.
  C'est le pire cas possible: la recherche locale ("comptable pres de moi") est
  majoritairement mobile.
- LA PAGE CONTACT EST LA PIRE DU SITE: perf 79, LCP 5,8 s, a11y 90.
  C'est la page la plus critique pour la conversion. Elle est la plus degradee.
- Le score SEO est identique (92) sur les 5 pages: les defauts sont structurels,
  pas propres a une page.

## Echecs presents sur les 5 pages sans exception
  - Heading elements are not in a sequentially-descending order
  - Links do not have a discernible name
  - Document doesn't have a valid hreflang
  - Reduce unused JavaScript / Legacy JavaScript / Avoid serving legacy JavaScript
  - Render blocking requests / Network dependency tree

## LA CARTE GOOGLE MAPS — non declaree, non consentie, et tres lourde
Presente dans le HTML SERVI de /fr/contact ET /ro/contact:

  <iframe height="250" width="100%" loading="lazy" class="w-full rounded-lg"
     src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10070.93994200018
          !2d4.4855783!3d50.8731058!...!2sTMF%20Compta!5e0!3m2!1sfr!2sbe
          !4v1682965907037!5m2!1sfr!2sbe">

ATTRIBUTS: title=ABSENT, referrerpolicy=ABSENT, allowfullscreen=ABSENT,
           sandbox=ABSENT, allow=ABSENT. Seul loading="lazy" est present.
(Le parametre 4v1682965907037 est un horodatage: l'iframe a ete generee le 1er mai 2023.)
(La langue est figee a 1sfr — la carte reste en FRANCAIS sur la page ROUMAINE.)

### a) Accessibilite
  <iframe> sans attribut title => echec WCAG 4.1.2. Lighthouse le confirme:
  "<frame> or <iframe> elements do not have a title" — c'est ce qui fait chuter
  le score a11y de /fr/contact a 90 (contre 95 ailleurs).
  CORRECTIF: title="Carte de localisation de TMF Compta, Sterrebeekstraat 154, Zaventem"

### b) Performance — c'est le plus gros poste du site
  Mesure Lighthouse sur /fr/contact, repartition par hote:
      maps.googleapis.com    14 requetes   387 240 octets
      maps.gstatic.com        1 requete     76 713 octets
      tmfcompta.be           19 requetes   275 794 octets
      umami.kago-group.com    3 requetes      2 564 octets
      www.google.com          1 requete       1 406 octets
  => Google Maps pese 464 Ko, soit PLUS QUE TOUT LE RESTE DU SITE REUNI,
     sur la page la plus importante pour la conversion.
  => Lighthouse: "Minimize third-party usage — Google Maps, 463 953 octets"
  => l'element LCP de /fr/contact est <img alt="Contact" loading="lazy" data-nimg="fill">
     (banniere), egalement en chargement paresseux.

### c) RGPD / ePrivacy — point le plus sensible
  VERIFIE: sur tmfcompta.be lui-meme, document.cookie et localStorage restent VIDES.
  Le site en premiere partie ne depose aucun cookie. C'est exact.
  MAIS l'iframe Maps est un contexte TIERS cross-origin: ses cookies sont poses sur
  le domaine google.com et sont donc INVISIBLES depuis document.cookie de la page
  parente. L'absence de cookie mesuree cote tmfcompta.be ne prouve rien sur Google.
  FAITS ETABLIS:
    - l'iframe est dans le HTML rendu par le serveur, donc chargee sans aucune action
      de l'utilisateur (loading="lazy" ne fait que retarder jusqu'a l'approche du viewport)
    - elle declenche 15 requetes vers des serveurs Google
    - elle transmet a Google l'adresse IP du visiteur, l'en-tete Referer (la politique
      du site est origin-when-cross-origin, donc l'origine est transmise) et les
      caracteristiques du navigateur
    - AUCUNE banniere de consentement n'existe sur le site
    - les mentions legales NE MENTIONNENT PAS Google Maps (elles ne parlent que de
      Google Analytics, qui lui n'est meme pas utilise)
  => transfert de donnees vers un tiers, sans information ni consentement prealable.
     Plusieurs autorites europeennes ont sanctionne ce schema pour Google Fonts et
     Google Maps. A faire valider par un conseil juridique belge.
  CORRECTIFS possibles, par ordre de simplicite:
    1. remplacer la carte par une image statique + un lien "Ouvrir dans Google Maps"
       (zero requete tierce, zero consentement requis, et ~460 Ko economises)
    2. charger la carte au clic seulement ("cliquez pour afficher la carte"), avec
       mention explicite du transfert vers Google
    3. conserver la carte mais l'inclure dans une banniere de consentement conforme
    4. utiliser un fond de carte europeen sans traceur (OpenStreetMap / MapLibre)

## Contradiction supplementaire des mentions legales
Les mentions legales declarent Google Analytics (absent) et taisent:
  - Umami, heberge chez le prestataire Kago Group (present)
  - Google Maps, qui transfere des donnees a Google (present)
  - les avatars des auteurs d'avis charges depuis lh3.googleusercontent.com (present)
=> les trois traitements tiers reellement en oeuvre sont TOUS non declares,
   et le seul traitement declare n'existe pas.

## Avatars Google des auteurs d'avis
Les 5 photos de profil des avis proviennent de lh3.googleusercontent.com et sont
passees par le proxy /_next/image de tmfcompta.be. Deux consequences:
  - ce sont des donnees personnelles de tiers (photo + nom), reproduites sur le site
    sans base legale documentee ni mention dans la politique de confidentialite
  - les URL Google de ces avatars sont instables: si un auteur change sa photo ou
    supprime son compte, l'image casse. Aucun repli n'est prevu.

# ===== 5e PASSE — LE POIDS DU HTML EXPLIQUE + LA SOCIETE SOEUR =====

## POURQUOI LA PAGE D'ACCUEIL FAIT 227 Ko : la roue de services
Decomposition mesuree de fr.html (227 241 octets):
  <head>                   1 953 o   ( 0,9%)
  <body>                 225 288 o   (99,1%)
  scripts inline (RSC)    11 435 o   ( 5,0%)   <- la charge RSC n'est PAS le probleme
  attributs class          10 393 o   ( 4,6%)
  SVG INLINE             153 928 o   (67,7%)   <- VOILA LE PROBLEME

Un SEUL element, la roue de services, pese 153 046 octets:
  40 <path>, 15 <a>, 7 <filter>/<mask>, 0 <text>
  somme des attributs d= : 150 168 octets
  LE PLUS LONG ATTRIBUT d= FAIT A LUI SEUL 33 596 OCTETS (33 Ko)
  => export vectoriel brut non optimise (decimales pleine precision, type Figma/Illustrator)

Repartition par page:
  PAGE                          HTML total   SVG inline   % SVG   paths
  /fr                              227 241      153 928   67,7%      42
  /fr/general-accounting           183 934      153 928   83,7%      42
  /ro                              235 829      162 676   69,0%      42
  /ro/general-accounting           192 426      162 676   84,5%      42
  /fr/about                         20 936          882    4,2%       2
  /fr/legal                         25 264          882    3,5%       2
  /fr/contact                       22 090        3 062   13,9%       7

Effet cumule: ce SVG est inline dans 4 pages, en 2 langues, ET le HTML est servi avec
cache-control: no-store. Il est donc retransmis INTEGRALEMENT a chaque affichage.
CORRECTIFS (par ordre de rendement):
  1. passer le SVG dans SVGO (reduction typique de 60 a 80% sur ce type d'export)
  2. l'externaliser en fichier .svg servi avec cache immutable au lieu de l'inliner
     (il devient alors telecharge une seule fois pour tout le site)
  3. reduire la precision des coordonnees a 2 decimales
  4. supprimer les 7 <filter>/<mask> si l'effet n'est pas indispensable
Gain estime: environ deux tiers du poids des deux plus grosses pages.

## Temoignages dupliques
Chaque temoignage apparait 4 fois dans le HTML de l'accueil
(3 copies visibles via les clones du carousel + 1 dans la charge RSC).

## LA SOCIETE SOEUR : tmfassist.be — une reference interne deja existante
FAIT VERIFIE (recherche BCE + consultation du site):
  TMF Compta SNC/VOF, BCE 0505985850, constituee le 05/12/2014,
  siege Sterrebeekstraat 154A, 1930 Zaventem, capital 1 000 EUR, 1 a 4 employes.
  Gerants: Marius Trufin (depuis le 05/12/2014) ET Michel Tamine (depuis le 08/06/2015).
  Agree IPCF (devenu ITAA en 2019) depuis le 29/06/2015.
  => l'adresse 154A des mentions legales est la BONNE; c'est la page contact
     (Sterrebeekstraat 154, sans le A) qui est incomplete.
  => la frise "2014" de la page A propos est exacte.

Le meme groupe exploite https://www.tmfassist.be (creation de societes, statut
independant, gestion sociale). COMPARAISON STRUCTURELLE DES DEUX SITES:

                    tmfcompta.be/fr    tmfassist.be
  JSON-LD                        0              10   <-- absent chez tmfcompta
  balises og:                    0              10   <-- absent chez tmfcompta
  balises twitter:               0               4   <-- absent chez tmfcompta
  <main>                         0               1   <-- absent chez tmfcompta
  <nav>                          0               1   <-- absent chez tmfcompta
  <header>                       0               1   <-- absent chez tmfcompta
  <footer>                       0               1   <-- absent chez tmfcompta
  <section>                      0              10   <-- absent chez tmfcompta
  <article>                      0               6   <-- absent chez tmfcompta
  <h2>                           0               9   <-- absent chez tmfcompta
  canonical                      0               0   (manquant des deux cotes)

Schemas JSON-LD deja implementes sur tmfassist.be:
  - ["AccountingService","ProfessionalService","Organization"] (TMF Assist)
  - WebSite
  - WebPage
  - HowTo  "Comment lancer son entreprise en Belgique 100% en ligne"
  - FAQPage
=> C'EST EXACTEMENT CE QUI MANQUE A tmfcompta.be, ET C'EST DEJA ECRIT EN INTERNE.
   Le correctif SEO le plus rentable est un copier-adapter depuis le site frere.

Sa proposition de valeur est aussi nettement plus forte:
  H1 tmfassist : "Creation de Societe en Belgique — Lancez votre activite sans la paperasse."
  H1 tmfcompta : "Comptable-Fiscaliste, Situe a Zaventem"

## LIEN UNIDIRECTIONNEL ENTRE LES DEUX SITES
  tmfassist.be -> tmfcompta.be : OUI (lien present)
  tmfcompta.be -> tmfassist.be : NON (0 occurrence de "tmfassist" ou "TMF Assist"
                                      dans les 10 pages)
=> maillage a sens unique. tmfcompta.be ne capitalise pas sur son site frere,
   alors qu'il decrit "Conseil en creation d'entreprise" comme un de ses 7 services
   — service que tmfassist.be opere deja et vend en ligne.

## ABSENCES TOTALES VERIFIEES SUR LES 10 PAGES DE tmfcompta.be
  "ITAA" / "IPCF"                : 0 occurrence  <- alors que le cabinet est agree depuis 2015
  "agree" / "agrement"           : 0 occurrence  <- le titre est pourtant protege par la loi
  "TMF Assist"                   : 0 occurrence  <- societe soeur du meme groupe
  "Tamine"                       : 0 occurrence  <- cogerant depuis 2015
  horaires (lundi, ouvert, ...)  : 0 occurrence
  le numero BCE                  : present UNIQUEMENT sur /legal ("BE0505985850 (BCE)"),
                                   jamais presente comme numero de TVA, jamais dans le footer
