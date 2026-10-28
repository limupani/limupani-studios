import express from 'express'
import cors from 'cors'
import productsRouter from './routes/products.js'

/** Builds the Express app. `db` is passed in so tests can use a fake one. */
export function createApp({ db, corsOrigins }) {
  const app = express()
  app.disable('x-powered-by')
  app.use(cors({ origin: corsOrigins }))
  app.use(express.json())

  app.get('/api/health', (req, res) => res.json({ ok: true }))
  app.use('/api/products', productsRouter(db))

  app.use('/api', (req, res) => res.status(404).json({ error: 'Not found' }))

  // Any error thrown above ends up here: log the details, send a vague message.
  app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({ error: 'Something went wrong' })
  })

  return app
}
