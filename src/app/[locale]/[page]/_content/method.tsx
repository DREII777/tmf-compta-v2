import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Container } from '@/components/Container'
import { CtaBand } from '@/components/CtaBand'
import { Icon } from '@/components/Icon'
import { Reveal } from '@/components/Reveal'
import { Section } from '@/components/Section'
import { UI } from '@/content/ui'
import { alternatesFor, path, type Locale } from '@/lib/i18n'
import { SITE } from '@/lib/site'

/**
 * Détail des 4 étapes de `UI[locale].methodPage.steps` (titre + phrase
 * courte, déjà écrits par l'agent contenu) : on n'invente pas de nouveaux
 * titres, on ajoute ce que la SPEC demande en plus — fourni / réalisé /
 * délai / outils — en contenu propre à cette page.
 */
interface StepDetail {
  provide: string
  deliver: string
  delay: string
  tools: string
}

const STEP_DETAILS: Record<Locale, [StepDetail, StepDetail, StepDetail, StepDetail]> = {
  fr: [
    {
      provide: 'Rien de particulier : juste une idée claire de votre activité et de vos échéances.',
      deliver: 'Nous écoutons votre situation, répondons à vos premières questions et identifions les services dont vous avez besoin.',
      delay: 'Sous 24 heures ouvrées pour un premier retour.',
      tools: 'Téléphone, email ou rendez-vous dans nos bureaux de Zaventem.',
    },
    {
      provide: "Quelques précisions : votre statut (indépendant ou société), votre secteur et votre volume d'activité estimé.",
      deliver: 'Nous préparons une offre détaillée, avec le périmètre exact des services et les honoraires correspondants.',
      delay: '2 à 3 jours ouvrables après le premier échange.',
      tools: 'Devis écrit, envoyé par email.',
    },
    {
      provide: 'Vos numéros BCE/TVA, vos accès comptables existants et, si vous changez de comptable, ses coordonnées.',
      deliver: 'Nous récupérons vos dossiers, paramétrons vos outils comptables et mettons en place les mandats nécessaires (TVA, Peppol…), sans interruption de service.',
      delay: '1 à 2 semaines selon la complexité du dossier.',
      tools: 'Logiciel de comptabilité, mandats électroniques (Intervat, MyMinfin…).',
    },
    {
      provide: "Vos factures d'achat et de vente, extraits bancaires et documents, au fil de l'eau, selon la périodicité convenue.",
      deliver: "Encodage, déclarations TVA, suivi des échéances fiscales et sociales, conseil continu tout au long de l'année.",
      delay: `Réponse sous ${SITE.responseTime} à toute question.`,
      tools: 'Partage sécurisé de documents, échange direct avec votre gestionnaire de dossier.',
    },
  ],
  ro: [
    {
      provide: 'Nimic anume: doar o idee clară despre activitatea și termenele dumneavoastră.',
      deliver: 'Ascultăm situația dumneavoastră, răspundem la primele întrebări și identificăm serviciile de care aveți nevoie.',
      delay: 'În 24 de ore lucrătoare pentru un prim răspuns.',
      tools: 'Telefon, email sau întâlnire la biroul nostru din Zaventem.',
    },
    {
      provide: 'Câteva detalii: statutul dumneavoastră (independent sau societate), domeniul de activitate și volumul estimat.',
      deliver: 'Pregătim o ofertă detaliată, cu domeniul exact al serviciilor și onorariile corespunzătoare.',
      delay: '2-3 zile lucrătoare de la prima discuție.',
      tools: 'Ofertă scrisă, trimisă prin email.',
    },
    {
      provide: 'Numerele dumneavoastră BCE/TVA, accesurile contabile existente și, dacă schimbați contabilul, datele lui de contact.',
      deliver: 'Preluăm dosarele dumneavoastră, configurăm instrumentele contabile și instalăm mandatele necesare (TVA, Peppol…), fără întrerupere de serviciu.',
      delay: '1-2 săptămâni, în funcție de complexitatea dosarului.',
      tools: 'Program de contabilitate, mandate electronice (Intervat, MyMinfin…).',
    },
    {
      provide: 'Facturile de achiziție și de vânzare, extrasele bancare și documentele, pe măsură, conform periodicității stabilite.',
      deliver: 'Înregistrare, declarații TVA, urmărirea termenelor fiscale și sociale, consiliere continuă pe tot parcursul anului.',
      delay: 'Răspuns în 24 de ore lucrătoare la orice întrebare.',
      tools: 'Partajare securizată de documente, contact direct cu gestionarul dosarului dumneavoastră.',
    },
  ],
}

