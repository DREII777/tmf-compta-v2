import Link from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'soft' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface BaseProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type LinkButtonProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children' | 'href'> & { href: string }

type ElementButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & { href?: undefined }

export type ButtonProps = LinkButtonProps | ElementButtonProps

const BASE =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg font-semibold transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out-soft focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand disabled:pointer-events-none disabled:opacity-50'

const SIZES: Record<Size, string> = {
  sm: 'px-4 text-sm',
  md: 'px-6 text-base',
  lg: 'min-h-13 px-7 text-[1.05rem]',
}

/**
 * `soft` : fond menthe, texte encre — le bouton « doux » qui accompagne
 * le navy sans lui faire concurrence (découvrir, en savoir plus…).
 * `secondary` reste le bouton à filet, pour les contextes plus sobres.
 */
const VARIANTS: Record<Variant, string> = {
  primary: 'bg-brand text-paper shadow-sm hover:-translate-y-0.5 hover:bg-brand-2 hover:shadow-lg',
  secondary: 'border border-line-2 bg-paper text-brand hover:border-brand hover:bg-brand-tint',
  soft: 'bg-mint text-ink hover:bg-mint-2',
  ghost: 'text-brand hover:bg-soft',
}

/**
 * Bouton unique pouvant se rendre `<a>` (interne via `next/link`, ou externe
 * / `tel:` / `mailto:` en `<a>` brut) ou `<button>` selon la présence de `href`.
 */
export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, children } = props
  const classes = [BASE, SIZES[size], VARIANTS[variant], className].filter(Boolean).join(' ')

  if (props.href !== undefined) {
    const { href, variant: _variant, size: _size, className: _className, children: _children, ...rest } = props
    const isExternal = /^(https?:)?\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')

    if (isExternal) {
      return (
        <a href={href} className={classes} {...rest}>
          {children}
        </a>
      )
    }

    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  const { href: _href, variant: _variant2, size: _size2, className: _className2, children: _children2, ...rest } = props
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  )
}
