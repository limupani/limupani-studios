import SceneItem from './SceneItem'
import styles from './Scene.module.css'

/**
 * The landing-page artwork: a fixed-proportion canvas that scales to the
 * screen width, with every drawing placed on it. Edit src/config/landing.js
 * to change what is on it.
 */
export default function Scene({ designWidth, sceneHeight, items }) {
  return (
    <div className={styles.scene} style={{ aspectRatio: `${designWidth} / ${sceneHeight}` }}>
      {items.map((item) => (
        <SceneItem key={item.id} item={item} designWidth={designWidth} sceneHeight={sceneHeight} />
      ))}
    </div>
  )
}
