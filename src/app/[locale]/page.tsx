import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CtaBand } from '@/components/CtaBand'
import { FaqSection } from '@/components/home/FaqSection'
import { Hero } from '@/components/home/Hero'
import { Marquee } from '@/components/home/Marquee'
import { Method } from '@/components/home/Method'
import { Phases } from '@/components/home/Phases'
import { RomanianSection } from '@/components/home/RomanianSection'
import { ReviewsSection } from '@/components/home/ReviewsSection'
import { ServicesGrid } from '@/components/home/ServicesGrid'
import { StatsBand } from '@/components/home/StatsBand'
import { WhyUs } from '@/components/home/WhyUs'
import { JsonLd } from '@/components/JsonLd'
import { UI } from '@/content/ui'
import { abs, alternatesFor, HREFLANG, isLocale, LOCALES, path, type Locale } from '@/lib/i18n'
import { SITE } from '@/lib/site'

export const dynamic = 'force-static'
/**
 * Tout slug hors de `generateStaticParams` renvoie un 404 rendu par
 * `app/not-found.tsx`. `dynamicParams = false` est indispensable : sans lui,
 * le segment est rendu à la demande et le `notFound()` levé depuis le
 * composant ne remonte pas jusqu'à la frontière 404 — Next 16.3.4 sert alors
 * un document `<html id="__next_error__">` au corps vide (reproduit sur une
 * app Next nue de cinq fichiers, donc indépendant de ce projet).
 */
export const dynamicParams = false

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale
  const ui = UI[locale].home

  return {
    // `title.absolute` court-circuite le template hérité du layout racine
    // (`%s | TMF Compta`) : l'accueil affiche déjà le nom de la marque.
    title: { absolute: ui.metaTitle },
    description: ui.metaDescription,
    alternates: alternatesFor('home', locale),
  }
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale: Locale = rawLocale

  const ui = UI[locale].home

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: abs(path(locale, 'home')),
    inLanguage: HREFLANG[locale],
    publisher: { '@type': 'Organization', name: SITE.legalName, url: SITE.url },
  }

  return (
    <>
      <Hero locale={locale} />
      <Marquee locale={locale} />
      <StatsBand locale={locale} />
      <ServicesGrid locale={locale} />
      <Phases locale={locale} />
      <Method locale={locale} />
      <WhyUs locale={locale} />
      <RomanianSection locale={locale} />
      <ReviewsSection locale={locale} />
      <FaqSection locale={locale} />
      <CtaBand
        title={ui.ctaBandTitle}
        description={ui.ctaBandText}
        primaryLabel={ui.heroCtaPrimary}
        primaryHref={path(locale, 'contact')}
        secondaryLabel={ui.heroCtaSecondary}
        secondaryHref={path(locale, 'services')}
      />

      <JsonLd data={websiteJsonLd} />
    </>
  )
}
