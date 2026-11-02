import { cart } from '../config/cart'
import formatPrice from './formatPrice'

/**
 * Builds the order text, for example:
 *
 *   Hi Limupani Studios! I'd like to place this order:
 *
 *   2 x Matte Sticker - Brown's Blanket = 600 PKR
 *   1 x Acrylic Keychain - Home = 1,400 PKR
 *
 *   Delivery (nationwide): 300 PKR
 *   Total: 2,300 PKR
 *
 *   I'll send my name and delivery address here. Please confirm my order.
 *
 * `lines` is a list of { product, qty, lineTotal }.
 */
export function buildOrderMessage({ lines, delivery, total }) {
  const { intro, deliveryLine, totalLine, closing } = cart.whatsapp
  const items = lines.map(
    ({ product, qty, lineTotal }) => `${qty} x ${product.type} - ${product.name} = ${formatPrice(lineTotal)}`,
  )

  return [
    intro,
    '',
    ...items,
    '',
    `${deliveryLine}: ${formatPrice(delivery)}`,
    `${totalLine}: ${formatPrice(total)}`,
    '',
    closing,
  ].join('\n')
}

/** A link that opens WhatsApp with the message already typed in. */
export function whatsappLink(message) {
  return `https://wa.me/${cart.whatsapp.number}?text=${encodeURIComponent(message)}`
}