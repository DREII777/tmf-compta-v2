import { ImageResponse } from 'next/og'
import { isLocale, LOCALES, type Locale } from '@/lib/i18n'
import { SITE } from '@/lib/site'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

/** Texte alternatif dans la langue de la page, et non en français par défaut. */
export async function generateImageMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : 'fr'
  return [{ id: locale, size, contentType, alt: ALT[locale] }]
}

const ALT: Record<Locale, string> = {
  fr: 'TMF Compta — cabinet d’expertise comptable à Zaventem, en français et en roumain',
  ro: 'TMF Compta — cabinet de expertiză contabilă în Zaventem, în română și franceză',
}

const T: Record<Locale, { headline: string; kicker: string; badge: string }> = {
  fr: {
    kicker: 'Cabinet d’expertise comptable',
    headline: 'Votre comptable à Zaventem, en français et en roumain.',
    badge: `Expert-comptable ITAA depuis ${SITE.itaaSince}`,
  },
  ro: {
    kicker: 'Cabinet de expertiză contabilă',
    headline: 'Contabilul dumneavoastră în Zaventem, în română și franceză.',
    badge: `Expert-contabil ITAA din ${SITE.itaaSince}`,
  },
}

/** Les neuf teintes de catégorie du site, reprises en filet de couleur. */
const HUES = ['#B45309', '#047857', '#6D28D9', '#BE185D', '#0369A1', '#0F766E', '#C2410C', '#0E7490', '#A21CAF']

const WORDMARK = [
  'M14.7906 61.079V23.7183H0V12.9174H43.1355V23.7183H28.4119V61.079H14.7906Z',
  'M127.483 61.079H113.862V12.9174H151.632V23.4416H127.483V61.079ZM126.519 34.0371H148.732V44.5655H126.519V34.0371Z',
  'M91.6232 41.8999L91.707 59.8216H104.23L104.13 24.2673L102.734 23.2782L91.6232 41.8999Z',
  'M105.475 20.403L88.7522 8.55433L107.374 0L105.475 20.403Z',
  'M104.096 13.0683L104.092 11.66H92.8763L76.3925 39.4857L69.9842 49.9345L73.1317 55.073H79.188L104.096 13.3156V13.0683Z',
  'M74.0789 35.6843L59.4434 11.66H48.2278V59.8216H60.8181V34.9843L58.2028 30.7176H60.8181V34.9843L67.679 46.1749L73.027 37.453L74.0789 35.6843Z',
]

/**
 * Carte de partage (1200 × 630), générée au build — une par langue.
 *
 * Sans elle, tout partage sur LinkedIn, Facebook ou WhatsApp affiche une
 * vignette nue. Le dessin reprend le fond blanc, le navy de marque et le
 * filet des neuf teintes de catégorie, pour rester cohérent avec le site.
 */
export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : 'fr'
  const t = T[locale]

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 48,
          background: '#FFFFFF',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <svg width="238" height="86" viewBox="0 0 171 62" fill="none">
            {WORDMARK.map((d) => (
              <path key={d} d={d} fill="#002859" />
            ))}
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', fontSize: 27, color: '#A05B12', letterSpacing: 1.4 }}>
              {t.kicker.toUpperCase()}
            </div>
            <div style={{ display: 'flex', fontSize: 58, lineHeight: 1.2, color: '#0B1B2B', maxWidth: 920 }}>
              {t.headline}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {HUES.map((hue) => (
              <div key={hue} style={{ width: 60, height: 8, borderRadius: 4, background: hue }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 27 }}>
            <div style={{ display: 'flex', color: '#002859', fontWeight: 600 }}>{t.badge}</div>
            <div style={{ display: 'flex', color: '#5C6E80' }}>
              {SITE.address.street} · {SITE.address.postalCode} {SITE.address.city}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  )
}
