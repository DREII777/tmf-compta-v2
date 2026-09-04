import { Accent } from '@/components/Accent'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Container } from '@/components/Container'
import { CtaBand } from '@/components/CtaBand'
import { Icon, type IconName } from '@/components/Icon'
import { Reveal } from '@/components/Reveal'
import { Section } from '@/components/Section'
import { ServiceCard } from '@/components/ServiceCard'
import { SERVICE_GROUPS, SERVICES } from '@/content/services'
import type { Service } from '@/content/types'
import { UI } from '@/content/ui'
import { alternatesFor, isLocale, LOCALES, path, servicePath, type Locale } from '@/lib/i18n'

export const dynamic = 'force-static'
/**
 * Tout slug hors de `generateStaticParams` renvoie un 404 rendu par
 * `app/not-found.tsx`. `dynamicParams = false` est indispensable : sans lui,
 * le segment est rendu à la demande et le `notFound()` levé depuis le
 * composant ne remonte pas jusqu'à la frontière 404 — Next 16.3.4 sert alors
 * un document `<html id="__next_error__">` au corps vide (reproduit sur une
 * app Next nue de cinq fichiers, donc indépendant de ce projet).
 */
export const dynamicParams = false

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

interface ServicesIndexPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: ServicesIndexPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale
  const ui = UI[locale].servicesPage

  return {
    title: { absolute: ui.metaTitle },
    description: ui.metaDescription,
    alternates: alternatesFor('services', locale),
  }
}

/**
 * « À chaque phase de votre entreprise » — regroupe les 9 services autour
 * des trois moments clés déjà annoncés par `UI.home.phase*`. Contenu propre
 * à cette page (pas un dictionnaire d'UI générique), rédigé en FR et RO.
 */
interface Phase {
  icon: IconName
  titleKey: 'phaseCreation' | 'phaseGestion' | 'phaseExpansion'
  text: Record<Locale, string>
  serviceIds: readonly string[]
}

const PHASES: Phase[] = [
  {
    icon: 'rocket',
    titleKey: 'phaseCreation',
    text: {
      fr: "Choix du statut, plan financier, immatriculation à la Banque-Carrefour des Entreprises et à la TVA : nous posons les bases de votre activité avant même le premier encodage comptable.",
      ro: 'Alegerea statutului, planul financiar, înmatricularea la Banca-Răscruce a Întreprinderilor și la TVA: punem bazele activității dumneavoastră chiar înainte de prima înregistrare contabilă.',
    },
    serviceIds: SERVICE_GROUPS.creation,
  },
  {
    icon: 'compass',
    titleKey: 'phaseGestion',
    text: {
      fr: 'TVA, tableaux de bord, obligations sociales, facturation électronique Peppol : nous suivons vos échéances au quotidien pour que vous puissiez piloter votre activité sereinement.',
      ro: 'TVA, tablouri de bord, obligații sociale, facturare electronică Peppol: urmărim termenele dumneavoastră în fiecare zi, pentru ca dumneavoastră să vă puteți conduce afacerea cu liniște.',
    },
    serviceIds: SERVICE_GROUPS.gestion,
  },
  {
    icon: 'shield',
    titleKey: 'phaseExpansion',
    text: {
      fr: "Audit, évaluation d'entreprise, contrôle fiscal, structuration de votre patrimoine : nos missions les plus pointues accompagnent les étapes qui comptent le plus pour votre croissance.",
      ro: 'Audit, evaluare de întreprindere, control fiscal, structurarea patrimoniului dumneavoastră: misiunile noastre cele mai avansate vă însoțesc în etapele care contează cel mai mult pentru creșterea afacerii.',
    },
    serviceIds: SERVICE_GROUPS.expansion,
  },
]

/** Titre de section masqué visuellement : évite un saut h1 → h3 (la grille n'affichait que les h3 des cartes). */
const SERVICES_GRID_HEADING: Record<Locale, string> = {
  fr: "Nos 9 domaines d'expertise",
  ro: 'Cele 9 domenii de expertiză ale noastre',
}

function resolveServices(ids: readonly string[]): Service[] {
  return ids
    .map((id) => SERVICES.find((service) => service.id === id))
    .filter((service): service is Service => service !== undefined)
}

export default async function ServicesIndexPage({ params }: ServicesIndexPageProps) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale
  const ui = UI[locale]

  return (
    <>
      <Section>
        <Container>
          <Breadcrumbs locale={locale} items={[{ label: ui.nav.services, href: path(locale, 'services') }]} />
          <h1 className="balance mt-6 max-w-2xl font-display text-3xl wonk text-ink md:text-5xl">
            {ui.servicesPage.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">{ui.servicesPage.intro}</p>
        </Container>
      </Section>

      <Section tone="soft">
        <Container>
          <h2 className="sr-only">{SERVICES_GRID_HEADING[locale]}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <Reveal key={service.id}>
                <ServiceCard
                  service={service}
                  locale={locale}
                  ctaLabel={ui.common.details}
                  className="h-full"
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="balance max-w-2xl font-display text-3xl wonk text-ink md:text-5xl"><Accent text={ui.home.phasesTitle} /></h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PHASES.map((phase) => {
              const relatedServices = resolveServices(phase.serviceIds)
              return (
                <div key={phase.titleKey} className="flex h-full flex-col gap-4 rounded-xl bg-paper p-6 shadow-card">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-tint text-brand">
                    <Icon name={phase.icon} size={22} />
                  </span>
                  <h3 className="font-display text-xl wonk text-ink">{ui.home[phase.titleKey]}</h3>
                  <p className="text-sm leading-relaxed text-ink-2">{phase.text[locale]}</p>
                  <ul className="mt-auto flex flex-col gap-2 border-t border-line pt-4">
                    {relatedServices.map((service) => {
                      const content = service[locale]
                      return (
                        <li key={service.id}>
                          <Link
                            href={servicePath(locale, content.slug)}
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors duration-200 ease-out-soft hover:text-brand-2 hover:underline"
                          >
                            {content.title}
                            <Icon name="arrow-right" size={14} />
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
        </Container>
      </Section>

      <CtaBand
        title={ui.home.ctaBandTitle}
        description={ui.contactPage.intro}
        primaryLabel={ui.common.bookAppointment}
        primaryHref={path(locale, 'contact')}
        secondaryLabel={ui.nav.method}
        secondaryHref={path(locale, 'method')}
      />
    </>
  )
}
