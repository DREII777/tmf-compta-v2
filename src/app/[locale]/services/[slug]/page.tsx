import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { CtaBand } from '@/components/CtaBand'
import { Faq } from '@/components/Faq'
import { Icon } from '@/components/Icon'
import { JsonLd } from '@/components/JsonLd'
import { Reveal } from '@/components/Reveal'
import { Section } from '@/components/Section'
import { ServiceCard } from '@/components/ServiceCard'
import { FAQ } from '@/content/faq'
import { relatedServices, SERVICES } from '@/content/services'
import type { FaqItem, Service } from '@/content/types'
import { UI } from '@/content/ui'
import { HUE_BADGE } from '@/lib/hue'
import { abs, isLocale, LOCALES, path, servicePath, type Locale } from '@/lib/i18n'
import { AREA_SERVED, SITE } from '@/lib/site'

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
  return LOCALES.flatMap((locale) => SERVICES.map((service) => ({ locale, slug: service[locale].slug })))
}

interface ServiceDetailPageProps {
  params: Promise<{ locale: string; slug: string }>
}

function findServiceBySlug(locale: Locale, slug: string): Service | undefined {
  return SERVICES.find((service) => service[locale].slug === slug)
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale
  const service = findServiceBySlug(locale, slug)
  if (!service) notFound()
  const content = service[locale]

  return {
    title: { absolute: content.metaTitle },
    description: content.metaDescription,
    alternates: {
      canonical: abs(servicePath(locale, content.slug)),
      languages: {
        'fr-BE': abs(servicePath('fr', service.fr.slug)),
        ro: abs(servicePath('ro', service.ro.slug)),
        'x-default': abs(servicePath('fr', service.fr.slug)),
      },
    },
  }
}

/**
 * Textes propres à cette page, absents des collections de contenu
 * génériques (`ServiceLocaleContent` ne porte pas de champ « pour qui »).
 * Rédigés en FR et RO, indexés par `Service.id`.
 */
const SERVICE_AUDIENCE: Record<string, Record<Locale, string>> = {
  'tenue-comptabilite': {
    fr: "Indépendants, professions libérales et sociétés de toute taille qui veulent une comptabilité fiable sans y consacrer leur temps : commerces, prestataires de services, professions médicales ou artisans, que vous démarriez votre activité ou la gériez depuis plusieurs années.",
    ro: 'Independenți, profesii liberale și societăți de orice dimensiune care doresc o contabilitate de încredere fără a-și consuma timpul cu ea: comercianți, prestatori de servicii, profesii medicale sau meseriași, fie că vă porniți activitatea, fie că o gestionați de mai mulți ani.',
  },
  'conseil-fiscal': {
    fr: "Dirigeants de société et indépendants confrontés à des décisions fiscales importantes : restructuration, rémunération du dirigeant, investissement, transmission, ou simplement volonté d'optimiser légalement leur charge d'impôt sans prendre de risque inutile.",
    ro: 'Administratori de societăți și independenți care se confruntă cu decizii fiscale importante: restructurare, remunerarea administratorului, investiții, transmitere, sau, pur și simplu, dorința de a-și optimiza legal sarcina fiscală fără riscuri inutile.',
  },
  'creation-entreprise': {
    fr: "Futurs entrepreneurs qui hésitent entre l'indépendance et la société, porteurs de projet qui doivent élaborer un plan financier, ou professionnels qui changent de statut et veulent démarrer sur des bases juridiques et comptables solides dès le premier jour.",
    ro: 'Viitori antreprenori care ezită între statutul de independent și cel de societate, persoane cu un proiect ce necesită un plan financiar, sau profesioniști care își schimbă statutul și vor să pornească pe baze juridice și contabile solide chiar din prima zi.',
  },
  'aide-gestion': {
    fr: 'Dirigeants qui veulent transformer leurs chiffres en décisions : PME en croissance qui ont besoin de tableaux de bord clairs, indépendants qui préparent un investissement, ou entreprises qui doivent présenter un dossier solide à leur banque.',
    ro: 'Administratori care vor să transforme cifrele în decizii: PME-uri în creștere care au nevoie de tablouri de bord clare, independenți care pregătesc o investiție, sau companii care trebuie să prezinte un dosar solid băncii lor.',
  },
  social: {
    fr: "Indépendants qui embauchent leur premier employé, dirigeants qui s'interrogent sur leur régime de sécurité sociale ou leur pension complémentaire, et toute entreprise qui veut rester en règle avec ses obligations sociales sans s'y perdre.",
    ro: 'Independenți care angajează primul lor salariat, administratori care se întreabă despre regimul lor de securitate socială sau pensia complementară, și orice companie care vrea să rămână în regulă cu obligațiile sale sociale fără să se piardă în detalii.',
  },
  'accompagnement-personne': {
    fr: "Dirigeants et indépendants qui veulent construire leur avenir financier personnel au-delà de l'entreprise : planification de la retraite, gestion de patrimoine, transitions professionnelles, ou simplement un interlocuteur de confiance sur le long terme.",
    ro: 'Administratori și independenți care vor să-și construiască viitorul financiar personal dincolo de afacere: planificarea pensionării, gestionarea patrimoniului, tranziții profesionale, sau, pur și simplu, un interlocutor de încredere pe termen lung.',
  },
  'missions-speciales': {
    fr: "Dirigeants qui préparent une cession ou une reprise, actionnaires qui ont besoin d'une évaluation indépendante, ou entreprises confrontées à une restructuration, une fusion ou un dossier comptable complexe nécessitant un regard expert.",
    ro: 'Administratori care pregătesc o cesiune sau o preluare, acționari care au nevoie de o evaluare independentă, sau companii confruntate cu o restructurare, o fuziune sau un dosar contabil complex ce necesită o privire de expert.',
  },
  peppol: {
    fr: "Toute entreprise assujettie à la TVA en Belgique qui facture d'autres assujettis belges (B2B) : PME, indépendants et sociétés qui doivent se mettre en conformité avec l'obligation Peppol entrée en vigueur le 1ᵉʳ janvier 2026.",
    ro: 'Orice companie plătitoare de TVA în Belgia care facturează către alți plătitori de TVA belgieni (B2B): IMM-uri, independenți și societăți care trebuie să se conformeze obligației Peppol intrate în vigoare la 1 ianuarie 2026.',
  },
  'controles-fiscaux': {
    fr: 'Indépendants et sociétés qui ont reçu un avis de contrôle ou de rectification, ainsi que toute entreprise qui souhaite préparer ses dossiers en amont pour aborder un futur contrôle fiscal avec sérénité.',
    ro: 'Independenți și societăți care au primit o notificare de control sau de rectificare, precum și orice companie care dorește să-și pregătească dosarele din timp pentru a aborda un viitor control fiscal cu liniște.',
  },
}

