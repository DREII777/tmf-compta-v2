import { Accent } from './Accent'
import type { ReactNode } from 'react'
import { Button } from './Button'
import { Container } from './Container'
import { Reveal } from './Reveal'

interface CtaBandProps {
  title: string
  description?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
  /** Contenu libre (ex. mini-formulaire) affiché à la place des boutons. */
  children?: ReactNode
  className?: string
}

/**
 * Bande CTA de fin de page : un panneau teinté arrondi dans la largeur du
 * site, texte à gauche, boutons à droite. Le navy reste réservé au bouton
 * principal — la bande elle-même est claire, dans le ton du reste de la page.
 */
export function CtaBand({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  children,
  className,
}: CtaBandProps) {
  return (
    <section className={`bg-paper py-16 md:py-20 ${className ?? ''}`}>
      <Container>
        <Reveal>
          <div className="flex flex-col items-start gap-8 rounded-xl bg-brand-tint px-6 py-10 md:flex-row md:items-center md:justify-between md:px-12 md:py-12">
            <div className="max-w-xl">
              <h2 className="balance font-display text-2xl wonk text-ink md:text-3xl"><Accent text={title} /></h2>
              {description && <p className="mt-3 leading-relaxed text-ink-2">{description}</p>}
            </div>

            {children ? (
              <div className="w-full shrink-0 md:w-auto">{children}</div>
            ) : (
              <div className="flex flex-wrap gap-3">
                {primaryLabel && primaryHref && (
                  <Button href={primaryHref} size="lg">
                    {primaryLabel}
                  </Button>
                )}
                {secondaryLabel && secondaryHref && (
                  <Button href={secondaryHref} variant="soft" size="lg">
                    {secondaryLabel}
                  </Button>
                )}
              </div>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
