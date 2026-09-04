import type { ElementType, ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  /** Balise racine — `article` pour une carte listant un contenu autonome, etc. */
  as?: ElementType
  padded?: boolean
}

export function Card({ children, className, as: Tag = 'div', padded = true }: CardProps) {
  return (
    <Tag
      className={`rounded-xl bg-paper shadow-card ${padded ? 'p-6' : ''} ${className ?? ''}`}
    >
      {children}
    </Tag>
  )
}
