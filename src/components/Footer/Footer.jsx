import { footer } from '../../config/footer'
import styles from './Footer.module.css'

/** Shown at the bottom of every page. Text and logo live in src/config/footer.js */
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <img src={footer.logo} alt={footer.logoAlt} className={styles.logo} />
        <p className={styles.description}>{footer.description}</p>
        <p className={styles.location}>{footer.location}</p>
      </div>
    </footer>
  )
}
