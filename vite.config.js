import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: './', // Required for Electron to load assets correctly
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Ensure static assets are copied to the output directory
    assetsDir: 'assets',
    // Enable source maps in development
    sourcemap: process.env.NODE_ENV !== 'production',
    // This is important for Electron
    rollupOptions: {
      output: {
        format: 'es',
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  },
  server: {
    port: 5173,
    strictPort: true
  }
})
