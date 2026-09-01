import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { CtaBand } from '@/components/CtaBand'
import { Icon } from '@/components/Icon'
import { JsonLd } from '@/components/JsonLd'
import { Reveal } from '@/components/Reveal'
import { Section } from '@/components/Section'
import { UI } from '@/content/ui'
import { abs, alternatesFor, path, type Locale } from '@/lib/i18n'
import { AREA_SERVED, SITE } from '@/lib/site'

/**
 * Page SEO locale « Comptable à Zaventem ». Contenu propre à cette page,
 * rédigé pour chaque locale — réutilise `AREA_SERVED` (@/lib/site) comme
 * source unique de la liste des communes desservies, pour rester
 * synchronisée avec le JSON-LD `LocalBusiness` émis plus bas.
 */
type Area = (typeof AREA_SERVED)[number]

const AREA_BLURBS: Record<Area, Record<Locale, string>> = {
  Zaventem: {
    fr: "Notre commune d'implantation, du centre-ville aux zones d'activité proches de l'aéroport.",
    ro: 'Comuna în care suntem stabiliți, de la centru până la zonele de activitate din apropierea aeroportului.',
  },
  Bruxelles: {
    fr: 'De nombreux clients basés dans la capitale, accompagnés à distance ou lors de rendez-vous à Zaventem.',
    ro: 'Numeroși clienți din capitală, asistați la distanță sau la întâlniri stabilite la Zaventem.',
  },
  Kraainem: {
    fr: 'Indépendants et professions libérales, à la frontière de la Région bruxelloise.',
    ro: 'Independenți și profesii liberale, la granița cu Regiunea Bruxelles.',
  },
  'Wezembeek-Oppem': {
    fr: 'Une clientèle mixte, entre résidents et petites structures locales.',
    ro: 'O clientelă mixtă, între rezidenți și structuri mici locale.',
  },
  'Woluwe-Saint-Lambert': {
    fr: 'Sociétés et indépendants de cette commune bruxelloise voisine.',
    ro: 'Societăți și independenți din această comună bruxelleză vecină.',
  },
  Machelen: {
    fr: 'Zones industrielles et commerciales, à deux pas de nos bureaux.',
    ro: 'Zone industriale și comerciale, la doi pași de biroul nostru.',
  },
  Diegem: {
    fr: "Un pôle économique majeur, entre sièges d'entreprises internationales et PME logistiques.",
    ro: 'Un pol economic important, între sedii de companii internaționale și PME-uri din logistică.',
  },
  Sterrebeek: {
    fr: 'Commerces de proximité et indépendants installés dans ce quartier résidentiel de Zaventem.',
    ro: 'Comerț de proximitate și independenți stabiliți în acest cartier rezidențial al Zaventemului.',
  },
}

const CONTENT: Record<
  Locale,
  {
    accessTitle: string
    accessText: string
    areaIntro: string
    sectorsTitle: string
    sectorsIntro: string
    sectors: { title: string; text: string }[]
    findUsTitle: string
    findUsText: string
    hoursTitle: string
    ctaTitle: string
    ctaText: string
  }
