import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Container } from '@/components/Container'
import { CtaBand } from '@/components/CtaBand'
import { Icon } from '@/components/Icon'
import { Reveal } from '@/components/Reveal'
import { Reviews } from '@/components/Reviews'
import { Section } from '@/components/Section'
import { getServiceById } from '@/content/services'
import { UI } from '@/content/ui'
import { REVIEWS } from '@/content/reviews'
import { alternatesFor, path, servicePath, type Locale } from '@/lib/i18n'

/**
 * Page la plus différenciante du site : six sujets concrets pour les
 * entrepreneurs roumains installés en Belgique. Contenu rédigé (pas
 * traduit) pour chaque locale — la version FR cible les lecteurs français
 * qui découvrent notre spécialisation, la version RO s'adresse
 * directement à la communauté roumaine.
 */
interface Topic {
  title: string
  text: string
}

const RO_REVIEWS = REVIEWS.filter((review) => review.lang === 'ro').slice(0, 3)

const INTRO: Record<Locale, string> = {
  fr: "De nombreux Roumains choisissent la Belgique pour développer leur activité — indépendante ou en société — et se heurtent souvent aux mêmes questions : quel statut choisir, comment facturer en Europe, comment gérer un chantier avec des équipes venues de Roumanie. Notre cabinet accompagne cette communauté depuis 2014, dans sa langue, avec la même rigueur que pour n'importe quel client belge. Voici les sujets qui reviennent le plus souvent dans nos échanges — et sur lesquels nous pouvons vous conseiller dès le premier rendez-vous.",
  ro: 'Mulți români aleg Belgia pentru a-și dezvolta activitatea — ca independenți sau prin societate — și se lovesc adesea de aceleași întrebări: ce statut să aleagă, cum să factureze în Europa, cum să gestioneze un șantier cu echipe venite din România. Cabinetul nostru însoțește această comunitate din 2014, în limba română, cu aceeași rigurozitate ca pentru orice client belgian. Iată subiectele care revin cel mai des în discuțiile noastre — și pe care le putem clarifica încă de la prima întâlnire.',
}

const REVIEWS_TITLE: Record<Locale, string> = {
  fr: "Ce qu'en disent nos clients roumains",
  ro: 'Ce spun clienții noștri vorbitori de română',
}

