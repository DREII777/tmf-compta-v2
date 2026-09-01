'use client'

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Délai avant l'apparition, en millisecondes. */
  delay?: number
}

/** Doit rester le complément du `rootMargin` ci-dessous : même ligne de déclenchement. */
const LIGNE_DE_DECLENCHEMENT = 0.88

/**
 * Révèle son contenu au défilement.
 *
 * Le contenu est visible par défaut : ce composant l'escamote (`.rv-armed`)
 * une fois monté, puis le révèle (`.in`). Sans JavaScript, rien ne disparaît.
 * Respecte `prefers-reduced-motion`.
 */
export function Reveal({ children, className, delay }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!('IntersectionObserver' in window)) return

    // On n'escamote QUE ce qui est encore sous la ligne de déclenchement.
    // Escamoter sans condition produisait deux défauts visibles : au
    // chargement, un bloc situé au-dessus de la ligne de flottaison était
    // peint en clair, effacé d'un coup (l'escamotage n'a pas de transition)
    // puis refondu — un clignotement ; et au retour arrière, tout était
    // ré-escamoté au remontage, si bien que les sections déjà lues, situées
    // au-dessus de la position restaurée, repassaient invisibles. Mesuré :
    // 10 blocs sur 19 dans ce cas. Un bloc déjà à l'écran reste simplement
    // visible, ce qui est le comportement attendu.
    if (el.getBoundingClientRect().top < window.innerHeight * LIGNE_DE_DECLENCHEMENT) return
    el.classList.add('rv-armed')

    let notifie = false
    let filet = 0

    // Filet de sécurité : si l'observateur ne notifiait jamais, on révèle
    // quand même. Il n'est armé QUE pendant que l'onglet est visible : la
    // livraison d'un IntersectionObserver passe par l'étape de rendu, qui
    // n'a pas lieu dans un onglet d'arrière-plan, alors que `setTimeout`
    // continue de tirer. Armé inconditionnellement, il révélait donc toute
    // la page hors écran dans un onglet ouvert en second plan.
    const armerLeFilet = () => {
      if (notifie || filet) return
      filet = window.setTimeout(() => el.classList.add('in'), 2500)
    }
    const surVisibilite = () => {
      if (document.visibilityState === 'visible') armerLeFilet()
    }
    if (document.visibilityState === 'visible') armerLeFilet()
    else document.addEventListener('visibilitychange', surVisibilite)

    const observer = new IntersectionObserver(
      (entries) => {
        // Désarmé dès la PREMIÈRE notification — qui arrive toujours, que le
        // bloc soit intersecté ou non. Sans cela, toute la page se révélait
        // 2,5 s après le chargement, et la révélation au défilement ne jouait
        // plus pour qui avait lu le hero trois secondes.
        notifie = true
        window.clearTimeout(filet)
        document.removeEventListener('visibilitychange', surVisibilite)
        for (const entry of entries) {
          // `bottom <= 0` : le bloc est déjà entièrement passé au-dessus de la
          // fenêtre. Cas du retour arrière — l'effet s'exécute AVANT que Next
          // restaure la position, si bien qu'un bloc encore sous la ligne de
          // flottaison au montage est armé, puis se retrouve au-dessus une
          // fois la position rétablie : il ne sera jamais intersecté et
          // resterait invisible. Mesuré : 10 blocs sur 19 dans ce cas.
          if (entry.isIntersecting || entry.boundingClientRect.bottom <= 0) {
            el.classList.add('in')
            observer.disconnect()
          }
        }
      },
      // Seuil 0 + marge basse en pourcentage : le déclencheur est une
      // distance depuis le bas de la fenêtre, identique pour un titre d'une
      // ligne et pour une grille de neuf cartes. Avec `threshold: 0.15`, il
      // fallait 300 px de bloc entrés pour la FAQ contre 18 px pour une
      // petite carte.
      { threshold: 0, rootMargin: '0px 0px -12% 0px' },
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      window.clearTimeout(filet)
      document.removeEventListener('visibilitychange', surVisibilite)
    }
  }, [])

  const style: CSSProperties | undefined = delay ? { transitionDelay: `${delay}ms` } : undefined

  return (
    <div ref={ref} className={`rv ${className ?? ''}`} style={style}>
      {children}
    </div>
  )
}
