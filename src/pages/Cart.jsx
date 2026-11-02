import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { images } from '../assets/images'
import CartLine from '../components/CartLine/CartLine'
import DesignCanvas from '../components/DesignCanvas/DesignCanvas'
import TopBar from '../components/TopBar/TopBar'
import { cart } from '../config/cart'
import { cartPage, pages } from '../config/pages'
import { useCart } from '../context/CartContext'
import useDocumentTitle from '../hooks/useDocumentTitle'
import useProducts from '../hooks/useProducts'
import formatPrice from '../utils/formatPrice'
import { buildOrderMessage, whatsappLink } from '../utils/whatsappOrder'
import styles from './Cart.module.css'

export default function Cart() {
  useDocumentTitle(cartPage.title)

  const { items, setQuantity, removeItem, clearCart } = useCart()
  const { products, status, reload } = useProducts()
  const productsById = useMemo(() => new Map(products.map((p) => [p.id, p])), [products])

  // If a product was deleted or hidden since it was added, drop it from the cart
  useEffect(() => {
    if (status !== 'ready') return
    items.forEach((item) => {
      if (!productsById.has(item.id)) removeItem(item.id)
    })
  }, [status, items, productsById, removeItem])

  // Prices and stock always come from the database, never from the cart itself
  const lines = items
    .map((item) => {
      const product = productsById.get(item.id)
      if (!product) return null
      const available = product.stock > 0
      const qty = available ? Math.min(item.qty, product.stock) : item.qty
      return { product, qty, available, lineTotal: available ? product.price * qty : 0 }
    })
    .filter(Boolean)

  const orderLines = lines.filter((line) => line.available)
  const subtotal = orderLines.reduce((sum, line) => sum + line.lineTotal, 0)
  const delivery = orderLines.length > 0 ? cart.deliveryFee : 0
  const total = subtotal + delivery

  const handleClear = () => {
    if (window.confirm(cart.clearConfirm)) clearCart()
  }

  const clearButton = items.length > 0 && (
    <button type="button" className={styles.clear} onClick={handleClear}>
      <img src={images.ui.close} alt="" draggable={false} />
      <span className={styles.clearLabel}>
        {cart.clearLabel.split(' ').map((word) => (
          <span key={word}>{word}</span>
        ))}
      </span>
    </button>
  )

  let body
  if (items.length === 0) {
    body = (
      <div className={styles.message}>
        <p>{cart.emptyMessage}</p>
        <Link to={pages.shop.path} className={styles.messageLink}>
          {cart.emptyLink}
        </Link>
      </div>
    )
  } else if (status === 'loading') {
    body = <p className={styles.message}>{cart.loadingMessage}</p>
  } else if (status === 'error') {
    body = (
      <div className={styles.message}>
        <p>{cart.errorMessage}</p>
        <button type="button" className={styles.messageLink} onClick={reload}>
          {cart.retryLabel}
        </button>
      </div>
    )
  } else {
    body = (
      <>
        <ul className={styles.lines}>
          {lines.map((line) => (
            <CartLine
              key={line.product.id}
              {...line}
              onQuantityChange={(qty) => setQuantity(line.product.id, qty)}
              onRemove={() => removeItem(line.product.id)}
            />
          ))}
        </ul>

        <div className={styles.summary}>
          <div className={styles.summaryRow}>
            <span className={styles.label}>{cart.deliveryLabel}</span>
            <span className={styles.amount}>{formatPrice(delivery)}</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.totalRow}`}>
            <span className={styles.label}>{cart.totalLabel}</span>
            <span className={`${styles.amount} ${styles.totalAmount}`}>{formatPrice(total)}</span>
          </div>
        </div>

        {orderLines.length > 0 ? (
          <a
            className={styles.checkout}
            href={whatsappLink(buildOrderMessage({ lines: orderLines, delivery, total }))}
            target="_blank"
            rel="noopener noreferrer"
          >
            {cart.checkoutLabel}
          </a>
        ) : (
          <button type="button" className={styles.checkout} disabled>
            {cart.checkoutLabel}
          </button>
        )}
      </>
    )
  }

  return (
    <DesignCanvas>
      <div className={styles.page}>
        <TopBar right={clearButton || <span />} showCart={false} />

        <img src={images.ui.cart} alt="" className={styles.icon} draggable={false} />
        <h1 className={styles.heading}>{cart.heading}</h1>

        {body}
      </div>
    </DesignCanvas>
  )
}