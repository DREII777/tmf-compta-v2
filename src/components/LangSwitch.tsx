import { UI } from '@/content/ui'
import { otherLocale, path, type Locale } from '@/lib/i18n'

interface LangSwitchProps {
  /** Locale de la page courante. */
  locale: Locale
  /** Chemin équivalent exact dans l'autre langue. À défaut : l'accueil. */
  altPath?: string
  className?: string
}

const LABEL: Record<Locale, string> = { fr: 'FR', ro: 'RO' }

/**
 * Sélecteur de langue — un vrai `<a href>`, jamais un `<button>`, pour
 * fonctionner sans JavaScript et rester crawlable.
 */
export function LangSwitch({ locale, altPath, className }: LangSwitchProps) {
  const target = otherLocale(locale)
  const href = altPath ?? path(target, 'home')
  const targetName = UI[locale].langSwitch[target]

  return (
    <a
      href={href}
      hrefLang={target}
      lang={target}
      aria-label={targetName}
      className={`inline-flex min-h-11 items-center gap-1.5 rounded px-3 text-sm font-medium text-ink-2 transition-colors duration-200 ease-out-soft hover:bg-soft hover:text-brand ${className ?? ''}`}
    >
      {LABEL[target]}
    </a>
  )
}
