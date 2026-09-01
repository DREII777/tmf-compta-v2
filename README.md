# TMF Compta — site V2

Refonte complète de `tmfcompta.be`. Next.js 16 (App Router), React 19, TypeScript strict,
Tailwind CSS v4. Site bilingue français / roumain, entièrement statique.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # génère 50 pages statiques
npm start
npm run lint       # ESLint (config plate, eslint-config-next)
npm run typecheck  # vérification des types
```

## Scores Lighthouse (mobile, build de production)

| Page | Perf | A11y | Bonnes pratiques | SEO | FCP | LCP | CLS |
|---|---|---|---|---|---|---|---|
| `/fr` | 95 | **100** | **100** | **100** | 1,1 s | 2,9 s | 0 |
| `/ro` | 95 | **100** | **100** | **100** | 1,1 s | 2,9 s | 0 |
| `/fr/services/conseil-fiscal` | 95 | **100** | **100** | **100** | 1,1 s | 2,9 s | 0 |

Pour mémoire, l'ancien site mesurait 89 / 95 / 100 / 92 avec un LCP de 3,8 s.

## Arborescence

```
src/
├── app/
│   ├── globals.css             ⭐ système de design — tous les tokens
│   ├── not-found.tsx           404 bilingue (porte sa propre enveloppe <html>)
│   ├── sitemap.ts robots.ts manifest.ts
│   ├── api/contact/route.ts    validation + limitation de débit
│   └── [locale]/
│       ├── layout.tsx          layout RACINE : <html lang={locale}>, métadonnées,
│       │                       en-tête, pied de page, JSON-LD
│       ├── opengraph-image.tsx carte de partage 1200×630, une par langue
│       ├── page.tsx            accueil (10 sections)
│       ├── services/           index + [slug] × 9
│       ├── [page]/             routeur générique (à propos, méthode, FAQ, pages locales)
│       ├── contact/ actualites/ noutati/ mentions-legales/ …
├── components/                 26 composants partagés
│   └── home/                   9 sections d'accueil
├── content/                    ⭐ tout le contenu FR + RO, typé
└── lib/
    ├── i18n.ts                 ⭐ locales, ROUTES, path(), alternatesFor()
    └── site.ts                 ⭐ identité légale, NAP
```

### Deux points d'architecture à connaître

- **Il n'y a pas de `src/app/layout.tsx`.** C'est `[locale]/layout.tsx` qui fait office de
  layout racine — seul moyen que les pages roumaines servent réellement `lang="ro"`, le
  layout racine n'ayant pas accès à `params`. C'est le motif i18n officiel de Next.
- **Tout segment à paramètre exporte `dynamicParams = false`.** Sans lui, un `notFound()`
  levé depuis un composant ne remonte pas jusqu'à la frontière 404 et Next 16.3.4 sert un
  document vide. Le défaut se reproduit sur une application Next nue ; voir `docs/SPEC.md` §3.

Les quatre fichiers marqués ⭐ sont le contrat du projet : toute modification de structure
passe par eux. `docs/SPEC.md` détaille les règles suivies pendant le build.

## Routes (50 pages statiques)

| | FR | RO |
|---|---|---|
| Accueil | `/fr` | `/ro` |
| Services | `/fr/services` | `/ro/servicii` |
| Détail service ×9 | `/fr/services/<slug>` | `/ro/servicii/<slug>` |
| À propos | `/fr/a-propos` | `/ro/despre-noi` |
| Méthode | `/fr/methode` | `/ro/cum-lucram` |
| SEO local | `/fr/comptable-zaventem` | `/ro/contabil-zaventem` |
| Niche roumaine | `/fr/comptable-roumanophone` | `/ro/contabil-roman-belgia` |
| FAQ | `/fr/faq` | `/ro/intrebari-frecvente` |
| Contact | `/fr/contact` | `/ro/contact` |
| Actualités | `/fr/actualites` | `/ro/noutati` |
| Mentions légales | `/fr/mentions-legales` | `/ro/informatii-legale` |
| Confidentialité | `/fr/confidentialite` | `/ro/confidentialitate` |

Les anciennes URL (`/general-accounting`, `/about`, `/legal`, `/services`, `/projects`)
redirigent en 308 vers leurs équivalents. C'est ce qui répare les 20 liens 404 du pied de
page de l'ancien site.

## Système de design

Fond **blanc**. Le navy `#002859` (repris du logo) est un accent de marque, pas un fond.
La couleur vient de **neuf teintes de catégorie**, une par service : ambre, émeraude,
violet, rose, azur, sarcelle, orange, indigo, fuchsia.

Typographie : **Fraunces** (titres, variable, axes `opsz`/`WONK`) et **Figtree** (texte),
chargées via `next/font/google` avec les sous-ensembles `latin` **et** `latin-ext` — ce
dernier est indispensable aux diacritiques roumains `ă ș ț`.

Tous les composants consomment les tokens Tailwind (`bg-paper`, `text-ink-2`, `bg-c3-bg`…).
Aucune couleur en dur hors de `globals.css`. Le mode sombre est défini au niveau des tokens
uniquement, donc il fonctionne partout sans code supplémentaire.

## Identité légale

⚠️ **TMF Compta SRL — BE 1027.440.826** — Sterrebeekstraat 154, 1930 Zaventem.
Ne jamais écrire `BE0505985850` ni « SNC » : c'est **TMF Assist**, la société sœur d'Ixelles.
L'identité est centralisée dans `src/lib/site.ts`.

Le site revendique une continuité d'activité depuis 2014 — même équipe, même adresse, même
expertise. La constitution de la SRL en 2025 est présentée comme une restructuration
juridique, ce qu'elle est.

## Ce qui reste à faire

1. **Compléter les mentions légales** : `src/app/_legal/content.ts` contient deux
   placeholders — `[numéro de police]` (assurance RC professionnelle) et
   `[nom de l'hébergeur]`. Ajouter aussi le **numéro d'agrément ITAA**.
2. **Faire relire les pages légales par un conseil belge** avant mise en ligne.
3. **Brancher l'envoi d'e-mail** : `src/app/api/contact/route.ts` valide et limite le débit
   mais ne transmet rien — un `TODO` documente la structure attendue.
4. **Remplacer les illustrations** par les SVG que vous fournirez (`public/img/`).
5. **DNS** : publier SPF, DKIM et DMARC (absents aujourd'hui — voir l'audit, annexe B).
6. Envisager une **version néerlandaise** de l'accueil et du contact : le siège est en
   Région flamande et la dénomination est enregistrée en néerlandais à la BCE.

## Audit d'origine

`AUDIT-tmfcompta.be.md` documente les 150+ constats qui ont motivé cette refonte, et
`ANNEXE-preuves-brutes.md` le journal de collecte.