const TOPICS: Record<Locale, [Topic, Topic, Topic, Topic, Topic]> = {
  fr: [
    {
      title: 'Indépendant ou société : quel statut choisir ?',
      text: "C'est souvent la première question que se posent les entrepreneurs roumains qui démarrent en Belgique. Le statut d'indépendant en personne physique est le plus rapide à mettre en place : inscription à la Banque-Carrefour des Entreprises via un guichet d'entreprises agréé, affiliation obligatoire à une caisse d'assurances sociales dans les 90 jours qui précèdent le début de l'activité, puis cotisations sociales trimestrielles calculées sur vos revenus professionnels. C'est une solution simple pour tester une activité ou pour un complément de revenus, mais votre patrimoine personnel reste exposé aux dettes de votre activité. La société — le plus souvent une SRL — protège ce patrimoine et peut devenir plus avantageuse fiscalement au-delà d'un certain niveau de bénéfice, au prix d'obligations comptables plus lourdes : comptabilité en partie double, comptes annuels, assemblée générale. Nous analysons avec vous votre situation pour vous orienter vers le statut le plus adapté, sans vous faire payer une structure dont vous n'avez pas encore besoin.",
    },
    {
      title: 'Créer votre SRL en Belgique',
      text: "Si la société s'impose, la création d'une SRL suit un parcours balisé : choix du nom et de l'objet social, élaboration d'un plan financier — document obligatoire depuis la réforme du Code des sociétés, qui démontre que les fonds propres prévus suffiront à couvrir l'activité sur au moins deux ans — puis signature de l'acte constitutif devant notaire. Depuis 2019, il n'existe plus de capital minimum légal imposé, mais un plan financier sous-dimensionné expose les fondateurs à leur responsabilité personnelle en cas de faillite rapide : ce document mérite d'être pris au sérieux, pas rédigé à la va-vite. Une fois l'acte signé, la société est inscrite à la Banque-Carrefour des Entreprises et à la TVA, et sa constitution est publiée aux Annexes du Moniteur belge. Nous préparons le plan financier avec vous et mettons en place votre comptabilité dès le premier jour d'activité.",
    },
    {
      title: 'TVA intracommunautaire et échanges avec la Roumanie',
      text: "Dès que votre activité implique des clients ou des fournisseurs roumains, votre numéro de TVA belge devient un numéro de TVA intracommunautaire, à vérifier — comme celui de votre partenaire — dans la base européenne VIES avant toute transaction. La plupart des prestations de services entre professionnels assujettis passent par le régime de l'autoliquidation : c'est votre client roumain, et non vous, qui déclare la TVA dans son propre pays, votre facture étant émise hors TVA avec la mention légale requise. Ces opérations doivent en outre figurer dans votre relevé intracommunautaire, déposé chaque trimestre en plus de votre déclaration TVA habituelle. Une erreur sur ce relevé, ou l'omission d'une facture roumaine, est l'un des motifs de contrôle les plus fréquents que nous rencontrons — nous vérifions systématiquement ce point pour nos clients qui travaillent avec la Roumanie.",
    },
    {
      title: 'Détachement de travailleurs et formulaire A1',
      text: "Vous faites venir des salariés depuis la Roumanie pour une mission temporaire en Belgique ? Deux formalités sont incontournables avant leur premier jour de travail. D'abord, le formulaire A1, délivré par la Casa Națională de Pensii Publice, qui atteste que vos travailleurs restent affiliés à la sécurité sociale roumaine pendant leur détachement — sans lui, la Belgique peut exiger vos propres cotisations sociales sur place, en plus de celles déjà payées en Roumanie. Ensuite, la déclaration Limosa, à effectuer en ligne avant le début de chaque mission, qui informe les autorités belges de la présence de travailleurs détachés ou d'indépendants étrangers sur le territoire. L'absence de déclaration Limosa expose l'entreprise à des sanctions et complique sérieusement sa défense en cas de contrôle sur chantier. Nous vous aidons à anticiper ces démarches avant même le départ de vos équipes.",
    },
    {
      title: 'Sous-traitance dans la construction : retenue, responsabilité solidaire, Checkinatwork',
      text: "La construction est le secteur où nous accompagnons le plus d'entrepreneurs roumains, et c'est aussi celui où les règles belges sont les plus strictes. Si vous faites appel à un sous-traitant — ou si vous en êtes un — qui a des dettes sociales ou fiscales enregistrées, la loi impose au donneur d'ordre de retenir une partie de la facture avant paiement : en principe jusqu'à 35 % pour des dettes envers l'ONSS et jusqu'à 15 % pour des dettes fiscales, versés directement aux administrations concernées. À défaut de cette retenue, le donneur d'ordre devient solidairement responsable des dettes de son sous-traitant, parfois pour des montants sans commune mesure avec le contrat initial. À cela s'ajoute l'enregistrement quotidien des présences sur chantier via Checkinatwork, obligatoire dès qu'un chantier dépasse certains seuils ou implique plusieurs niveaux de sous-traitance. Nous vérifions la situation de vos sous-traitants avant signature et vous aidons à mettre en place ces obligations, pour éviter qu'une facture impayée ne devienne un contentieux avec l'administration.",
    },
  ],
  ro: [
    {
      title: 'Independent sau societate: ce statut alegeți?',
      text: 'Aceasta este adesea prima întrebare pe care și-o pun antreprenorii vorbitori de română care pornesc o activitate în Belgia. Statutul de independent, persoană fizică, se instalează cel mai rapid: înscriere la Banca-Răscruce a Întreprinderilor printr-un ghișeu de întreprinderi autorizat, afiliere obligatorie la o casă de asigurări sociale cu până la 90 de zile înainte de începerea activității, apoi contribuții sociale trimestriale calculate pe veniturile profesionale. Este o soluție simplă pentru a testa o activitate sau pentru un venit complementar, dar patrimoniul dumneavoastră personal rămâne expus datoriilor activității. Societatea — cel mai adesea o SRL — protejează acest patrimoniu și poate deveni mai avantajoasă fiscal peste un anumit nivel de profit, cu prețul unor obligații contabile mai grele: contabilitate în partidă dublă, conturi anuale, adunare generală. Analizăm împreună cu dumneavoastră situația pentru a vă orienta spre statutul potrivit, fără să plătiți o structură de care nu aveți încă nevoie.',
    },
    {
      title: 'Înființarea unei SRL în Belgia',
      text: 'Dacă societatea se impune, înființarea unei SRL urmează un parcurs clar: alegerea numelui și a obiectului de activitate, elaborarea unui plan financiar — document obligatoriu de la reforma Codului societăților, care demonstrează că fondurile proprii prevăzute vor acoperi activitatea pe cel puțin doi ani — apoi semnarea actului constitutiv în fața notarului. Din 2019, nu mai există un capital minim legal impus, dar un plan financiar subdimensionat expune fondatorii la răspundere personală în caz de faliment rapid: acest document merită tratat cu seriozitate, nu redactat în grabă. Odată semnat actul, societatea este înscrisă la Banca-Răscruce a Întreprinderilor și la TVA, iar constituirea sa este publicată în Anexele Monitorului Belgian. Pregătim planul financiar împreună cu dumneavoastră și instalăm contabilitatea încă din prima zi de activitate.',
    },
    {
      title: 'TVA intracomunitară și schimburile cu România',
      text: 'Din momentul în care activitatea dumneavoastră implică clienți sau furnizori din România, numărul dumneavoastră de TVA belgian devine un număr de TVA intracomunitar, care trebuie verificat — la fel ca cel al partenerului dumneavoastră — în baza europeană VIES înainte de orice tranzacție. Majoritatea prestărilor de servicii între profesioniști plătitori de TVA trec prin regimul taxării inverse: clientul dumneavoastră din România, nu dumneavoastră, declară TVA-ul în propria țară, iar factura dumneavoastră se emite fără TVA, cu mențiunea legală cerută. Aceste operațiuni trebuie, în plus, să apară în declarația recapitulativă intracomunitară, depusă trimestrial pe lângă declarația obișnuită de TVA. O eroare în această declarație, sau omiterea unei facturi către România, este unul dintre motivele de control cele mai frecvente pe care le întâlnim — verificăm sistematic acest aspect pentru clienții noștri care lucrează cu România.',
    },
    {
      title: 'Detașarea lucrătorilor și formularul A1',
      text: 'Aduceți salariați din România pentru o misiune temporară în Belgia? Două formalități sunt obligatorii înainte de prima zi de lucru. Mai întâi, formularul A1, eliberat de Casa Națională de Pensii Publice, care atestă că lucrătorii dumneavoastră rămân afiliați la securitatea socială din România pe durata detașării — fără el, Belgia poate solicita propriile contribuții sociale pe teritoriul său, pe lângă cele deja plătite în România. Apoi, declarația Limosa, de completat online înainte de începerea fiecărei misiuni, care informează autoritățile belgiene despre prezența lucrătorilor detașați sau a independenților străini pe teritoriul lor. Lipsa declarației Limosa expune firma la sancțiuni și complică serios apărarea în cazul unui control pe șantier. Vă ajutăm să anticipați aceste demersuri chiar înainte de plecarea echipelor dumneavoastră.',
    },
    {
      title: 'Subcontractare în construcții: reținere, răspundere solidară, Checkinatwork',
      text: 'Construcțiile reprezintă sectorul în care însoțim cei mai mulți antreprenori vorbitori de română, și este totodată sectorul în care regulile belgiene sunt cele mai stricte. Dacă apelați la un subcontractant — sau sunteți dumneavoastră subcontractant — care are datorii sociale sau fiscale înregistrate, legea impune beneficiarului lucrării să rețină o parte din factură înainte de plată: în principiu până la 35% pentru datorii către ONSS/RSZ și până la 15% pentru datorii fiscale, virate direct administrațiilor vizate. În lipsa acestei rețineri, beneficiarul devine răspunzător solidar pentru datoriile subcontractantului său, uneori pentru sume disproporționate față de contractul inițial. La aceasta se adaugă înregistrarea zilnică a prezenței pe șantier prin Checkinatwork, obligatorie de îndată ce un șantier depășește anumite praguri sau implică mai multe niveluri de subcontractare. Verificăm situația subcontractanților dumneavoastră înainte de semnare și vă ajutăm să instalați aceste obligații, pentru a evita ca o factură neplătită să devină un litigiu cu administrația.',
    },
  ],
}