/** 2 à 3 questions de la FAQ générale, choisies pour leur pertinence par service. */
const SERVICE_FAQ_IDS: Record<string, string[]> = {
  'tenue-comptabilite': ['tva-frequence', 'documents-mensuels', 'changement-comptable'],
  'conseil-fiscal': ['delais-fiscaux', 'independant-ou-societe', 'honoraires'],
  'creation-entreprise': ['creation-srl', 'independant-ou-societe', 'prise-de-rdv'],
  'aide-gestion': ['honoraires', 'documents-mensuels', 'prise-de-rdv'],
  social: ['independant-ou-societe', 'honoraires', 'changement-comptable'],
  'accompagnement-personne': ['honoraires', 'prise-de-rdv', 'accompagnement-roumain'],
  'missions-speciales': ['honoraires', 'avis-controle-fiscal', 'prise-de-rdv'],
  peppol: ['peppol-obligation', 'delais-fiscaux', 'honoraires'],
  'controles-fiscaux': ['avis-controle-fiscal', 'delais-fiscaux', 'honoraires'],
}

const T: Record<
  Locale,
  { included: string; audience: string; method: string; faq: string; related: string; talkToUs: string }
> = {
  fr: {
    included: 'Ce que couvre ce service',
    audience: 'Pour qui ?',
    method: 'Comment nous travaillons',
    faq: 'Questions fréquentes sur ce service',
    related: 'Services associés',
    talkToUs: 'Une question sur ce service ?',
  },
  ro: {
    included: 'Ce acoperă acest serviciu',
    audience: 'Pentru cine?',
    method: 'Cum lucrăm',
    faq: 'Întrebări frecvente despre acest serviciu',
    related: 'Servicii conexe',
    talkToUs: 'O întrebare despre acest serviciu?',
  },
}



