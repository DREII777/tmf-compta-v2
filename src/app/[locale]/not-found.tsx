import { NotFoundBody } from '@/app/_not-found/NotFoundBody'

/**
 * 404 survenant sous `/fr` ou `/ro`.
 *
 * Ne rend NI `<html>`, NI en-tête, NI `<main>`, NI pied de page : le layout
 * de locale les a déjà produits et Next injecte ce composant à l'intérieur.
 * En ajouter ici imbriquerait deux `<main>` — un balisage invalide qui fait
 * échouer le rendu React et sert une page vide.
 */
export default function LocaleNotFound() {
  return <NotFoundBody />
}
