import { Accent } from '../Accent'
import type { Review } from '@/content/types'
import { REVIEWS } from '@/content/reviews'
import { UI } from '@/content/ui'
import type { Locale } from '@/lib/i18n'
import { SITE } from '@/lib/site'
import { Container } from '../Container'
import { Icon } from '../Icon'
import { Reveal } from '../Reveal'
import { Reviews } from '../Reviews'

interface ReviewsSectionProps {
  locale: Locale
}

/** 6 avis mêlant FR et RO, dans un ordre fixe (rendu statique = pas d'aléatoire). */
const SELECTED_IDS = ['zehra-yamac', 'florin-niculescu', 'emil-opilowski', 'corina-hurmuzache', 'sc', 'nicolae-narcis']

const SELECTED_REVIEWS: Review[] = SELECTED_IDS.flatMap((id) => {
  const review = REVIEWS.find((r) => r.id === id)
  return review ? [review] : []
})

/**
 * Note affichée = celle de la fiche Google, pas la moyenne des avis
 * sélectionnés ici. Faire la moyenne de 10 avis choisis donnait 5,0 alors
 * que Google en affiche 4,9 sur 103 : un chiffre flatteur mais faux, que
 * le visiteur peut démentir en un clic.
 */
const RATING = SITE.googleRating.toFixed(1).replace('.', ',')

const REVIEW_COUNT: Record<Locale, string> = {
  fr: `${SITE.googleReviewCount} avis Google`,
  ro: `${SITE.googleReviewCount} recenzii Google`,
}

/** Section 8 — avis clients, note moyenne et lien vers la fiche Google. */
export function ReviewsSection({ locale }: ReviewsSectionProps) {
  const ui = UI[locale].home
  const common = UI[locale].common

  return (
    <section className="bg-soft py-16 md:py-24">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl wonk text-ink md:text-5xl"><Accent text={ui.reviewsTitle} /></h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-2">{ui.reviewsSubtitle}</p>
          </div>

          <a
            href={SITE.googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-3 rounded-xl bg-paper px-4 py-3 shadow-card transition duration-200 ease-out-soft hover:shadow-card-hover focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand"
          >
            <div className="flex gap-0.5 text-accent" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Icon key={idx} name="star" size={18} className="fill-current" />
              ))}
            </div>
            <span>
              <span className="tnum font-display text-xl wonk text-ink">
                {RATING}
                <span className="sr-only"> / 5</span>
              </span>
              <span className="ml-2 text-sm text-ink-2">{REVIEW_COUNT[locale]}</span>
            </span>
          </a>
        </div>

        <Reveal className="mt-12">
          <Reviews items={SELECTED_REVIEWS} />
        </Reveal>

        <div className="mt-10 text-center">
          <a
            href={SITE.googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-11 items-center gap-2 rounded border border-line-2 px-6 text-base font-medium text-brand transition-colors duration-200 ease-out-soft hover:border-brand hover:bg-brand-tint"
          >
            {common.viewOnMap}
            <Icon
              name="arrow-right"
              size={18}
              className="transition-transform duration-200 ease-out-soft group-hover:translate-x-1"
            />
          </a>
        </div>
      </Container>
    </section>
  )
}
