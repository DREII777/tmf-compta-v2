import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LegalPageView } from '@/app/_legal/LegalPage'
import { UI } from '@/content/ui'
import { alternatesFor, isLocale } from '@/lib/i18n'

/**
 * Mentions légales, version française (`ROUTES.legal.fr === 'mentions-legales'`).
 * La version roumaine vit dans `informatii-legale/` (`ROUTES.legal.ro`) —
 * même raison que `actualites/` vs `noutati/` : les segments Next.js sont
 * littéraux et ne peuvent pas répondre à deux slugs selon la langue.
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
  const ui = UI[locale].legalPage
  return {
    title: { absolute: ui.metaTitle },
    description: ui.metaDescription,
    alternates: alternatesFor('legal', locale),
  }
}

export default async function MentionsLegalesPage({ params }: PageProps) {
  const { locale } = await params
  if (!isLocale(locale) || locale !== 'fr') notFound()
  return <LegalPageView locale={locale} />
}
