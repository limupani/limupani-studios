import { Link } from 'react-router-dom'
import { images } from '../../assets/images'
import { site } from '../../config/site'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import styles from './PageShell.module.css'

/**
 * Basic frame for the inner pages: logo (links home), heading, message.
 * Used as a placeholder until each page is built out in src/pages/.
 */
export default function PageShell({ page }) {
  useDocumentTitle(page.title)

  return (
    <section className={styles.shell}>
      {site.showLogoOnSubpages && (
        <Link to="/" className={styles.logoLink} aria-label={`${site.name} — home`}>
          <img src={images.brand.starLogo} alt="" className={styles.logo} />
        </Link>
      )}
      <h1 className={styles.heading}>{page.title}</h1>
      <p className={styles.message}>{page.message}</p>
      <Link to="/" className={styles.back}>
        ← Back home
      </Link>
    </section>
  )
}
