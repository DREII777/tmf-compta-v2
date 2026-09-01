import type { MetadataRoute } from 'next'
import { POSTS } from '@/content/posts'
import { SERVICES } from '@/content/services'
import { abs, alternates, LOCALES, path, servicePath, type Locale, type RouteKey } from '@/lib/i18n'

/** Toutes les pages « simples » (une URL par locale, un seul niveau). */
const STATIC_KEYS: RouteKey[] = [
  'home',
  'services',
  'about',
  'method',
  'contact',
  'faq',
  'local',
  'romanian',
  'news',
  'legal',
  'privacy',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date()
  const entries: MetadataRoute.Sitemap = []

  for (const key of STATIC_KEYS) {
    const languages = alternates({ fr: path('fr', key), ro: path('ro', key) }).languages
    for (const locale of LOCALES) {
      entries.push({
        url: abs(path(locale, key)),
        lastModified: buildDate,
        changeFrequency: key === 'home' ? 'weekly' : 'monthly',
        priority: key === 'home' ? 1 : 0.7,
        alternates: { languages },
      })
    }
  }

  for (const service of SERVICES) {
    const paths: Record<Locale, string> = {
      fr: servicePath('fr', service.fr.slug),
      ro: servicePath('ro', service.ro.slug),
    }
    const languages = alternates(paths).languages
    for (const locale of LOCALES) {
      entries.push({
        url: abs(paths[locale]),
        lastModified: buildDate,
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: { languages },
      })
    }
  }

  for (const post of POSTS) {
    const frPath = path('fr', 'news', post.fr.slug)
    const roPath = post.ro ? path('ro', 'news', post.ro.slug) : undefined
    const languages: Record<string, string> = { 'fr-BE': abs(frPath), 'x-default': abs(frPath) }
    if (roPath) languages.ro = abs(roPath)

    entries.push({
      url: abs(frPath),
      lastModified: new Date(post.date),
      changeFrequency: 'yearly',
      priority: 0.6,
      alternates: { languages },
    })
    if (roPath) {
      entries.push({
        url: abs(roPath),
        lastModified: new Date(post.date),
        changeFrequency: 'yearly',
        priority: 0.6,
        alternates: { languages },
      })
    }
  }

  return entries
}
