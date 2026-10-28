import pg from 'pg'
import { config } from './config.js'

/**
 * Creates the connection pool to PostgreSQL.
 * Supabase (and most hosted databases) require an encrypted connection, so SSL is
 * on for everything except a database running on your own computer.
 */
export function createDb(databaseUrl = config.databaseUrl) {
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is missing. Copy .env.example to .env and fill it in.')
  }

  const isLocal = /@(localhost|127\.0\.0\.1)(:|\/)/.test(databaseUrl)
  const pool = new pg.Pool({
    connectionString: databaseUrl,
    ssl: isLocal ? false : { rejectUnauthorized: false },
    max: Number(process.env.DB_POOL_MAX) || 5,
  })

  return {
    query: (text, params) => pool.query(text, params),
    close: () => pool.end(),
  }
}
