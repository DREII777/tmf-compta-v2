import type { Hue } from '@/content/types'
import { Icon, type IconName } from './Icon'

export type { Hue }

interface TagProps {
  icon?: IconName
  label: string
  tone?: Hue
  className?: string
}

const TONE_CLASSES: Record<Hue, string> = {
  c1: 'text-c1 bg-c1-bg border-c1/20',
  c2: 'text-c2 bg-c2-bg border-c2/20',
  c3: 'text-c3 bg-c3-bg border-c3/20',
  c4: 'text-c4 bg-c4-bg border-c4/20',
  c5: 'text-c5 bg-c5-bg border-c5/20',
  c6: 'text-c6 bg-c6-bg border-c6/20',
  c7: 'text-c7 bg-c7-bg border-c7/20',
  c8: 'text-c8 bg-c8-bg border-c8/20',
  c9: 'text-c9 bg-c9-bg border-c9/20',
}

/** Pastille : icône + libellé, colorée par teinte de catégorie (c1…c9). */
export function Tag({ icon, label, tone = 'c1', className }: TagProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${TONE_CLASSES[tone]} ${className ?? ''}`}
    >
      {icon && <Icon name={icon} size={14} />}
      {label}
    </span>
  )
}
