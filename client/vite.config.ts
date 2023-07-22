/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  server: { https: true},
  plugins: [react(), mkcert()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/config/setup.ts',
    css: true
  }
})
