import Link from 'next/link'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Icon } from '@/components/Icon'
import { UI } from '@/content/ui'
import { DEFAULT_LOCALE, LOCALES, path, type Locale, type RouteKey } from '@/lib/i18n'

const QUICK_LINKS: RouteKey[] = ['home', 'services', 'about', 'faq', 'contact']

/**
 * Corps de la page 404, rendu côté serveur.
 *
 * Ne rend PAS de <main> : sous `/fr` ou `/ro`, le layout de locale en
 * fournit déjà un, et deux <main> imbriqués sont un balisage invalide qui
 * fait échouer le rendu React (page blanche).
 *
 * `locale` vaut la langue courante quand la 404 survient sous `/fr` ou
 * `/ro`. Pour une URL hors de toute locale, on retombe sur le français
 * mais on affiche les deux langues : le visiteur repart toujours avec un
 * chemin utilisable.
 */
export function NotFoundBody({ locale = DEFAULT_LOCALE }: { locale?: Locale }) {
  const ui = UI[locale]

  return (
    <>
      <Container>
        <div className="mx-auto max-w-2xl py-16 text-center md:py-24">
          <p className="font-display text-5xl text-brand md:text-7xl">404</p>

          <h1 className="wonk mt-6 font-display text-2xl text-ink md:text-3xl">{ui.notFound.title}</h1>
          <p className="mt-3 leading-relaxed text-ink-2">{ui.notFound.text}</p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href={path(locale, 'home')}>{ui.nav.home}</Button>
            <Button href={path(locale, 'contact')} variant="secondary">
              {ui.common.bookAppointment}
            </Button>
          </div>

          <div className="mt-12 grid gap-8 border-t border-line pt-8 text-left sm:grid-cols-2">
            {LOCALES.map((l) => (
              <div key={l} lang={l}>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-2">
                  {l === 'fr' ? 'Français' : 'Română'}
                </p>
                <ul className="mt-3 flex flex-col gap-1">
                  {QUICK_LINKS.map((key) => (
                    <li key={key}>
                      <Link
                        href={path(l, key)}
                        className="group inline-flex min-h-11 items-center gap-2 text-sm font-medium text-brand transition-colors hover:text-brand-2 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand"
                      >
                        <Icon
                          name="arrow-right"
                          size={15}
                          aria-hidden
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                        {UI[l].nav[key]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  )
}
