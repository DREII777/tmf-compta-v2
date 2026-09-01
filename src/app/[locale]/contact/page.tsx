import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Container } from '@/components/Container'
import { ContactForm } from '@/components/ContactForm'
import { InteractiveMap } from '@/components/InteractiveMap'
import { Icon } from '@/components/Icon'
import { JsonLd } from '@/components/JsonLd'
import { Reveal } from '@/components/Reveal'
import { Section } from '@/components/Section'
import { UI } from '@/content/ui'
import { abs, alternatesFor, isLocale, LOCALES, path, type Locale } from '@/lib/i18n'
import { SITE } from '@/lib/site'

/**
 * Page contact : le slug `contact` est identique en FR et en RO
 * (`ROUTES.contact`), donc un unique dossier littéral suffit — pas besoin
 * du routeur générique `[locale]/[page]/page.tsx` (réservé aux slugs qui
 * diffèrent par langue, voir son commentaire de tête).
 */

type EnglishDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'

const DAY_ORDER: EnglishDay[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const DAY_LABEL: Record<Locale, Record<EnglishDay, string>> = {
  fr: {
    Monday: 'Lundi',
    Tuesday: 'Mardi',
    Wednesday: 'Mercredi',
    Thursday: 'Jeudi',
    Friday: 'Vendredi',
    Saturday: 'Samedi',
    Sunday: 'Dimanche',
  },
  ro: {
    Monday: 'Luni',
    Tuesday: 'Marți',
    Wednesday: 'Miercuri',
    Thursday: 'Joi',
    Friday: 'Vineri',
    Saturday: 'Sâmbătă',
    Sunday: 'Duminică',
  },
}

const CLOSED_LABEL: Record<Locale, string> = { fr: 'Fermé', ro: 'Închis' }

const COORDS_TITLE: Record<Locale, string> = { fr: 'Nos coordonnées', ro: 'Datele noastre de contact' }
const COUNTRY_LABEL: Record<Locale, string> = { fr: 'Belgique', ro: 'Belgia' }

const ACCESS_TITLE: Record<Locale, string> = { fr: 'Accès', ro: 'Acces' }

const ACCESS_TEXT: Record<Locale, string> = {
  fr: "Nos bureaux se trouvent à Zaventem, à proximité immédiate de l'aéroport de Bruxelles-National. Le site est accessible en voiture — des places de stationnement existent dans le quartier — ainsi qu'en transports en commun.",
  ro: 'Biroul nostru se află în Zaventem, în imediata apropiere a aeroportului Bruxelles-National. Accesul este posibil cu mașina — există locuri de parcare în zonă — precum și cu transportul în comun.',
}

function hoursForDay(day: EnglishDay): { opens: string; closes: string } | null {
  const entry = SITE.hours.find((item) => (item.days as readonly string[]).includes(day))
  return entry ? { opens: entry.opens, closes: entry.closes } : null
}

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

interface ContactPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const ui = UI[raw].contactPage
  return {
    title: { absolute: ui.metaTitle },
    description: ui.metaDescription,
    alternates: alternatesFor('contact', raw),
  }
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw
  const ui = UI[locale]
  const contact = ui.contactPage

  const contactPointJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    url: abs(path(locale, 'contact')),
    about: {
      '@type': 'AccountingService',
      name: SITE.legalName,
      telephone: SITE.phoneRaw,
      email: SITE.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.address.street,
        postalCode: SITE.address.postalCode,
        addressLocality: SITE.address.city,
        addressRegion: SITE.address.region,
        addressCountry: SITE.address.country,
      },
    },
  }

  return (
    <>
      <Section className="pb-8 pt-10 md:pb-12 md:pt-14">
        <Container>
          <Breadcrumbs locale={locale} items={[{ label: ui.nav.contact, href: path(locale, 'contact') }]} />
          <h1 className="wonk mt-6 max-w-2xl font-display text-3xl text-ink md:text-5xl">{contact.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">{contact.intro}</p>
        </Container>
      </Section>

      <Section tone="soft">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-12">
            <Reveal className="lg:col-span-3">
              <div className="rounded-xl border border-line bg-paper p-6 shadow-sm md:p-8">
                <h2 className="font-display text-2xl wonk text-ink">{contact.formTitle}</h2>
                <ContactForm locale={locale} className="mt-6" />
              </div>
            </Reveal>

            <Reveal delay={100} className="flex flex-col gap-8 lg:col-span-2">
              <div>
                <h2 className="font-display text-xl wonk text-ink">{COORDS_TITLE[locale]}</h2>
                <address className="mt-4 flex flex-col gap-3 text-sm not-italic leading-relaxed text-ink-2">
                  <span className="font-medium text-ink">{SITE.legalName}</span>
                  <span className="flex items-start gap-2.5">
                    <Icon name="pin" size={18} className="mt-0.5 shrink-0 text-brand" />
                    <span>
                      {SITE.address.street}
                      <br />
                      {SITE.address.postalCode} {SITE.address.city}, {COUNTRY_LABEL[locale]}
                    </span>
                  </span>
                  <span className="flex items-center gap-2.5">
                    <Icon name="doc" size={18} className="shrink-0 text-brand" />
                    {SITE.vat}
                  </span>
                  <a href={`tel:${SITE.phoneRaw}`} className="flex items-center gap-2.5 transition-colors duration-200 ease-out-soft hover:text-brand">
                    <Icon name="phone" size={18} className="shrink-0 text-brand" />
                    {SITE.phone}
                  </a>
                  <a href={`mailto:${SITE.email}`} className="flex items-center gap-2.5 transition-colors duration-200 ease-out-soft hover:text-brand">
                    <Icon name="mail" size={18} className="shrink-0 text-brand" />
                    {SITE.email}
                  </a>
                </address>
              </div>

              <div>
                <h2 className="font-display text-xl wonk text-ink">{contact.hoursTitle}</h2>
                <dl className="mt-4 flex flex-col divide-y divide-line text-sm">
                  {DAY_ORDER.map((day) => {
                    const hours = hoursForDay(day)
                    return (
                      <div key={day} className="flex items-center justify-between gap-4 py-2">
                        <dt className="text-ink-2">{DAY_LABEL[locale][day]}</dt>
                        <dd className="tnum font-medium text-ink">
                          {hours ? `${hours.opens} – ${hours.closes}` : CLOSED_LABEL[locale]}
                        </dd>
                      </div>
                    )
                  })}
                </dl>
              </div>

              <div>
                <h2 className="font-display text-xl wonk text-ink">{ACCESS_TITLE[locale]}</h2>
                <p className="mt-4 text-sm leading-relaxed text-ink-2">{ACCESS_TEXT[locale]}</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="sr-only">{contact.mapLabel}</h2>
          <InteractiveMap locale={locale} />
        </Container>
      </Section>

      <JsonLd data={contactPointJsonLd} />
    </>
  )
}
