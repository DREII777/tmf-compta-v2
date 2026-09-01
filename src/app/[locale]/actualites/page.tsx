import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NewsIndexView } from '@/app/_news/NewsIndex'
import { frListItems } from '@/app/_news/lookup'
import { UI } from '@/content/ui'
import { alternatesFor, isLocale } from '@/lib/i18n'

/**
 * Index des actualités, version française (`ROUTES.news.fr === 'actualites'`).
 * La version roumaine vit dans le dossier `noutati/` (`ROUTES.news.ro`),
 * car les segments Next.js sont littéraux : un même dossier ne peut pas
 * répondre à deux slugs différents selon la langue.
 */

export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return [{ locale: 'fr' as const }]
}

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale) || locale !== 'fr') return {}
  const ui = UI[locale].newsPage
  return {
    title: { absolute: ui.metaTitle },
    description: ui.metaDescription,
    alternates: alternatesFor('news', locale),
  }
}

export default async function ActualitesPage({ params }: PageProps) {
  const { locale } = await params
  if (!isLocale(locale) || locale !== 'fr') notFound()
  return <NewsIndexView locale={locale} items={frListItems()} />
}
