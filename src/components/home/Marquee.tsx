import { UI } from '@/content/ui'
import type { Locale } from '@/lib/i18n'
import { Container } from '../Container'

interface MarqueeProps {
  locale: Locale
}

/**
 * Bandeau défilant sous le hero : ce que le cabinet gère au quotidien,
 * en pastilles qui glissent en continu. Animation CSS pure (voir
 * globals.css), en pause au survol, figée avec `prefers-reduced-motion`.
 * La liste est doublée pour boucler sans à-coup ; la copie est masquée
 * aux lecteurs d'écran.
 */
export function Marquee({ locale }: MarqueeProps) {
  const ui = UI[locale].home
  const items = ui.marqueeItems

  return (
    <section className="bg-soft pb-16 md:pb-20">
      <Container>
        <div className="rounded-xl bg-paper px-4 py-6 shadow-card md:px-8">
          <p className="text-center text-sm font-semibold uppercase tracking-wide text-ink-3">{ui.marqueeTitle}</p>
          <div className="marquee-mask mt-5 overflow-hidden">
            <ul className="marquee flex w-max">
              {[...items, ...items].map((item, i) => (
                <li key={i} aria-hidden={i >= items.length || undefined} className="pr-3">
                  <span className="inline-flex whitespace-nowrap rounded-lg border border-line bg-soft px-4 py-2 text-sm font-medium text-ink">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
