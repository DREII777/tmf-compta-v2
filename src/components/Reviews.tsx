import type { Review } from '@/content/types'
import { Icon } from './Icon'

interface ReviewsProps {
  items: Review[]
  className?: string
}

export function Reviews({ items, className }: ReviewsProps) {
  return (
    <div className={`columns-1 gap-6 sm:columns-2 lg:columns-3 ${className ?? ''}`}>
      {items.map((review) => (
        <figure key={review.id} className="mb-6 flex break-inside-avoid flex-col gap-4 rounded-xl bg-paper p-6 shadow-card">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5 text-accent" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Icon key={idx} name="star" size={16} className={idx < review.rating ? 'fill-current' : 'text-line-2'} />
              ))}
            </div>
            <span className="sr-only">{review.rating} / 5</span>
          </div>
          <blockquote className="flex-1 text-[0.95rem] leading-relaxed text-ink-2">
            <p className="whitespace-pre-line">{review.text}</p>
          </blockquote>
          <figcaption className="flex items-baseline justify-between gap-2 text-sm">
            <span className="font-medium text-ink">{review.author}</span>
            <span className="text-ink-3">{review.relativeTime}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
