/* ==========================================================================
   PRODUCTS — everything that appears in the shop. One block per product.
   - id:       unique, lowercase, no spaces (used internally)
   - name:     the orange title under the card
   - type:     the first line inside the card (e.g. "Matte Sticker")
   - category: stickers | keychains | prints  (see src/config/shop.js)
   - price:    a number, in the currency set in src/config/site.js
   - image:    the picture (see src/assets/images/index.js)
   Products appear on the page in this order.

   NOTE: these four images are small placeholders cut from the design file.
   Replace them with the real artwork when you have it.
   ========================================================================== */
import { images } from '../assets/images'

const { products: art } = images

export const products = [
  { id: 'browns-blanket', name: "Brown's Blanket", type: 'Matte Sticker', category: 'stickers', price: 300, image: art.brownsBlanket },
  { id: 'lemon-plushie', name: 'Lemon Plushie', type: 'Matte Sticker', category: 'stickers', price: 300, image: art.lemonPlushie },
  { id: 'pet-goat', name: 'Pet Goat', type: 'Matte Sticker', category: 'stickers', price: 300, image: art.petGoat },
  { id: 'lemon-juice', name: 'Lemon Juice', type: 'Matte Sticker', category: 'stickers', price: 300, image: art.lemonJuice },
]
