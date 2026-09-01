import type { ReactNode } from 'react'
import type { PostBlock } from '@/content/types'

/**
 * Rendu partagé des blocs de contenu typés (`PostBlock`) en balises
 * sémantiques. Utilisé par les articles d'actualités et par les pages
 * légales (mentions légales, confidentialité), qui partagent le même
 * format de corps de texte pour éviter toute dépendance de parsing.
 */
export function renderBlocks(blocks: PostBlock[]): ReactNode[] {
  return blocks.map((block, index) => {
    const key = `${block.type}-${index}`
    switch (block.type) {
      case 'h2':
        return (
          <h2 key={key} className="mt-10 font-display text-2xl wonk text-ink first:mt-0 md:text-3xl">
            {block.text}
          </h2>
        )
      case 'h3':
        return (
          <h3 key={key} className="mt-8 font-display text-xl wonk text-ink">
            {block.text}
          </h3>
        )
      case 'p':
        return (
          <p key={key} className="mt-4 leading-relaxed text-ink-2">
            {block.text}
          </p>
        )
      case 'ul':
        return (
          <ul key={key} className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-ink-2">
            {block.items.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        )
      case 'ol':
        return (
          <ol key={key} className="mt-4 list-decimal space-y-2 pl-6 leading-relaxed text-ink-2">
            {block.items.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ol>
        )
      case 'quote':
        return (
          <blockquote key={key} className="mt-6 border-l-4 border-brand-tint pl-5">
            <p className="leading-relaxed text-ink-2 italic">{block.text}</p>
            {block.cite && <cite className="mt-2 block text-sm not-italic text-ink-3">— {block.cite}</cite>}
          </blockquote>
        )
      default:
        return null
    }
  })
}
