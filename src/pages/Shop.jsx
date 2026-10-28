import { useSearchParams } from 'react-router-dom'
import { images } from '../assets/images'
import DesignCanvas from '../components/DesignCanvas/DesignCanvas'
import TopBar from '../components/TopBar/TopBar'
import CategoryTabs from '../components/CategoryTabs/CategoryTabs'
import ProductGrid from '../components/ProductGrid/ProductGrid'
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

  const { products, status, reload } = useProducts()

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
            <ProductGrid products={visibleProducts} />
          ) : (
            <p className={styles.message}>{shop.emptyMessage}</p>
          ))}
      </div>
    </DesignCanvas>
  )
}
