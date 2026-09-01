import type { TimelineItem } from '@/content/types'
import type { Locale } from '@/lib/i18n'

interface TimelineProps {
  items: TimelineItem[]
  locale: Locale
  className?: string
}

export function Timeline({ items, locale, className }: TimelineProps) {
  return (
    <ol className={`relative flex flex-col gap-10 border-l border-line pl-8 md:pl-10 ${className ?? ''}`}>
      {items.map((item) => {
        const content = item[locale]
        return (
          <li key={item.id} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[calc(2rem+5.5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-brand ring-4 ring-brand-tint md:-left-[calc(2.5rem+5.5px)]"
            />
            <span className="tnum font-display text-xl wonk text-brand">{item.year}</span>
            <h3 className="mt-1 font-display text-lg text-ink">{content.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-ink-2">{content.description}</p>
          </li>
        )
      })}
    </ol>
  )
}
