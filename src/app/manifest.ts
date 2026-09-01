import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — Cabinet comptable à Zaventem`,
    short_name: SITE.name,
    description:
      "Cabinet d'expertise comptable et fiscale à Zaventem. Comptabilité, TVA, fiscalité et conseil pour indépendants et sociétés.",
    start_url: '/fr',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#002859',
    lang: 'fr-BE',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  }
}
