import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Container } from '@/components/Container'
import { CtaBand } from '@/components/CtaBand'
import { Icon, type IconName } from '@/components/Icon'
import { Reveal } from '@/components/Reveal'
import { Section } from '@/components/Section'
import { Stat } from '@/components/Stat'
import { Timeline } from '@/components/Timeline'
import { IllustrationCabinet, IllustrationWhyUs } from '@/components/illustrations/Phases'
import { SERVICES } from '@/content/services'
import { TIMELINE } from '@/content/timeline'
import { UI } from '@/content/ui'
import { alternatesFor, path, servicePath, type Locale } from '@/lib/i18n'
import { SITE } from '@/lib/site'

/**
 * Contenu propre à la page « À propos », rédigé (pas traduit) pour chaque
 * locale. Ne duplique pas les textes déjà verbatim dans `@/content/ui`
 * (Qui sommes-nous / Notre mission / notre histoire) — ne fait qu'ajouter
 * ce qui manque : lede, identité légale, valeurs.
 */
interface ValueItem {
  icon: IconName
  title: string
  text: string
}

const LEDE: Record<Locale, string> = {
  fr: "TMF Compta SRL est l'aboutissement d'une aventure entamée en 2014 : une équipe d'experts-comptables installée à Zaventem, qui accompagne indépendants et PME dans leur comptabilité, leur fiscalité et leurs décisions de gestion. La structure juridique a changé en 2025, l'équipe et l'adresse non — Sterrebeekstraat 154, à Zaventem.",
  ro: 'TMF Compta SRL este rezultatul unei aventuri începute în 2014: o echipă de experți contabili din Zaventem, care însoțește independenți și PME-uri în contabilitatea, fiscalitatea și deciziile lor de gestiune. Structura juridică s-a schimbat în 2025, echipa și adresa nu — Sterrebeekstraat 154, în Zaventem.',
}

const IDENTITY_TITLE: Record<Locale, string> = {
  fr: 'Notre identité légale',
  ro: 'Identitatea noastră legală',
}

const IDENTITY_TEXT: Record<Locale, string> = {
  fr: "Agréés ITAA depuis 2014, nous exerçons depuis 2025 sous la forme d'une société à responsabilité limitée. Le changement de forme juridique nous a imposé de refaire l'intégralité du processus d'inscription : l'agrément a été reporté sur la nouvelle structure, sans jamais être interrompu.",
  ro: 'Acreditați ITAA din 2014, activăm din 2025 sub forma unei societăți cu răspundere limitată. Schimbarea formei juridice ne-a impus reluarea integrală a procesului de înscriere: acreditarea a fost transferată noii structuri, fără nicio întrerupere.',
}

const TEAM_TITLE: Record<Locale, string> = {
  fr: 'Qui vous répond',
  ro: 'Cine vă răspunde',
}

const TEAM_LEDE: Record<Locale, string> = {
  fr: "Vous n'êtes pas un dossier dans une file. Chez nous, un même interlocuteur suit votre entreprise d'une année sur l'autre : il connaît votre activité, vos échéances et vos habitudes, et vous n'avez jamais à réexpliquer votre situation.",
  ro: 'Nu sunteți un dosar într-un teanc. La noi, aceeași persoană vă urmărește firma de la un an la altul: vă cunoaște activitatea, termenele și obiceiurile, iar dumneavoastră nu trebuie să reexplicați niciodată situația.',
}

interface Commitment {
  icon: IconName
  title: string
  text: string
}

const COMMITMENTS: Record<Locale, Commitment[]> = {
  fr: [
    {
      icon: 'users',
      title: 'Un interlocuteur unique',
      text: "La même personne suit votre dossier dans la durée. Pas de rotation, pas de centre d'appels, pas de dossier qui repart de zéro.",
    },
    {
      icon: 'globe',
      title: 'En français et en roumain',
      text: "Nous travaillons dans les deux langues, à l'oral comme à l'écrit. Vos obligations vous sont expliquées dans celle où vous êtes le plus à l'aise.",
    },
    {
      icon: 'clock',
      title: 'Une réponse sous 24 h ouvrées',
      text: "Une question sur une facture, un contrôle, une échéance : vous obtenez une réponse le jour même ou le lendemain ouvré.",
    },
    {
      icon: 'shield',
      title: 'Une profession encadrée',
      text: "Expert-comptable (fiscaliste) inscrit à l'ITAA. Un titre protégé par la loi, soumis à une déontologie et à une assurance de responsabilité professionnelle.",
    },
  ],
  ro: [
    {
      icon: 'users',
      title: 'Un singur interlocutor',
      text: 'Aceeași persoană vă urmărește dosarul în timp. Fără rotație, fără call-center, fără dosare care o iau de la capăt.',
    },
    {
      icon: 'globe',
      title: 'În franceză și în română',
      text: 'Lucrăm în ambele limbi, verbal și în scris. Obligațiile vă sunt explicate în limba în care vă simțiți cel mai confortabil.',
    },
    {
      icon: 'clock',
      title: 'Răspuns în 24 de ore lucrătoare',
      text: 'O întrebare despre o factură, un control, un termen: primiți răspuns în aceeași zi sau în ziua lucrătoare următoare.',
    },
    {
      icon: 'shield',
      title: 'O profesie reglementată',
      text: 'Expert-contabil (fiscalist) înscris la ITAA. Un titlu protejat prin lege, supus deontologiei și unei asigurări de răspundere profesională.',
    },
  ],
}

