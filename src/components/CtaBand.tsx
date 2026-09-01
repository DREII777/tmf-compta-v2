import Link from 'next/link'
import type { ReactNode } from 'react'
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

const ACTION_BASE =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded px-6 text-base font-medium transition-colors duration-200 ease-out-soft focus-visible:outline-paper'

/** Bande CTA de fin de page — fond brand, texte clair. */
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
    <section className={`bg-brand py-16 md:py-20 ${className ?? ''}`}>
      <Container>
        <Reveal>
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2 className="balance font-display text-2xl wonk text-paper md:text-3xl">{title}</h2>
              {description && <p className="mt-3 leading-relaxed text-paper/85">{description}</p>}
            </div>

            {children ? (
              <div className="w-full shrink-0 md:w-auto">{children}</div>
            ) : (
              <div className="flex flex-wrap gap-3">
                {primaryLabel && primaryHref && (
                  <Link href={primaryHref} className={`${ACTION_BASE} bg-paper text-brand hover:bg-brand-tint`}>
                    {primaryLabel}
                  </Link>
                )}
                {secondaryLabel && secondaryHref && (
                  <Link
                    href={secondaryHref}
                    className={`${ACTION_BASE} border border-paper/40 text-paper hover:bg-brand-2`}
                  >
                    {secondaryLabel}
                  </Link>
                )}
              </div>
            )}
            </div>
        </Reveal>
      </Container>
    </section>
  )
}