const PEPPOL_TOPIC: Record<Locale, Topic> = {
  fr: {
    title: 'Facturation électronique Peppol',
    text: "Depuis le 1ᵉʳ janvier 2026, comme pour tous les assujettis belges, vos factures à destination d'autres entreprises assujetties en Belgique doivent transiter par le réseau Peppol au format structuré — un simple PDF ne suffit plus. Si vous facturez aussi bien en Belgique qu'en Roumanie, nous vous aidons à distinguer les flux concernés par cette obligation de ceux qui restent hors du champ Peppol, et à choisir un point d'accès compatible avec votre outil de facturation actuel.",
  },
  ro: {
    title: 'Facturarea electronică Peppol',
    text: 'Din 1 ianuarie 2026, la fel ca pentru toți plătitorii de TVA belgieni, facturile dumneavoastră către alte firme plătitoare de TVA din Belgia trebuie să treacă prin rețeaua Peppol, într-un format structurat — un simplu PDF nu mai este suficient. Dacă facturați atât în Belgia, cât și în România, vă ajutăm să distingeți fluxurile vizate de această obligație de cele care rămân în afara ei, și să alegeți un punct de acces compatibil cu instrumentul dumneavoastră de facturare actual.',
  },
}

const PEPPOL_LINK_LABEL: Record<Locale, string> = {
  fr: 'Voir le détail du service Peppol',
  ro: 'Vedeți detaliile serviciului Peppol',
}

