/**
 * Visuel du hero — composition vectorielle.
 *
 * Remplace la photo d'origine, dont le montage comportait un défaut de
 * double exposition. Tout est dessiné : net à toutes les densités d'écran,
 * quelques kilo-octets, aucune requête réseau, et les couleurs proviennent
 * des tokens du design system (donc une seule source de vérité).
 *
 * La scène montre ce que le cabinet produit concrètement : une déclaration
 * de TVA, un suivi chiffré, et l'agrément qui les couvre.
 *
 * Décoratif : `aria-hidden`. Le sens est porté par le titre du hero.
 */
export function HeroVisual({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 660 500"
      className={className}
      role="presentation"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="hv-halo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-tint)" />
          <stop offset="100%" stopColor="var(--color-soft)" />
        </linearGradient>
        <linearGradient id="hv-band" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-brand)" />
          <stop offset="100%" stopColor="var(--color-brand-2)" />
        </linearGradient>
        <filter id="hv-shadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="var(--color-ink)" floodOpacity="0.13" />
        </filter>
        <filter id="hv-shadow-sm" x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="6" stdDeviation="9" floodColor="var(--color-ink)" floodOpacity="0.11" />
        </filter>
      </defs>

      {/* halo organique en fond */}
      <path
        fill="url(#hv-halo)"
        d="M331 14c92 0 178 26 224 82 46 56 51 141 34 210-17 69-56 122-118 150-62 28-147 31-219 14-72-17-131-54-166-113C51 298 43 217 74 152 105 87 175 38 251 21c26-5 53-7 80-7Z"
      />
      {/* croissant d'accent, rappel du logo */}
      <path
        fill="var(--color-brand)"
        opacity="0.14"
        d="M528 96c48 58 56 148 34 222-9 30-24 57-44 79 44-38 70-95 76-158 6-63-11-114-42-153-8-10-16-19-24-27l0 37Z"
      />

      {/* ─── carte principale : déclaration TVA ─── */}
      <g filter="url(#hv-shadow)">
        <rect x="96" y="58" width="308" height="378" rx="18" fill="var(--color-paper)" />
        <rect
          x="96.5"
          y="58.5"
          width="307"
          height="377"
          rx="17.5"
          fill="none"
          stroke="var(--color-line)"
        />
        {/* bandeau */}
        <path
          fill="url(#hv-band)"
          d="M96 76c0-9.9 8.1-18 18-18h272c9.9 0 18 8.1 18 18v46H96V76Z"
        />
        <rect x="120" y="80" width="104" height="9" rx="4.5" fill="var(--color-paper)" opacity="0.92" />
        <rect x="120" y="97" width="62" height="7" rx="3.5" fill="var(--color-paper)" opacity="0.5" />
        <circle cx="372" cy="92" r="13" fill="var(--color-paper)" opacity="0.16" />
        <path
          d="M366 92.5l4.2 4.2 8-8.4"
          stroke="var(--color-paper)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* lignes du tableau */}
        {[150, 186, 222, 258].map((y, i) => (
          <g key={y}>
            <rect x="120" y={y} width={[118, 96, 132, 88][i]} height="8" rx="4" fill="var(--color-line-2)" />
            <rect x="300" y={y} width={[60, 74, 52, 68][i]} height="8" rx="4" fill="var(--color-soft-2)" />
            <rect x="120" y={y + 22} width="260" height="1" fill="var(--color-line)" />
          </g>
        ))}

        {/* total mis en avant */}
        <rect x="112" y="296" width="276" height="52" rx="11" fill="var(--color-brand-tint)" />
        <rect x="128" y="312" width="76" height="8" rx="4" fill="var(--color-brand-3)" opacity="0.65" />
        <rect x="128" y="328" width="52" height="7" rx="3.5" fill="var(--color-brand-3)" opacity="0.35" />
        <rect x="286" y="314" width="86" height="16" rx="8" fill="var(--color-brand)" />

        {/* bouton d'envoi */}
        <rect x="112" y="368" width="150" height="40" rx="20" fill="var(--color-brand)" />
        <rect x="134" y="384" width="88" height="8" rx="4" fill="var(--color-paper)" opacity="0.9" />
        <rect x="276" y="368" width="112" height="40" rx="20" fill="none" stroke="var(--color-line-2)" />
        <rect x="298" y="384" width="68" height="8" rx="4" fill="var(--color-line-2)" />
      </g>

      {/* ─── carte secondaire : suivi chiffré ─── */}
      <g filter="url(#hv-shadow-sm)">
        <rect x="392" y="236" width="196" height="176" rx="16" fill="var(--color-paper)" />
        <rect
          x="392.5"
          y="236.5"
          width="195"
          height="175"
          rx="15.5"
          fill="none"
          stroke="var(--color-line)"
        />
        <rect x="414" y="260" width="72" height="8" rx="4" fill="var(--color-line-2)" />
        <rect x="414" y="276" width="44" height="7" rx="3.5" fill="var(--color-soft-2)" />
        {/* barres — chaque trimestre sa teinte */}
        <rect x="414" y="352" width="26" height="30" rx="6" fill="var(--color-c5)" opacity="0.35" />
        <rect x="450" y="336" width="26" height="46" rx="6" fill="var(--color-c5)" opacity="0.55" />
        <rect x="486" y="316" width="26" height="66" rx="6" fill="var(--color-c2)" opacity="0.8" />
        <rect x="522" y="298" width="26" height="84" rx="6" fill="var(--color-c2)" />
        <rect x="414" y="394" width="134" height="1" fill="var(--color-line)" />
        {/* courbe de tendance */}
        <path
          d="M420 344c30-8 56-20 76-34 20-14 36-24 52-28"
          stroke="var(--color-accent)"
          strokeWidth="2.6"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="0 0"
        />
        <circle cx="548" cy="282" r="5" fill="var(--color-accent)" />
      </g>

      {/*
        Aucune pastille dessinée ici : les deux badges du hero sont en HTML,
        avec du texte réel et traduit. Dupliquer le motif en SVG donnerait
        deux fois la même forme, dont une illisible.
      */}
    </svg>
  )
}
