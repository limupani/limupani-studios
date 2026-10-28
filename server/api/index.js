// Entry point for Vercel: it runs this file as a serverless function.
// (Locally you still use `npm run dev`, which starts src/index.js instead.)
import { config } from '../src/config.js'
import { createDb } from '../src/db.js'
import { createApp } from '../src/app.js'

const db = createDb()

export default createApp({ db, corsOrigins: config.corsOrigins })