const CTA_TITLE: Record<Locale, string> = {
  fr: 'Parlons de votre projet, en roumain ou en français',
  ro: 'Vorbim despre proiectul dumneavoastră, în română sau în franceză',
}

const CTA_TEXT: Record<Locale, string> = {
  fr: 'Indépendant, création de SRL, chantier avec des équipes roumaines : décrivez-nous votre situation, nous vous répondons sous 24 heures ouvrées.',
  ro: 'Independent, înființare de SRL, șantier cu echipe din România: descrieți-ne situația dumneavoastră, vă răspundem în 24 de ore lucrătoare.',
}

export function romanianMetadata(locale: Locale): Metadata {
  const ui = UI[locale].romanianPage
  return {
    title: { absolute: ui.metaTitle },
    description: ui.metaDescription,
    alternates: alternatesFor('romanian', locale),
  }
}

export function RomanianPage({ locale }: { locale: Locale }) {
  const ui = UI[locale]
  const romanian = ui.romanianPage
  const topics = TOPICS[locale]
  const peppolTopic = PEPPOL_TOPIC[locale]
  const peppolService = getServiceById('peppol')

  return (
    <>
      <Section className="pb-8 pt-10 md:pb-12 md:pt-14">
        <Container>
          <Breadcrumbs locale={locale} items={[{ label: ui.nav.romanian, href: path(locale, 'romanian') }]} />
          <h1 className="wonk mt-6 max-w-2xl font-display text-3xl text-ink md:text-5xl">{romanian.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">{romanian.intro}</p>
          <p className="mt-5 max-w-2xl leading-relaxed text-ink-2">{INTRO[locale]}</p>
        </Container>
      </Section>

      {RO_REVIEWS.length > 0 && (
        <Section tone="soft">
          <Container>
            <Reveal>
              <h2 className="wonk font-display text-xl text-ink md:text-2xl">{REVIEWS_TITLE[locale]}</h2>
            </Reveal>
            <Reveal delay={100} className="mt-8">
              <Reviews items={RO_REVIEWS} />
            </Reveal>
          </Container>
        </Section>
      )}

      <Section>
        <Container>
          <div className="flex flex-col gap-12">
            {topics.map((topic) => (
              <Reveal key={topic.title}>
                <article className="grid gap-4 border-t border-line pt-8 first:border-t-0 first:pt-0 md:grid-cols-[2fr_3fr] md:gap-10">
                  <h2 className="wonk font-display text-xl text-ink md:text-2xl">{topic.title}</h2>
                  <p className="leading-relaxed text-ink-2">{topic.text}</p>
                </article>
              </Reveal>
            ))}

            <Reveal>
              <article className="grid gap-4 border-t border-line pt-8 md:grid-cols-[2fr_3fr] md:gap-10">
                <h2 className="wonk font-display text-xl text-ink md:text-2xl">{peppolTopic.title}</h2>
                <div>
                  <p className="leading-relaxed text-ink-2">{peppolTopic.text}</p>
                  {peppolService && (
                    <Link
                      href={servicePath(locale, peppolService[locale].slug)}
                      className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-brand-2"
                    >
                      {PEPPOL_LINK_LABEL[locale]}
                      <Icon name="arrow-right" size={16} />
                    </Link>
                  )}
                </div>
              </article>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand
        title={CTA_TITLE[locale]}
        description={CTA_TEXT[locale]}
        primaryLabel={ui.common.bookAppointment}
        primaryHref={path(locale, 'contact')}
        secondaryLabel={ui.nav.local}
        secondaryHref={path(locale, 'local')}
      />
    </>
  )
}
