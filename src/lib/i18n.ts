/**
 * i18n — deux locales, des slugs propres à chaque langue.
 *
 * Règle SEO : chaque page existe à une URL distincte par langue, avec
 * canonical auto-référente et hreflang réciproques (fr-BE / ro / x-default).
 * Aucun contenu n'est traduit côté client.
 */

export const LOCALES = ['fr', 'ro'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'fr'

export const HREFLANG: Record<Locale, string> = { fr: 'fr-BE', ro: 'ro' }

/** Clé de page → slug par locale. La clé est stable, le slug est traduit. */
export const ROUTES = {
  home:        { fr: '',                              ro: '' },
  services:    { fr: 'services',                      ro: 'servicii' },
  about:       { fr: 'a-propos',                      ro: 'despre-noi' },
  method:      { fr: 'methode',                       ro: 'cum-lucram' },
  contact:     { fr: 'contact',                       ro: 'contact' },
  faq:         { fr: 'faq',                           ro: 'intrebari-frecvente' },
  local:       { fr: 'comptable-zaventem',            ro: 'contabil-zaventem' },
  romanian:    { fr: 'comptable-roumain',             ro: 'contabil-roman-belgia' },
  news:        { fr: 'actualites',                    ro: 'noutati' },
  legal:       { fr: 'mentions-legales',              ro: 'informatii-legale' },
  privacy:     { fr: 'confidentialite',               ro: 'confidentialitate' },
} as const

export type RouteKey = keyof typeof ROUTES

/** Segment parent des pages de service, par locale. */
export const SERVICE_BASE: Record<Locale, string> = { fr: 'services', ro: 'servicii' }

/** Construit un chemin absolu depuis une clé de route. */
export function path(locale: Locale, key: RouteKey, sub?: string): string {
  const slug = ROUTES[key][locale]
  const parts = ['', locale, slug, sub].filter((p) => p !== '' && p !== undefined)
  return '/' + parts.join('/')
}

/** Chemin d'une page de service. */
export function servicePath(locale: Locale, slug: string): string {
  return `/${locale}/${SERVICE_BASE[locale]}/${slug}`
}

/** URL absolue, pour canonical / hreflang / JSON-LD. */
export function abs(p: string): string {
  return `https://tmfcompta.be${p}`
}

/** L'autre locale — pour le sélecteur de langue. */
export function otherLocale(locale: Locale): Locale {
  return locale === 'fr' ? 'ro' : 'fr'
}

/**
 * Bloc `alternates` de l'API Metadata de Next.
 * `paths` donne le chemin équivalent dans chaque locale.
 */
export function alternates(paths: Record<Locale, string>) {
  return {
    canonical: abs(paths.fr === paths.ro ? paths.fr : paths[DEFAULT_LOCALE]),
    languages: {
      'fr-BE': abs(paths.fr),
      ro: abs(paths.ro),
      'x-default': abs(paths.fr),
    },
  }
}

/** Alternates pour une page identifiée par sa clé de route. */
export function alternatesFor(key: RouteKey, current: Locale, sub?: string) {
  const fr = path('fr', key, sub)
  const ro = path('ro', key, sub)
  return {
    canonical: abs(path(current, key, sub)),
    languages: { 'fr-BE': abs(fr), ro: abs(ro), 'x-default': abs(fr) },
  }
}

export function isLocale(v: string): v is Locale {
  return (LOCALES as readonly string[]).includes(v)
}
