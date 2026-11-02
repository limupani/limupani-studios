import styles from './QuantityStepper.module.css'

/**
 * − 1 + control. Stays between `min` and `max`.
 * Its size comes from CSS variables set by whoever uses it
 * (--stepper-width, --stepper-height, --stepper-button, --stepper-icon,
 * --stepper-font, --stepper-border, --stepper-pad).
 */
export default function QuantityStepper({ value, min = 1, max, onChange, disabled }) {
  const canDecrease = !disabled && value > min
  const canIncrease = !disabled && value < max

  return (
    <div className={`${styles.stepper} ${disabled ? styles.disabled : ''}`} role="group" aria-label="Quantity">
      <button
        type="button"
        className={styles.button}
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
        className={styles.button}
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