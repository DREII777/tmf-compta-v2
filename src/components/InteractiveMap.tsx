import { SITE } from '@/lib/site'
import type { Locale } from '@/lib/i18n'
import { Icon } from './Icon'

const T: Record<Locale, { sheet: string; directions: string; title: string; country: string }> = {
  fr: {
    sheet: 'Fiche du cabinet',
    directions: 'Itinéraire',
    title: 'Carte de localisation de TMF Compta, Sterrebeekstraat 154 à Zaventem',
    country: 'Belgique',
  },
  ro: {
    sheet: 'Fișa cabinetului',
    directions: 'Rută',
    title: 'Hartă cu localizarea TMF Compta, Sterrebeekstraat 154 în Zaventem',
    country: 'Belgia',
  },
}

/**
 * Localisation du cabinet.
 *
 * Pas d'iframe tierce (voir SPEC §7) : ni requête Google au chargement, ni
 * dépendance à un service externe pour afficher une simple adresse. Le
 * repère ci-dessous est statique ; « Itinéraire » et « Fiche du cabinet »
 * emmènent vers Google Maps pour qui veut la carte réelle.
 *
 * Composant serveur : il n'a pas d'état.
 */
export function InteractiveMap({ locale }: { locale: Locale }) {
  const t = T[locale]

  return (
    <div className="overflow-hidden rounded-xl bg-paper shadow-card">
      <iframe
        src={SITE.mapEmbedUrl}
        title={t.title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="block h-[240px] w-full border-0 sm:h-[320px]"
      />

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-line px-5 py-3.5">
        <p className="text-sm leading-snug">
          <span className="font-semibold text-ink">{SITE.legalName}</span>
          <span className="block text-ink-2">
            {SITE.address.street}, {SITE.address.postalCode} {SITE.address.city}
          </span>
        </p>
        <div className="flex items-center gap-4">
          <a
            href={SITE.googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ink-2 transition-colors duration-200 ease-out-soft hover:text-brand focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand"
          >
            {t.sheet}
          </a>
          <a
            href={SITE.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand transition-colors duration-200 ease-out-soft hover:text-brand-2 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand"
          >
            {t.directions}
            <Icon
              name="arrow-right"
              size={15}
              aria-hidden
              className="transition-transform duration-200 ease-out-soft group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </div>
  )
}
