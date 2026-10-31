import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { images } from '../../assets/images'
import { productDetails } from '../../config/productDetails'
import { shop } from '../../config/shop'
import { useCart } from '../../context/CartContext'
import formatPrice from '../../utils/formatPrice'
import Carousel from './Carousel'
import DetailsSlide from './DetailsSlide'
import QuantityStepper from './QuantityStepper'
import styles from './ProductModal.module.css'

const FOCUSABLE = 'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'

/**
 * The window that opens when you click a product: swipeable pictures + a text
 * slide, name and price, quantity and "add to cart". Close with the X, the
 * Escape key, or by clicking outside it.
 */
export default function ProductModal({ product, onClose }) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const dialogRef = useRef(null)
  const closeRef = useRef(null)

  const soldOut = product.stock <= 0
  const details = productDetails[product.type]
  const pictures = product.gallery?.length ? product.gallery : [product.image]

  const slides = [
    ...pictures.map((src, i) => (
      <img
        key={src}
        className={styles.picture}
        src={src}
        alt={i === 0 ? product.name : `${product.name}, picture ${i + 1}`}
        draggable={false}
      />
    )),
    ...(details ? [<DetailsSlide key="details" details={details} />] : []),
  ]

  // Lock page scrolling, move focus into the window, and give it back on close
  useEffect(() => {
    const previouslyFocused = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus?.()
    }
  }, [])

  // The "added!" message goes away by itself
  useEffect(() => {
    if (!added) return undefined
    const timer = setTimeout(() => setAdded(false), 1600)
    return () => clearTimeout(timer)
  }, [added])

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.stopPropagation()
      onClose()
      return
    }
    if (event.key === 'Tab') {
      // keep Tab inside the window
      const items = dialogRef.current.querySelectorAll(FOCUSABLE)
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
  }

  const handleAdd = () => {
    addItem(product.id, quantity)
    setAdded(true)
  }

  return createPortal(
    <div
      className={styles.backdrop}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={dialogRef}
        className={styles.box}
        role="dialog"
        aria-modal="true"
        aria-label={`${product.type} — ${product.name}`}
      >
        <img className={styles.frame} src={images.ui.modalFrame} alt="" draggable={false} />

        <button ref={closeRef} type="button" className={styles.close} aria-label="Close" onClick={onClose}>
          <img src={images.ui.close} alt="" draggable={false} />
        </button>

        <div className={styles.viewport}>
          <Carousel slides={slides} label={`${product.name} pictures and details`} />
        </div>

        <div className={styles.info}>
          <p className={styles.titles}>
            <span>{product.type}</span>
            <span>{product.name}</span>
          </p>
          <p className={styles.price}>{soldOut ? '' : formatPrice(product.price)}</p>
        </div>

        <div className={styles.controls}>
          <QuantityStepper value={quantity} max={Math.max(product.stock, 1)} onChange={setQuantity} disabled={soldOut} />
          <button type="button" className={styles.addButton} disabled={soldOut} onClick={handleAdd}>
            {soldOut ? shop.soldOutLabel : added ? shop.addedLabel : shop.addToCartLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
