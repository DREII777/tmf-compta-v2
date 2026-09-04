import Link from 'next/link'
import type { Service } from '@/content/types'
import { HUE_BADGE } from '@/lib/hue'
import { servicePath, type Locale } from '@/lib/i18n'
import { Icon } from './Icon'

interface ServiceCardProps {
  service: Service
  locale: Locale
  /** Libellé du bouton de pied de carte — court (« Détails »), le tarif est à côté. */
  ctaLabel: string
  className?: string
}

/**
 * Carte de service : blanche, sans bordure, détachée du fond par une ombre
 * diffuse. Le pied sépare le tarif (à gauche) du bouton menthe (à droite).
 * Toute la carte est le lien — le bouton n'est qu'un repère visuel.
 */
export function ServiceCard({ service, locale, ctaLabel, className }: ServiceCardProps) {
  const content = service[locale]
  const href = servicePath(locale, content.slug)

  return (
    <Link
      href={href}
      className={`group flex h-full flex-col gap-4 rounded-xl bg-paper p-6 shadow-card transition duration-200 ease-out-soft hover:-translate-y-1 hover:shadow-card-hover ${className ?? ''}`}
    >
      <span className={`inline-flex h-14 w-14 items-center justify-center rounded-xl ${HUE_BADGE[service.hue]}`}>
        <Icon name={service.icon} size={28} />
      </span>
      <h3 className="font-display text-xl wonk text-ink">{content.title}</h3>
      <p className="text-[0.95rem] leading-relaxed text-ink-2">{content.summary}</p>

      <span className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4">
        <span className="text-[0.95rem] font-semibold text-ink-2">{content.price}</span>
        <span className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-lg bg-mint px-5 text-sm font-semibold text-ink transition-colors duration-200 ease-out-soft group-hover:bg-mint-2">
          {ctaLabel}
          <Icon name="arrow-right" size={16} className="transition-transform duration-200 ease-out-soft group-hover:translate-x-1" />
        </span>
      </span>
    </Link>
  )
}
