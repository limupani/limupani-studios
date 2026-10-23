/* ==========================================================================
   IMAGE REGISTRY — every image the site uses, with a short name.
   To swap a drawing: replace the file in its folder (keep the same name).
   To add a new one: drop the file in a folder, then add a line here.
   ========================================================================== */
import starLogo from './brand/star-logo.png'
import logoBnw from './brand/logo-bnw.png'

import shop from './buttons/shop.png'
import comics from './buttons/comics.png'
import letsTalk from './buttons/lets-talk.png'
import tabloids from './buttons/tabloids.png'

import ant from './doodles/ant.png'
import apple from './doodles/apple.png'
import bread from './doodles/bread.png'
import car from './doodles/car.png'
import cloud from './doodles/cloud.png'
import dino from './doodles/dino.png'
import hand from './doodles/hand.png'
import house from './doodles/house.png'
import pencil from './doodles/pencil.png'
import person from './doodles/person.png'
import star from './doodles/star.png'
import worm from './doodles/worm.png'

import back from './handwriting/back.png'
import bring from './handwriting/bring.png'
import childLike from './handwriting/child-like.png'
import wonder from './handwriting/wonder.png'

export const images = {
  brand: { starLogo, logoBnw },
  buttons: { shop, comics, letsTalk, tabloids },
  doodles: { ant, apple, bread, car, cloud, dino, hand, house, pencil, person, star, worm },
  handwriting: { bring, back, childLike, wonder },
}
