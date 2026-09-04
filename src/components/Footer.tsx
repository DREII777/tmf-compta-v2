import Link from 'next/link'
import { UI } from '@/content/ui'
import { path, type Locale, type RouteKey } from '@/lib/i18n'
import { SITE } from '@/lib/site'
import { Icon } from './Icon'

interface FooterProps {
  locale: Locale
}

const SERVICES_KEYS: RouteKey[] = ['services', 'local', 'romanian']
const FIRM_KEYS: RouteKey[] = ['about', 'method', 'faq', 'news', 'contact']
const LEGAL_KEYS: RouteKey[] = ['legal', 'privacy']

function FooterLinkList({ locale, keys }: { locale: Locale; keys: RouteKey[] }) {
  return (
    <ul className="mt-4 flex flex-col gap-2.5">
      {keys.map((key) => (
        <li key={key}>
          <Link href={path(locale, key)} className="text-sm text-paper/75 transition-colors duration-200 ease-out-soft hover:text-paper">
            {UI[locale].nav[key]}
          </Link>
        </li>
      ))}
    </ul>
  )
}

/** Footer 4 colonnes : marque + badge ITAA / services / cabinet / identité légale. */
export function Footer({ locale }: FooterProps) {
  const ui = UI[locale]
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand text-paper">
      <div className="mx-auto max-w-site px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <span className="font-display text-xl wonk text-paper">{SITE.name}</span>
            <p className="max-w-xs text-sm leading-relaxed text-paper/75">{ui.footer.tagline}</p>
            <p className="flex w-fit items-start gap-2 rounded-lg border border-accent/25 bg-accent-tint px-3 py-2 text-xs font-medium text-accent">
              <Icon name="shield" size={14} className="mt-0.5 shrink-0" />
              <span>{ui.footer.itaaBadge}</span>
            </p>
          </div>

          <nav aria-label={ui.footer.servicesTitle}>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-paper">{ui.footer.servicesTitle}</h2>
            <FooterLinkList locale={locale} keys={SERVICES_KEYS} />
          </nav>

          <nav aria-label={ui.footer.companyTitle}>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-paper">{ui.footer.companyTitle}</h2>
            <FooterLinkList locale={locale} keys={FIRM_KEYS} />
          </nav>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-paper">{ui.footer.contactTitle}</h2>
            <address className="mt-4 flex flex-col gap-2 text-sm not-italic leading-relaxed text-paper/75">
              <span className="font-medium text-paper">{SITE.legalName}</span>
              <span className="flex items-start gap-2">
                <Icon name="pin" size={16} className="mt-0.5 shrink-0 text-paper/50" />
                <span>
                  {SITE.address.street}, {SITE.address.postalCode} {SITE.address.city}
                </span>
              </span>
              <span>{SITE.vat}</span>
              <a href={`tel:${SITE.phoneRaw}`} className="flex items-center gap-2 transition-colors duration-200 ease-out-soft hover:text-paper">
                <Icon name="phone" size={16} className="shrink-0 text-paper/50" />
                {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 transition-colors duration-200 ease-out-soft hover:text-paper">
                <Icon name="mail" size={16} className="shrink-0 text-paper/50" />
                {SITE.email}
              </a>
            </address>
            <FooterLinkList locale={locale} keys={LEGAL_KEYS} />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-paper/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-paper/60">
            © {year} {SITE.legalName} — {SITE.vat}. {ui.footer.rightsReserved}
          </p>
          <p className="flex flex-wrap items-center gap-1.5 text-xs text-paper/60">
            {ui.footer.sisterCompanyText}
            <a
              href={SITE.sister.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-paper/85 transition-colors duration-200 ease-out-soft hover:text-paper"
            >
              {ui.footer.sisterCompanyLink}
              <Icon name="arrow-right" size={12} />
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
