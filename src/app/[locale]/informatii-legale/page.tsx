import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LegalPageView } from '@/app/_legal/LegalPage'
import { UI } from '@/content/ui'
import { alternatesFor, isLocale } from '@/lib/i18n'

/**
 * Mentions légales, version roumaine (`ROUTES.legal.ro === 'informatii-legale'`).
 * Pendant de `mentions-legales/page.tsx` — voir ce fichier pour l'explication.
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
  const ui = UI[locale].legalPage
  return {
    title: { absolute: ui.metaTitle },
    description: ui.metaDescription,
    alternates: alternatesFor('legal', locale),
  }
}

export default async function InformatiiLegalePage({ params }: PageProps) {
  const { locale } = await params
  if (!isLocale(locale) || locale !== 'ro') notFound()
  return <LegalPageView locale={locale} />
}
