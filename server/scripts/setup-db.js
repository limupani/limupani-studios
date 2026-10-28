// Creates the tables and adds the starter products. Safe to run again.
import { readFile } from 'node:fs/promises'
import { createDb } from '../src/db.js'

const db = createDb()
try {
  for (const file of ['schema.sql', 'seed.sql']) {
    const sql = await readFile(new URL(`../sql/${file}`, import.meta.url), 'utf8')
    await db.query(sql)
    console.log(`Ran sql/${file}`)
  }
  const { rows } = await db.query('select count(*)::int as count from products')
  console.log(`Done. ${rows[0].count} products in the database.`)
} catch (err) {
  console.error('Setup failed:', err.message)
  process.exitCode = 1
} finally {
  await db.close()
}
