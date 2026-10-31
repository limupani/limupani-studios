import ProductCard from './ProductCard'
import styles from './ProductGrid.module.css'

/** The grid of product cards. Pass in the products to show. */
export default function ProductGrid({ products, onSelect }) {
  return (
    <ul className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onSelect={onSelect} />
      ))}
    </ul>
  )
}
