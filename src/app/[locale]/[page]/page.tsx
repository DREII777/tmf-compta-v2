import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { ComponentType } from 'react'
import { isLocale, LOCALES, ROUTES, type Locale, type RouteKey } from '@/lib/i18n'
import { AboutPage, aboutMetadata } from './_content/about'
import { MethodPage, methodMetadata } from './_content/method'
import { LocalPage, localMetadata } from './_content/local'
import { RomanianPage, romanianMetadata } from './_content/romanian'
import { FaqPage, faqMetadata } from './_content/faq'

/**
 * Routeur générique pour les pages "de contenu" dont le slug diffère par
 * locale (voir SPEC §4 : solution retenue). `home` et `services` ont leurs
 * propres dossiers littéraux et ne passent pas par ici.
 *
 * Pour ajouter une page (contact, faq, news, legal, privacy…) : créer son
 * module dans `./_content/<clé>.tsx` exportant `{ <Nom>Page, <nom>Metadata }`
 * puis ajouter UNE ligne au `REGISTRY` ci-dessous. Ne pas toucher aux clés
 * déjà enregistrées par un autre agent.
 */
interface PageEntry {
  Component: ComponentType<{ locale: Locale }>
  metadata: (locale: Locale) => Metadata
}

const REGISTRY: Partial<Record<RouteKey, PageEntry>> = {
  about: { Component: AboutPage, metadata: aboutMetadata },
  method: { Component: MethodPage, metadata: methodMetadata },
  local: { Component: LocalPage, metadata: localMetadata },
  romanian: { Component: RomanianPage, metadata: romanianMetadata },
  faq: { Component: FaqPage, metadata: faqMetadata },
}

function resolveKey(locale: Locale, slug: string): RouteKey | undefined {
  return (Object.keys(REGISTRY) as RouteKey[]).find((key) => ROUTES[key][locale] === slug)
}

export const dynamic = 'force-static'
/**
 * Tout slug hors de `generateStaticParams` renvoie un 404 rendu par
 * `app/not-found.tsx`. `dynamicParams = false` est indispensable : sans lui,
 * le segment est rendu à la demande et le `notFound()` levé depuis le
 * composant ne remonte pas jusqu'à la frontière 404 — Next 16.3.4 sert alors
 * un document `<html id="__next_error__">` au corps vide (reproduit sur une
 * app Next nue de cinq fichiers, donc indépendant de ce projet).
 */
export const dynamicParams = false

export function generateStaticParams() {
  const keys = Object.keys(REGISTRY) as RouteKey[]
  return LOCALES.flatMap((locale) => keys.map((key) => ({ locale, page: ROUTES[key][locale] })))
}

interface RouteParams {
  params: Promise<{ locale: string; page: string }>
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { locale: rawLocale, page } = await params
  if (!isLocale(rawLocale)) return {}
  const key = resolveKey(rawLocale, page)
  if (!key) return {}
  return REGISTRY[key]!.metadata(rawLocale)
}

export default async function DynamicContentPage({ params }: RouteParams) {
  const { locale: rawLocale, page } = await params
  if (!isLocale(rawLocale)) notFound()
  const key = resolveKey(rawLocale, page)
  if (!key) notFound()
  const { Component } = REGISTRY[key]!
  return <Component locale={rawLocale} />
}
