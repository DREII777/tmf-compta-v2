/**
 * Constantes du site. Source unique de vérité pour l'identité légale,
 * les coordonnées et les données structurées.
 *
 * ⚠️ Identité vérifiée à la BCE le 31/08/2026 (n° 1027.440.826).
 * Ne PAS confondre avec TMF Assist (n° 0505.985.850), société sœur à Ixelles.
 */

export const SITE = {
  url: 'https://tmfcompta.be',
  name: 'TMF Compta',
  legalName: 'TMF Compta SRL',
  legalForm: 'Société à responsabilité limitée',
  vat: 'BE 1027.440.826',
  vatRaw: 'BE1027440826',
  enterpriseNumber: '1027.440.826',
  itaa: 'Expert-comptable (fiscaliste) ITAA',
  /**
   * Année d'agrément ITAA du cabinet — continu depuis 2014.
   * La date du 26/03/2026 visible à la BCE n'est PAS une nouvelle
   * accréditation : c'est la ré-inscription de la SRL, rendue nécessaire
   * par le changement de forme juridique (SNC → SRL). Le processus a dû
   * être refait, l'agrément lui n'a jamais été interrompu.
   */
  itaaSince: 2014,
  itaaReRegisteredSrl: '2026-03-26',
  foundedTeam: 2014,
  incorporated: '2025-09-10',

  address: {
    street: 'Sterrebeekstraat 154',
    postalCode: '1930',
    city: 'Zaventem',
    region: 'Brabant flamand',
    country: 'BE',
    countryLabel: 'Belgique',
  },
  geo: { lat: 50.8731058, lng: 4.4855783 },
  /**
   * Fiche Google Business du cabinet (kgmid /g/11c44qw0qg).
   * À privilégier pour « voir sur la carte » et « voir les avis » : elle
   * affiche le cabinet, ses horaires et ses avis — contrairement à une
   * simple recherche d'adresse, qui ne montre qu'un point sur un plan.
   */
  googleBusinessUrl: 'https://g.co/kgs/H12xX9a',
  /**
   * Note et volume d'avis tels qu'affichés sur la fiche Google.
   *
   * Saisis à la main : les récupérer en direct exigerait la Places API de
   * Google (clé, quota, coût). À rafraîchir de temps en temps — la date
   * ci-dessous indique le dernier relevé.
   *
   * ⚠️ Ne PAS baliser ces valeurs en JSON-LD `aggregateRating` : les
   * consignes de Google interdisent de reprendre à son compte la note
   * d'une autre plateforme. Elles sont affichées visuellement, avec un
   * lien vers la fiche, ce qui est vérifiable par le visiteur.
   */
  googleRating: 4.9,
  googleReviewCount: 103,
  googleRatingCheckedOn: '2026-09-01',
  /** Itinéraire uniquement. */
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Sterrebeekstraat+154,+1930+Zaventem',
  mapsUrl: 'https://maps.google.com/?q=Sterrebeekstraat+154,+1930+Zaventem',
  /** Carte intégrée, centrée sur la fiche du cabinet (et non sur l'adresse). */
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10070.93994200018!2d4.4855783!3d50.8731058!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3dcacc3b35dad%3A0x3fea5054a36896de!2sTMF%20Compta!5e0!3m2!1sfr!2sbe!4v1682965907037!5m2!1sfr!2sbe',

  phone: '+32 (0)2 705 80 99',
  phoneRaw: '+3227058099',
  email: 'info@tmfcompta.be',

  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Friday'], opens: '09:00', closes: '17:00' },
  ],

  sister: { name: 'TMF Assist', url: 'https://www.tmfassist.be/' },
  social: { facebook: 'https://www.facebook.com/100089820520694' },

  responseTime: '24 h ouvrées',
} as const

export const AREA_SERVED = [
  'Zaventem', 'Bruxelles', 'Kraainem', 'Wezembeek-Oppem',
  'Woluwe-Saint-Lambert', 'Machelen', 'Diegem', 'Sterrebeek',
] as const
