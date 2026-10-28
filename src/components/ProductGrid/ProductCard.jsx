import { shop } from '../../config/shop'
import formatPrice from '../../utils/formatPrice'
import styles from './ProductGrid.module.css'

// A slightly wobbly rectangle so the frame looks pencil-drawn (the shape is
// stretched to fit the card; the line thickness is set in ProductGrid.module.css).
const FRAME_PATH =
  'M3,3 L82,2.2 L165,3.4 L244,2.6 L243.6,90 L244.4,170 L243.4,255 L244,340.4 L160,341.2 L80,340 L3.2,340.8 L2.4,260 L3.4,170 L2.2,85 Z'

/** One product: framed picture with type + price inside, name underneath. */
export default function ProductCard({ product }) {
  const soldOut = product.stock <= 0

  return (
    <li className={styles.item}>
      <article className={styles.card}>
        <svg className={styles.frame} viewBox="0 0 247 343" preserveAspectRatio="none" aria-hidden="true">
          <path d={FRAME_PATH} />
        </svg>
        <img
          className={`${styles.image} ${soldOut ? styles.soldOutImage : ''}`}
          src={product.image}
          alt={`${product.name} — ${product.type}`}
          draggable={false}
        />
        <p className={styles.details}>
          <span>{product.type}</span>
          <span>{soldOut ? shop.soldOutLabel : formatPrice(product.price)}</span>
        </p>
      </article>
      <h3 className={styles.name}>{product.name}</h3>
    </li>
  )
}
