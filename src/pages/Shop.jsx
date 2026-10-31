import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { images } from '../assets/images'
import DesignCanvas from '../components/DesignCanvas/DesignCanvas'
import TopBar from '../components/TopBar/TopBar'
import CategoryTabs from '../components/CategoryTabs/CategoryTabs'
import ProductGrid from '../components/ProductGrid/ProductGrid'
import ProductModal from '../components/ProductModal/ProductModal'
import { pages } from '../config/pages'
import { shop } from '../config/shop'
import useDocumentTitle from '../hooks/useDocumentTitle'
import useProducts from '../hooks/useProducts'
import styles from './Shop.module.css'

export default function Shop() {
  useDocumentTitle(pages.shop.title)

  // The selected category lives in the address (/shop?category=stickers) so
  // the back button and shared links work. No category = show everything.
  const [searchParams, setSearchParams] = useSearchParams()
  const requested = searchParams.get('category')
  const selected = shop.categories.some((c) => c.id === requested) ? requested : null

  const selectCategory = (id) => {
    setSearchParams(id ? { category: id } : {})
  }

  // The open product is in the address too (/shop?product=1), so the back button
  // closes the window and the link can be shared.
  const navigate = useNavigate()
  const location = useLocation()
  const openProductId = searchParams.get('product')

  const openProduct = (product) => {
    const next = new URLSearchParams(searchParams)
    next.set('product', String(product.id))
    setSearchParams(next, { state: { modal: true } })
  }

  const closeProduct = () => {
    if (location.state?.modal) {
      navigate(-1) // we opened it ourselves, so just go back
    } else {
      const next = new URLSearchParams(searchParams)
      next.delete('product')
      setSearchParams(next, { replace: true })
    }
  }

  const { products, status, reload } = useProducts()

  const activeProduct = products.find((p) => String(p.id) === openProductId) ?? null

  const visibleProducts = selected ? products.filter((p) => p.category === selected) : products
  const heading = selected
    ? shop.categories.find((c) => c.id === selected).label
    : shop.allProductsHeading

  return (
    <DesignCanvas>
      <div className={styles.shop}>
        <TopBar />
        <img src={images.buttons.shop} alt="Shop" className={styles.shopIcon} draggable={false} />

        <CategoryTabs
          categories={shop.categories}
          designWidth={shop.designWidth}
          selected={selected}
          onSelect={selectCategory}
        />

        <h2 className={styles.heading}>{heading}</h2>

        {status === 'loading' && <p className={styles.message}>{shop.loadingMessage}</p>}

        {status === 'error' && (
          <div className={styles.message}>
            <p>{shop.errorMessage}</p>
            <button type="button" className={styles.retry} onClick={reload}>
              {shop.retryLabel}
            </button>
          </div>
        )}

        {status === 'ready' &&
          (visibleProducts.length > 0 ? (
            <ProductGrid products={visibleProducts} onSelect={openProduct} />
          ) : (
            <p className={styles.message}>{shop.emptyMessage}</p>
          ))}
      </div>

      {activeProduct && (
        <ProductModal key={activeProduct.id} product={activeProduct} onClose={closeProduct} />
      )}
    </DesignCanvas>
  )
}
