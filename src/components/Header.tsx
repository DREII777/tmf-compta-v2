'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'
import { UI } from '@/content/ui'
import { path, type Locale, type RouteKey } from '@/lib/i18n'
import { SITE } from '@/lib/site'
import { Button } from './Button'
import { Icon } from './Icon'
import { LangSwitch } from './LangSwitch'

interface HeaderProps {
  locale: Locale
  /** Chemin équivalent de la page courante dans l'autre langue. */
  altPath?: string
}

const NAV_KEYS: RouteKey[] = ['services', 'method', 'about', 'faq', 'contact']

const NAV_ARIA_LABEL: Record<Locale, string> = { fr: 'Navigation principale', ro: 'Navigare principală' }

function Logo() {
  return (
    <svg
      viewBox="0 0 171 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-auto text-brand"
      aria-hidden="true"
    >
      <path d="M14.7906 61.079V23.7183H0V12.9174H43.1355V23.7183H28.4119V61.079H14.7906Z" fill="currentColor" />
      <path d="M58.2028 31.975L60.8181 36.2417V31.975H58.2028Z" fill="currentColor" />
      <path
        d="M127.483 61.079H113.862V12.9174H151.632V23.4416H127.483V61.079ZM126.519 34.0371H148.732V44.5655H126.519V34.0371Z"
        fill="currentColor"
      />
      <path d="M91.6232 41.8999L91.707 59.8216H104.23L104.13 24.2673L102.734 23.2782L91.6232 41.8999Z" fill="currentColor" />
      <path d="M105.475 20.403L88.7522 8.55433L107.374 0L105.475 20.403Z" fill="currentColor" />
      <path
        d="M104.096 13.0683L104.092 11.66H92.8763L76.3925 39.4857L69.9842 49.9345L73.1317 55.073H79.188L104.096 13.3156V13.0683Z"
        fill="currentColor"
      />
      <path
        d="M74.0789 35.6843L59.4434 11.66H48.2278V59.8216H60.8181V34.9843L58.2028 30.7176H60.8181V34.9843L67.679 46.1749L73.027 37.453L74.0789 35.6843Z"
        fill="currentColor"
      />
      <path
        d="M165.057 15.0172C164.257 15.0252 163.465 14.8712 162.726 14.5646C161.307 13.9702 160.183 12.8364 159.6 11.4128C159.3 10.6787 159.149 9.89223 159.156 9.09919C159.15 8.32235 159.299 7.55212 159.592 6.83282C159.885 6.11353 160.318 5.45936 160.866 4.90795C161.404 4.36687 162.045 3.9393 162.752 3.65057C163.493 3.34473 164.288 3.1908 165.09 3.19792C165.891 3.19016 166.686 3.34116 167.429 3.64219C168.134 3.92893 168.773 4.35682 169.307 4.89956C169.842 5.4356 170.269 6.07039 170.564 6.76886C170.858 7.49858 171.006 8.27892 171 9.06566C171.007 9.86767 170.853 10.6629 170.547 11.4044C170.098 12.4845 169.336 13.4056 168.359 14.0493C167.382 14.6931 166.235 15.0302 165.065 15.0172H165.057ZM165.057 13.7599C165.681 13.7659 166.301 13.6432 166.876 13.3994C167.418 13.165 167.91 12.8293 168.326 12.4103C168.742 11.9841 169.069 11.4799 169.29 10.9266C169.742 9.7417 169.742 8.43153 169.29 7.24666C169.077 6.70058 168.758 6.20204 168.351 5.77972C167.944 5.36338 167.456 5.03523 166.918 4.81574C166.335 4.58025 165.711 4.46341 165.082 4.47206C164.455 4.46525 163.834 4.585 163.254 4.82412C162.705 5.04917 162.208 5.38601 161.796 5.81325C161.381 6.23554 161.056 6.73738 160.84 7.28857C160.611 7.8701 160.497 8.49082 160.505 9.11596C160.5 9.74087 160.613 10.3611 160.84 10.9433C161.051 11.4975 161.373 12.0025 161.787 12.4271C162.201 12.8518 162.698 13.187 163.246 13.412C163.821 13.6429 164.437 13.7555 165.057 13.7431V13.7599ZM162.408 12.3181V5.89708H165.308C166.072 5.85096 166.828 6.07334 167.446 6.52577C167.695 6.73127 167.894 6.99185 168.027 7.28707C168.159 7.58229 168.221 7.90414 168.208 8.22741C168.227 8.55623 168.167 8.8847 168.034 9.18617C167.902 9.48764 167.7 9.75364 167.446 9.96259C166.825 10.3912 166.078 10.6006 165.325 10.5577H164.487V12.3013L162.408 12.3181ZM164.47 9.09919H165.191C165.448 9.11353 165.702 9.033 165.903 8.87286C165.991 8.79395 166.059 8.69658 166.104 8.58783C166.149 8.47909 166.169 8.36169 166.163 8.24418C166.171 8.12525 166.151 8.00613 166.106 7.89578C166.061 7.78543 165.992 7.68673 165.903 7.60711C165.699 7.45168 165.447 7.37436 165.191 7.38916H164.47V9.09919ZM166.389 12.3013L164.814 9.87038H166.909L168.485 12.3013H166.389Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function Header({ locale, altPath }: HeaderProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const panelId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const ui = UI[locale]

  // Le menu mobile se referme à la navigation. Ajusté pendant le rendu plutôt
  // que dans un effet : React réexécute aussitôt le composant avec le nouvel
  // état, sans passe d'affichage intermédiaire menu ouvert sur la page suivante.
  const [pathAtOpen, setPathAtOpen] = useState(pathname)
  if (pathAtOpen !== pathname) {
    setPathAtOpen(pathname)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  /**
   * En-tête dynamique : collé au bord en haut de page, il se détache en
   * barre flottante arrondie, plus compacte, dès que l'on défile. La mise à
   * jour passe par requestAnimationFrame : un seul rendu par image, et le
   * premier appel (position restaurée au chargement) reste hors du corps de
   * l'effet.
   */
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      setScrolled(window.scrollY > 24)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const homeHref = path(locale, 'home')

  /**
   * Depuis le panneau mobile, on place le focus sur le contenu principal au
   * moment du clic, tant que le panneau est encore actif. Sans cela, il
   * redevient `inert` dans le même commit que la navigation alors que le lien
   * activé détient le focus : rendre inerte un sous-arbre contenant l'élément
   * focalisé renvoie le focus au <body>, et la tabulation suivante repart du
   * tout début du document. Next ne rattrape pas ce cas — son gestionnaire de
   * défilement laisse volontairement le focus intact.
   * `#main` porte `tabIndex={-1}`, il accepte donc le focus programmatique.
   */
  const focusMainOnMobileNav = () => document.getElementById('main')?.focus()

  const navLinks = (variant: 'desktop' | 'mobile') => (
    <ul className={variant === 'desktop' ? 'flex items-center gap-1' : 'flex flex-col gap-1'}>
      {NAV_KEYS.map((key) => {
        const href = path(locale, key)
        const isActive = pathname === href
        const label = ui.nav[key]
        return (
          <li key={key}>
            <Link
              href={href}
              aria-current={isActive ? 'page' : undefined}
              onClick={variant === 'mobile' ? focusMainOnMobileNav : undefined}
              className={
                variant === 'desktop'
                  ? `inline-flex min-h-11 items-center whitespace-nowrap rounded px-3 text-[0.95rem] font-medium transition-colors duration-200 ease-out-soft ${isActive ? 'text-brand' : 'text-ink-2 hover:text-brand'}`
                  : `flex min-h-11 items-center rounded px-2 text-base font-medium transition-colors duration-200 ease-out-soft ${isActive ? 'text-brand' : 'text-ink-2 hover:text-brand'}`
              }
            >
              {label}
            </Link>
          </li>
        )
      })}
    </ul>
  )

  // Le retrait de la barre flottante est un padding sur <header>, pas une
  // marge sur l'enfant : une marge fusionnerait avec celle du conteneur
  // collant et la barre resterait collée au bord.
  return (
    <header className={`sticky top-0 z-40 transition-[padding] duration-500 ease-out-soft ${scrolled ? 'px-3 pt-3' : ''}`}>
      <div
        className={`mx-auto backdrop-blur-md transition-[border-radius,box-shadow,background-color,border-color,max-width] duration-500 ease-out-soft ${
          scrolled
            ? 'max-w-[calc(var(--container-site)+2rem)] rounded-2xl border border-line/80 bg-paper/95 shadow-xl'
            : 'max-w-none border-b border-line/70 bg-paper/80'
        }`}
      >
      <div
        className={`mx-auto flex max-w-site items-center justify-between gap-4 px-6 transition-[padding] duration-500 ease-out-soft ${scrolled ? 'py-1.5' : 'py-3'}`}
      >
        <div className="flex shrink-0 items-center gap-3">
          <Link
            href={homeHref}
            aria-label={ui.nav.home}
            className={`flex shrink-0 origin-left items-center rounded transition-transform duration-500 ease-out-soft ${scrolled ? 'scale-90' : 'scale-100'}`}
          >
            <Logo />
          </Link>
          <span className="hidden whitespace-nowrap rounded-lg bg-brand-tint px-3 py-1 text-xs font-semibold text-brand 2xl:inline-flex">
            {ui.header.badge}
          </span>
        </div>

        <nav aria-label={NAV_ARIA_LABEL[locale]} className="hidden lg:block">
          {navLinks('desktop')}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${SITE.phoneRaw}`}
            aria-label={`${ui.header.phoneLabel} : ${SITE.phone}`}
            className="hidden min-h-11 items-center gap-2 whitespace-nowrap rounded px-2 text-sm font-semibold text-c2 transition-colors duration-200 ease-out-soft hover:underline xl:inline-flex"
          >
            <Icon name="phone" size={18} />
            {SITE.phone}
          </a>
          <LangSwitch locale={locale} altPath={altPath} />
          <Button href={path(locale, 'contact')} size="sm" className="whitespace-nowrap">
            {ui.header.cta}
          </Button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded text-ink transition-colors duration-200 ease-out-soft hover:bg-soft hover:text-brand lg:hidden"
        >
          <span className="sr-only">{open ? ui.header.menuClose : ui.header.menuOpen}</span>
          <Icon name={open ? 'close' : 'menu'} size={24} />
        </button>
      </div>

      <div
        id={panelId}
        aria-hidden={!open}
        inert={!open}
        className={`grid border-t bg-paper transition-[grid-template-rows,border-color] duration-200 ease-out-soft lg:hidden ${open ? 'grid-rows-[1fr] border-line' : 'grid-rows-[0fr] border-transparent'} ${scrolled ? 'rounded-b-2xl' : ''}`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="px-6 py-4">
            <nav aria-label={NAV_ARIA_LABEL[locale]}>{navLinks('mobile')}</nav>
            <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4">
              <a
                href={`tel:${SITE.phoneRaw}`}
                aria-label={`${ui.header.phoneLabel} : ${SITE.phone}`}
                className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-c2 transition-colors duration-200 ease-out-soft hover:underline"
              >
                <Icon name="phone" size={18} />
                {SITE.phone}
              </a>
              <LangSwitch locale={locale} altPath={altPath} className="px-0" />
              <Button href={path(locale, 'contact')} size="sm">
                {ui.header.cta}
              </Button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </header>
  )
}
