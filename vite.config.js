import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// In development (and `npm run preview`) any request to /api is forwarded to the
// Express server in /server, so the site and API look like one origin.
const api = { '/api': 'http://localhost:4000' }

export default defineConfig({
  plugins: [react()],
  server: { proxy: api },
  preview: { proxy: api },
})