const SERVICES_TITLE: Record<Locale, string> = {
  fr: 'Ce que nous prenons en charge',
  ro: 'Ce preluăm noi',
}

const SERVICES_LEDE: Record<Locale, string> = {
  fr: 'Neuf domaines, un seul cabinet. Chacun dispose de sa page détaillée.',
  ro: 'Nouă domenii, un singur cabinet. Fiecare are pagina sa detaliată.',
}

const AREA_TITLE: Record<Locale, string> = {
  fr: 'Où nous intervenons',
  ro: 'Unde intervenim',
}

const AREA_TEXT: Record<Locale, string> = {
  fr: "Nos bureaux sont à Zaventem, en bordure immédiate de Bruxelles. Nous accompagnons des indépendants et des sociétés dans toute la périphérie est — Kraainem, Wezembeek-Oppem, Machelen, Diegem, Sterrebeek, Woluwe — ainsi qu'en Région bruxelloise.",
  ro: 'Birourile noastre sunt în Zaventem, la marginea Bruxelles-ului. Însoțim independenți și societăți din toată periferia de est — Kraainem, Wezembeek-Oppem, Machelen, Diegem, Sterrebeek, Woluwe — precum și din Regiunea Bruxelles.',
}

const VALUES_TITLE: Record<Locale, string> = {
  fr: 'Nos valeurs',
  ro: 'Valorile noastre',
}

const VALUES: Record<Locale, ValueItem[]> = {
  fr: [
    {
      icon: 'users',
      title: 'Proximité',
      text: "Une équipe que vous connaissez, à la même adresse depuis 2014. Vous parlez toujours aux mêmes personnes, jamais à un centre d'appels.",
    },
    {
      icon: 'check-circle',
      title: 'Rigueur',
      text: "Des chiffres tenus avec méthode, des échéances suivies de près : votre dossier n'attend jamais notre attention.",
    },
    {
      icon: 'euro',
      title: 'Transparence',
      text: "Des honoraires établis sur devis, clairs dès le premier échange, sans frais cachés ni surprise en fin d'année.",
    },
    {
      icon: 'shield',
      title: 'Continuité',
      text: "Agréés ITAA sans interruption depuis 2014. Le passage en SRL a imposé de refaire tout le processus d'inscription, sans jamais rompre la continuité : la même expertise, portée par la même équipe.",
    },
  ],
  ro: [
    {
      icon: 'users',
      title: 'Proximitate',
      text: 'O echipă pe care o cunoașteți, la aceeași adresă din 2014. Vorbiți mereu cu aceiași oameni, niciodată cu un call-center.',
    },
    {
      icon: 'check-circle',
      title: 'Rigurozitate',
      text: 'Cifre ținute cu metodă, termene urmărite îndeaproape: dosarul dumneavoastră nu așteaptă niciodată atenția noastră.',
    },
    {
      icon: 'euro',
      title: 'Transparență',
      text: 'Onorarii stabilite pe bază de ofertă, clare din prima discuție, fără costuri ascunse sau surprize la finalul anului.',
    },
    {
      icon: 'shield',
      title: 'Continuitate',
      text: 'Acreditați ITAA fără întrerupere din 2014. Trecerea la SRL a impus reluarea întregului proces de înscriere, fără a rupe vreodată continuitatea: aceeași expertiză, susținută de aceeași echipă.',
    },
  ],
}

const CTA_TITLE: Record<Locale, string> = {
  fr: 'Envie de nous rencontrer ?',
  ro: 'Doriți să ne cunoașteți?',
}

const CTA_TEXT: Record<Locale, string> = {
  fr: 'Découvrez comment se déroule un premier échange, ou contactez-nous directement pour en parler.',
  ro: 'Descoperiți cum decurge o primă discuție sau contactați-ne direct pentru a vorbi despre proiectul dumneavoastră.',
}

export function aboutMetadata(locale: Locale): Metadata {
  const ui = UI[locale].aboutPage
  return {
    title: { absolute: ui.metaTitle },
    description: ui.metaDescription,
    alternates: alternatesFor('about', locale),
  }
}

