'use client'

import { useEffect } from 'react'
import type { Locale } from '@/lib/i18n'

/**
 * Aligne `<html lang>` sur la locale de la page.
 *
 * Le layout racine sert `lang="fr"` (Next impose que `<html>` vienne de
 * là, sans accès aux `params`). Ce composant corrige l'attribut dès
 * l'hydratation : c'est la valeur du DOM vivant que lisent les lecteurs
 * d'écran et les moteurs qui exécutent le JavaScript. Les balises
 * `hreflang`, elles, sont correctes dès le HTML servi.
 */
export function LangSync({ locale }: { locale: Locale }) {
  useEffect(() => {
    if (document.documentElement.lang !== locale) {
      document.documentElement.lang = locale
    }
  }, [locale])

  return null
}
