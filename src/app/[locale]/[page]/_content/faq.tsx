import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Container } from '@/components/Container'
import { CtaBand } from '@/components/CtaBand'
import { JsonLd } from '@/components/JsonLd'
import { Section } from '@/components/Section'
import { FAQ } from '@/content/faq'
import { UI } from '@/content/ui'
import { abs, alternatesFor, path, type Locale } from '@/lib/i18n'
import { SITE } from '@/lib/site'
import { FaqSearch } from './FaqSearch'

/**
 * Page FAQ, enregistrée dans le routeur générique (`../page.tsx`) car son
 * slug diffère par locale (`faq` en FR, `intrebari-frecvente` en RO) — voir
 * le commentaire du `REGISTRY` dans `[locale]/[page]/page.tsx`.
 */

const CTA_TITLE: Record<Locale, string> = {
  fr: 'Vous ne trouvez pas votre réponse ?',
  ro: 'Nu găsiți răspunsul căutat?',
}

const CTA_TEXT: Record<Locale, string> = {
  fr: 'Écrivez-nous ou appelez-nous directement : nous vous répondons sous 24 heures ouvrées.',
  ro: 'Scrieți-ne sau sunați-ne direct: vă răspundem în 24 de ore lucrătoare.',
}

export function faqMetadata(locale: Locale): Metadata {
  const ui = UI[locale].faqPage
  return {
    title: { absolute: ui.metaTitle },
    description: ui.metaDescription,
    alternates: alternatesFor('faq', locale),
  }
}

export function FaqPage({ locale }: { locale: Locale }) {
  const ui = UI[locale]
  const faqUi = ui.faqPage

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url: abs(path(locale, 'faq')),
    mainEntity: FAQ.map((item) => ({
      '@type': 'Question',
      name: item[locale].question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item[locale].answer,
      },
    })),
  }

  return (
    <>
      <Section className="pb-8 pt-10 md:pb-12 md:pt-14">
        <Container>
          <Breadcrumbs locale={locale} items={[{ label: ui.nav.faq, href: path(locale, 'faq') }]} />
          <h1 className="wonk mt-6 max-w-2xl font-display text-3xl text-ink md:text-5xl">{faqUi.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">{faqUi.intro}</p>
        </Container>
      </Section>

      <Section tone="soft">
        <Container>
          <FaqSearch items={FAQ} locale={locale} />
        </Container>
      </Section>

      <CtaBand
        title={CTA_TITLE[locale]}
        description={CTA_TEXT[locale]}
        primaryLabel={ui.common.bookAppointment}
        primaryHref={path(locale, 'contact')}
        secondaryLabel={ui.header.phoneLabel}
        secondaryHref={`tel:${SITE.phoneRaw}`}
      />

      <JsonLd data={faqJsonLd} />
    </>
  )
}
