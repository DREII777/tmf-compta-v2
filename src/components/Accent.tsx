import { Fragment } from 'react'

interface AccentProps {
  /** Texte où les mots à accentuer sont entre astérisques : `Un service en *360°*`. */
  text: string
  className?: string
}

/**
 * Titre bicolore — l'ADN de tmfcompta.be : les mots-clés du titre passent
 * en bleu de marque, ici en italique Fraunces pour le relief. Un texte sans
 * astérisque est rendu tel quel, ce qui rend le composant sûr partout.
 */
export function Accent({ text, className }: AccentProps) {
  const parts = text.split('*')
  if (parts.length < 3) return <>{text}</>

  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <em key={i} className={`italic text-brand ${className ?? ''}`}>
            {part}
          </em>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}
