/* ==========================================================================
   SHOP PAGE — the categories row, headings and messages.
   (The products themselves now live in the database.)
   - id:        must match the `category` of products in products.js
   - label:     the word shown under the icon
   - icon:      the drawing (see src/assets/images/index.js)
   - iconWidth: how wide the drawing is, in design pixels (design = 735 wide)
   Order here = left-to-right order on the page.
   ========================================================================== */
import { images } from '../assets/images'

const { categories } = images

export const shop = {
  designWidth: 735,

  // Heading above the list when no category is selected
  allProductsHeading: 'all products',

  // Shown when a category has no products yet
  emptyMessage: 'nothing here yet',

  // Shown while products load / if loading fails
  loadingMessage: 'loading...',
  errorMessage: "couldn't load the products",
  retryLabel: 'try again',

  // Shown instead of the price when a product's stock is 0
  soldOutLabel: 'sold out',

  categories: [
    { id: 'stickers', label: 'stickers', icon: categories.stickers, iconWidth: 65 },
    { id: 'keychains', label: 'keychains', icon: categories.keychains, iconWidth: 159 },
    { id: 'prints', label: 'prints', icon: categories.prints, iconWidth: 49 },
  ],
}
