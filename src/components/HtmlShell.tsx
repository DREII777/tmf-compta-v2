import { Figtree, Fraunces } from 'next/font/google'
import type { CSSProperties, ReactNode } from 'react'

const fraunces = Fraunces({
  subsets: ['latin', 'latin-ext'],
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
