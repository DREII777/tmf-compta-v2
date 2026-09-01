import type { NextConfig } from 'next'
import path from 'node:path'

const csp = [
  "default-src 'self'",
  // 'unsafe-eval' uniquement en développement : React en a besoin pour la
  // reconstruction de pile. Il n'est jamais émis en production.
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob:",
  // La carte est une iframe Google, chargée uniquement après clic de
  // l'utilisateur (voir InteractiveMap). Sans cette directive,
  // `default-src 'self'` la bloque silencieusement.
  "frame-src https://www.google.com https://maps.google.com",
  // ws: uniquement en développement, pour le rechargement à chaud de Next.
  `connect-src 'self'${process.env.NODE_ENV === 'development' ? ' ws: wss:' : ''}`,
  "form-action 'self'",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  // En dev, cette directive promeut ws:// en wss:// alors que le serveur
  // local ne fait pas de TLS : le rechargement à chaud échouerait.
  ...(process.env.NODE_ENV === 'development' ? [] : ['upgrade-insecure-requests']),
].join('; ')

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  turbopack: { root: path.resolve(process.cwd()) },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
      { source: '/img/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
    ]
  },
  async redirects() {
    return [
      { source: '/', destination: '/fr', permanent: true },
      // Slugs FR saisis sans préfixe de langue : on les rattache au français
      // plutôt que de les laisser tomber en 404 (`/contact`, `/faq`…).
      {
        source:
          '/:slug(services|contact|faq|a-propos|methode|actualites|comptable-zaventem|comptable-roumain|mentions-legales|confidentialite)',
        destination: '/fr/:slug',
        permanent: true,
      },
      { source: '/projects', destination: '/fr/a-propos', permanent: true },
      // Les liens cassés du pied de page de l'ancien site pointaient vers
      // /:locale/services et /:locale/projects — on les rattrape ici.
      { source: '/fr/projects', destination: '/fr/a-propos', permanent: true },
      { source: '/ro/projects', destination: '/ro/despre-noi', permanent: true },
      // Ancien slug, remplacé par une formulation plus naturelle.
      { source: '/fr/comptable-roumanophone', destination: '/fr/comptable-roumain', permanent: true },
      { source: '/fr/general-accounting', destination: '/fr/services', permanent: true },
      { source: '/ro/general-accounting', destination: '/ro/servicii', permanent: true },
      { source: '/:locale(fr|ro)/about', destination: '/:locale/a-propos', permanent: true },
      { source: '/:locale(fr|ro)/legal', destination: '/:locale/mentions-legales', permanent: true },
      // Le dossier de pages `src/app/[locale]/services/` est physiquement nommé
      // d'après le slug FR. En RO, le slug canonique est « servicii » (voir
      // SERVICE_BASE dans src/lib/i18n.ts) : on redirige le chemin interne vers
      // l'URL localisée, et `rewrites()` ci-dessous fait le trajet inverse en
      // coulisses pour que ce chemin localisé serve bien les pages du dossier.
      { source: '/ro/services', destination: '/ro/servicii', permanent: true },
      { source: '/ro/services/:slug', destination: '/ro/servicii/:slug', permanent: true },
    ]
  },
  async rewrites() {
    return [
      { source: '/ro/servicii', destination: '/ro/services' },
      { source: '/ro/servicii/:slug', destination: '/ro/services/:slug' },
    ]
  },
}
export default nextConfig
