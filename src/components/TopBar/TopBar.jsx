import { Link } from 'react-router-dom'
import { images } from '../../assets/images'
import { cartPage } from '../../config/pages'
import styles from './TopBar.module.css'

/**
 * Home icon (top left) and, on the right, the cart icon. Place inside <DesignCanvas>.
 * - showCart={false}: no cart icon (pages that only have the home icon)
 * - right={...}: put your own content on the right instead of the cart icon
 */
export default function TopBar({ showCart = true, right = null }) {
  return (
    <nav className={styles.bar} aria-label="Shop navigation">
      <Link to="/" className={`${styles.link} ${styles.home}`}>
        <img src={images.ui.home} alt="Home" draggable={false} />
      </Link>
      {right ??
        (showCart && (
          <Link to={cartPage.path} className={`${styles.link} ${styles.cart}`}>
            <img src={images.ui.cart} alt="Cart" draggable={false} />
          </Link>
        ))}
    </nav>
  )
}