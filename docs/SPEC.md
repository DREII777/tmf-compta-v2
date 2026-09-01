# TMF Compta V2 — spécification de build

Contrat commun à tous les agents. **Ne pas dévier de ce document.**

## 0. Rappels non négociables

- **Identité légale** (vérifiée BCE 31/08/2026) : `TMF Compta SRL`, **BE 1027.440.826**,
  Sterrebeekstraat 154, 1930 Zaventem. Administrateur : Michel Tamine.
  **Ne JAMAIS écrire** `BE0505985850` (c'est TMF Assist, société sœur à Ixelles), ni « SNC ».
- **Continuité** : même équipe, même adresse, même expertise **depuis 2014**. La SRL de 2025
  est une restructuration juridique, pas un nouveau cabinet. Formuler ainsi :
  « Une équipe qui accompagne indépendants et PME depuis 2014, aujourd'hui réunie au sein de
  TMF Compta SRL. » Ne jamais présenter 2025 comme la création de l'activité.
- **Agrément** : `Expert-comptable (fiscaliste) ITAA`, **agréé sans interruption depuis 2014**.
  La date du 26/03/2026 visible à la BCE est la *ré-inscription* de la SRL après le passage
  SNC → SRL, PAS une nouvelle accréditation. **Ne jamais écrire « agréé depuis 2026 ».**
  À afficher — c'est l'argument de confiance le plus fort.
- **Langues** : FR et RO. Le RO doit être **rédigé**, pas traduit mot à mot. Diacritiques à
  virgule obligatoires : `ș` `ț` (jamais `ş` `ţ`).

## 1. Pile

Next.js 16 App Router · React 19 · TypeScript strict · Tailwind CSS v4 (config CSS-first).
Pas de librairie UI, pas de framer-motion, pas de react-slick. Icônes = SVG inline.

## 2. Design system

Tout est dans `src/app/globals.css`. **Utiliser exclusivement les tokens**, jamais de hex brut.

| Rôle | Classe Tailwind |
|---|---|
| Fond page | `bg-paper` (blanc) |
| Fond alterné | `bg-soft` / `bg-soft-2` |
| Texte | `text-ink` / `text-ink-2` / `text-ink-3` |
| Marque | `text-brand` `bg-brand` `border-brand` (+ `-2`, `-3`, `-tint`) |
| Accent chaud | `text-accent` `bg-accent-tint` |
| Bordures | `border-line` / `border-line-2` |
| Catégories | `text-c1`…`text-c9` et `bg-c1-bg`…`bg-c9-bg` |

**Le fond est BLANC.** Le navy est un accent de marque, pas une couleur de fond généralisée.
Chaque service porte sa propre teinte de catégorie (c1…c9) — c'est ce qui donne de la couleur.

Typo : `font-display` (Fraunces) pour h1–h4, sans (Figtree) par défaut.
Utilitaires : `.wonk`, `.opsz-lg`, `.tnum`, `.rv` (révélation au défilement).

⚠️ **La révélation `.rv` joue sur `opacity` ET `transform`. Ne pas retirer le
fondu.** Il l'a déjà été une fois, au motif qu'un texte en cours de transition
ferait échouer l'audit de contraste : c'est faux. axe-core lit un instantané de
style calculé après stabilisation et écarte un élément à `opacity: 0` (résultat
« incomplete », non compté par Lighthouse) au lieu de le mettre en échec —
vérifié, l'accessibilité reste à 100 avec le fondu. Sans lui, il ne reste qu'un
glissement de 16 px, imperceptible : l'animation semble avoir disparu.

Deux garde-fous à préserver ensemble :
- `.rv` seule n'a **aucune** règle ; c'est `Reveal.tsx` qui pose `.rv-armed` au
  montage. Sans JavaScript, rien n'est escamoté.
- Le bloc `prefers-reduced-motion` force `opacity: 1 !important` sur `.rv-armed`.
  Sans cette ligne, activer la réduction de mouvement en cours de session laisse
  le visiteur sur du contenu invisible.

Rayons : `rounded-sm|DEFAULT|lg|xl`. Ombres : `shadow-xs|sm|lg|xl`.
Conteneur : `max-w-site mx-auto px-6`.

Rythme de section : `py-16 md:py-24`. Titres de section : `text-3xl md:text-5xl font-display wonk`.

## 3. i18n

`src/lib/i18n.ts` — utiliser `path()`, `servicePath()`, `alternatesFor()`, `abs()`.
Les slugs diffèrent par langue (`/fr/services` vs `/ro/servicii`). **Jamais de lien en dur.**

Chaque page exporte :
```ts
export const dynamic = 'force-static'
export const dynamicParams = false
export function generateStaticParams() { return LOCALES.map(locale => ({ locale })) }
export async function generateMetadata({ params }): Promise<Metadata> {
  const { locale } = await params
  return { title, description, alternates: alternatesFor('<key>', locale) }
}
```
`params` est une **Promise** dans Next 16 : toujours `await params`.

⚠️ **`dynamicParams = false` est obligatoire sur tout segment à paramètre.**
Sans lui, une URL au paramètre inconnu est rendue à la demande et le
`notFound()` levé depuis le composant ne remonte pas jusqu'à la frontière 404 :
Next 16.3.4 sert alors un `<html id="__next_error__">` au corps vide. Le défaut
se reproduit sur une application Next nue de cinq fichiers, il n'est donc pas
propre à ce projet. Avec `dynamicParams = false`, le paramètre inconnu ne
correspond à aucune route et `app/not-found.tsx` s'affiche normalement, en 404.

## 4. Arborescence

```
src/app/
  globals.css                   ✅ écrit
  not-found.tsx                 404 bilingue — porte sa PROPRE enveloppe <html>
  sitemap.ts  robots.ts
  api/contact/route.ts
  [locale]/
    layout.tsx                  layout RACINE : <html lang={locale}>, <body>,
                                metadata globale, Header + main + Footer, JSON-LD
    page.tsx                    accueil
    services/page.tsx           index des 9 services
    services/[slug]/page.tsx    détail d'un service
    a-propos|despre-noi/…       → un seul dossier par clé, slug via ROUTES
    …
```
⚠️ Il n'y a **pas** de `src/app/layout.tsx`. C'est `[locale]/layout.tsx` qui
fait office de layout racine — seul moyen que les pages roumaines servent
réellement `lang="ro"` (WCAG 3.1.1), le layout racine n'ayant pas accès à
`params`. C'est le motif i18n officiel de Next. Conséquence : `not-found.tsx`
est rendu hors de ce layout et fournit donc son propre `<html>`/`<body>`.

⚠️ Les slugs traduits imposent un routage par clé. Utiliser un segment dynamique
`[...slug]` **non**. Créer plutôt un dossier par page avec le slug FR, et gérer le slug RO
via `generateStaticParams` + `redirects` dans next.config. **Solution retenue :**
un dossier `src/app/[locale]/[page]/page.tsx` qui résout la clé depuis le slug via `ROUTES`.

## 5. Composants partagés (`src/components/`)

- `Header.tsx` — sticky, logo SVG, nav, sélecteur de langue (**vrais `<a href>`**, pas de
  `<button>`), téléphone visible, CTA « Prendre rendez-vous », menu mobile avec
  `aria-expanded` + `aria-controls` + fermeture Échap.
- `Footer.tsx` — 4 colonnes, identité légale complète, badge ITAA, lien vers TMF Assist.
- `Section.tsx`, `Container.tsx`, `Button.tsx` (variants `primary|secondary|ghost`),
  `Card.tsx`, `Tag.tsx`, `Icon.tsx` (jeu d'icônes SVG inline), `Reveal.tsx` (client, `.rv`),
  `JsonLd.tsx`, `Breadcrumbs.tsx`, `Faq.tsx` (`<details>`), `ContactForm.tsx` (client),
  `LangSwitch.tsx`, `CtaBand.tsx`, `ServiceCard.tsx`, `Stat.tsx`, `Timeline.tsx`, `Reviews.tsx`.

## 6. Accessibilité — exigences dures

`<main>` `<nav>` `<header>` `<footer>` sur chaque page · skip link · hiérarchie h1→h2→h3 sans
saut · focus visible (déjà global) · tous les `<img>` avec alt **utile** (jamais
« Image descriptive ») · formulaires avec `<label>`, `required`, `autocomplete`,
`aria-describedby` pour les erreurs, `role="alert"` sur le message d'erreur ·
`aria-current="page"` sur le lien actif · cibles ≥ 44 px · `prefers-reduced-motion` respecté.

## 7. Performance — exigences dures

- Image LCP : `priority` sur l'image du hero de l'accueil. Toutes les autres en `loading="lazy"`.
- `next/image` avec `width`/`height` explicites.
- Aucune police externe hors Google Fonts (chargées via `next/font/google`, subsets
  `latin` **et** `latin-ext` — indispensable pour le roumain).
- Génération statique partout (`force-static`). Aucun `no-store`.
- **Pas de `scroll-behavior: smooth` sur `<html>`.** Next remet le défilement à
  0 au changement de page ; avec le doux, cette remise devenait une glissade
  animée de ~1,5 s traversant toute la page quittée, qui déclenchait au passage
  chaque observateur de la page d'arrivée et se posait à 69 px du haut. Si le
  doux devait revenir un jour, il faudrait aussi poser
  `data-scroll-behavior="smooth"` sur `<html>` — c'est l'attribut que Next teste
  pour neutraliser le doux pendant une transition de route.
- Réserve d'ancre : `#main` et `[id^='field-']` portent un `scroll-margin-top`.
  Ne PAS utiliser `scroll-padding-top` sur `<html>` : Next le lit dans son test
  de position et cela ferait réapparaître l'atterrissage à 69 px.
- Quatre invariants de `Reveal.tsx`, chacun corrigeant un défaut mesuré :
  1. Le filet de 2,5 s est **désarmé à la première notification**. Sinon toute
     la page se révélait hors écran 2,5 s après le chargement.
  2. Le filet n'est **armé que si l'onglet est visible**. La livraison d'un
     IntersectionObserver passe par l'étape de rendu, absente d'un onglet
     d'arrière-plan, alors que `setTimeout` continue de tirer.
  3. On **n'escamote que ce qui est sous la ligne de déclenchement**. Escamoter
     sans condition faisait clignoter les blocs déjà visibles au chargement.
  4. À la première notification, un bloc **déjà passé au-dessus de la fenêtre**
     (`boundingClientRect.bottom <= 0`) est révélé. L'effet s'exécute avant que
     Next restaure la position : sans cela, au retour arrière, 10 blocs sur 19
     déjà lus repassaient invisibles.
- Carte de contact : **iframe Google Maps autorisée**, avec `loading="lazy"`.
  (Décision client du 01/09/2026 : le blocage par consentement a été jugé superflu —
  aucune autorité de protection des données n'a sanctionné une carte intégrée. Le
  `lazy` suffit à éviter le coût au chargement. **Ne pas la retirer.**)

## 8. SEO — exigences dures

- `canonical` auto-référente + `hreflang` fr-BE / ro / x-default sur **chaque** page.
- JSON-LD : `AccountingService` (layout locale), `BreadcrumbList` (pages internes),
  `FAQPage` (page FAQ + accueil), `Service` (pages service), `Article` (actualités).
- `sitemap.ts` : toutes les URL des 2 locales, avec `alternates.languages`, `lastModified` réel.
- `robots.ts` : autorise tout sauf `/api/`.
- Titles < 60 caractères, uniques, avec le mot-clé local. Descriptions 140–160 caractères.

## 9. Contenu à préserver (site actuel)

Reprendre **intégralement** : le hero, « À chaque phase de votre entreprise »
(Création / Gestion / Expansion), « Qui sommes-nous ? », « Notre mission », « Notre histoire »
(2014 / 2015 / 2016 / 2022 + une étape 2025-2026), les 6 arguments de « Pourquoi nous
choisir ? », les 7 services du « service en 360° » avec leurs textes complets, les avis
clients FR et RO. Voir `src/content/` (écrit par l'agent contenu).

## 10. Assets

`public/logo.svg` (wordmark TMF) — sert de fichier autonome pour le `logo` du
JSON-LD, que Google va chercher seul : il garde donc son `fill="#002859"`. Le
logo affiché dans l'en-tête est un SVG inline distinct, en `currentColor`.
`public/img/home-illustration.webp` (hero), `home-about.webp`, `home-about-2.webp`,
`home-grid-1|2|3.webp`. Le client fournira d'autres SVG plus tard.

## 11. Interdits

Pas de `any` · pas de `<div>` là où une balise sémantique existe · pas de texte en dur
non traduit · pas de couleur hors token · pas de `dangerouslySetInnerHTML` sauf JSON-LD ·
pas de dépendance npm supplémentaire · pas de commentaire décoratif.
