import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createApp } from '../src/app.js'

// A fake database: records what was asked and returns canned rows.
function fakeDb(rows = [], { fail = false } = {}) {
  const calls = []
  return {
    calls,
    query: async (sql, params) => {
      calls.push({ sql, params })
      if (fail) throw new Error('db down')
      return { rows }
    },
  }
}

async function withServer(db, fn) {
  const app = createApp({ db, corsOrigins: ['http://localhost:5173'] })
  const server = app.listen(0)
  try {
    await fn(`http://localhost:${server.address().port}`)
  } finally {
    server.close()
  }
}

const row = { id: 1, name: 'Pet Goat', type: 'Matte Sticker', category: 'stickers', price: 300, image_url: '/products/pet-goat.png', stock: 5 }

test('GET /api/products returns products in the shape the website expects', async () => {
  const db = fakeDb([row])
  await withServer(db, async (base) => {
    const res = await fetch(`${base}/api/products`)
    assert.equal(res.status, 200)
    assert.deepEqual(await res.json(), {
      products: [{ id: 1, name: 'Pet Goat', type: 'Matte Sticker', category: 'stickers', price: 300, image: '/products/pet-goat.png', stock: 5 }],
    })
    assert.deepEqual(db.calls[0].params, [])
  })
})

test('?category= filters using a safe query parameter', async () => {
  const db = fakeDb([row])
  await withServer(db, async (base) => {
    await fetch(`${base}/api/products?category=stickers`)
    assert.deepEqual(db.calls[0].params, ['stickers'])
    assert.match(db.calls[0].sql, /category = \$1/)
  })
})

test('a database failure returns a vague 500 (no details leaked)', async () => {
  const log = console.error
  console.error = () => {}
  try {
    await withServer(fakeDb([], { fail: true }), async (base) => {
      const res = await fetch(`${base}/api/products`)
      assert.equal(res.status, 500)
      assert.deepEqual(await res.json(), { error: 'Something went wrong' })
    })
  } finally {
    console.error = log
  }
})

test('unknown API paths return 404 JSON', async () => {
  await withServer(fakeDb(), async (base) => {
    const res = await fetch(`${base}/api/nope`)
    assert.equal(res.status, 404)
  })
})
