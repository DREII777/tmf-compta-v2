import type { ReactNode } from 'react'
import { HtmlShell } from '@/components/HtmlShell'
import { DEFAULT_LOCALE } from '@/lib/i18n'
import type { Metadata } from 'next'
import { SITE } from '@/lib/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Cabinet comptable à Zaventem`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Cabinet d'expertise comptable et fiscale à Zaventem. Comptabilité, TVA, fiscalité et conseil pour indépendants et sociétés, en français et en roumain.",
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: 'fr_BE',
    url: SITE.url,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-icon.svg', type: 'image/svg+xml' }],
  },
  manifest: '/manifest.webmanifest',
}

/**
 * Layout racine.
 *
 * Next exige que `<html>`/`<body>` viennent d'ici : les placer dans
 * `[locale]/layout.tsx` donnait bien le bon `lang`, mais cassait le rendu
 * de `not-found.tsx`, qui se retrouvait servi avec un corps vide.
 *
 * Le `lang` servi vaut donc « fr ». Le layout de locale pose `lang` sur son
 * conteneur dès le HTML servi et monte `LangSync`, qui corrige `<html lang>`
 * sur la page roumaine à l'hydratation. Les balises `hreflang` de chaque
 * page portent par ailleurs le signal de langue pour les moteurs.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return <HtmlShell lang={DEFAULT_LOCALE}>{children}</HtmlShell>
}
