/**
 * Visuel du hero — le comptable à son bureau.
 *
 * Style « flat » à personnage : formes simples, membres en traits épais à
 * bouts ronds, pas de visage. Tout est dessiné ici, aux couleurs du design
 * system — aucune banque d'images, aucune requête réseau.
 *
 * La scène est celle du cabinet : un expert-comptable assis à son bureau,
 * l'écran qui montre une courbe qui monte et un résultat validé, une
 * déclaration TVA bouclée posée à côté, un café, une plante. C'est ce que
 * le client vient chercher — quelqu'un qui tient ses chiffres.
 * Le viewBox recadre sur la scène (les coordonnées vont de 0 à 640 × 520)
 * pour qu'elle occupe toute sa colonne.
 * Décoratif : `aria-hidden`, le sens est porté par le h1.
 */

const C = {
  paper: 'var(--color-paper)',
  line: 'var(--color-line)',
  line2: 'var(--color-line-2)',
  soft: 'var(--color-soft-2)',
  brand: 'var(--color-brand)',
  brand2: 'var(--color-brand-2)',
  tint: 'var(--color-brand-tint)',
  ink: 'var(--color-ink)',
  ink2: 'var(--color-ink-2)',
  green: 'var(--color-c2)',
  greenBg: 'var(--color-c2-bg)',
  amber: 'var(--color-accent)',
  amberBg: 'var(--color-accent-tint)',
} as const

/** Ligne de sol. */
const GROUND = 470
/** Hauteur d'un personnage debout, du sommet du crâne aux semelles. */
const HEIGHT = 250
/** Plateau du bureau (haut), et panneau de façade qui cache les jambes. */
const DESK_TOP = 340

interface FigureProps {
  x: number
  top: string
  pants: string
  hair: string
  skin: string
  cut: 'short' | 'bob'
  collar?: boolean
}

/**
 * Personnage debout derrière le bureau, la main avant posée sur le clavier.
 * Coordonnées locales : origine au centre des pieds, y croissant vers le bas
 * depuis le sommet du crâne (0) jusqu'aux semelles (HEIGHT). Le bureau,
 * dessiné après, couvre le bassin et les cuisses : il paraît assis.
 */
function Figure({ x, top, pants, hair, skin, cut, collar = false }: FigureProps) {
  return (
    <g transform={`translate(${x} ${GROUND - HEIGHT})`}>
      {/* jambes (les tibias restent visibles sous le panneau du bureau) */}
      <path d="M-11 140V236" stroke={pants} strokeWidth="20" strokeLinecap="round" />
      <path d="M12 140V236" stroke={pants} strokeWidth="20" strokeLinecap="round" />
      <ellipse cx="-12" cy="244" rx="15" ry="6" fill={C.ink} />
      <ellipse cx="13" cy="244" rx="15" ry="6" fill={C.ink} />

      {/* bras arrière, le long du corps */}
      <path d="M-20 64L-30 128" stroke={top} strokeWidth="15" strokeLinecap="round" />

      {/* cou + carré (derrière la tête) */}
      <rect x="-7" y="40" width="14" height="18" rx="4" fill={skin} />
      {cut === 'bob' && <ellipse cx="0" cy="28" rx="26" ry="31" fill={hair} />}

      {/* buste */}
      <path d="M-27 62q0-10 10-10h34q10 0 10 10v84H-27z" fill={top} />
      {collar && <path d="M-7 52l7 18 7-18z" fill={C.paper} opacity="0.92" />}

      {/* tête + frange */}
      <circle cx="0" cy="26" r="22" fill={skin} />
      <path d="M-22 24c0-14 10-24 22-24s22 10 22 24c-6-8-13-11-22-11s-16 3-22 11z" fill={hair} />

      {/* bras avant, vers le clavier */}
      <path d="M22 66L62 110" stroke={top} strokeWidth="15" strokeLinecap="round" />
      <circle cx="65" cy="113" r="8.5" fill={skin} />
    </g>
  )
}

