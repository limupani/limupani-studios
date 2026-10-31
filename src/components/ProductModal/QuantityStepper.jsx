import styles from './ProductModal.module.css'

/** − 1 + control. Stays between `min` and `max`. */
export default function QuantityStepper({ value, min = 1, max, onChange, disabled }) {
  const canDecrease = !disabled && value > min
  const canIncrease = !disabled && value < max

  return (
    <div className={`${styles.stepper} ${disabled ? styles.stepperDisabled : ''}`} role="group" aria-label="Quantity">
      <button
        type="button"
        className={styles.stepButton}
        aria-label="Decrease quantity"
        disabled={!canDecrease}
        onClick={() => onChange(value - 1)}
      >
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="M3 10 H17" />
        </svg>
      </button>
      <span className={styles.quantity} aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className={styles.stepButton}
        aria-label="Increase quantity"
        disabled={!canIncrease}
        onClick={() => onChange(value + 1)}
      >
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="M3 10 H17 M10 3 V17" />
        </svg>
      </button>
    </div>
  )
}