export function AboutPage({ locale }: { locale: Locale }) {
  const ui = UI[locale]
  const about = ui.aboutPage
  const home = ui.home

  return (
    <>
      <Section className="pb-8 pt-10 md:pb-12 md:pt-14">
        <Container>
          <Breadcrumbs locale={locale} items={[{ label: ui.nav.about, href: path(locale, 'about') }]} />
          <h1 className="wonk mt-6 max-w-2xl font-display text-3xl text-ink md:text-5xl">{about.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">{LEDE[locale]}</p>

          <div className="mt-10 grid grid-cols-1 gap-8 border-t border-line pt-8 sm:grid-cols-3">
            <Stat icon="shield" value={String(SITE.itaaSince)} label={locale === 'fr' ? 'Agréés ITAA depuis' : 'Acreditați ITAA din'} />
            <Stat icon="calendar" value={String(SITE.foundedTeam)} label={locale === 'fr' ? 'Même équipe depuis' : 'Aceeași echipă din'} />
            <Stat icon="building" value="2025" label={locale === 'fr' ? 'Restructuration en SRL' : 'Restructurare în SRL'} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <Reveal>
              <h2 className="wonk font-display text-2xl text-ink md:text-3xl">{home.aboutTitle}</h2>
              <p className="mt-4 leading-relaxed text-ink-2">{home.aboutText}</p>
            </Reveal>
            <Reveal delay={100} className="order-first md:order-last">
              <IllustrationCabinet className="w-full" />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="soft">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <Reveal>
              <IllustrationWhyUs className="w-full" />
            </Reveal>
            <Reveal delay={100}>
              <h2 className="wonk font-display text-2xl text-ink md:text-3xl">{home.missionTitle}</h2>
              <p className="mt-4 leading-relaxed text-ink-2">{home.missionText}</p>

              <div className="mt-6 flex items-start gap-3 rounded-lg border border-c2/25 bg-c2-bg p-4">
                <Icon name="shield" size={20} className="mt-0.5 shrink-0 text-c2" />
                <div>
                  <p className="font-display text-base text-ink">{IDENTITY_TITLE[locale]}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-2">{IDENTITY_TEXT[locale]}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <h2 className="wonk max-w-xl font-display text-2xl text-ink md:text-3xl">{home.timelineTitle}</h2>
          </Reveal>
          <Reveal delay={100} className="mt-10 max-w-2xl">
            <Timeline items={TIMELINE} locale={locale} />
          </Reveal>
        </Container>
      </Section>

      <Section tone="soft">
        <Container>
          <Reveal>
            <h2 className="wonk max-w-xl font-display text-2xl text-ink md:text-3xl">{TEAM_TITLE[locale]}</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink-2">{TEAM_LEDE[locale]}</p>
          </Reveal>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {COMMITMENTS[locale].map((item) => (
              <li key={item.title}>
                <Reveal className="h-full">
                  <article className="flex h-full gap-4 rounded-xl bg-paper p-6 shadow-card">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-tint text-brand">
                      <Icon name={item.icon} size={22} />
                    </span>
                    <div>
                      <h3 className="font-display text-lg text-ink">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-2">{item.text}</p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <h2 className="wonk max-w-xl font-display text-2xl text-ink md:text-3xl">{SERVICES_TITLE[locale]}</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink-2">{SERVICES_LEDE[locale]}</p>
          </Reveal>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => {
              const content = service[locale]
              return (
                <li key={service.id}>
                  <Reveal className="h-full">
                    <Link
                      href={servicePath(locale, content.slug)}
                      className="group flex h-full items-center justify-between gap-3 rounded-lg border border-line bg-paper px-5 py-4 shadow-xs transition duration-200 ease-out-soft hover:shadow-card-hover focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand"
                    >
                      <span className="font-medium text-ink">{content.title}</span>
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-ink-3 transition-transform duration-200 ease-out-soft group-hover:translate-x-1 group-hover:text-brand"
                      >
                        <Icon name="arrow-right" size={18} />
                      </span>
                    </Link>
                  </Reveal>
                </li>
              )
            })}
          </ul>

          <Reveal delay={120}>
            <div className="mt-10 rounded-xl bg-soft p-6 md:p-8">
              <h3 className="font-display text-lg text-ink">{AREA_TITLE[locale]}</h3>
              <p className="mt-3 max-w-prose leading-relaxed text-ink-2">{AREA_TEXT[locale]}</p>
              <Link
                href={path(locale, 'local')}
                className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-2 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand"
              >
                {ui.nav.local}
                <Icon name="arrow-right" size={16} aria-hidden />
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="soft">
        <Container>
          <Reveal>
            <h2 className="wonk max-w-xl font-display text-2xl text-ink md:text-3xl">{VALUES_TITLE[locale]}</h2>
          </Reveal>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {VALUES[locale].map((value) => (
              <li key={value.title}>
                <Reveal className="h-full">
                  <article className="flex h-full flex-col gap-3 rounded-xl bg-paper p-6 shadow-card">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-tint text-brand">
                      <Icon name={value.icon} size={22} />
                    </span>
                    <h3 className="font-display text-lg text-ink">{value.title}</h3>
                    <p className="text-sm leading-relaxed text-ink-2">{value.text}</p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand
        title={CTA_TITLE[locale]}
        description={CTA_TEXT[locale]}
        primaryLabel={ui.common.bookAppointment}
        primaryHref={path(locale, 'contact')}
        secondaryLabel={ui.nav.method}
        secondaryHref={path(locale, 'method')}
      />
    </>
  )
}
