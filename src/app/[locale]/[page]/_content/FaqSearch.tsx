'use client'

import { useId, useMemo, useState } from 'react'
import { Faq } from '@/components/Faq'
import { Icon, type IconName } from '@/components/Icon'
import { Tag } from '@/components/Tag'
import type { FaqCategory, FaqItem, Hue } from '@/content/types'
import { path, type Locale } from '@/lib/i18n'

interface FaqSearchProps {
  items: FaqItem[]
  locale: Locale
}

/**
 * Étiquettes et icônes des thèmes de la FAQ. Rédigées ici (pas dans
 * `@/content/ui`) car propres à ce composant de présentation, sur le
 * même principe que les dictionnaires locaux de `Breadcrumbs`/`LangSwitch`.
 */
const CATEGORY_LABELS: Record<FaqCategory, Record<Locale, string>> = {
  general: { fr: 'Général', ro: 'General' },
  tva: { fr: 'TVA', ro: 'TVA' },
  peppol: { fr: 'Facturation électronique Peppol', ro: 'Facturare electronică Peppol' },
  changement: { fr: 'Changement de comptable', ro: 'Schimbarea contabilului' },
  roumain: { fr: 'Accompagnement en roumain', ro: 'Asistență în limba română' },
  statut: { fr: 'Indépendant ou société', ro: 'Independent sau societate' },
  honoraires: { fr: 'Honoraires', ro: 'Onorarii' },
  delais: { fr: 'Délais fiscaux', ro: 'Termene fiscale' },
  controle: { fr: 'Contrôle fiscal', ro: 'Control fiscal' },
  'comptes-annuels': { fr: 'Comptes annuels', ro: 'Conturi anuale' },
  creation: { fr: 'Création de société', ro: 'Înființarea societății' },
  documents: { fr: 'Documents à fournir', ro: 'Documente necesare' },
  rdv: { fr: 'Prise de rendez-vous', ro: 'Programare' },
}

const CATEGORY_ICON: Record<FaqCategory, IconName> = {
  general: 'help',
  tva: 'percent',
  peppol: 'send',
  changement: 'compass',
  roumain: 'globe',
  statut: 'building',
  honoraires: 'euro',
  delais: 'clock',
  controle: 'search-check',
  'comptes-annuels': 'file-text',
  creation: 'rocket',
  documents: 'doc',
  rdv: 'calendar',
}

const HUES: Hue[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9']

const COPY: Record<
  Locale,
  {
    searchLabel: string
    placeholder: string
    results: (count: number) => string
    noResultsTitle: string
    noResultsText: string
    noResultsCta: string
    clear: string
  }
> = {
  fr: {
    searchLabel: 'Rechercher dans la FAQ',
    placeholder: 'Rechercher une question, par exemple « TVA » ou « Peppol »…',
    results: (count) => (count > 1 ? `${count} questions trouvées` : `${count} question trouvée`),
    noResultsTitle: 'Aucune question ne correspond à votre recherche',
    noResultsText: 'Essayez un autre mot-clé, ou contactez-nous directement : nous vous répondrons sous 24 heures ouvrées.',
    noResultsCta: 'Contactez-nous',
    clear: 'Effacer la recherche',
  },
  ro: {
    searchLabel: 'Căutare în întrebările frecvente',
    placeholder: 'Căutați o întrebare, de exemplu „TVA” sau „Peppol”…',
    results: (count) => (count > 1 ? `${count} întrebări găsite` : `${count} întrebare găsită`),
    noResultsTitle: 'Nicio întrebare nu corespunde căutării dumneavoastră',
    noResultsText: 'Încercați un alt cuvânt cheie sau contactați-ne direct: vă răspundem în 24 de ore lucrătoare.',
    noResultsCta: 'Contactați-ne',
    clear: 'Șterge căutarea',
  },
}

/** Normalise pour une comparaison insensible à la casse et aux accents. */
function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

/** FAQ groupée par thème, avec recherche côté client optionnelle (aucun JS requis pour lire les réponses : `<details>`). */
export function FaqSearch({ items, locale }: FaqSearchProps) {
  const [query, setQuery] = useState('')
  const copy = COPY[locale]
  const inputId = useId()
  const statusId = useId()

  const normalizedQuery = normalize(query.trim())

  const filtered = useMemo(() => {
    if (!normalizedQuery) return items
    return items.filter((item) => {
      const content = item[locale]
      const haystack = normalize(`${content.question} ${content.answer} ${CATEGORY_LABELS[item.category][locale]}`)
      return haystack.includes(normalizedQuery)
    })
  }, [items, locale, normalizedQuery])

  const groups = useMemo(() => {
    const order: FaqCategory[] = []
    const byCategory = new Map<FaqCategory, FaqItem[]>()
    for (const item of filtered) {
      if (!byCategory.has(item.category)) {
        byCategory.set(item.category, [])
        order.push(item.category)
      }
      byCategory.get(item.category)!.push(item)
    }
    return order.map((category, index) => ({
      category,
      hue: HUES[index % HUES.length]!,
      items: byCategory.get(category)!,
    }))
  }, [filtered])

  return (
    <div>
      <div className="relative max-w-lg">
        <label htmlFor={inputId} className="sr-only">
          {copy.searchLabel}
        </label>
        <Icon name="search" size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-3" />
        <input
          id={inputId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={copy.placeholder}
          aria-describedby={statusId}
          className="h-12 w-full rounded border border-line-2 bg-paper pl-11 pr-12 text-[0.95rem] text-ink placeholder:text-ink-3"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label={copy.clear}
            className="absolute right-1 top-1/2 inline-flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded text-ink-3 transition-colors hover:text-brand"
          >
            <Icon name="close" size={16} />
          </button>
        )}
      </div>

      <p id={statusId} aria-live="polite" className="mt-3 text-sm text-ink-3">
        {copy.results(filtered.length)}
      </p>

      {groups.length === 0 ? (
        <div className="mt-8 rounded-lg border border-line bg-soft p-8 text-center">
          <p className="font-display text-lg text-ink">{copy.noResultsTitle}</p>
          <p className="mx-auto mt-2 max-w-md leading-relaxed text-ink-2">{copy.noResultsText}</p>
          <a
            href={path(locale, 'contact')}
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded bg-brand px-6 text-base font-medium text-paper transition-colors hover:bg-brand-2"
          >
            {copy.noResultsCta}
          </a>
        </div>
      ) : (
        <div className="mt-10 flex flex-col gap-10">
          {groups.map(({ category, hue, items: groupItems }) => {
            const headingId = `faq-theme-${category}`
            return (
              <section key={category} aria-labelledby={headingId}>
                <h2 id={headingId} className="inline-flex">
                  <Tag icon={CATEGORY_ICON[category]} label={CATEGORY_LABELS[category][locale]} tone={hue} />
                </h2>
                <Faq items={groupItems} locale={locale} className="mt-4" />
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}
