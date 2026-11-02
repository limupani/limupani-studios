import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

/**
 * The shopping cart: a list of { id, qty } (product id + how many).
 * It is remembered in the browser, so a refresh doesn't empty it.
 * Prices are NOT stored here: the cart page looks them up from the products
 * list each time, so a price change in the database shows up straight away.
 */
const STORAGE_KEY = 'limupani-cart'
const CartContext = createContext(null)

function loadItems() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (!Array.isArray(saved)) return []
    return saved.filter((i) => i && i.id != null && Number.isInteger(i.qty) && i.qty > 0)
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadItems)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* storage unavailable (private mode): the cart just won't persist */
    }
  }, [items])

  const addItem = useCallback((id, qty = 1) => {
    setItems((current) => {
      const existing = current.find((i) => i.id === id)
      if (existing) return current.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i))
      return [...current, { id, qty }]
    })
  }, [])

  const setQuantity = useCallback((id, qty) => {
    setItems((current) => current.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)))
  }, [])

  const removeItem = useCallback((id) => {
    setItems((current) => current.filter((i) => i.id !== id))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const count = items.reduce((total, i) => total + i.qty, 0)
  const value = useMemo(
    () => ({ items, count, addItem, setQuantity, removeItem, clearCart }),
    [items, count, addItem, setQuantity, removeItem, clearCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside <CartProvider>')
  return context
}