export function HeroPeople({ className }: { className?: string }) {
  const bars = [20, 32, 46, 58, 74, 90]

  return (
    <svg
      viewBox="30 56 600 436"
      className={className}
      role="presentation"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="hp-shadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor={C.ink} floodOpacity="0.14" />
        </filter>
        <filter id="hp-shadow-sm" x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="6" stdDeviation="9" floodColor={C.ink} floodOpacity="0.11" />
        </filter>
      </defs>

      {/* points flottants : un peu d'air */}
      <circle cx="70" cy="300" r="7" fill={C.brand} opacity="0.12" />
      <circle cx="590" cy="120" r="9" fill={C.green} opacity="0.16" />
      <circle cx="548" cy="70" r="5" fill={C.brand} opacity="0.1" />
      <circle cx="40" cy="380" r="4" fill={C.brand} opacity="0.1" />

      {/* ─── déclaration TVA bouclée, posée en haut à gauche ─── */}
      <g transform="rotate(-6 172 150)" filter="url(#hp-shadow)">
        <rect x="96" y="96" width="152" height="110" rx="12" fill={C.paper} stroke={C.line} />
        <rect x="96" y="96" width="152" height="30" rx="12" fill={C.brand} />
        <rect x="96" y="114" width="152" height="12" fill={C.brand} />
        <rect x="110" y="107" width="56" height="8" rx="4" fill={C.paper} opacity="0.9" />
        {[140, 156, 172].map((y, i) => (
          <g key={y}>
            <rect x="110" y={y} width={i === 1 ? 44 : 60} height="7" rx="3.5" fill={C.soft} />
            <rect x="184" y={y} width="34" height="7" rx="3.5" fill={C.line2} />
          </g>
        ))}
        <circle cx="222" cy="188" r="12" fill={C.greenBg} />
        <path d="M216 188.5l4 4 8-8.5" fill="none" stroke={C.green} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* ─── chaise, puis le comptable ─── */}
      <rect x="212" y="262" width="76" height="96" rx="16" fill={C.tint} stroke={C.line2} />
      <Figure x={250} top={C.brand} pants={C.ink} hair={C.ink} skin="#F1C4A0" cut="short" collar />

      {/* ─── écran sur le bureau : courbe qui monte, résultat validé ─── */}
      <g filter="url(#hp-shadow-sm)">
        <rect x="346" y="176" width="180" height="120" rx="10" fill={C.paper} stroke={C.line} />
        <rect x="346" y="176" width="180" height="20" rx="10" fill={C.brand} />
        <rect x="346" y="188" width="180" height="8" fill={C.brand} />
        <circle cx="358" cy="186" r="3" fill={C.paper} opacity="0.6" />
        <circle cx="368" cy="186" r="3" fill={C.paper} opacity="0.6" />
        {bars.map((h, i) => (
          <rect key={h} x={364 + i * 26} y={276 - h} width="16" height={h} rx="4" fill={C.green} opacity={0.35 + i * 0.12} />
        ))}
        <path d="M368 262c26-14 50-20 74-34 22-13 36-26 62-40" fill="none" stroke={C.brand2} strokeWidth="2.6" strokeLinecap="round" />
        <circle cx="504" cy="188" r="0" />
        <circle cx="506" cy="216" r="11" fill={C.greenBg} />
        <path d="M500.5 216.5l3.5 3.5 7.5-8" fill="none" stroke={C.green} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <rect x="430" y="296" width="10" height="30" fill={C.ink2} opacity="0.8" />
      <rect x="402" y="326" width="66" height="8" rx="4" fill={C.ink2} opacity="0.8" />

      {/* clavier, café, pile de dossiers */}
      <rect x="270" y="330" width="80" height="8" rx="4" fill={C.line2} />
      <g>
        <rect x="196" y="322" width="20" height="18" rx="4" fill={C.paper} stroke={C.line2} />
        <path d="M216 327h5a4 4 0 0 1 0 8h-5" fill="none" stroke={C.line2} strokeWidth="2" />
        <path d="M202 316c0-4 3-4 3-8" fill="none" stroke={C.line2} strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
      </g>
      <rect x="486" y="326" width="46" height="6" rx="3" fill={C.paper} stroke={C.line2} />
      <rect x="482" y="332" width="52" height="6" rx="3" fill={C.soft} stroke={C.line2} />

      {/* ─── bureau : plateau, façade, pieds ─── */}
      <rect x="140" y={DESK_TOP} width="400" height="16" rx="8" fill={C.amberBg} stroke={C.amber} strokeOpacity="0.35" />
      <rect x="168" y={DESK_TOP + 16} width="344" height="84" fill={C.soft} />
      <rect x="168" y={DESK_TOP + 16} width="344" height="84" fill="none" stroke={C.line} />
      <rect x="156" y={DESK_TOP + 16} width="12" height={GROUND - DESK_TOP - 16} rx="3" fill={C.line2} />
      <rect x="512" y={DESK_TOP + 16} width="12" height={GROUND - DESK_TOP - 16} rx="3" fill={C.line2} />

      {/* plante à droite */}
      <g>
        <path d="M566 470l-6-44h48l-6 44z" fill={C.amber} opacity="0.85" />
        <path d="M584 426V378" stroke={C.green} strokeWidth="3" strokeLinecap="round" />
        <path d="M584 400c-2-22-14-36-32-40 2 24 14 38 32 40Z" fill={C.green} opacity="0.75" />
        <path d="M584 412c2-24 16-38 34-42-2 26-16 40-34 42Z" fill={C.green} />
        <path d="M584 384c-4-16 0-28 8-36 6 12 4 26-8 36Z" fill={C.green} opacity="0.6" />
      </g>

      {/* sol */}
      <path d={`M60 ${GROUND}H600`} stroke={C.line2} strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="340" cy={GROUND + 4} rx="220" ry="6" fill={C.ink} opacity="0.05" />
    </svg>
  )
}
