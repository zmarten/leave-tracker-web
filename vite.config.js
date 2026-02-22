import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // /leave-tracker-web/ on GitHub Pages, / for local dev
  base: process.env.NODE_ENV === 'production' ? '/leave-tracker-web/' : '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'Leave Tracker',
        short_name: 'Leave Tracker',
        description: '16-week paternity leave tracker',
        theme_color: '#C8956C',
        background_color: '#F5F0E8',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '.',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        runtimeCaching: [],
      },
    }),
  ],
})
