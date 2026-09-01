/**
 * Types partagés pour tout le contenu de src/content/.
 *
 * ── Convention de localisation (à respecter par tous les agents) ──────────
 *
 * 1. Collections de contenu (services, faq, timeline, posts) :
 *    chaque item est UN objet avec les champs invariants par langue au
 *    premier niveau (id, hue, icon, date…) et un sous-objet `fr` / `ro`
 *    pour tout ce qui est localisé (titre, texte, slug, meta…).
 *    Exemple d'usage : `service.fr.title` ou `service[locale].title`.
 *
 * 2. Avis clients (reviews) : chaque avis N'EST PAS traduit — il porte un
 *    champ `lang` unique (la langue dans laquelle le client l'a écrit) et
 *    ses champs sont au premier niveau, pas de sous-objet fr/ro.
 *
 * 3. Dictionnaire d'interface (ui.ts) : c'est l'exception. Comme il s'agit
 *    d'un dictionnaire plat consommé par locale entière, il est exporté en
 *    `Record<Locale, UiDictionary>` : `UI[locale].nav.home`.
 *
 * Pourquoi cette double convention : les collections gagnent en lisibilité
 * à garder le fr et le ro d'un même item côte à côte (facile à comparer,
 * à réviser, à valider) ; le dictionnaire d'UI gagne en ergonomie d'usage
 * à être indexé directement par la locale courante dans les composants.
 *
 * Aucun champ optionnel sauf mention explicite (`?`) — un item incomplet
 * dans une locale doit être un choix visible dans le code, pas un `undefined`
 * silencieux.
 */

// Ré-export pratique : la plupart des fichiers de contenu n'ont besoin que
// de `Locale` et pas du reste de i18n.ts.
export type { Locale } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'

/**
 * Les 9 teintes de catégorie du design system (voir globals.css).
 * Une teinte = un service, dans l'ordre où elles sont définies en CSS.
 */
export type Hue = 'c1' | 'c2' | 'c3' | 'c4' | 'c5' | 'c6' | 'c7' | 'c8' | 'c9'

/**
 * Jeu d'icônes que `components/Icon.tsx` doit implémenter (SVG inline).
 * Union fermée : toute icône utilisée par le contenu doit être ajoutée ici
 * ET dans Icon.tsx — pas de `string` libre.
 */
export type IconName =
  | 'ledger' // tenue de comptabilité
  | 'percent' // conseil fiscal
  | 'rocket' // création d'entreprise
  | 'compass' // aide à la gestion
  | 'users' // social
  | 'handshake' // accompagnement de la personne
  | 'shield' // missions spéciales
  | 'send' // facturation électronique Peppol
  | 'search-check' // contrôles fiscaux
  | 'building' // société / SRL
  | 'user' // indépendant / personne physique
  | 'calendar' // rendez-vous / échéances
  | 'file-text' // documents / déclarations
  | 'globe' // roumain / international
  | 'map-pin' // implantation locale
  | 'euro' // honoraires / tarifs
  | 'clock' // délais
  | 'check-circle' // validation / conformité
  | 'arrow-right' // liens / CTA

// ─────────────────────────── Services ────────────────────────────────────

export interface ServiceLocaleContent {
  /** Slug propre à la locale, utilisé avec `servicePath(locale, slug)`. */
  slug: string
  /** Titre court affiché en carte, en fil d'Ariane, en <h1> de la page service. */
  title: string
  /** Résumé d'une phrase pour les cartes et les listes. */
  summary: string
  /** Description longue, en paragraphes distincts (rendus en <p> successifs). */
  description: string[]
  /** Liste de prestations concrètes (5 à 8 puces). */
  bullets: string[]
  /** <title>, < 60 caractères. */
  metaTitle: string
  /** <meta description>, 140–160 caractères. */
  metaDescription: string
}

export interface Service {
  /** Identifiant stable, indépendant de la langue (ordre du site d'origine). */
  id: string
  /** Teinte de catégorie du design system (c1…c9), une par service. */
  hue: Hue
  icon: IconName
  fr: ServiceLocaleContent
  ro: ServiceLocaleContent
}

// ─────────────────────────── Avis clients ─────────────────────────────────

export interface Review {
  id: string
  author: string
  /** Note sur 5, tous les avis repris sont à 5. */
  rating: 1 | 2 | 3 | 4 | 5
  /** Texte tel qu'affiché par Google (« il y a 3 ans », « acum un an »…). */
  relativeTime: string
  /** Langue d'origine de l'avis — un avis n'est jamais traduit. */
  lang: Locale
  /** Texte intégral de l'avis, retours à la ligne conservés via \n. */
  text: string
}

// ───────────────────────────── FAQ ─────────────────────────────────────

export type FaqCategory =
  | 'general'
  | 'tva'
  | 'peppol'
  | 'changement'
  | 'roumain'
  | 'statut'
  | 'honoraires'
  | 'delais'
  | 'controle'
  | 'comptes-annuels'
  | 'creation'
  | 'documents'
  | 'rdv'

export interface FaqLocaleContent {
  question: string
  answer: string
}

export interface FaqItem {
  id: string
  category: FaqCategory
  fr: FaqLocaleContent
  ro: FaqLocaleContent
}

// ─────────────────────────── Frise chronologique ───────────────────────────

export interface TimelineLocaleContent {
  title: string
  description: string
}

export interface TimelineItem {
  id: string
  /** Année ou plage d'années affichée (ex. "2014", "2025-2026"). */
  year: string
  fr: TimelineLocaleContent
  ro: TimelineLocaleContent
}

// ────────────────────────────── Articles ───────────────────────────────

/**
 * Corps d'article en blocs typés plutôt qu'en markdown : évite toute
 * dépendance de parsing (interdite par la SPEC) et garantit un rendu en
 * balises sémantiques correctes (h2/h3/p/ul/ol/blockquote).
 */
export type PostBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'quote'; text: string; cite?: string }

export interface PostContent {
  slug: string
  title: string
  /** Résumé pour la carte article / meta description sociale. */
  excerpt: string
  metaTitle: string
  metaDescription: string
  body: PostBlock[]
}

export interface Post {
  id: string
  /** Date de publication, ISO 8601 (YYYY-MM-DD). */
  date: string
  /** Temps de lecture estimé, en minutes. */
  readingMinutes: number
  fr: PostContent
  /** Optionnel : au moins 1 article doit avoir sa version ro. */
  ro?: PostContent
}
