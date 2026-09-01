import type { FaqItem } from '@/content/types'
import type { Locale } from '@/lib/i18n'
import { Icon } from './Icon'

interface FaqProps {
  items: FaqItem[]
  locale: Locale
  className?: string
}

/** Liste de questions/réponses en `<details>`, sans JS requis. */
export function Faq({ items, locale, className }: FaqProps) {
  return (
    <div className={`divide-y divide-line ${className ?? ''}`}>
      {items.map((item) => {
        const content = item[locale]
        return (
          <details key={item.id} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-display text-lg text-ink transition-colors duration-200 ease-out-soft hover:text-brand marker:content-none [&::-webkit-details-marker]:hidden">
              <span>{content.question}</span>
              <Icon
                name="chevron"
                size={20}
                className="shrink-0 text-brand transition-transform duration-200 ease-out-soft group-open:rotate-180"
              />
            </summary>
            <p className="mt-3 max-w-prose leading-relaxed text-ink-2">{content.answer}</p>
          </details>
        )
      })}
    </div>
  )
}
