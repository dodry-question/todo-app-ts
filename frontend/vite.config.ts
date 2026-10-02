import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// frontend/vite.config.ts — настройки сборщика и dev-сервера фронтенда.
// react() учит Vite понимать JSX/TSX и включает быструю перезагрузку при разработке.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Во время локальной разработки запросы к /api уходят на бэкенд (Ktor, порт 8080),
    // поэтому в браузере не возникает ошибок CORS.
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
})
