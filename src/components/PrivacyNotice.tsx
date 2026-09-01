'use client'

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { path, type Locale } from '@/lib/i18n'
import { Icon } from './Icon'

const STORAGE_KEY = 'tmf-privacy-notice-v1'
const READ_EVENT = 'tmf-privacy-notice-read'

const T: Record<Locale, { title: string; text: string; more: string; ok: string; close: string }> = {
  fr: {
    title: 'Vie privée',
    text:
      "Ce site ne dépose aucun cookie de suivi et n'utilise aucun outil publicitaire. Seule la carte de la page contact est fournie par Google, qui reçoit alors votre adresse IP.",
    more: 'Politique de confidentialité',
    ok: "J'ai compris",
    close: 'Fermer cet avis',
  },
  ro: {
    title: 'Confidențialitate',
    text:
      'Acest site nu plasează niciun cookie de urmărire și nu folosește instrumente publicitare. Doar harta din pagina de contact este furnizată de Google, care primește atunci adresa dumneavoastră IP.',
    more: 'Politica de confidențialitate',
    ok: 'Am înțeles',
    close: 'Închide acest mesaj',
  },
}

/**
 * Avis de confidentialité, en coin.
 *
 * Ce n'est volontairement PAS une bannière de consentement bloquante : le
 * site ne dépose aucun cookie et n'utilise aucun traceur, donc il n'y a
 * rien à accepter ou à refuser. Afficher des boutons « accepter /
 * refuser » laisserait croire à un choix qui n'existe pas.
 *
 * L'avis informe, renvoie à la politique de confidentialité, et se ferme.
 * Le choix est mémorisé localement — jamais transmis.
 */
/** Abonnement au stockage local : l'avis se referme dans tous les onglets. */
function subscribe(onChange: () => void) {
  window.addEventListener('storage', onChange)
  window.addEventListener(READ_EVENT, onChange)
  return () => {
    window.removeEventListener('storage', onChange)
    window.removeEventListener(READ_EVENT, onChange)
  }
}

function hasBeenRead() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'read'
  } catch {
    // Stockage indisponible (navigation privée stricte) : on affiche l'avis,
    // quitte à le remontrer. Mieux vaut informer deux fois que pas du tout.
    return false
  }
}

export function PrivacyNotice({ locale }: { locale: Locale }) {
  // Instantané serveur à `true` : rien n'est rendu dans le HTML servi, donc
  // aucune divergence d'hydratation. La vraie valeur arrive côté client.
  const read = useSyncExternalStore(subscribe, hasBeenRead, () => true)
  const [entered, setEntered] = useState(false)
  const t = T[locale]
  const visible = !read

  useEffect(() => {
    // Entrée en douceur plutôt qu'une apparition brute une fois hydraté :
    // le second cadre d'animation laisse le navigateur peindre l'état
    // initial avant de déclencher la transition vers l'état final.
    if (!visible) return
    const frame = window.requestAnimationFrame(() => setEntered(true))
    return () => window.cancelAnimationFrame(frame)
  }, [visible])

  // La fermeture est la seule animation que le visiteur déclenche lui-même,
  // donc la seule qu'il regarde. Engager l'état tout de suite démonterait
  // l'`<aside>` avant qu'un cadre n'ait été peint : on diffère de la durée
  // exacte de la transition de sortie.
  const exitTimer = useRef<number | null>(null)
  useEffect(() => () => {
    if (exitTimer.current) window.clearTimeout(exitTimer.current)
  }, [])

  const dismiss = useCallback(() => {
    setEntered(false)
    exitTimer.current = window.setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, 'read')
      } catch {
        /* rien à faire : l'avis réapparaîtra, sans conséquence */
      }
      // `storage` ne se déclenche pas dans l'onglet émetteur : on le complète.
      window.dispatchEvent(new Event(READ_EVENT))
    }, 200)
  }, [])

  if (!visible) return null

  return (
    <aside
      aria-label={t.title}
      className={`fixed bottom-4 left-4 z-50 w-[calc(100vw-2rem)] max-w-sm rounded-xl border border-line bg-paper p-4 shadow-xl transition-[opacity,transform] duration-200 ease-out-soft sm:bottom-6 sm:left-6 ${entered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-tint text-brand">
          <Icon name="shield" size={17} />
        </span>
        <div className="min-w-0">
          <p className="font-display text-base text-ink">{t.title}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{t.text}</p>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            <button
              type="button"
              onClick={dismiss}
              className="inline-flex min-h-11 items-center rounded-full bg-brand px-4 py-2 text-sm font-semibold text-paper transition-colors duration-200 ease-out-soft hover:bg-brand-2 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand"
            >
              {t.ok}
            </button>
            <Link
              href={path(locale, 'privacy')}
              className="inline-flex min-h-11 items-center text-sm font-semibold text-brand underline underline-offset-4 transition-colors duration-200 ease-out-soft hover:text-brand-2 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand"
            >
              {t.more}
            </Link>
          </div>
        </div>

        <button
          type="button"
          onClick={dismiss}
          aria-label={t.close}
          className="-mr-1 -mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-3 transition-colors duration-200 ease-out-soft hover:bg-soft hover:text-ink focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand"
        >
          <Icon name="close" size={17} />
        </button>
      </div>
    </aside>
  )
}
