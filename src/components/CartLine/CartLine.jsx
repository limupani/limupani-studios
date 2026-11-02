import { images } from '../../assets/images'
import { cart } from '../../config/cart'
import formatPrice from '../../utils/formatPrice'
import QuantityStepper from '../QuantityStepper/QuantityStepper'
import styles from './CartLine.module.css'

/** One product in the cart: picture, name, quantity, remove, and its price. */
export default function CartLine({ product, qty, available, lineTotal, onQuantityChange, onRemove }) {
  return (
    <li className={styles.line}>
      <div className={styles.thumb}>
        <img
          src={product.image}
          alt=""
          draggable={false}
          className={available ? '' : styles.faded}
        />
      </div>

      <div className={styles.details}>
        <p className={styles.titles}>
          <span>{product.type}</span>
          <span className={styles.name}>{product.name}</span>
        </p>
        <div className={styles.stepper}>
          <QuantityStepper
            value={qty}
            max={Math.max(product.stock, 1)}
            onChange={onQuantityChange}
            disabled={!available}
          />
        </div>
      </div>

      <div className={styles.side}>
        <button type="button" className={styles.remove} aria-label={`${cart.removeLabel}: ${product.name}`} onClick={onRemove}>
          <img src={images.ui.bin} alt="" draggable={false} />
        </button>
        <p className={styles.price}>{available ? formatPrice(lineTotal) : cart.soldOutLabel}</p>
      </div>
    </li>
  )
}