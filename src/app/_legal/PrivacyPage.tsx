import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { UI } from '@/content/ui'
import { path, type Locale } from '@/lib/i18n'
import { PRIVACY_FR, PRIVACY_RO, PRIVACY_UPDATED, type PrivacyDictionary } from './privacy-content'

const CONTENT: Record<Locale, PrivacyDictionary> = { fr: PRIVACY_FR, ro: PRIVACY_RO }

const UPDATED_LABEL: Record<Locale, string> = {
  fr: 'Dernière mise à jour',
  ro: 'Ultima actualizare',
}

/** Page « Politique de confidentialité » — partagée entre `/confidentialite` (fr) et `/confidentialitate` (ro). */
export function PrivacyPageView({ locale }: { locale: Locale }) {
  const ui = UI[locale]
  const c = CONTENT[locale]

  return (
    <Section>
      <Container>
        <Breadcrumbs locale={locale} items={[{ label: ui.nav.privacy, href: path(locale, 'privacy') }]} />
        <div className="mx-auto mt-8 max-w-[68ch]">
          <h1 className="font-display text-3xl wonk text-ink md:text-4xl">{ui.privacyPage.title}</h1>
          <p className="mt-4 leading-relaxed text-ink-2">{ui.privacyPage.intro}</p>
          <p className="mt-3 text-sm text-ink-3">
            {UPDATED_LABEL[locale]} :{' '}
            <time dateTime={PRIVACY_UPDATED}>
              {new Intl.DateTimeFormat(locale === 'fr' ? 'fr-BE' : 'ro-RO', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              }).format(new Date(PRIVACY_UPDATED))}
            </time>
          </p>

          <div className="mt-8 border-t border-line pt-8">
            <h2 className="font-display text-2xl wonk text-ink md:text-3xl">{c.responsibleTitle}</h2>
            <p className="mt-4 leading-relaxed text-ink-2">{c.responsibleText}</p>

            <h2 className="mt-10 font-display text-2xl wonk text-ink md:text-3xl">{c.tableTitle}</h2>
            <p className="mt-4 leading-relaxed text-ink-2">{c.tableIntro}</p>

            <div className="scroll-x mt-6 rounded-lg border border-line">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-line bg-soft">
                    <th scope="col" className="p-4 font-semibold text-ink">
                      {c.tableHeaders.purpose}
                    </th>
                    <th scope="col" className="p-4 font-semibold text-ink">
                      {c.tableHeaders.legalBasis}
                    </th>
                    <th scope="col" className="p-4 font-semibold text-ink">
                      {c.tableHeaders.data}
                    </th>
                    <th scope="col" className="p-4 font-semibold text-ink">
                      {c.tableHeaders.retention}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {c.processing.map((row) => (
                    <tr key={row.purpose} className="border-b border-line last:border-0 align-top">
                      <td className="p-4 text-ink-2">{row.purpose}</td>
                      <td className="p-4 text-ink-2">{row.legalBasis}</td>
                      <td className="p-4 text-ink-2">{row.data}</td>
                      <td className="p-4 whitespace-nowrap text-ink-2">{row.retention}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="mt-10 font-display text-2xl wonk text-ink md:text-3xl">{c.recipientsTitle}</h2>
            <p className="mt-4 leading-relaxed text-ink-2">{c.recipientsIntro}</p>
            <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-ink-2">
              {c.recipients.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2 className="mt-10 font-display text-2xl wonk text-ink md:text-3xl">{c.retentionTitle}</h2>
            {c.retentionText.map((paragraph) => (
              <p key={paragraph} className="mt-4 leading-relaxed text-ink-2">
                {paragraph}
              </p>
            ))}

            <h2 className="mt-10 font-display text-2xl wonk text-ink md:text-3xl">{c.rightsTitle}</h2>
            <p className="mt-4 leading-relaxed text-ink-2">{c.rightsIntro}</p>
            <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-ink-2">
              {c.rights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 leading-relaxed text-ink-2">{c.rightsHow}</p>

            <h2 className="mt-10 font-display text-2xl wonk text-ink md:text-3xl">{c.complaintTitle}</h2>
            <p className="mt-4 leading-relaxed text-ink-2">{c.complaintText}</p>

            <h2 className="mt-10 font-display text-2xl wonk text-ink md:text-3xl">{c.cookiesTitle}</h2>
            <p className="mt-4 leading-relaxed text-ink-2">{c.cookiesText}</p>

            <h2 className="mt-10 font-display text-2xl wonk text-ink md:text-3xl">{c.securityTitle}</h2>
            <p className="mt-4 leading-relaxed text-ink-2">{c.securityText}</p>

            <h2 className="mt-10 font-display text-2xl wonk text-ink md:text-3xl">{c.contactTitle}</h2>
            <p className="mt-4 leading-relaxed text-ink-2">{c.contactText}</p>
          </div>
        </div>
      </Container>
    </Section>
  )
}
