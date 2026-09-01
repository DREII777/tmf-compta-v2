import Link from 'next/link'
import { FAQ } from '@/content/faq'
import { UI } from '@/content/ui'
import { path, type Locale } from '@/lib/i18n'
import { Container } from '../Container'
import { Faq } from '../Faq'
import { Icon } from '../Icon'
import { JsonLd } from '../JsonLd'
import { Reveal } from '../Reveal'

interface FaqSectionProps {
  locale: Locale
}

/** Les 5 questions mises en avant sur l'accueil (JSON-LD `FAQPage` inclus). */
const SELECTED_FAQ = FAQ.slice(0, 5)

/** Section 9 — FAQ : 5 questions + lien vers la FAQ complète. */
export function FaqSection({ locale }: FaqSectionProps) {
  const ui = UI[locale].home

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: SELECTED_FAQ.map((item) => ({
      '@type': 'Question',
      name: item[locale].question,
      acceptedAnswer: { '@type': 'Answer', text: item[locale].answer },
    })),
  }

  return (
    <section className="bg-paper py-16 md:py-24">
      <Container>
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl wonk text-ink md:text-5xl">{ui.faqTeaserTitle}</h2>

          <Reveal className="mt-10">
            <Faq items={SELECTED_FAQ} locale={locale} />
          </Reveal>

          <Link
            href={path(locale, 'faq')}
            className="group mt-8 inline-flex min-h-11 items-center gap-2 rounded px-2 text-base font-medium text-brand transition-colors duration-200 ease-out-soft hover:bg-brand-tint"
          >
            {ui.faqTeaserLink}
            <Icon
              name="arrow-right"
              size={18}
              className="transition-transform duration-200 ease-out-soft group-hover:translate-x-1"
            />
          </Link>
        </div>

        <JsonLd data={jsonLd} />
      </Container>
    </section>
  )
}
