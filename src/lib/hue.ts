import type { Hue } from '@/content/types'

/**
 * Classes du badge d'icône par teinte de catégorie.
 *
 * Écrites en toutes lettres : Tailwind analyse le source statiquement et ne
 * verrait pas une classe composée à l'exécution (`bg-c${n}-bg`).
 */
export const HUE_BADGE: Record<Hue, string> = {
  c1: 'bg-c1-bg text-c1',
  c2: 'bg-c2-bg text-c2',
  c3: 'bg-c3-bg text-c3',
  c4: 'bg-c4-bg text-c4',
  c5: 'bg-c5-bg text-c5',
  c6: 'bg-c6-bg text-c6',
  c7: 'bg-c7-bg text-c7',
  c8: 'bg-c8-bg text-c8',
  c9: 'bg-c9-bg text-c9',
}
