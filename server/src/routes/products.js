import { Router } from 'express'

/** Turns a database row into the shape the website expects. */
function toProduct(row) {
  return {
    id: row.id,
    name: row.name,
    type: row.type,
    category: row.category,
    price: row.price,
    image: row.image_url,
    stock: row.stock,
    gallery: row.gallery ?? [],
  }
}

export default function productsRouter(db) {
  const router = Router()

  // GET /api/products            -> every active product
  // GET /api/products?category=stickers -> only that category
  router.get('/', async (req, res) => {
    const { category } = req.query

    const params = []
    let sql = 'select id, name, type, category, price, image_url, stock, gallery from products where active = true'
    if (typeof category === 'string' && category) {
      params.push(category)
      sql += ' and category = $1'
    }
    sql += ' order by sort_order, id'

    const { rows } = await db.query(sql, params)
    res.json({ products: rows.map(toProduct) })
  })

  return router
}
