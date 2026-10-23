# Limupani Studios — website

React + Vite. Everything you are likely to change lives in plain files, so you
can edit text, positions and colours without touching component code.

## Run it

```bash
npm install        # once
npm run dev        # opens a live preview (usually http://localhost:5173)
npm run build      # makes the production version in /dist
```

## Where to change what

| I want to change…                                   | Open this file                  |
| --------------------------------------------------- | ------------------------------- |
| Footer description, location text, footer logo      | `src/config/footer.js`          |
| Where each drawing sits / its size / tilt           | `src/config/landing.js`         |
| Which drawings are clickable and where they go      | `src/config/landing.js` (`link`) |
| Names, addresses and placeholder text of the 4 pages| `src/config/pages.js`           |
| Site name (browser tab), logo on inner pages        | `src/config/site.js`            |
| Colours, font, button shadow, max page width        | `src/styles/theme.css`          |
| Swap a drawing                                      | replace the file in `src/assets/images/…` (same name) |
| Add a new drawing                                   | add the file, list it in `src/assets/images/index.js`, then add a line in `landing.js` |

Landing-page numbers are in the original design's pixels (737 px wide); the
site scales them to every screen automatically.

## Building out a page

`src/pages/Shop.jsx`, `Comics.jsx`, `LetsTalk.jsx` and `Tabloids.jsx` are
placeholders. Replace the `<PageShell />` inside one of them with the real page
when you are ready. The footer is added automatically to every page by
`src/components/Layout`.

## Project layout

```
src/
  assets/images/   all drawings + index.js (the image registry)
  components/      Layout, Footer, Scene (landing artwork), PageShell
  config/          the editable content files listed above
  pages/           one file per page
  styles/          theme.css (variables) + global.css (resets)
  routes.jsx       which page lives at which address
```

## Deploying later

`vercel.json` is already included so page addresses like `/shop` keep working
when you refresh on Vercel.
