import PageShell from '../components/PageShell/PageShell'
import { cartPage } from '../config/pages'
import { useCart } from '../context/CartContext'

// Placeholder — replace <PageShell /> with the real cart page when you build it.
export default function Cart() {
  const { count } = useCart()
  const page =
    count > 0 ? { ...cartPage, message: cartPage.filledMessage.replace('{count}', count) } : cartPage

  return <PageShell page={page} />
}
