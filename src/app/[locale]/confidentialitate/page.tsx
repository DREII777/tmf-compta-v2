import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PrivacyPageView } from '@/app/_legal/PrivacyPage'
import { UI } from '@/content/ui'
import { alternatesFor, isLocale } from '@/lib/i18n'

/**
 * Politique de confidentialité, version roumaine
 * (`ROUTES.privacy.ro === 'confidentialitate'`). Pendant de
 * `confidentialite/page.tsx` — voir ce fichier pour l'explication.
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
  const ui = UI[locale].privacyPage
  return {
    title: { absolute: ui.metaTitle },
    description: ui.metaDescription,
    alternates: alternatesFor('privacy', locale),
  }
}

export default async function ConfidentialitatePage({ params }: PageProps) {
  const { locale } = await params
  if (!isLocale(locale) || locale !== 'ro') notFound()
  return <PrivacyPageView locale={locale} />
}
