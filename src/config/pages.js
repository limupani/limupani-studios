/* ==========================================================================
   PAGES — the four pages the landing-page buttons open (plus the cart).
   - path:    the address in the browser (e.g. /shop)
   - title:   page heading + browser tab title
   - message: the text shown on the page for now
   When you build a page properly, open its file in src/pages/ and replace
   the placeholder there.
   ========================================================================== */
export const pages = {
  shop: {
    path: '/shop',
    title: 'Shop',
    message: 'The shop is coming together. Check back soon!',
  },
  comics: {
    path: '/comics',
    title: 'Comics',
    message: 'Comics are on their way. Check back soon!',
  },
  letsTalk: {
    path: '/lets-talk',
    title: "Let's talk",
    message: 'Contact details are coming soon.',
  },
  tabloids: {
    path: '/tabloids',
    title: 'Tabloids',
    message: 'Tabloids — coming soon.',
  },
}

// The cart icon on the shop page opens this. Placeholder until the cart is built.
export const cartPage = {
  path: '/cart',
  title: 'Cart',
  message: 'Your cart is empty.',
}

export const notFound = {
  title: 'Page not found',
  message: "We couldn't find that page.",
}
