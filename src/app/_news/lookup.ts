import { POSTS } from '@/content/posts'
import type { Post, PostContent } from '@/content/types'

/**
 * Un article dont la version roumaine est garantie présente (utilisé pour
 * restreindre les listes/lookups côté `noutati` sans assertion non-nulle).
 */
export type PostWithRo = Post & { ro: PostContent }

export function hasRo(post: Post): post is PostWithRo {
  return post.ro !== undefined
}

/** Article français recherché par son slug FR (toujours présent). */
export function findFrPost(slug: string): Post | undefined {
  return POSTS.find((post) => post.fr.slug === slug)
}

/** Article roumain recherché par son slug RO (absent pour certains articles). */
export function findRoPost(slug: string): PostWithRo | undefined {
  return POSTS.find((post): post is PostWithRo => hasRo(post) && post.ro.slug === slug)
}

export function frStaticParams(): { locale: 'fr'; slug: string }[] {
  return POSTS.map((post) => ({ locale: 'fr' as const, slug: post.fr.slug }))
}

export function roStaticParams(): { locale: 'ro'; slug: string }[] {
  return POSTS.filter(hasRo).map((post) => ({ locale: 'ro' as const, slug: post.ro.slug }))
}

export interface NewsListItem {
  id: string
  date: string
  readingMinutes: number
  content: PostContent
}

function byDateDesc(a: NewsListItem, b: NewsListItem): number {
  return b.date.localeCompare(a.date)
}

/** Cartes de l'index d'actualités en français — tous les articles. */
export function frListItems(): NewsListItem[] {
  return POSTS.map((post) => ({
    id: post.id,
    date: post.date,
    readingMinutes: post.readingMinutes,
    content: post.fr,
  })).sort(byDateDesc)
}

/** Cartes de l'index d'actualités en roumain — seulement les articles traduits. */
export function roListItems(): NewsListItem[] {
  return POSTS.filter(hasRo)
    .map((post) => ({
      id: post.id,
      date: post.date,
      readingMinutes: post.readingMinutes,
      content: post.ro,
    }))
    .sort(byDateDesc)
}
