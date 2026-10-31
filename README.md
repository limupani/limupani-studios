# Limupani Studios — website

React + Vite. Everything you are likely to change lives in plain files, so you
can edit text, positions and colours without touching component code.

## Run it

```bash
npm install        # once
npm run dev        # opens a live preview (usually http://localhost:5173)
npm run build      # makes the production version in /dist
```

## Run it with the backend (products come from the database)

```bash
# terminal 1 — the API
npm run setup:server        # once: installs the server's packages
npm run dev:server

# terminal 2 — the website
npm run dev
```

First do the one-time database setup below, or the shop will say
"couldn't load the products".

## Backend: one-time database setup (Supabase)

1. Make a free account at supabase.com and create a **New project**
   (name it e.g. `limupani`, choose the region nearest to you, and save the
   database password somewhere safe).
2. In the project, click **Connect** and choose **Session pooler**. Copy the
   connection string and replace `[YOUR-PASSWORD]` with your password.
   Use letters and numbers only in the password, or special characters
   will break the string.
3. In the `server` folder, copy `.env.example` to `.env` and paste the string
   after `DATABASE_URL=`. Never share or upload `.env`.
4. Create the table and add the four starter products:
   ```bash
   cd server
   npm run db:setup      # should end with "Done. 4 products in the database."
   ```
   You can see the rows in Supabase under **Table Editor → products**.
5. Start the API and the website (see above) and open `/shop`.

### Managing products for now
Until the admin page exists, use Supabase's **Table Editor → products**:
add a row to add a product, change `stock` to update inventory, untick
`active` to hide a product. For the picture, put the image file in
`public/products/` and set `image_url` to `/products/your-file.jpg`.

### The product window (opens when you click a product)
- **Pictures:** the first slide is the product's `image_url`. To add more
  pictures (e.g. a photo of the sticker in a hand), put the files in
  `public/products/` and list them in the product's `gallery` column. When
  `gallery` has pictures, they replace the first slide and are shown in that order.
- **Text slide:** written once per product *type* in `src/config/productDetails.js`
  (title, little drawings, numbered points, size). Every "Matte Sticker" shares it.
  A type with no block there simply has no text slide.
- **Existing database?** Run this once in Supabase's SQL Editor (it adds the column):
  ```sql
  alter table products add column if not exists gallery text[] not null default '{}';
  update products set gallery = array['/products/browns-blanket-art.jpg', '/products/browns-blanket-photo.jpg']
    where name = 'Brown''s Blanket';
  ```
  Do this **before** deploying the new API code, or the shop will show an error.
- **Add to cart** keeps `{ id, qty }` in the browser (`src/context/CartContext.jsx`).
  It does not store prices: the server must re-check price and stock on every order.
- The open product is in the address (`/shop?product=1`), so the back button
  closes the window and the link can be shared.

### API
| Request                            | What it does                      |
| ---------------------------------- | --------------------------------- |
| `GET /api/health`                  | `{ "ok": true }`                  |
| `GET /api/products`                | all active products               |
| `GET /api/products?category=prints`| only that category                |

Run the API's tests with `cd server && npm test`.

## Where to change what

| I want to change…                                   | Open this file                  |
| --------------------------------------------------- | ------------------------------- |
| Footer description, location text, footer logo      | `src/config/footer.js`          |
| Where each drawing sits / its size / tilt           | `src/config/landing.js`         |
| Which drawings are clickable and where they go      | `src/config/landing.js` (`link`) |
| Names, addresses and placeholder text of the 4 pages| `src/config/pages.js`           |
| Site name (browser tab), logo on inner pages        | `src/config/site.js`            |
| Products (name, price, stock, category, picture)    | the database (see "Backend" below) |
| Shop categories (stickers / keychains / prints)     | `src/config/shop.js`            |
| Currency shown after prices                         | `src/config/site.js`            |
| Colours, fonts, button shadow, max page width       | `src/styles/theme.css`          |
| The site font                                       | replace `src/assets/fonts/limu-regular.ttf` |
| Swap a drawing                                      | replace the file in `src/assets/images/…` (same name) |
| Add a new drawing                                   | add the file, list it in `src/assets/images/index.js`, then add a line in `landing.js` |

Landing-page numbers are in the original design's pixels (737 px wide); the
site scales them to every screen automatically.

## Building out a page

`Comics.jsx`, `LetsTalk.jsx`, `Tabloids.jsx` and `Cart.jsx` in `src/pages/` are
placeholders (the Shop page is built). Replace the `<PageShell />` inside one of them with the real page
when you are ready. The footer is added automatically to every page by
`src/components/Layout`.

## Project layout

```
src/
  assets/images/   all drawings + index.js (the image registry)
  components/      Layout, Footer, Scene (landing artwork), PageShell,
                   TopBar, CategoryTabs, ProductGrid, ProductModal, DesignCanvas
  config/          the editable content files listed above
  api/, hooks/     loading products from the API (useProducts)
  context/         the cart (CartContext)
  pages/           one file per page
  styles/          theme.css (variables) + global.css (resets)
  routes.jsx       which page lives at which address

server/            the Express API (see "Backend" above)
  sql/             schema.sql (the table) and seed.sql (starter products)
  src/             app.js, routes/products.js, db.js, config.js
  scripts/         setup-db.js
  test/            API tests
public/products/   product pictures (the database stores their links)
```

## Deploying for free (Vercel + Supabase, no card)

Two Vercel projects from the same GitHub repo:

1. **API** — Root Directory `server`. Environment variables:
   `DATABASE_URL` (Supabase **Transaction pooler** string, port 6543),
   `DB_POOL_MAX=1`, `CORS_ORIGINS` (the website's address, added after step 2).
   Check `https://YOUR-API.vercel.app/api/products` shows your products.
2. **Website** — Root Directory is the main folder (Vite). Environment variable:
   `VITE_API_URL=https://YOUR-API.vercel.app` (no slash at the end).
3. Put the website's address into the API project's `CORS_ORIGINS`.

Changing an environment variable on Vercel only affects the *next* deployment:
use Deployments → ⋯ → Redeploy afterwards.

`vercel.json` in the main folder (website) and in `server/` (API) are already set up.
