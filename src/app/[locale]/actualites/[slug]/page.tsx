import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NewsArticleView } from '@/app/_news/NewsArticle'
import { findFrPost, frStaticParams } from '@/app/_news/lookup'
import { abs, isLocale, path } from '@/lib/i18n'

export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return frStaticParams()
}

interface PageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale) || locale !== 'fr') return {}
  const post = findFrPost(slug)
  if (!post) return {}

  const canonical = abs(path('fr', 'news', post.fr.slug))
  const languages: Record<string, string> = { 'fr-BE': canonical, 'x-default': canonical }
  if (post.ro) languages.ro = abs(path('ro', 'news', post.ro.slug))

  return {
    title: { absolute: post.fr.metaTitle },
    description: post.fr.metaDescription,
    alternates: { canonical, languages },
  }
}

export default async function ActualitesArticlePage({ params }: PageProps) {
  const { locale, slug } = await params
  if (!isLocale(locale) || locale !== 'fr') notFound()
  const post = findFrPost(slug)
  if (!post) notFound()

  return <NewsArticleView locale={locale} content={post.fr} date={post.date} readingMinutes={post.readingMinutes} />
}
