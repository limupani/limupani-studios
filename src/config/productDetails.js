/* ==========================================================================
   PRODUCT DETAILS — the third slide in the product window (the text one).
   One block per product TYPE: every product whose "type" matches the name
   below shows this slide. A type with no block here simply has no text slide.

   - title:  heading of the slide
   - icons:  small drawings under the heading (see src/assets/images/index.js)
   - points: the numbered list
   - size:   lines shown at the bottom (each string is one line)
   ========================================================================== */
import { images } from '../assets/images'

const { details } = images

export const productDetails = {
  'Matte Sticker': {
    title: 'All-Weather Stickers',
    icons: [
      { image: details.uv, alt: 'UV proof' },
      { image: details.water, alt: 'Water-proof' },
      { image: details.reuse, alt: 'Reusable' },
    ],
    points: [
      'UV proof, will not fade under harsh sun.',
      'Water-proof, washable.',
      'Tear-proof, will not rip easily.',
      'Reusable, can be peeled and used again.',
    ],
    size: ['Size:  Medium', '3x3 inches'],
  },
}
