import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Jumps back to the top whenever you open a new page. */
export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}
