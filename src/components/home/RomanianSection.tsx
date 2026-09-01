import Link from 'next/link'
import { UI } from '@/content/ui'
import { otherLocale, path, type Locale } from '@/lib/i18n'
import { Container } from '../Container'
import { Icon } from '../Icon'
import { Reveal } from '../Reveal'

interface RomanianSectionProps {
  locale: Locale
}

/** Section 7 — accompagnement en roumain, présenté dans les deux langues. */
export function RomanianSection({ locale }: RomanianSectionProps) {
  const other = otherLocale(locale)
  const current = UI[locale].romanianPage
  const alt = UI[other].romanianPage

  return (
    <section className="bg-paper py-16 md:py-24">
      <Container>
        <Reveal>
          <div className="overflow-hidden rounded-xl border border-c5/20 bg-c5-bg px-6 py-10 md:px-12 md:py-14">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-c5/25 bg-paper px-3 py-1 text-xs font-semibold text-c5">
              <Icon name="globe" size={14} />
              RO · FR
            </span>

            <h2 className="mt-5 max-w-2xl font-display text-3xl wonk text-ink md:text-5xl">{current.title}</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">{current.intro}</p>

            <p lang={other} className="mt-4 max-w-2xl text-base italic leading-relaxed text-ink-2">
              {alt.title} — {alt.intro}
            </p>

            <Link
              href={path(locale, 'romanian')}
              className="group mt-8 inline-flex min-h-11 items-center gap-2 rounded bg-c5 px-6 text-base font-medium text-paper transition duration-200 ease-out-soft hover:bg-c5-2"
            >
              {UI[locale].nav.romanian}
              <Icon
                name="arrow-right"
                size={18}
                className="transition-transform duration-200 ease-out-soft group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