> = {
  fr: {
    accessTitle: 'Un cabinet implanté au cœur de Zaventem',
    accessText:
      "Nos bureaux se trouvent Sterrebeekstraat 154, à quelques minutes du Ring de Bruxelles (R0) et de l'aéroport de Bruxelles-National. Cette position, au carrefour de l'E40, de l'E19 et du Ring, nous permet de recevoir aussi bien des indépendants du centre de Zaventem que des sociétés basées dans les zones d'activité économique de Diegem et de Machelen. Le stationnement est aisé aux abords de nos locaux, et nous recevons sur rendez-vous, en semaine, dans un cadre pensé pour des échanges sereins sur votre dossier. Vous préférez ne pas vous déplacer ? Un premier échange par téléphone ou en visioconférence reste toujours possible. Contrairement à un grand réseau comptable national, vous gardez ici un interlocuteur unique, qui connaît votre dossier et se déplace au besoin dans votre entreprise, à Zaventem ou dans les communes voisines.",
    areaIntro:
      "Si notre cabinet est né à Zaventem, notre clientèle s'étend bien au-delà des limites de la commune. Nous accompagnons au quotidien des indépendants et des sociétés installés dans tout le nord-est du Brabant flamand et la périphérie bruxelloise, dont :",
    sectorsTitle: 'Des entreprises de la périphérie, des besoins spécifiques',
    sectorsIntro:
      "La périphérie de Zaventem a son économie propre, façonnée par l'aéroport et les grands axes routiers, très différente de celle du centre de Bruxelles. Nous la connaissons de près, secteur par secteur :",
    sectors: [
      {
        title: 'Aéroport, transport et logistique',
        text: "La proximité de Brussels Airport façonne l'économie locale : transitaires, transporteurs, sociétés de fret et prestataires logistiques installés à Diegem ou à Machelen ont des besoins comptables spécifiques — facturation en devises étrangères, flux TVA intracommunautaires fréquents, suivi de sous-traitants internationaux. Nous adaptons votre comptabilité au rythme de ce secteur, où les volumes de facturation évoluent vite et où chaque retard de déclaration se paie cher.",
      },
      {
        title: 'Construction et sous-traitance',
        text: "Le secteur de la construction, très présent dans la périphérie, est soumis à des règles particulières : régime de TVA avec cocontractant, obligation de retenue en cas de dettes sociales ou fiscales du sous-traitant, enregistrement des présences sur chantier via Checkinatwork. Nous vérifions votre conformité avant qu'un contrôle ne la mette en évidence, que vous soyez entrepreneur principal ou sous-traitant.",
      },
      {
        title: 'HORECA',
        text: "Les restaurateurs et hôteliers de la région, nombreux à proximité de l'aéroport, doivent composer avec la caisse enregistreuse certifiée (« caisse blanche »), une main-d'œuvre souvent saisonnière et des cotisations sociales spécifiques. Nous les accompagnons dans la mise en conformité de leur caisse comme dans la gestion quotidienne de leur personnel, des extras du week-end aux contrats saisonniers d'été.",
      },
    ],
    findUsTitle: 'Comment nous trouver',
    findUsText:
      "Nos bureaux sont accessibles en voiture par le Ring de Bruxelles (sortie Zaventem) ou par l'E40, avec des places de stationnement à proximité immédiate. Zaventem est également desservie par plusieurs lignes de bus reliant la gare de Bruxelles-National et le centre de la commune. Nous recevons sur rendez-vous, du lundi au vendredi sauf le jeudi, de 9 h à 17 h — n'hésitez pas à nous appeler pour convenir d'un créneau qui vous arrange, y compris en dehors de ces horaires si votre activité l'exige.",
    hoursTitle: "Horaires d'ouverture",
    ctaTitle: 'Un comptable à deux pas de chez vous',
    ctaText: 'Prenez rendez-vous dans nos bureaux de Zaventem, ou par téléphone si vous préférez commencer à distance.',
  },
  ro: {
    accessTitle: 'Un cabinet stabilit în inima Zaventemului',
    accessText:
      'Biroul nostru se află pe Sterrebeekstraat 154, la câteva minute de Ringul Bruxelles-ului (R0) și de aeroportul Bruxelles-National. Această poziție, la răscrucea autostrăzilor E40, E19 și a Ringului, ne permite să primim atât independenți din centrul Zaventemului, cât și societăți din zonele economice din Diegem și Machelen. Parcarea este ușor de găsit lângă birou, iar întâlnirile au loc pe bază de programare, în timpul săptămânii, într-un cadru gândit pentru discuții calme despre dosarul dumneavoastră. Preferați să nu vă deplasați? O primă discuție prin telefon sau videoconferință este mereu posibilă. Spre deosebire de un mare lanț contabil național, aici păstrați un singur interlocutor, care vă cunoaște dosarul și se deplasează, la nevoie, la firma dumneavoastră din Zaventem sau din comunele învecinate.',
    areaIntro:
      'Deși cabinetul nostru s-a născut în Zaventem, clientela noastră depășește cu mult limitele comunei. Însoțim zilnic independenți și societăți stabilite în tot nord-estul Brabantului Flamand și în periferia Bruxelles-ului, printre care:',
    sectorsTitle: 'Firme din periferie, nevoi specifice',
    sectorsIntro:
      'Periferia Zaventemului are o economie proprie, modelată de aeroport și de marile axe rutiere, foarte diferită de cea a centrului Bruxelles-ului. O cunoaștem îndeaproape, sector cu sector:',
    sectors: [
      {
        title: 'Aeroport, transport și logistică',
        text: 'Apropierea de Brussels Airport modelează economia locală: case de expediții, transportatori, firme de curierat și prestatori logistici stabiliți în Diegem sau Machelen au nevoi contabile specifice — facturare în valută străină, fluxuri TVA intracomunitare frecvente, urmărirea subcontractanților internaționali. Adaptăm contabilitatea dumneavoastră la ritmul acestui sector, unde volumele de facturare evoluează rapid și unde o declarație întârziată se plătește scump.',
      },
      {
        title: 'Construcții și subcontractare',
        text: 'Sectorul construcțiilor, foarte prezent în periferie, este supus unor reguli speciale: regimul de TVA cu cocontractant, obligația de reținere în caz de datorii sociale sau fiscale ale subcontractantului, înregistrarea prezenței pe șantier prin Checkinatwork. Vă verificăm conformitatea înainte ca un control să o scoată la iveală, indiferent dacă sunteți antreprenor principal sau subcontractant.',
      },
      {
        title: 'HORECA',
        text: 'Restaurantele și hotelurile din regiune, numeroase în apropierea aeroportului, trebuie să respecte casa de marcat certificată (sistemul GKS), o forță de muncă adesea sezonieră și contribuții sociale specifice. Îi însoțim atât în conformarea casei de marcat, cât și în gestiunea zilnică a personalului, de la extra-urile de weekend până la contractele sezoniere de vară.',
      },
    ],
    findUsTitle: 'Cum ne găsiți',
    findUsText:
      'Biroul nostru este accesibil cu mașina prin Ringul Bruxelles-ului (ieșirea Zaventem) sau prin E40, cu locuri de parcare în imediata apropiere. Zaventem este deservit și de mai multe linii de autobuz care leagă gara Bruxelles-National de centrul comunei. Primim pe bază de programare, de luni până vineri, cu excepția zilei de joi, între orele 9 și 17 — nu ezitați să ne sunați pentru a stabili un interval care vi se potrivește, chiar și în afara acestui program, dacă activitatea dumneavoastră o cere.',
    hoursTitle: 'Program de lucru',
    ctaTitle: 'Un contabil la doi pași de dumneavoastră',
    ctaText: 'Programați o întâlnire la biroul nostru din Zaventem, sau prin telefon dacă preferați să începeți la distanță.',
  },
}