const FIELD_LABELS: Record<Locale, { provide: string; deliver: string; delay: string; tools: string }> = {
  fr: {
    provide: 'Vous fournissez',
    deliver: 'Nous faisons',
    delay: 'Délai indicatif',
    tools: 'Outils utilisés',
  },
  ro: {
    provide: 'Furnizați',
    deliver: 'Facem',
    delay: 'Termen orientativ',
    tools: 'Instrumente folosite',
  },
}

const COMMITMENT: Record<Locale, { title: string; text: string }> = {
  fr: {
    title: 'Notre engagement : une réponse sous 24 heures ouvrées',
    text: "Quelle que soit l'étape de votre dossier, vous avez toujours un interlocuteur qui vous répond rapidement — pas de ticket qui se perd, pas de standard anonyme.",
  },
  ro: {
    title: 'Angajamentul nostru: răspuns în 24 de ore lucrătoare',
    text: 'Indiferent de etapa dosarului dumneavoastră, aveți mereu un interlocutor care vă răspunde rapid — fără cereri pierdute, fără un call-center anonim.',
  },
}

const CTA_TITLE: Record<Locale, string> = {
  fr: 'Prêt à démarrer le premier échange ?',
  ro: 'Pregătit pentru prima discuție?',
}

export function methodMetadata(locale: Locale): Metadata {
  const ui = UI[locale].methodPage
  return {
    title: { absolute: ui.metaTitle },
    description: ui.metaDescription,
    alternates: alternatesFor('method', locale),
  }
}

export function MethodPage({ locale }: { locale: Locale }) {
  const ui = UI[locale]
  const method = ui.methodPage
  const details = STEP_DETAILS[locale]
  const labels = FIELD_LABELS[locale]
  const commitment = COMMITMENT[locale]

  return (
    <>
      <Section className="pb-8 pt-10 md:pb-12 md:pt-14">
        <Container>
          <Breadcrumbs locale={locale} items={[{ label: ui.nav.method, href: path(locale, 'method') }]} />
          <h1 className="wonk mt-6 max-w-2xl font-display text-3xl text-ink md:text-5xl">{method.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">{method.intro}</p>
        </Container>
      </Section>

      <Section tone="soft">
        <Container>
          <ol className="flex flex-col gap-8">
            {method.steps.map((step, index) => {
              const detail = details[index]
              return (
                <li key={step.title}>
                  <Reveal>
                    <article className="flex flex-col gap-5 rounded-xl border border-line bg-paper p-6 shadow-xs md:flex-row md:gap-8 md:p-8">
                      <div className="flex shrink-0 items-start gap-4 md:w-64">
                        <span className="tnum inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand font-display text-lg wonk text-paper">
                          {index + 1}
                        </span>
                        <div>
                          <h2 className="font-display text-xl text-ink">{step.title}</h2>
                          <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{step.text}</p>
                        </div>
                      </div>

                      <dl className="grid flex-1 grid-cols-1 gap-4 border-t border-line pt-5 sm:grid-cols-2 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                        <div>
                          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-3">{labels.provide}</dt>
                          <dd className="mt-1 text-sm leading-relaxed text-ink-2">{detail.provide}</dd>
                        </div>
                        <div>
                          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-3">{labels.deliver}</dt>
                          <dd className="mt-1 text-sm leading-relaxed text-ink-2">{detail.deliver}</dd>
                        </div>
                        <div>
                          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-3">{labels.delay}</dt>
                          <dd className="tnum mt-1 text-sm leading-relaxed text-ink-2">{detail.delay}</dd>
                        </div>
                        <div>
                          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-3">{labels.tools}</dt>
                          <dd className="mt-1 text-sm leading-relaxed text-ink-2">{detail.tools}</dd>
                        </div>
                      </dl>
                    </article>
                  </Reveal>
                </li>
              )
            })}
          </ol>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal className="mx-auto flex max-w-2xl flex-col items-start gap-4 rounded-xl border border-c2/25 bg-c2-bg p-6 text-left sm:flex-row sm:items-center md:p-8">
            <Icon name="clock" size={28} className="shrink-0 text-c2" />
            <div>
              <h2 className="font-display text-lg text-ink">{commitment.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{commitment.text}</p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaBand
        title={CTA_TITLE[locale]}
        primaryLabel={ui.common.bookAppointment}
        primaryHref={path(locale, 'contact')}
        secondaryLabel={ui.nav.services}
        secondaryHref={path(locale, 'services')}
      />
    </>
  )
}
