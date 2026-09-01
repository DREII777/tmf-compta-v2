import type { ReactNode, SVGProps } from 'react'
import type { IconName as ContentIconName } from '@/content/types'

/**
 * Icônes supplémentaires nécessaires aux composants de chrome (Header,
 * Footer, Faq, Reviews, Breadcrumbs…) et non couvertes par le jeu
 * d'icônes de contenu (`@/content/types`). L'union `IconName` réunit les
 * deux jeux : tout ce que le contenu utilise (`service.icon`) ET tout ce
 * dont l'UI a besoin, dans un seul composant.
 */
export type ChromeIconName =
  | 'phone'
  | 'mail'
  | 'pin'
  | 'check'
  | 'arrow'
  | 'book'
  | 'chart'
  | 'heart'
  | 'search'
  | 'doc'
  | 'star'
  | 'help'
  | 'menu'
  | 'close'
  | 'chevron'

export type IconName = ContentIconName | ChromeIconName

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName
  size?: number
  title?: string
}

const PIN = (
  <>
    <path d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </>
)

const ARROW = (
  <>
    <path d="M4 12h15" />
    <path d="m13 6 6 6-6 6" />
  </>
)

const DOC = (
  <>
    <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
    <path d="M14 3v5h5" />
    <path d="M9 13h6M9 17h6" />
  </>
)

const ICONS: Record<IconName, ReactNode> = {
  // — jeu de contenu (@/content/types) —
  ledger: (
    <>
      <rect x="4" y="3.5" width="16" height="17" rx="1.5" />
      <path d="M4 8.5h16M4 13h16M9.5 3.5v17" />
    </>
  ),
  percent: (
    <>
      <circle cx="7.5" cy="7.5" r="2.2" />
      <circle cx="16.5" cy="16.5" r="2.2" />
      <path d="M17.5 6.5 6.5 17.5" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 2.2c2.9 2 4.6 5.5 4.6 9.1 0 2.3-.6 4.4-1.8 6.1l-1-2.6h-3.6l-1 2.6c-1.2-1.7-1.8-3.8-1.8-6.1 0-3.6 1.7-7.1 4.6-9.1Z" />
      <circle cx="12" cy="10.3" r="1.6" />
      <path d="M9 17.4c-1 1-1.3 2.6-1 3.9 1.3.3 2.9-.1 3.9-1M15 17.4c1 1 1.3 2.6 1 3.9-1.3.3-2.9-.1-3.9-1" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.2 8.8-4.4 1.6-1.6 4.4 4.4-1.6Z" />
    </>
  ),
  users: (
    <>
      <circle cx="8.5" cy="8" r="3" />
      <path d="M2.8 20c1-3.6 3-5.6 5.7-5.6s4.7 2 5.7 5.6" />
      <circle cx="17" cy="9" r="2.3" />
      <path d="M15.6 14.3c2.1.5 3.6 2.2 4.3 4.5" />
    </>
  ),
  handshake: (
    <>
      <path d="M2.5 11.8 6.3 8.3l2.9 2.1h5.2l2.8-2.1 3.8 3.5" />
      <path d="m9.3 10.4 3 4.3 1.9-1.3M14.7 10.4l-3 4.3" />
      <path d="m4 12.8 3 3 1.6-1.1" />
    </>
  ),
  shield: <path d="M12 3 4.5 6v6c0 5 3.2 8.4 7.5 9 4.3-.6 7.5-4 7.5-9V6L12 3Z" />,
  send: <path d="M4 12 20 4l-5 16-4-6-6-2Z" />,
  'search-check': (
    <>
      <circle cx="10.2" cy="10.2" r="6.2" />
      <path d="m20 20-4.4-4.4" />
      <path d="m7.6 10.2 1.8 1.8 3-3.6" />
    </>
  ),
  building: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1" />
      <path d="M10 21v-4h4v4" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.4-4 4-6 7.5-6s6.1 2 7.5 6" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="1.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    </>
  ),
  'file-text': DOC,
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5c2.5 2.4 3.8 5.3 3.8 8.5s-1.3 6.1-3.8 8.5c-2.5-2.4-3.8-5.3-3.8-8.5S9.5 5.9 12 3.5Z" />
    </>
  ),
  'map-pin': PIN,
  euro: <path d="M18 6.5A7 7 0 0 0 6.5 12 7 7 0 0 0 18 17.5M4 10.5h10M4 13.5h9" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  'check-circle': (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8 12.4 2.7 2.7L16 9.6" />
    </>
  ),
  'arrow-right': ARROW,

  // — jeu de chrome (Header, Footer, Faq, Reviews…) —
  phone: (
    <path d="M7.5 3.5h-3A1.5 1.5 0 0 0 3 5c0 8.837 7.163 16 16 16a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.212-1.472l-3.522-.705a1.5 1.5 0 0 0-1.393.401l-1.44 1.44a12.06 12.06 0 0 1-5.5-5.5l1.44-1.44a1.5 1.5 0 0 0 .401-1.393L8.972 4.712A1.5 1.5 0 0 0 7.5 3.5Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  pin: PIN,
  check: <path d="M4 12.5 9.5 18 20 6" />,
  arrow: ARROW,
  book: (
    <>
      <path d="M12 6.7c-1.6-1.5-3.7-2.2-6.3-2.2-1 0-2 .1-2.9.4v13.7c1-.3 2-.4 2.9-.4 2.6 0 4.7.7 6.3 2.2 1.6-1.5 3.7-2.2 6.3-2.2 1 0 2 .1 2.9.4V4.9c-1-.3-2-.4-2.9-.4-2.6 0-4.7.7-6.3 2.2Z" />
      <path d="M12 6.7v13.7" />
    </>
  ),
  chart: <path d="M4 20V10M11 20V4M18 20v-7M3 20h18" />,
  heart: <path d="M12 20.3S3.6 15.3 3.6 9.3A4.8 4.8 0 0 1 12 6.3a4.8 4.8 0 0 1 8.4 3c0 6-8.4 11-8.4 11Z" />,
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m20 20-4.6-4.6" />
    </>
  ),
  doc: DOC,
  star: <path d="m12 3 2.7 5.7 6.3.8-4.6 4.4 1.1 6.2L12 17l-5.5 3.1 1.1-6.2-4.6-4.4 6.3-.8Z" />,
  help: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.3 9.3a2.7 2.7 0 1 1 3.9 2.4c-.9.5-1.2.9-1.2 1.8" />
      <path d="M12 17h.01" />
    </>
  ),
  menu: <path d="M4 6.5h16M4 12h16M4 17.5h16" />,
  close: <path d="m5 5 14 14M19 5 5 19" />,
  chevron: <path d="m7 10 5 5 5-5" />,
}

export function Icon({ name, size = 24, title, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      {...rest}
    >
      {title && <title>{title}</title>}
      {ICONS[name]}
    </svg>
  )
}