function serviceFaqItems(current: Service): FaqItem[] {
  const ids = SERVICE_FAQ_IDS[current.id] ?? []
  return ids
    .map((id) => FAQ.find((item) => item.id === id))
    .filter((item): item is FaqItem => item !== undefined)
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { locale: rawLocale, slug } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale
  const service = findServiceBySlug(locale, slug)
  if (!service) notFound()

  const content = service[locale]
  const ui = UI[locale]
  const t = T[locale]
  const steps = ui.methodPage.steps.slice(0, 3)
  const faqItems = serviceFaqItems(service)
  const related = relatedServices(service.id)

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: content.title,
    name: content.title,
    description: content.summary,
    url: abs(servicePath(locale, content.slug)),
    areaServed: AREA_SERVED.map((place) => ({ '@type': 'City', name: place })),
    provider: {
      '@type': 'AccountingService',
      name: SITE.legalName,
      url: abs(path(locale, 'home')),
      telephone: SITE.phoneRaw,
      email: SITE.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.address.street,
        postalCode: SITE.address.postalCode,
        addressLocality: SITE.address.city,
        addressCountry: SITE.address.country,
      },
    },
  }

  return (
    <>
      <Section>
        <Container>
          <Breadcrumbs
            locale={locale}
            items={[
              { label: ui.nav.services, href: path(locale, 'services') },
              { label: content.title, href: servicePath(locale, content.slug) },
            ]}
          />
          <div className="mt-6 flex items-start gap-4">
            <span className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${HUE_BADGE[service.hue]}`}>
              <Icon name={service.icon} size={28} />
            </span>
            <div>
              <h1 className="balance max-w-2xl font-display text-3xl wonk text-ink md:text-5xl">{content.title}</h1>
              <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-2">{content.summary}</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="soft">
        <Container>
          <div className="grid gap-10 lg:grid-cols-3">
            <article className="flex max-w-prose flex-col gap-6 lg:col-span-2">
              {content.description.map((paragraph, index) => (
                <p key={index} className="leading-relaxed text-ink-2">
                  {paragraph}
                </p>
              ))}

              <h2 className="mt-4 font-display text-2xl wonk text-ink">{t.included}</h2>
              <ul className="flex flex-col gap-3">
                {content.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <Icon name="check-circle" size={20} className="mt-0.5 shrink-0 text-brand" />
                    <span className="leading-relaxed text-ink-2">{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>

            <aside className="flex flex-col gap-6">
              <Card>
                <h2 className="flex items-center gap-2 font-display text-lg text-ink">
                  <Icon name="users" size={20} className="text-brand" />
                  {t.audience}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-2">{SERVICE_AUDIENCE[service.id][locale]}</p>
              </Card>

              <div className="rounded-lg border border-brand/15 bg-brand-tint p-6">
                <h2 className="flex items-center gap-2 font-display text-lg text-ink">
                  <Icon name="calendar" size={20} className="text-brand" />
                  {t.talkToUs}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-2">{ui.contactPage.intro}</p>
                <Button href={path(locale, 'contact')} size="sm" className="mt-4 w-full">
                  {ui.common.bookAppointment}
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="balance max-w-2xl font-display text-3xl wonk text-ink md:text-5xl">{t.method}</h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="flex flex-col gap-3 rounded-xl border border-line bg-paper p-6 shadow-xs">
                <span className="tnum inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-semibold text-paper">
                  {index + 1}
                </span>
                <h3 className="font-display text-lg text-ink">{step.title}</h3>
                <p className="text-sm leading-relaxed text-ink-2">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {faqItems.length > 0 && (
        <Section tone="soft">
          <Container>
            <h2 className="balance max-w-2xl font-display text-3xl wonk text-ink md:text-5xl">{t.faq}</h2>
            <Faq items={faqItems} locale={locale} className="mt-8 max-w-3xl" />
          </Container>
        </Section>
      )}

      <Section>
        <Container>
          <h2 className="balance max-w-2xl font-display text-3xl wonk text-ink md:text-5xl">{t.related}</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((relatedService: Service) => (
              <Reveal key={relatedService.id}>
                <ServiceCard service={relatedService} locale={locale} ctaLabel={ui.common.discoverService} className="h-full" />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        title={ui.home.ctaBandTitle}
        description={ui.contactPage.intro}
        primaryLabel={ui.common.bookAppointment}
        primaryHref={path(locale, 'contact')}
        secondaryLabel={ui.common.viewAllServices}
        secondaryHref={path(locale, 'services')}
      />

      <JsonLd data={serviceJsonLd} />
    </>
  )
}
