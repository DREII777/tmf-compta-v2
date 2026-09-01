import { UI } from '@/content/ui'
import type { Locale } from '@/lib/i18n'

/**
 * Lien d'évitement : première cible de tabulation, il saute l'en-tête pour
 * poser le focus sur le contenu. Sa cible `#main` porte `tabIndex={-1}` —
 * sans quoi il déplacerait la vue mais pas le focus clavier, et n'éviterait
 * donc rien. Utilisé par le layout de locale ET par la 404, qui a le même
 * en-tête à traverser (WCAG 2.4.1).
 */
export function SkipLink({ locale }: { locale: Locale }) {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-paper"
    >
      {UI[locale].skipToContent}
    </a>
  )
}
