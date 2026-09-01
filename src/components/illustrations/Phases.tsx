/**
 * Illustrations vectorielles des trois phases + du bloc « Pourquoi nous choisir ».
 *
 * Même langage graphique que HeroVisual : objets plats, cartes à bord fin,
 * navy de marque et teintes de catégorie. Volontairement sans personnages —
 * les illustrations de l'ancien site (personnages stylisés à cheveux bleus)
 * appartenaient à une banque d'images et ne disaient rien du métier.
 * Ici chaque scène montre un objet comptable réel.
 *
 * Toutes décoratives : le sens est porté par le titre de la carte.
 */

const S = {
  card: 'var(--color-paper)',
  line: 'var(--color-line)',
  line2: 'var(--color-line-2)',
  soft: 'var(--color-soft-2)',
  brand: 'var(--color-brand)',
  brand2: 'var(--color-brand-2)',
  tint: 'var(--color-brand-tint)',
} as const

function Frame({ children, tint }: { children: React.ReactNode; tint: string }) {
  return (
    <svg
      viewBox="0 0 320 240"
      role="presentation"
      aria-hidden="true"
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="320" height="240" rx="0" fill={tint} />
      {children}
    </svg>
  )
}

/** Création — statuts signés, cachet, et la pousse qui démarre. */
export function IllustrationCreation() {
  return (
    <Frame tint="var(--color-c3-bg)">
      {/* document de constitution */}
      <g>
        <rect x="72" y="42" width="130" height="160" rx="10" fill={S.card} stroke={S.line} />
        <rect x="90" y="64" width="62" height="8" rx="4" fill={S.brand} opacity="0.85" />
        <rect x="90" y="80" width="40" height="6" rx="3" fill={S.line2} />
        {[104, 122, 140, 158].map((y) => (
          <rect key={y} x="90" y={y} width={y === 158 ? 58 : 94} height="6" rx="3" fill={S.soft} />
        ))}
        {/* ligne de signature */}
        <path
          d="M92 182c8-9 14 6 21-2s12 5 20-4 14 4 21-3"
          fill="none"
          stroke="var(--color-c3)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </g>
      {/* cachet officiel */}
      <g>
        <circle cx="222" cy="86" r="34" fill={S.card} stroke={S.line} />
        <circle cx="222" cy="86" r="25" fill="none" stroke="var(--color-c3)" strokeWidth="2" opacity="0.5" />
        <path
          d="M212 86.5l6.5 6.5 13-13.5"
          fill="none"
          stroke="var(--color-c3)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      {/* pousse : le démarrage */}
      <g>
        <path d="M226 196v-32" stroke="var(--color-c3)" strokeWidth="3" strokeLinecap="round" />
        <path
          d="M226 172c0-11 8-19 18-19 0 11-8 19-18 19Zm0-14c0-9-7-16-15-16 0 9 7 16 15 16Z"
          fill="var(--color-c3)"
          opacity="0.7"
        />
        <rect x="200" y="196" width="52" height="8" rx="4" fill={S.line2} />
      </g>
    </Frame>
  )
}

