import { API_URL } from '../config/api'

/** Loads every active product from the API. */
export async function fetchProducts({ signal } = {}) {
  const response = await fetch(`${API_URL}/api/products`, { signal })
  if (!response.ok) throw new Error(`Request failed (${response.status})`)
  const data = await response.json()
  return data.products
}
