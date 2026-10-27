/* ==========================================================================
   ROUTES — which page opens at which address.
   Paths come from src/config/pages.js, so there is one place to change them.
   ========================================================================== */
import { pages, cartPage } from './config/pages'
import Shop from './pages/Shop'
import Comics from './pages/Comics'
import LetsTalk from './pages/LetsTalk'
import Tabloids from './pages/Tabloids'
import Cart from './pages/Cart'

export const routes = [
  { path: pages.shop.path, element: <Shop /> },
  { path: pages.comics.path, element: <Comics /> },
  { path: pages.letsTalk.path, element: <LetsTalk /> },
  { path: pages.tabloids.path, element: <Tabloids /> },
  { path: cartPage.path, element: <Cart /> },
]