/** Gestion — le calendrier des échéances, coché mois après mois. */
export function IllustrationGestion() {
  return (
    <Frame tint="var(--color-c1-bg)">
      <g>
        <rect x="56" y="46" width="164" height="152" rx="12" fill={S.card} stroke={S.line} />
        <path d="M56 58c0-6.6 5.4-12 12-12h140c6.6 0 12 5.4 12 12v22H56V58Z" fill={S.brand} />
        <rect x="74" y="58" width="6" height="14" rx="3" fill={S.card} opacity="0.9" />
        <rect x="196" y="58" width="6" height="14" rx="3" fill={S.card} opacity="0.9" />
        {/* grille de dates */}
        {[0, 1, 2].map((r) =>
          [0, 1, 2, 3].map((c) => {
            const x = 74 + c * 34
            const y = 96 + r * 32
            const done = r * 4 + c < 7
            return (
              <g key={`${r}-${c}`}>
                <rect
                  x={x}
                  y={y}
                  width="24"
                  height="24"
                  rx="7"
                  fill={done ? 'var(--color-c1)' : S.soft}
                  opacity={done ? 0.9 : 1}
                />
                {done && (
                  <path
                    d={`M${x + 6.5} ${y + 12.5}l4 4 7-8`}
                    fill="none"
                    stroke={S.card}
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </g>
            )
          })
        )}
      </g>
      {/* rappel d'échéance */}
      <g>
        <rect x="188" y="140" width="86" height="58" rx="12" fill={S.card} stroke={S.line} />
        <circle cx="212" cy="169" r="15" fill="var(--color-c1)" opacity="0.16" />
        <path
          d="M212 161v9l6 3.5"
          fill="none"
          stroke="var(--color-c1)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="212" cy="169" r="11" fill="none" stroke="var(--color-c1)" strokeWidth="2.2" />
        <rect x="234" y="162" width="26" height="6" rx="3" fill={S.line2} />
        <rect x="234" y="174" width="18" height="5" rx="2.5" fill={S.soft} />
      </g>
    </Frame>
  )
}

/** Expansion — la courbe qui monte et les paliers franchis. */
export function IllustrationExpansion() {
  return (
    <Frame tint="var(--color-c2-bg)">
      <g>
        <rect x="46" y="44" width="228" height="156" rx="12" fill={S.card} stroke={S.line} />
        <rect x="68" y="66" width="66" height="8" rx="4" fill={S.line2} />
        <rect x="68" y="82" width="40" height="6" rx="3" fill={S.soft} />
        {/* paliers */}
        {[
          { x: 74, h: 34 },
          { x: 116, h: 54 },
          { x: 158, h: 76 },
          { x: 200, h: 100 },
        ].map((b, i) => (
          <rect
            key={b.x}
            x={b.x}
            y={172 - b.h}
            width="30"
            height={b.h}
            rx="7"
            fill="var(--color-c2)"
            opacity={0.25 + i * 0.25}
          />
        ))}
        <rect x="68" y="178" width="174" height="1.5" rx="0.75" fill={S.line} />
        {/* trajectoire */}
        <path
          d="M84 148c34-10 62-28 84-46s34-26 46-30"
          fill="none"
          stroke={S.brand}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M200 68h20v20"
          fill="none"
          stroke={S.brand}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      {/* jalon atteint */}
      <g>
        <circle cx="252" cy="166" r="26" fill={S.card} stroke={S.line} />
        <circle cx="252" cy="166" r="17" fill="var(--color-c2)" opacity="0.14" />
        <path
          d="M244 166.5l5.5 5.5 11-12"
          fill="none"
          stroke="var(--color-c2)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </Frame>
  )
}

/** Pourquoi nous choisir — le dossier passé au crible, poste par poste. */
export function IllustrationWhyUs({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 420"
      role="presentation"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="wu-sh" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="var(--color-ink)" floodOpacity="0.12" />
        </filter>
      </defs>

      <ellipse cx="262" cy="216" rx="238" ry="196" fill={S.tint} opacity="0.75" />

      {/* dossier principal, contrôlé ligne à ligne */}
      <g filter="url(#wu-sh)">
        <rect x="72" y="52" width="272" height="316" rx="16" fill={S.card} stroke={S.line} />
        <path d="M72 68c0-8.8 7.2-16 16-16h240c8.8 0 16 7.2 16 16v34H72V68Z" fill={S.brand} />
        <rect x="98" y="70" width="92" height="9" rx="4.5" fill={S.card} opacity="0.9" />
        <rect x="98" y="86" width="56" height="6" rx="3" fill={S.card} opacity="0.45" />

        {[
          { y: 128, c: 'var(--color-c2)' },
          { y: 174, c: 'var(--color-c5)' },
          { y: 220, c: 'var(--color-c1)' },
          { y: 266, c: 'var(--color-c8)' },
          { y: 312, c: 'var(--color-c6)' },
        ].map(({ y, c }, i) => (
          <g key={y}>
            <circle cx="112" cy={y + 10} r="13" fill={c} opacity="0.15" />
            <path
              d={`M105.5 ${y + 10.5}l4.5 4.5 8.5-9`}
              fill="none"
              stroke={c}
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect x="138" y={y + 4} width={[132, 108, 146, 96, 120][i]} height="8" rx="4" fill={S.line2} />
            <rect x="138" y={y + 18} width={[80, 64, 92, 56, 72][i]} height="6" rx="3" fill={S.soft} />
          </g>
        ))}
      </g>

      {/* synthèse chiffrée */}
      <g filter="url(#wu-sh)">
        <rect x="308" y="196" width="164" height="148" rx="16" fill={S.card} stroke={S.line} />
        <rect x="330" y="220" width="64" height="8" rx="4" fill={S.line2} />
        <rect x="330" y="236" width="40" height="6" rx="3" fill={S.soft} />
        <path
          d="M332 306c26-6 46-20 62-38s28-30 44-36"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="438" cy="232" r="6" fill="var(--color-accent)" />
        <rect x="330" y="318" width="112" height="1.5" rx="0.75" fill={S.line} />
      </g>

      {/* sceau d'agrément */}
      <g filter="url(#wu-sh)">
        <circle cx="372" cy="122" r="44" fill={S.card} stroke={S.line} />
        <circle cx="372" cy="122" r="31" fill="var(--color-accent-tint)" />
        <path
          d="M372 104l-14 6.2v10.9c0 8.7 5.9 16.3 14 18.2 8.1-1.9 14-9.5 14-18.2v-10.9L372 104Z"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
        <path
          d="M366.5 121.8l4 4 7.2-7.6"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

/** Le cabinet — plusieurs dossiers suivis en parallèle par la même équipe. */
export function IllustrationCabinet({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 380"
      role="presentation"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="cab-sh" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="7" stdDeviation="11" floodColor="var(--color-ink)" floodOpacity="0.11" />
        </filter>
      </defs>

      <ellipse cx="240" cy="196" rx="216" ry="172" fill={S.tint} opacity="0.7" />

      {/* trois dossiers clients, chacun sa teinte */}
      {[
        { x: 42, y: 96, c: 'var(--color-c5)', bg: 'var(--color-c5-bg)' },
        { x: 168, y: 62, c: 'var(--color-c2)', bg: 'var(--color-c2-bg)' },
        { x: 294, y: 110, c: 'var(--color-c1)', bg: 'var(--color-c1-bg)' },
      ].map(({ x, y, c, bg }) => (
        <g key={x} filter="url(#cab-sh)">
          <rect x={x} y={y} width="144" height="182" rx="14" fill={S.card} stroke={S.line} />
          <rect x={x} y={y} width="144" height="40" rx="14" fill={bg} />
          <rect x={x} y={y + 26} width="144" height="14" fill={bg} />
          <circle cx={x + 26} cy={y + 20} r="10" fill={c} opacity="0.85" />
          <rect x={x + 44} y={y + 15} width="58" height="7" rx="3.5" fill={c} opacity="0.5" />
          {[62, 84, 106, 128].map((dy) => (
            <rect
              key={dy}
              x={x + 20}
              y={y + dy}
              width={dy === 128 ? 62 : 104}
              height="7"
              rx="3.5"
              fill={S.soft}
            />
          ))}
          <rect x={x + 20} y={y + 150} width="46" height="16" rx="8" fill={c} opacity="0.2" />
        </g>
      ))}

      {/* l'équipe : un même point de contact relie les trois dossiers */}
      <g filter="url(#cab-sh)">
        <rect x="168" y="270" width="144" height="62" rx="31" fill={S.card} stroke={S.line} />
        <circle cx="200" cy="301" r="19" fill={S.brand} />
        <circle cx="200" cy="295.5" r="6" fill={S.card} />
        <path d="M189.5 311a11.5 11.5 0 0 1 21 0Z" fill={S.card} />
        <rect x="230" y="291" width="60" height="8" rx="4" fill={S.line2} />
        <rect x="230" y="306" width="40" height="6" rx="3" fill={S.soft} />
      </g>
      <path
        d="M114 278q60 34 126 14M366 292q-30 26-74 8"
        fill="none"
        stroke={S.brand}
        strokeWidth="2"
        strokeDasharray="5 6"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  )
}
