import { config } from './config.js'
import { createDb } from './db.js'
import { createApp } from './app.js'

const db = createDb()

try {
  await db.query('select 1')
  console.log('Database connected')
} catch (err) {
  console.error('Could not connect to the database:', err.message)
  process.exit(1)
}

const app = createApp({ db, corsOrigins: config.corsOrigins })
const server = app.listen(config.port, () => {
  console.log(`API running at http://localhost:${config.port}`)
})

// Close cleanly when the process is told to stop (Ctrl+C, redeploys)
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.close(() => db.close().then(() => process.exit(0))))
}
