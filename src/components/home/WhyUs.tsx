import { UI } from '@/content/ui'
import type { Locale } from '@/lib/i18n'
import { Container } from '../Container'
import { Icon } from '../Icon'
import { Reveal } from '../Reveal'
import { IllustrationWhyUs } from '../illustrations/Phases'

interface WhyUsProps {
  locale: Locale
}

/** Section 6 — pourquoi nous choisir : les 6 arguments + illustration vectorielle. */
export function WhyUs({ locale }: WhyUsProps) {
  const ui = UI[locale].home

  return (
    <section className="bg-soft py-16 md:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <h2 className="font-display text-3xl wonk text-ink md:text-5xl">{ui.whyUsTitle}</h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-2">{ui.whyUsIntro}</p>

          <ul className="mt-8 flex flex-col gap-4">
            {ui.whyUsPoints.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <Icon name="check-circle" size={22} className="mt-0.5 shrink-0 text-c2" />
                <span className="text-ink-2">{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120} className="mx-auto w-full max-w-sm lg:max-w-none">
          <IllustrationWhyUs className="w-full" />
        </Reveal>
      </Container>
    </section>
  )
}
