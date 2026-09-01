import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { CtaBand } from '@/components/CtaBand'
import { Icon } from '@/components/Icon'
import { Section } from '@/components/Section'
import { UI } from '@/content/ui'
import { path, type Locale } from '@/lib/i18n'
import type { NewsListItem } from './lookup'

function formatDate(locale: Locale, iso: string): string {
  return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-BE' : 'ro-RO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso))
}

interface NewsIndexViewProps {
  locale: Locale
  items: NewsListItem[]
}

/** Index des actualités : en-tête + grille de cartes. Partagé entre `/actualites` (fr) et `/noutati` (ro). */
export function NewsIndexView({ locale, items }: NewsIndexViewProps) {
  const ui = UI[locale]

  return (
    <>
      <Section>
        <Container>
          <Breadcrumbs locale={locale} items={[{ label: ui.nav.news, href: path(locale, 'news') }]} />
          <h1 className="mt-6 max-w-2xl font-display text-3xl wonk text-ink md:text-5xl">{ui.newsPage.title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">{ui.newsPage.intro}</p>

          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const href = path(locale, 'news', item.content.slug)
              return (
                <li key={item.id}>
                  <Card as="article" className="flex h-full flex-col gap-3">
                    <p className="flex items-center gap-2 text-xs font-medium text-ink-3">
                      <Icon name="calendar" size={14} />
                      <time dateTime={item.date}>{formatDate(locale, item.date)}</time>
                      <span aria-hidden="true">·</span>
                      <span>
                        {item.readingMinutes} {ui.newsPage.minRead}
                      </span>
                    </p>
                    <h2 className="font-display text-xl wonk text-ink">
                      <Link href={href} className="transition-colors hover:text-brand">
                        {item.content.title}
                      </Link>
                    </h2>
                    <p className="flex-1 leading-relaxed text-ink-2">{item.content.excerpt}</p>
                    <Link
                      href={href}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-brand-2"
                    >
                      {ui.newsPage.readMore}
                      <Icon name="arrow-right" size={16} />
                    </Link>
                  </Card>
                </li>
              )
            })}
          </ul>
        </Container>
      </Section>

      <CtaBand
        title={ui.home.ctaBandTitle}
        description={ui.home.ctaBandText}
        primaryLabel={ui.common.bookAppointment}
        primaryHref={path(locale, 'contact')}
      />
    </>
  )
}
