/* ==========================================================================
   CART PAGE — texts, delivery fee and the WhatsApp order message.
   ========================================================================== */
export const cart = {
  heading: 'your cart',

  // Flat delivery charge added to every order (in the currency from site.js)
  deliveryFee: 300,
  deliveryLabel: 'Delivery (nationwide):',
  totalLabel: 'Grand Total:',

  clearLabel: 'clear cart',
  clearConfirm: 'Remove everything from your cart?',
  removeLabel: 'Remove from cart',

  checkoutLabel: 'confirm order on whatsapp',
  soldOutLabel: 'sold out',

  emptyMessage: 'your cart is empty',
  emptyLink: 'back to the shop',
  loadingMessage: 'loading...',
  errorMessage: "couldn't load your cart",
  retryLabel: 'try again',

  /* The message that opens in WhatsApp when the customer presses the button.
     The customer still has to press "send" themselves. */
  whatsapp: {
    // YOUR WhatsApp number: country code + number, digits only (no + and no spaces).
    // 92 = Pakistan, so 0312 3213551 becomes 923123213551.
    number: '923123213551',
    intro: "Hi Limupani Studios! I'd like to place this order:",
    deliveryLine: 'Delivery (nationwide)',
    totalLine: 'Total',
    closing: "I'll send my name and delivery address here. Please confirm my order.",
  },
}