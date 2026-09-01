import type { ReactNode } from 'react'

interface SectionProps {
  id?: string
  tone?: 'paper' | 'soft'
  children: ReactNode
  className?: string
}

const TONE_CLASSES: Record<'paper' | 'soft', string> = {
  paper: 'bg-paper',
  soft: 'bg-soft',
}

export function Section({ id, tone = 'paper', children, className }: SectionProps) {
  return (
    <section id={id} className={`${TONE_CLASSES[tone]} py-16 md:py-24 ${className ?? ''}`}>
      {children}
    </section>
  )
}
