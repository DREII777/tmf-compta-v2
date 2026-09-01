import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NewsIndexView } from '@/app/_news/NewsIndex'
import { roListItems } from '@/app/_news/lookup'
import { UI } from '@/content/ui'
import { alternatesFor, isLocale } from '@/lib/i18n'

/**
 * Index des actualités, version roumaine (`ROUTES.news.ro === 'noutati'`).
 * Pendant de `actualites/page.tsx` — voir ce fichier pour l'explication du
 * découpage en deux dossiers par langue.
 */

export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return [{ locale: 'ro' as const }]
}

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale) || locale !== 'ro') return {}
  const ui = UI[locale].newsPage
  return {
    title: { absolute: ui.metaTitle },
    description: ui.metaDescription,
    alternates: alternatesFor('news', locale),
  }
}

export default async function NoutatiPage({ params }: PageProps) {
  const { locale } = await params
  if (!isLocale(locale) || locale !== 'ro') notFound()
  return <NewsIndexView locale={locale} items={roListItems()} />
}
