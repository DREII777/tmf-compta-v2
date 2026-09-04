import { Accent } from '../Accent'
import { SERVICES } from '@/content/services'
import { UI } from '@/content/ui'
import { path, type Locale } from '@/lib/i18n'
import { Button } from '../Button'
import { CallBand } from './CallBand'
import { Container } from '../Container'
import { Reveal } from '../Reveal'
import { ServiceCard } from '../ServiceCard'

interface ServicesGridProps {
  locale: Locale
}

/** Section 4 — grille des 9 services, chacun avec sa teinte de catégorie : c'est ici que la couleur vit. */
export function ServicesGrid({ locale }: ServicesGridProps) {
  const ui = UI[locale].home
  const common = UI[locale].common

  return (
    <section className="bg-soft py-16 md:py-24">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full bg-mint px-3.5 py-1 text-sm font-semibold text-ink">
              {ui.servicesEyebrow}
            </span>
            <h2 className="mt-5 font-display text-3xl wonk text-ink md:text-5xl"><Accent text={ui.servicesTitle} /></h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-2">{ui.servicesSubtitle}</p>
          </div>
          <Button href={path(locale, 'services')} variant="secondary" className="shrink-0">
            {common.viewAllServices}
          </Button>
        </div>

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.id} delay={(i % 3) * 90} className="h-full">
              <ServiceCard service={service} locale={locale} ctaLabel={common.details} className="h-full" />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <CallBand locale={locale} />
        </Reveal>
      </Container>
    </section>
  )
}
