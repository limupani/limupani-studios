import { site } from '../config/site'

/** 300 -> "300 PKR", 1400 -> "1,400 PKR" (currency comes from src/config/site.js) */
export default function formatPrice(price) {
  return `${Number(price).toLocaleString('en-US')} ${site.currency}`
}


/** 300 -> "300 PKR" (currency comes from src/config/site.js) */
/*export default function formatPrice(price) {
  return `${price} ${site.currency}`
}*/
