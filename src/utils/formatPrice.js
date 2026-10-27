import { site } from '../config/site'

/** 300 -> "300 PKR" (currency comes from src/config/site.js) */
export default function formatPrice(price) {
  return `${price} ${site.currency}`
}