export function localMetadata(locale: Locale): Metadata {
  const ui = UI[locale].localPage
  return {
    title: { absolute: ui.metaTitle },
    description: ui.metaDescription,
    alternates: alternatesFor('local', locale),
  }
}

export function LocalPage({ locale }: { locale: Locale }) {
  const ui = UI[locale]
  const local = ui.localPage
  const content = CONTENT[locale]
  const pageUrl = abs(path(locale, 'local'))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${pageUrl}#localbusiness`,
    name: SITE.legalName,
    url: pageUrl,
    telephone: SITE.phoneRaw,
    email: SITE.email,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      postalCode: SITE.address.postalCode,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    hasMap: SITE.googleBusinessUrl,
    areaServed: AREA_SERVED.map((place) => ({ '@type': 'City', name: place })),
    openingHoursSpecification: SITE.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
  }

  return (
    <>
      <Section className="pb-8 pt-10 md:pb-12 md:pt-14">
        <Container>
          <Breadcrumbs locale={locale} items={[{ label: ui.nav.local, href: path(locale, 'local') }]} />
          <h1 className="wonk mt-6 max-w-2xl font-display text-3xl text-ink md:text-5xl">{local.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">{local.intro}</p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:gap-16">
            <Reveal>
              <h2 className="wonk font-display text-2xl text-ink md:text-3xl">{content.accessTitle}</h2>
              <p className="mt-4 leading-relaxed text-ink-2">{content.accessText}</p>
            </Reveal>

            <Reveal delay={100}>
              <div className="rounded-xl border border-line bg-soft p-6">
                <p className="flex items-start gap-2.5 font-display text-base text-ink">
                  <Icon name="map-pin" size={18} className="mt-0.5 shrink-0 text-brand" />
                  {SITE.legalName}
                </p>
                <p className="mt-2 pl-[26px] text-sm leading-relaxed text-ink-2">
                  {SITE.address.street}
                  <br />
                  {SITE.address.postalCode} {SITE.address.city}
                </p>
                <div className="mt-5 pl-[26px]">
                  <Button href={SITE.googleBusinessUrl} target="_blank" rel="noopener noreferrer" variant="secondary" size="sm">
                    {ui.common.viewOnMap}
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="soft">
        <Container>
          <Reveal>
            <h2 className="wonk max-w-2xl font-display text-2xl text-ink md:text-3xl">{local.areaServedTitle}</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink-2">{content.areaIntro}</p>
          </Reveal>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {AREA_SERVED.map((area) => (
              <li key={area}>
                <Reveal className="h-full">
                  <div className="flex h-full flex-col gap-1.5 rounded-lg border border-line bg-paper p-4">
                    <span className="flex items-center gap-1.5 font-display text-base text-ink">
                      <Icon name="map-pin" size={14} className="shrink-0 text-brand" />
                      {area}
                    </span>
                    <p className="text-xs leading-relaxed text-ink-3">{AREA_BLURBS[area][locale]}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <h2 className="wonk max-w-2xl font-display text-2xl text-ink md:text-3xl">{content.sectorsTitle}</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink-2">{content.sectorsIntro}</p>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {content.sectors.map((sector) => (
              <Reveal key={sector.title} className="h-full">
                <article className="flex h-full flex-col gap-2.5 rounded-lg border border-line bg-paper p-6 shadow-xs">
                  <h3 className="font-display text-lg text-ink">{sector.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-2">{sector.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="soft">
        <Container>
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <Reveal>
              <h2 className="wonk font-display text-2xl text-ink md:text-3xl">{content.findUsTitle}</h2>
              <p className="mt-4 leading-relaxed text-ink-2">{content.findUsText}</p>
            </Reveal>
            <Reveal delay={100}>
              <h3 className="font-display text-lg text-ink">{content.hoursTitle}</h3>
              <ul className="mt-3 flex flex-col gap-1.5 text-sm text-ink-2">
                {SITE.hours.map((h) => (
                  <li key={h.opens} className="tnum flex items-center gap-2">
                    <Icon name="clock" size={16} className="shrink-0 text-ink-3" />
                    {locale === 'fr' ? 'Lundi, mardi, mercredi, vendredi' : 'Luni, marți, miercuri, vineri'} — {h.opens}
                    {'–'}
                    {h.closes}
                  </li>
                ))}
              </ul>
              <a
                href={`tel:${SITE.phoneRaw}`}
                className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-brand transition-colors hover:text-brand-2"
              >
                <Icon name="phone" size={16} />
                {SITE.phone}
              </a>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand
        title={content.ctaTitle}
        description={content.ctaText}
        primaryLabel={ui.common.bookAppointment}
        primaryHref={path(locale, 'contact')}
        secondaryLabel={ui.common.viewAllServices}
        secondaryHref={path(locale, 'services')}
      />

      <JsonLd data={jsonLd} />
    </>
  )
}
