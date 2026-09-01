'use client'

import { useRef, useState } from 'react'
import type { Hue } from '@/content/types'
import { Icon } from '../Icon'

interface Step {
  title: string
  text: string
}

interface MethodStepperProps {
  steps: readonly Step[]
  /** Libellés traduits de l'interface du sélecteur. */
  labels: { stepOf: string; progress: string }
}

const HUES: readonly Hue[] = ['c1', 'c2', 'c3', 'c4']

const TAB_ON: Record<string, string> = {
  c1: 'border-c1 bg-c1-bg text-c1',
  c2: 'border-c2 bg-c2-bg text-c2',
  c3: 'border-c3 bg-c3-bg text-c3',
  c4: 'border-c4 bg-c4-bg text-c4',
}
const DOT_ON: Record<string, string> = {
  c1: 'bg-c1 text-paper',
  c2: 'bg-c2 text-paper',
  c3: 'bg-c3 text-paper',
  c4: 'bg-c4 text-paper',
}
const BAR: Record<string, string> = {
  c1: 'bg-c1',
  c2: 'bg-c2',
  c3: 'bg-c3',
  c4: 'bg-c4',
}

/**
 * Les quatre étapes de la méthode, sous forme d'onglets.
 *
 * Motif ARIA « tabs » complet : flèches gauche/droite, Origine/Fin,
 * `aria-selected`, et un seul onglet dans l'ordre de tabulation
 * (`tabIndex=-1` sur les autres), comme l'attend un lecteur d'écran.
 * Sans JavaScript, les quatre panneaux restent lisibles l'un sous l'autre
 * — le rendu serveur affiche tout, l'onglet actif n'est qu'un filtre visuel.
 */
export function MethodStepper({ steps, labels }: MethodStepperProps) {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  function focusTab(index: number) {
    const next = (index + steps.length) % steps.length
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    const map: Record<string, number | undefined> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: steps.length - 1,
    }
    const target = map[event.key]
    if (target === undefined) return
    event.preventDefault()
    focusTab(target)
  }

  const hue = HUES[active] ?? 'c1'

  return (
    <div className="mt-12">
      <div role="tablist" aria-label={labels.progress} className="flex flex-wrap gap-3">
        {steps.map((step, index) => {
          const h = HUES[index] ?? 'c1'
          const selected = index === active
          return (
            <button
              key={step.title}
              ref={(el) => {
                tabRefs.current[index] = el
              }}
              type="button"
              role="tab"
              id={`method-tab-${index}`}
              aria-selected={selected}
              aria-controls={`method-panel-${index}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={`flex min-h-11 items-center gap-2.5 rounded-full border px-4 py-2 text-sm font-medium transition duration-200 ease-out-soft focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand ${
                selected
                  ? `${TAB_ON[h]} shadow-xs`
                  : 'border-line bg-paper text-ink-2 hover:border-line-2 hover:bg-soft'
              }`}
            >
              <span
                className={`tnum inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-colors duration-200 ${
                  selected ? DOT_ON[h] : 'bg-soft-2 text-ink-3'
                }`}
              >
                {index + 1}
              </span>
              <span className="hidden sm:inline">{step.title}</span>
              <span className="sr-only sm:hidden">{step.title}</span>
            </button>
          )
        })}
      </div>

      {/* jauge de progression */}
      <div className="mt-6 h-1 overflow-hidden rounded-full bg-soft-2" aria-hidden="true">
        <div
          className={`h-full rounded-full transition-[width,background-color] duration-400 ease-out-soft ${BAR[hue]}`}
          style={{ width: `${((active + 1) / steps.length) * 100}%` }}
        />
      </div>

      {steps.map((step, index) => (
        <div
          key={step.title}
          role="tabpanel"
          id={`method-panel-${index}`}
          aria-labelledby={`method-tab-${index}`}
          hidden={index !== active}
          className="mt-6 rounded-xl border border-line bg-soft p-6 md:p-8"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-2">
            {labels.stepOf.replace('{n}', String(index + 1)).replace('{total}', String(steps.length))}
          </p>
          <h3 className="mt-2 font-display text-xl wonk text-ink md:text-2xl">{step.title}</h3>
          <p className="mt-3 max-w-prose leading-relaxed text-ink-2">{step.text}</p>

          {index < steps.length - 1 && (
            <button
              type="button"
              onClick={() => focusTab(index + 1)}
              className="group mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-line-2 bg-paper px-4 py-2 text-sm font-semibold text-brand transition duration-200 ease-out-soft hover:border-brand hover:bg-brand-tint focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand"
            >
              {steps[index + 1]?.title}
              <Icon
                name="arrow-right"
                size={16}
                aria-hidden
                className="transition-transform duration-200 ease-out-soft group-hover:translate-x-1"
              />
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
