import { Figtree, Fraunces } from 'next/font/google'
import type { CSSProperties, ReactNode } from 'react'

/**
 * Fraunces en variable, avec sa vraie italique — celle des mots accentués
 * des titres (sans elle, le navigateur penche la romaine, ce qui se voit).
 *
 * Pas d'axes optiques (`opsz`, `SOFT`, `WONK`) : ils quadruplent le poids
 * des fichiers (≈ 490 Ko préchargés contre ≈ 70) pour un gain subtil ; les
 * `font-variation-settings` de globals.css restent donc sans effet, par
 * choix. Le latin étendu (ș, ț, ă du roumain) est préchargé avec le latin :
 * chargé à la demande, il retardait le premier rendu des pages roumaines
 * (mesuré : FCP 1,7 s contre 0,9 s en 4G simulée).
 */
const fraunces = Fraunces({
  subsets: ['latin', 'latin-ext'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-fraunces',
})

const figtree = Figtree({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-figtree',
})

/**
 * Squelette <html>/<body> partagé. `lang` est passé par l'appelant :
 * le layout de locale le renseigne depuis l'URL, la page 404 depuis
 * la locale qu'elle a détectée. C'est ce qui garantit qu'une page
 * roumaine déclare bien `lang="ro"` (WCAG 3.1.1).
 */
export function HtmlShell({ lang, children }: { lang: string; children: ReactNode }) {
  const fontVariables = {
    '--font-display': fraunces.style.fontFamily,
    '--font-sans': figtree.style.fontFamily,
  } as CSSProperties

  return (
    <html lang={lang} className={`${fraunces.variable} ${figtree.variable}`} style={fontVariables}>
      <body>{children}</body>
    </html>
  )
}
