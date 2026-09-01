import Link from 'next/link'
import type { Service } from '@/content/types'
import { HUE_BADGE } from '@/lib/hue'
import { servicePath, type Locale } from '@/lib/i18n'
import { Icon } from './Icon'

interface ServiceCardProps {
  service: Service
  locale: Locale
  ctaLabel: string
  className?: string
}

export function ServiceCard({ service, locale, ctaLabel, className }: ServiceCardProps) {
  const content = service[locale]
  const href = servicePath(locale, content.slug)

  return (
    <Link
      href={href}
      className={`group flex h-full flex-col gap-4 rounded-xl border border-line bg-paper p-6 shadow-xs transition duration-200 ease-out-soft hover:-translate-y-1 hover:border-line-2 hover:shadow-lg ${className ?? ''}`}
    >
      <span className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${HUE_BADGE[service.hue]}`}>
        <Icon name={service.icon} size={24} />
      </span>
      <h3 className="font-display text-lg wonk text-ink">{content.title}</h3>
      <p className="text-sm leading-relaxed text-ink-2">{content.summary}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-brand">
        {ctaLabel}
        <Icon name="arrow-right" size={16} className="transition-transform duration-200 ease-out-soft group-hover:translate-x-1" />
      </span>
    </Link>
  )
}
