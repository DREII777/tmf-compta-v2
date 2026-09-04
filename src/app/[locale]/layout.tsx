import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Footer } from '@/components/Footer'
import { PrivacyNotice } from '@/components/PrivacyNotice'
import { Header } from '@/components/Header'
import { LangSync } from '@/components/LangSync'
import { JsonLd } from '@/components/JsonLd'
import { SkipLink } from '@/components/SkipLink'
import { abs, isLocale, LOCALES, path, type Locale } from '@/lib/i18n'
import { AREA_SERVED, SITE } from '@/lib/site'

const OG_LOCALE: Record<Locale, string> = { fr: 'fr_BE', ro: 'ro_RO' }

const FALLBACK: Record<Locale, { title: string; description: string }> = {
  fr: {
    title: `${SITE.name} | Cabinet comptable à Zaventem`,
    description:
      "Cabinet d'expertise comptable et fiscale à Zaventem. Comptabilité, TVA, fiscalité et conseil pour indépendants et sociétés, en français et en roumain.",
  },
  ro: {
    title: `${SITE.name} | Cabinet de contabilitate în Zaventem`,
    description:
      'Cabinet de expertiză contabilă și fiscală în Zaventem. Contabilitate, TVA, fiscalitate și consultanță pentru independenți și societăți, în română și în franceză.',
  },
}

/**
 * Métadonnées communes aux deux langues. Fonction plutôt qu'objet constant :
 * `og:locale` et le titre de repli doivent suivre la langue de l'URL, sans
 * quoi une page roumaine se présente en français aux réseaux sociaux.
 */
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : 'fr'
  const t = FALLBACK[locale]

  return {
    metadataBase: new URL(SITE.url),
    title: { default: t.title, template: `%s | ${SITE.name}` },
    description: t.description,
    openGraph: {
      type: 'website',
      siteName: SITE.name,
      locale: OG_LOCALE[locale],
      alternateLocale: OG_LOCALE[locale === 'fr' ? 'ro' : 'fr'],
      url: abs(path(locale, 'home')),
    },
    twitter: { card: 'summary_large_image' },
    robots: { index: true, follow: true },
    icons: {
      icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
      apple: [{ url: '/apple-icon.svg', type: 'image/svg+xml' }],
    },
    manifest: '/manifest.webmanifest',
  }
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

interface LocaleLayoutProps {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AccountingService',
    name: SITE.legalName,
    legalName: SITE.legalName,
    url: abs(path(locale, 'home')),
    telephone: SITE.phoneRaw,
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      postalCode: SITE.address.postalCode,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    areaServed: AREA_SERVED.map((place) => ({ '@type': 'City', name: place })),
    openingHoursSpecification: SITE.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    logo: abs('/logo.svg'),
    image: abs('/logo.svg'),
    sameAs: [SITE.social.facebook],
  }

  /*
   * `<html>`/`<body>` viennent du layout racine (app/layout.tsx), qui ne
   * connaît pas la locale et sert `lang="fr"`. Deux filets ici :
   * – `lang={locale}` sur le conteneur : tout le contenu est correctement
   *   étiqueté dès le HTML servi, pour les lecteurs d'écran (WCAG 3.1.2) ;
   * – `LangSync` aligne `<html lang>` à l'hydratation.
   * Rendre un second `<html>` ici provoquait une erreur d'hydratation sur
   * chaque page roumaine.
   */
  return (
    <div lang={locale} className="contents">
      <LangSync locale={locale} />
      <SkipLink locale={locale} />
      <Header locale={locale} />
      <main id="main" tabIndex={-1}>{children}</main>
      <Footer locale={locale} />
      <PrivacyNotice locale={locale} />
      <JsonLd data={jsonLd} />
    </div>
  )
}
