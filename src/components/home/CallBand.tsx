import { UI } from '@/content/ui'
import type { Locale } from '@/lib/i18n'
import { SITE } from '@/lib/site'
import { Icon } from '../Icon'

interface CallBandProps {
  locale: Locale
  className?: string
}

/**
 * Bande d'appel : un panneau chaud (teinte d'accent) avec une phrase, une
 * accroche et un grand bouton `tel:` qui pulse doucement, combiné qui sonne.
 * L'animation est purement CSS (voir globals.css) et s'arrête avec
 * `prefers-reduced-motion`. Le numéro est dans l'`aria-label` : un lecteur
 * d'écran annonce le bouton ET la destination.
 */
export function CallBand({ locale, className }: CallBandProps) {
  const ui = UI[locale].home
  const header = UI[locale].header

  return (
    <div
      className={`flex flex-col items-stretch gap-6 rounded-xl bg-accent-tint px-6 py-6 md:flex-row md:items-center md:justify-between md:px-8 ${className ?? ''}`}
    >
      <div className="text-center md:text-left">
        <p className="text-ink-2">{ui.callBandLine1}</p>
        <p className="mt-1 font-display text-xl wonk text-ink md:text-2xl">{ui.callBandLine2}</p>
      </div>

      <a
        href={`tel:${SITE.phoneRaw}`}
        aria-label={`${header.phoneLabel} : ${SITE.phone}`}
        className="call-pulse inline-flex min-h-14 shrink-0 items-center justify-center gap-3 rounded-lg bg-accent px-8 text-lg font-semibold text-paper transition-colors duration-200 ease-out-soft hover:bg-accent-deep focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand md:w-[42%]"
      >
        <Icon name="phone" size={22} className="call-ring shrink-0" />
        {ui.callBandButton}
      </a>
    </div>
  )
}
