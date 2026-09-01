import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NewsArticleView } from '@/app/_news/NewsArticle'
import { findRoPost, roStaticParams } from '@/app/_news/lookup'
import { abs, isLocale, path } from '@/lib/i18n'

export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return roStaticParams()
}

interface PageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale) || locale !== 'ro') return {}
  const post = findRoPost(slug)
  if (!post) return {}

  const canonical = abs(path('ro', 'news', post.ro.slug))
  const languages: Record<string, string> = {
    ro: canonical,
    'fr-BE': abs(path('fr', 'news', post.fr.slug)),
    'x-default': abs(path('fr', 'news', post.fr.slug)),
  }

  return {
    title: { absolute: post.ro.metaTitle },
    description: post.ro.metaDescription,
    alternates: { canonical, languages },
  }
}

export default async function NoutatiArticlePage({ params }: PageProps) {
  const { locale, slug } = await params
  if (!isLocale(locale) || locale !== 'ro') notFound()
  const post = findRoPost(slug)
  if (!post) notFound()

  return <NewsArticleView locale={locale} content={post.ro} date={post.date} readingMinutes={post.readingMinutes} />
}
