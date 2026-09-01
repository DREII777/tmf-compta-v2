import { renderBlocks } from '@/app/_content/blocks'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Container } from '@/components/Container'
import { CtaBand } from '@/components/CtaBand'
import { Icon } from '@/components/Icon'
import { JsonLd } from '@/components/JsonLd'
import { Section } from '@/components/Section'
import type { PostContent } from '@/content/types'
import { UI } from '@/content/ui'
import { abs, path, type Locale } from '@/lib/i18n'
import { SITE } from '@/lib/site'

function formatDate(locale: Locale, iso: string): string {
  return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-BE' : 'ro-RO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso))
}

interface NewsArticleViewProps {
  locale: Locale
  content: PostContent
  date: string
  readingMinutes: number
}

/** Page article : fil d'Ariane, en-tête, corps typographié, JSON-LD Article. */
export function NewsArticleView({ locale, content, date, readingMinutes }: NewsArticleViewProps) {
  const ui = UI[locale]
  const href = path(locale, 'news', content.slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: content.title,
    description: content.excerpt,
    inLanguage: locale === 'fr' ? 'fr-BE' : 'ro',
    datePublished: date,
    dateModified: date,
    url: abs(href),
    mainEntityOfPage: { '@type': 'WebPage', '@id': abs(href) },
    author: { '@type': 'Organization', name: SITE.legalName, url: SITE.url },
    publisher: { '@type': 'Organization', name: SITE.legalName, url: SITE.url },
  }

  return (
    <>
      <Section>
        <Container>
          <Breadcrumbs
            locale={locale}
            items={[
              { label: ui.nav.news, href: path(locale, 'news') },
              { label: content.title, href },
            ]}
          />

          <article className="mx-auto mt-8 max-w-[68ch]">
            <header>
              <h1 className="font-display text-3xl wonk text-ink md:text-4xl">{content.title}</h1>
              <p className="mt-4 flex flex-wrap items-center gap-2 text-sm text-ink-3">
                <Icon name="calendar" size={16} />
                <span>
                  {ui.newsPage.publishedOn} <time dateTime={date}>{formatDate(locale, date)}</time>
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {readingMinutes} {ui.newsPage.minRead}
                </span>
              </p>
            </header>

            <div className="mt-8 border-t border-line pt-8">{renderBlocks(content.body)}</div>
          </article>
        </Container>
      </Section>

      <CtaBand
        title={ui.home.ctaBandTitle}
        description={ui.home.ctaBandText}
        primaryLabel={ui.common.bookAppointment}
        primaryHref={path(locale, 'contact')}
      />

      <JsonLd data={jsonLd} />
    </>
  )
}
