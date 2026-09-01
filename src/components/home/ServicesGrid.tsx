import { SERVICES } from '@/content/services'
import { UI } from '@/content/ui'
import { path, type Locale } from '@/lib/i18n'
import { Button } from '../Button'
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
            <h2 className="font-display text-3xl wonk text-ink md:text-5xl">{ui.servicesTitle}</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-2">{ui.servicesSubtitle}</p>
          </div>
          <Button href={path(locale, 'services')} variant="secondary" className="shrink-0">
            {common.viewAllServices}
          </Button>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <Reveal key={service.id} className="h-full">
              <ServiceCard service={service} locale={locale} ctaLabel={common.discoverService} className="h-full" />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
