import { UI } from '@/content/ui'
import { path, type Locale } from '@/lib/i18n'
import { Accent } from '../Accent'
import { Button } from '../Button'
import { Container } from '../Container'
import { HeroPeople } from './HeroPeople'
import { Icon } from '../Icon'

interface HeroProps {
  locale: Locale
}

/** Délai d'entrée de chaque bloc du hero, en cascade. */
const rise = (ms: number) => ({ animationDelay: `${ms}ms` })

/**
 * Section 1 — hero plein écran : halo ciel + trame de points, titre
 * bicolore (ADN tmfcompta.be) souligné d'un trait navy, deux boutons
 * pilule, gages de confiance, scène illustrée qui flotte doucement.
 * Chaque bloc entre en cascade (`.rise`), sans JavaScript.
 */
export function Hero({ locale }: HeroProps) {
  const ui = UI[locale].home

  return (
    <section className="hero-glow relative overflow-hidden bg-soft">
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0" />

      <Container className="relative grid items-center gap-12 py-14 md:py-20 lg:min-h-[calc(100svh-4.3rem)] lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:py-16">
        <div className="flex flex-col items-start gap-6">
          <span
            className="rise inline-flex items-center gap-1.5 rounded-full border border-brand/10 bg-paper/80 px-3 py-1 text-xs font-semibold text-brand backdrop-blur-sm"
            style={rise(0)}
          >
            <Icon name="shield" size={14} />
            {ui.heroBadgeItaa}
          </span>

          <p className="rise text-sm font-semibold uppercase tracking-wide text-ink-3" style={rise(80)}>
            {ui.heroEyebrow}
          </p>

          <h1
            className="rise-solid balance font-display text-4xl wonk leading-[1.08] text-ink md:text-6xl xl:text-[4.25rem]"
            style={rise(160)}
          >
            <Accent text={ui.heroTitle} />
          </h1>

          {/* trait navy sous le titre, repris du site historique */}
          <span aria-hidden="true" className="rise -mt-1 h-1.5 w-16 rounded-full bg-brand" style={rise(240)} />

          <p className="rise-solid max-w-xl text-lg leading-relaxed text-ink-2 md:text-xl" style={rise(300)}>
            {ui.heroAccroche}
          </p>

          <div className="rise flex flex-wrap items-center gap-3" style={rise(380)}>
            <Button href={path(locale, 'contact')} size="lg">
              <Icon name="calendar" size={20} />
              {ui.heroCtaPrimary}
            </Button>
            <Button href={path(locale, 'services')} variant="soft" size="lg">
              <Icon name="compass" size={20} />
              {ui.heroCtaSecondary}
            </Button>
          </div>

          <ul className="rise mt-2 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2" style={rise(460)}>
            {ui.heroTrustPoints.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm text-ink-2">
                <Icon name="check-circle" size={18} className="shrink-0 text-c2" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/*
          Scène vectorielle (voir HeroPeople). Les badges restent en HTML :
          ils portent du texte traduit, donc sélectionnable et lisible par
          un lecteur d'écran.
        */}
        <div className="rise relative mx-auto w-full max-w-lg lg:max-w-none" style={rise(260)}>
          <div className="float">
            <HeroPeople className="w-full" />
          </div>

          <span className="absolute right-0 top-[10%] flex items-center gap-2 rounded-full bg-paper px-3.5 py-2 text-xs font-semibold text-ink shadow-card sm:text-sm lg:-right-3">
            <Icon name="calendar" size={16} className="shrink-0 text-brand" />
            {ui.heroFloatingSince}
          </span>

          <span className="absolute bottom-[10%] left-0 flex items-center gap-2 rounded-full bg-paper px-3.5 py-2 text-xs font-semibold text-ink shadow-card sm:text-sm lg:-left-3">
            <Icon name="send" size={16} className="shrink-0 text-c8" />
            {ui.heroFloatingPeppol}
          </span>
        </div>
      </Container>
    </section>
  )
}
