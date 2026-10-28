/* Where the website finds the API.
   Local development: empty (same address, forwarded by the dev server).
   Deployed: set VITE_API_URL to the API's address (see .env.example). */
export const API_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')
