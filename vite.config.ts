import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      // Readable class names in dev, short hashes in prod.
      generateScopedName:
        process.env.NODE_ENV === 'production'
          ? '[hash:base64:6]'
          : '[name]__[local]__[hash:base64:4]',
    },
  },
  build: {
    target: 'es2022',
    cssTarget: 'chrome111',
    assetsInlineLimit: 2048,
    /* Not the default 'assets'. This site is deployed into a repository that publishes its
       whole root and already has an assets/ directory holding internal material, so sharing
       the folder would mean the access rules could not tell the two apart: anything that
       exposes this site's CSS would expose that too. A separate namespace keeps the public
       allowlist a single clean entry. */
    assetsDir: 'site-assets',
  },
})
