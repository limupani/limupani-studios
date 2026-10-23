import { Link } from 'react-router-dom'
import styles from './Scene.module.css'

const toPercent = (value, total) => `${(value / total) * 100}%`

/**
 * One drawing on the landing page. Position and size come from
 * src/config/landing.js (in design pixels) and are converted to percentages
 * so everything scales with the screen.
 */
export default function SceneItem({ item, designWidth, sceneHeight }) {
  const { image, alt, x, y, width, rotate = 0, link } = item

  const style = {
    left: toPercent(x, designWidth),
    top: toPercent(y, sceneHeight),
    width: toPercent(width, designWidth),
    transform: rotate ? `rotate(${rotate}deg)` : undefined,
  }

  const img = <img src={image} alt={alt ?? ''} draggable={false} className={styles.image} />

  if (link) {
    return (
      <Link to={link} className={`${styles.item} ${styles.clickable}`} style={style}>
        {img}
      </Link>
    )
  }

  return (
    <div className={styles.item} style={style} aria-hidden={alt ? undefined : 'true'}>
      {img}
    </div>
  )
}
