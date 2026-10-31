import { useCallback, useRef, useState } from 'react'
import styles from './ProductModal.module.css'

/**
 * Swipeable slides with dots underneath. Each slide is a React node.
 * On touch screens you swipe; with a mouse or keyboard use the dots or the
 * left/right arrow keys (when the slides are focused).
 */
export default function Carousel({ slides, label }) {
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)

  const goTo = useCallback((i) => {
    const track = trackRef.current
    if (!track) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollTo({ left: i * track.clientWidth, behavior: reduce ? 'auto' : 'smooth' })
  }, [])

  const handleScroll = (event) => {
    const track = event.currentTarget
    setIndex(Math.round(track.scrollLeft / track.clientWidth))
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight' && index < slides.length - 1) {
      event.preventDefault()
      goTo(index + 1)
    } else if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault()
      goTo(index - 1)
    }
  }

  return (
    <>
      <div
        ref={trackRef}
        className={styles.track}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label={label}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={styles.slide}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
          >
            {slide}
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <div className={styles.dots}>
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
              aria-label={`Show slide ${i + 1} of ${slides.length}`}
              aria-current={i === index}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </>
  )
}
