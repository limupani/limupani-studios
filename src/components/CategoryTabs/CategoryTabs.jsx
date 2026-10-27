import styles from './CategoryTabs.module.css'

/**
 * The stickers / keychains / prints row. Click one to show only that
 * category; click it again to go back to all products.
 */
export default function CategoryTabs({ categories, designWidth, selected, onSelect }) {
  return (
    <div className={styles.tabs} role="group" aria-label="Product categories">
      {categories.map((category) => {
        const isSelected = selected === category.id
        const isDimmed = selected && !isSelected
        const className = [styles.tab, isSelected && styles.selected, isDimmed && styles.dimmed]
          .filter(Boolean)
          .join(' ')

        return (
          <button
            key={category.id}
            type="button"
            className={className}
            aria-pressed={isSelected}
            onClick={() => onSelect(isSelected ? null : category.id)}
          >
            <span className={styles.iconBox}>
              <img
                src={category.icon}
                alt=""
                draggable={false}
                className={styles.icon}
                style={{ width: `${(category.iconWidth / designWidth) * 100}cqw` }}
              />
            </span>
            <span className={styles.label}>{category.label}</span>
          </button>
        )
      })}
    </div>
  )
}
