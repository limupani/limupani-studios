import { images } from '../../assets/images'
import { shop } from '../../config/shop'
import formatPrice from '../../utils/formatPrice'
import styles from './ProductGrid.module.css'

/** One product: framed picture with type + price inside, name underneath. */
export default function ProductCard({ product, onSelect }) {
  const soldOut = product.stock <= 0

  return (
    <li className={styles.item}>
      {/* invisible button covering the whole card + name */}
      <button
        type="button"
        className={styles.hit}
        aria-label={`${product.name} — view details`}
        onClick={() => onSelect(product)}
      />
      <article className={styles.card}>
        <img className={styles.frame} src={images.ui.productFrame} alt="" draggable={false} />
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
