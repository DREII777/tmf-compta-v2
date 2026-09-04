import { Accent } from '../Accent'
import Link from 'next/link'
import { SERVICES } from '@/content/services'
import { UI } from '@/content/ui'
import { servicePath, type Locale } from '@/lib/i18n'
import { Container } from '../Container'
import { Icon } from '../Icon'
import { Reveal } from '../Reveal'
import {
  IllustrationCreation,
  IllustrationExpansion,
  IllustrationGestion,
} from '../illustrations/Phases'

interface PhasesProps {
  locale: Locale
}

/**
 * Chaque phase mène au service qui la couvre : la carte entière est
 * cliquable, ce qui donne trois portes d'entrée supplémentaires vers les
 * pages de service depuis l'accueil.
 */
const PHASES = [
  { serviceId: 'creation-entreprise', Illustration: IllustrationCreation },
  { serviceId: 'tenue-comptabilite', Illustration: IllustrationGestion },
  { serviceId: 'aide-gestion', Illustration: IllustrationExpansion },
] as const

/** Section 5 — phases de l'entreprise : Création / Gestion / Expansion. */
export function Phases({ locale }: PhasesProps) {
  const ui = UI[locale].home
  const labels = [ui.phaseCreation, ui.phaseGestion, ui.phaseExpansion] as const

  return (
    <section className="bg-paper py-16 md:py-24">
      <Container>
        <h2 className="max-w-2xl font-display text-3xl wonk text-ink md:text-5xl"><Accent text={ui.phasesTitle} /></h2>

        <ol className="mt-12 grid gap-6 sm:grid-cols-3">
          {PHASES.map(({ serviceId, Illustration }, index) => {
            const service = SERVICES.find((s) => s.id === serviceId)
            if (!service) return null
            const content = service[locale]

            return (
              <li key={serviceId}>
                <Reveal delay={index * 110}>
                  <Link
                    href={servicePath(locale, content.slug)}
                    className="group flex h-full flex-col overflow-hidden rounded-xl bg-paper shadow-card transition duration-200 ease-out-soft hover:-translate-y-1 hover:shadow-card-hover focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand"
                  >
                    <div className="overflow-hidden">
                      <div className="transition-transform duration-300 ease-out-soft group-hover:scale-105">
                        <Illustration />
                      </div>
                    </div>

                    <div className="flex flex-1 items-center justify-between gap-3 border-t border-line px-5 py-4">
                      <span className="font-display text-lg wonk text-ink">{labels[index]}</span>
                      <span
                        aria-hidden="true"
                        className="flex min-h-8 min-w-8 items-center justify-center rounded-full bg-soft text-ink-3 transition-colors duration-200 ease-out-soft group-hover:bg-brand-tint group-hover:text-brand"
                      >
                        <Icon
                    name="arrow-right"
                    size={16}
                    className="transition-transform duration-200 ease-out-soft group-hover:translate-x-1"
                  />
                      </span>
                    </div>

                    {/* Nom réel de la destination, pour les lecteurs d'écran */}
                    <span className="sr-only">{content.title}</span>
                  </Link>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </Container>
    </section>
  )
}
