import { Link } from 'react-router-dom'
import { images } from '../../assets/images'
import { cartPage } from '../../config/pages'
import { useCart } from '../../context/CartContext'
import styles from './TopBar.module.css'

const MAX_SHOWN = 99 // above this the badge says "99+"

/**
 * Home icon (top left) and, on the right, the cart icon with a yellow badge
 * showing how many items are in the cart. Place inside <DesignCanvas>.
 * - showCart={false}: no cart icon (pages that only have the home icon)
 * - right={...}: put your own content on the right instead of the cart icon
 */
export default function TopBar({ showCart = true, right = null }) {
  const { count } = useCart() // total number of items (e.g. 2 stickers + 1 keychain = 3)
  const badgeText = count > MAX_SHOWN ? `${MAX_SHOWN}+` : String(count)
  const badgeSize = badgeText.length > 2 ? styles.badgeLong : badgeText.length > 1 ? styles.badgeWide : ''

  return (
    <nav className={styles.bar} aria-label="Shop navigation">
      <Link to="/" className={`${styles.link} ${styles.home}`}>
        <img src={images.ui.home} alt="Home" draggable={false} />
      </Link>
      {right ??
        (showCart && (
          <Link
            to={cartPage.path}
            className={`${styles.link} ${styles.cart}`}
            aria-label={count > 0 ? `Cart, ${count} ${count === 1 ? 'item' : 'items'}` : 'Cart'}
          >
            <img src={images.ui.cart} alt="" draggable={false} />
            {count > 0 && (
              <span className={`${styles.badge} ${badgeSize}`} aria-hidden="true">
                {badgeText}
              </span>
            )}
          </Link>
        ))}
    </nav>
  )
}