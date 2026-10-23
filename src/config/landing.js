/* ==========================================================================
   LANDING PAGE LAYOUT — where every drawing sits on the landing page.

   All numbers are in "design pixels": the size of the original design file,
   which is 737 pixels wide. The site scales everything to fit any screen,
   so you never need to think about phone vs. desktop.

   Each item:
     id      a name for yourself (must be unique)
     image   which drawing (see src/assets/images/index.js)
     x, y    distance from the left / top edge of the artwork
     width   how wide the drawing is (height follows automatically)
     rotate  (optional) tilt in degrees, positive = clockwise
     alt     text for screen readers (buttons and logo). Leave it out for
             pure decoration.
     link    (optional) where a click goes. Items WITHOUT a link are just
             background decoration and cannot be clicked.

   Items later in the list are drawn on top of earlier ones.
   ========================================================================== */
import { images } from '../assets/images'
import { pages } from './pages'

const { brand, buttons, doodles, handwriting } = images

export const landing = {
  designWidth: 737, // width of the original design
  sceneHeight: 1600, // height of the artwork area (the footer sits below it)

  items: [
    // Logo — scrolls away with the page
    { id: 'logo', image: brand.starLogo, x: 287, y: 113, width: 166, alt: 'Limupani Studios' },

    // Background doodles
    { id: 'apple', image: doodles.apple, x: 223, y: 401, width: 44 },
    { id: 'cloud', image: doodles.cloud, x: 76, y: 560, width: 90 },
    { id: 'worm', image: doodles.worm, x: 346, y: 475, width: 70 },
    //{ id: 'bring', image: handwriting.bring, x: 178, y: 555, width: 75 },
    { id: 'person', image: doodles.person, x: 111, y: 720, width: 57 },
    { id: 'hand', image: doodles.hand, x: 516, y: 638, width: 91, rotate: 18 },
    //{ id: 'back', image: handwriting.back, x: 471, y: 791, width: 66 },
    { id: 'house', image: doodles.house, x: 201, y: 970, width: 47 },
    { id: 'car', image: doodles.car, x: 476, y: 878, width: 126 },
    { id: 'bread', image: doodles.bread, x: 60, y: 933, width: 91 },
    //{ id: 'child-like', image: handwriting.childLike, x: 187, y: 980, width: 122 },
    { id: 'pencil', image: doodles.pencil, x: 350, y: 968, width: 91, rotate: 15 },
    { id: 'dino', image: doodles.dino, x: 283, y: 1149, width: 130 },
    { id: 'ant', image: doodles.ant, x: 542, y: 1208, width: 79 },
    //{ id: 'wonder', image: handwriting.wonder, x: 391, y: 1334, width: 94 },
    { id: 'star', image: doodles.star, x: 566, y: 1500, width: 55 },

    // Clickable buttons
    { id: 'shop', image: buttons.shop, x: 525, y: 439, width: 110, alt: 'Shop', link: pages.shop.path },
    { id: 'comics', image: buttons.comics, x: 288, y: 670, width: 116, alt: 'Comics', link: pages.comics.path },
    { id: 'lets-talk', image: buttons.letsTalk, x: 480, y: 994, width: 185, alt: "Let's talk", link: pages.letsTalk.path },
    { id: 'tabloids', image: buttons.tabloids, x: 86, y: 1085, width: 128, alt: 'Tabloids (coming soon)', link: pages.tabloids.path },
  ],
}
