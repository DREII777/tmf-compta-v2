import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { HtmlShell } from '@/components/HtmlShell'
import { SkipLink } from '@/components/SkipLink'
import { DEFAULT_LOCALE } from '@/lib/i18n'
import { NotFoundBody } from './_not-found/NotFoundBody'
import './globals.css'

/**
 * 404 du site, bilingue.
 *
 * Elle est rendue hors de `[locale]/layout.tsx` — c'est ce layout qui porte
 * `<html lang>` pour les vraies pages — donc elle fournit sa propre enveloppe.
 * La langue de l'URL étant par définition inconnue ici, elle affiche les
 * raccourcis FR et RO côte à côte plutôt qu'un simple retour à l'accueil.
 *
 * Pour qu'elle s'affiche, chaque segment à paramètre exporte
 * `dynamicParams = false` : un `notFound()` levé depuis un composant de page
 * ne remonte pas jusqu'ici sous Next 16.3.4.
 */
export default function NotFound() {
  return (
    <HtmlShell lang={DEFAULT_LOCALE}>
      {/* `not-found.tsx` n'accepte pas d'export `metadata` : React 19 remonte
          ces balises dans le <head>. Sans elles, l'onglet affiche l'URL brute. */}
      <title>Page introuvable · Pagină negăsită | TMF Compta</title>
      <meta name="robots" content="noindex, follow" />
      <SkipLink locale={DEFAULT_LOCALE} />
      <Header locale={DEFAULT_LOCALE} />
      <main id="main" tabIndex={-1}>
        <NotFoundBody />
      </main>
      <Footer locale={DEFAULT_LOCALE} />
    </HtmlShell>
  )
}
