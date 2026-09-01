import { renderBlocks } from '@/app/_content/blocks'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { UI } from '@/content/ui'
import { path, type Locale } from '@/lib/i18n'
import { LEGAL_FR, LEGAL_RO, LEGAL_UPDATED } from './content'

const BLOCKS: Record<Locale, typeof LEGAL_FR> = { fr: LEGAL_FR, ro: LEGAL_RO }

const UPDATED_LABEL: Record<Locale, string> = {
  fr: 'Dernière mise à jour',
  ro: 'Ultima actualizare',
}

/** Page « Mentions légales » — partagée entre `/mentions-legales` (fr) et `/informatii-legale` (ro). */
export function LegalPageView({ locale }: { locale: Locale }) {
  const ui = UI[locale]

  return (
    <Section>
      <Container>
        <Breadcrumbs locale={locale} items={[{ label: ui.nav.legal, href: path(locale, 'legal') }]} />
        <div className="mx-auto mt-8 max-w-[68ch]">
          <h1 className="font-display text-3xl wonk text-ink md:text-4xl">{ui.legalPage.title}</h1>
          <p className="mt-3 text-sm text-ink-3">
            {UPDATED_LABEL[locale]} :{' '}
            <time dateTime={LEGAL_UPDATED}>
              {new Intl.DateTimeFormat(locale === 'fr' ? 'fr-BE' : 'ro-RO', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              }).format(new Date(LEGAL_UPDATED))}
            </time>
          </p>
          <div className="mt-8 border-t border-line pt-8">{renderBlocks(BLOCKS[locale])}</div>
        </div>
      </Container>
    </Section>
  )
}
