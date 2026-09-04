import { UI } from '@/content/ui'
import type { Locale } from '@/lib/i18n'
import { Container } from '../Container'
import { Icon, type IconName } from '../Icon'
import { Reveal } from '../Reveal'

interface StatsBandProps {
  locale: Locale
}

/** Icônes associées aux 4 chiffres, dans l'ordre : 2014, ITAA, 24 h, FR/RO. */
const ICONS: [IconName, IconName, IconName, IconName] = ['calendar', 'shield', 'clock', 'globe']

/** Section 2 — bande chiffres sur fond brand (le seul aplat de marque de la page). */
export function StatsBand({ locale }: StatsBandProps) {
  const ui = UI[locale].home

  return (
    <section className="relative overflow-hidden bg-brand py-16 md:py-20">
      <div aria-hidden="true" className="dot-grid-light pointer-events-none absolute inset-0" />
      <Container className="relative">
        <Reveal>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
            {ui.stats.map((stat, index) => (
              <li key={stat.label} className="flex flex-col items-start gap-2">
                <Icon name={ICONS[index]} size={20} className="text-paper/70" />
                <span className="tnum font-display text-3xl wonk text-paper md:text-4xl">{stat.value}</span>
                <span className="text-sm text-paper/75">{stat.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}
