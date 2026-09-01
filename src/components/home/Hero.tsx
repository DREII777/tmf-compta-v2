import { UI } from '@/content/ui'
import { path, type Locale } from '@/lib/i18n'
import { Button } from '../Button'
import { Container } from '../Container'
import { HeroVisual } from './HeroVisual'
import { Icon } from '../Icon'

interface HeroProps {
  locale: Locale
}

/** Section 1 — hero : pastille ITAA, h1, accroche, 2 CTA, gages de confiance, visuel vectoriel + badges. */
export function Hero({ locale }: HeroProps) {
  const ui = UI[locale].home

  return (
    <section className="relative overflow-hidden bg-paper pb-16 pt-10 md:pb-24 md:pt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-24 h-[30rem] w-[30rem] rounded-full bg-brand-tint blur-3xl"
      />

      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/15 bg-brand-tint px-3 py-1 text-xs font-semibold text-brand">
            <Icon name="shield" size={14} />
            {ui.heroBadgeItaa}
          </span>

          <p className="text-sm font-semibold uppercase tracking-wide text-ink-3">{ui.heroEyebrow}</p>

          <h1 className="balance font-display text-4xl wonk text-ink md:text-6xl">{ui.heroTitle}</h1>

          <p className="max-w-xl text-lg leading-relaxed text-ink-2">{ui.heroAccroche}</p>

          <div className="flex flex-wrap items-center gap-3">
            <Button href={path(locale, 'contact')}>{ui.heroCtaPrimary}</Button>
            <Button href={path(locale, 'services')} variant="secondary">
              {ui.heroCtaSecondary}
            </Button>
          </div>

          <ul className="mt-2 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
            {ui.heroTrustPoints.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm text-ink-2">
                <Icon name="check-circle" size={18} className="shrink-0 text-c2" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/*
          Visuel vectoriel dessiné (voir HeroVisual). Il remplace la photo
          d'origine, dont le montage comportait un défaut de double
          exposition. Les badges restent en HTML : ils portent du texte
          traduit, donc sélectionnable et lisible par un lecteur d'écran.
        */}
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <HeroVisual className="w-full" />

          <span className="absolute right-0 top-[10%] flex items-center gap-2 rounded-full border border-line bg-paper px-3.5 py-2 text-xs font-semibold text-ink shadow-lg sm:text-sm lg:-right-3">
            <Icon name="calendar" size={16} className="shrink-0 text-brand" />
            {ui.heroFloatingSince}
          </span>

          <span className="absolute bottom-[10%] left-0 flex items-center gap-2 rounded-full border border-line bg-paper px-3.5 py-2 text-xs font-semibold text-ink shadow-lg sm:text-sm lg:-left-3">
            <Icon name="send" size={16} className="shrink-0 text-c8" />
            {ui.heroFloatingPeppol}
          </span>
        </div>
      </Container>
    </section>
  )
}
