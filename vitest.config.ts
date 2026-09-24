import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

/**
 * Separate from vite.config.ts on purpose: the build config carries CSS-module naming and
 * bundle targets that have nothing to do with the tests, and the tests cover hooks rather
 * than rendered sections, so they need none of it.
 */
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: ['src/test/setup.ts'],
    restoreMocks: true,
  },
})
