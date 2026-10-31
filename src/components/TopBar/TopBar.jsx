import { Link } from 'react-router-dom'
import { images } from '../../assets/images'
import { pages, cartPage } from '../../config/pages'
import styles from './TopBar.module.css'

/**
 * Home icon (top left) and cart icon (top right). Place inside <DesignCanvas>.
 * Pass showCart={false} on pages that only have the home icon.
 */
export default function TopBar({ showCart = true }) {
  return (
    <nav className={styles.bar} aria-label="Shop navigation">
      <Link to="/" className={`${styles.link} ${styles.home}`}>
        <img src={images.ui.home} alt="Home" draggable={false} />
      </Link>
      {showCart && (
        <Link to={cartPage.path} className={`${styles.link} ${styles.cart}`}>
          <img src={images.ui.cart} alt="Cart" draggable={false} />
        </Link>
      )}
    </nav>
  )
}