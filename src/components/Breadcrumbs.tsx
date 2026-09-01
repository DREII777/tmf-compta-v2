import Link from 'next/link'
import { UI } from '@/content/ui'
import { abs, path, type Locale } from '@/lib/i18n'
import { Icon } from './Icon'
import { JsonLd } from './JsonLd'

export interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbsProps {
  locale: Locale
  items: BreadcrumbItem[]
  className?: string
}

const NAV_LABEL: Record<Locale, string> = {
  fr: 'Fil d’Ariane',
  ro: 'Cale de navigare',
}

/** Fil d'Ariane visuel + JSON-LD `BreadcrumbList`. */
export function Breadcrumbs({ locale, items, className }: BreadcrumbsProps) {
  const home: BreadcrumbItem = { label: UI[locale].common.breadcrumbHome, href: path(locale, 'home') }
  const all = [home, ...items]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: abs(item.href),
    })),
  }

  return (
    <nav aria-label={NAV_LABEL[locale]} className={`text-sm ${className ?? ''}`}>
      <ol className="flex flex-wrap items-center gap-1.5 text-ink-3">
        {all.map((item, index) => {
          const isLast = index === all.length - 1
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {index > 0 && <Icon name="chevron" size={14} className="-rotate-90 text-line-2" />}
              {isLast ? (
                <span aria-current="page" className="font-medium text-ink-2">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="transition-colors duration-200 ease-out-soft hover:text-brand">
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
      <JsonLd data={jsonLd} />
    </nav>
  )
}
