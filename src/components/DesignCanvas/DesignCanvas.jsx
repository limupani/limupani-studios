import styles from './DesignCanvas.module.css'

/**
 * Wrap a page in this to make "cqw" sizes work. 1cqw = 1% of the page width,
 * so everything sized in cqw scales smoothly from phones to desktop, exactly
 * like the original designs.
 */
export default function DesignCanvas({ children }) {
  return <div className={styles.canvas}>{children}</div>
}
