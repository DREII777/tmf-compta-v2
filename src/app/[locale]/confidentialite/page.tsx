import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PrivacyPageView } from '@/app/_legal/PrivacyPage'
import { UI } from '@/content/ui'
import { alternatesFor, isLocale } from '@/lib/i18n'

/**
 * Politique de confidentialité, version française
 * (`ROUTES.privacy.fr === 'confidentialite'`). La version roumaine vit
 * dans `confidentialitate/` (`ROUTES.privacy.ro`) — même raison que pour
 * `actualites/` vs `noutati/`.
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
  const ui = UI[locale].privacyPage
  return {
    title: { absolute: ui.metaTitle },
    description: ui.metaDescription,
    alternates: alternatesFor('privacy', locale),
  }
}

export default async function ConfidentialitePage({ params }: PageProps) {
  const { locale } = await params
  if (!isLocale(locale) || locale !== 'fr') notFound()
  return <PrivacyPageView locale={locale} />
}
