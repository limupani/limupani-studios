import { useCallback, useEffect, useState } from 'react'
import { fetchProducts } from '../api/products'

/**
 * Loads the products from the API.
 * status is 'loading' | 'ready' | 'error'. Call reload() to try again.
 */
export default function useProducts() {
  const [state, setState] = useState({ status: 'loading', products: [] })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setState((current) => ({ ...current, status: 'loading' }))

    fetchProducts({ signal: controller.signal })
      .then((products) => setState({ status: 'ready', products }))
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ status: 'error', products: [] })
      })

    return () => controller.abort() // ignore the answer if the page is left
  }, [attempt])

  const reload = useCallback(() => setAttempt((n) => n + 1), [])
  return { ...state, reload }
}
