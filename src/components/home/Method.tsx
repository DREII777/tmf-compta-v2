import { Accent } from '../Accent'
import { UI } from '@/content/ui'
import type { Locale } from '@/lib/i18n'
import { Container } from '../Container'
import { MethodStepper } from './MethodStepper'

interface MethodProps {
  locale: Locale
}

/**
 * Section — méthode (après l'offre : on explique comment ça se passe une fois le service choisi).
 *
 * Les quatre étapes sont présentées en onglets (MethodStepper) plutôt qu'en
 * grille figée : le visiteur avance à son rythme et lit une étape à la fois,
 * ce qui allège la section et rend le parcours explicite.
 */
export function Method({ locale }: MethodProps) {
  const ui = UI[locale].home

  return (
    <section className="bg-soft py-16 md:py-24">
      <Container>
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl wonk text-ink md:text-5xl"><Accent text={ui.methodTitle} /></h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-2">{ui.methodSubtitle}</p>
        </div>

        <MethodStepper
          steps={ui.methodSteps}
          labels={{ stepOf: ui.methodStepOf, progress: ui.methodProgress }}
        />
      </Container>
    </section>
  )
}
