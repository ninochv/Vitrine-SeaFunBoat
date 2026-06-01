import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiBase = env.VITE_JETBOOK_BASE_URL || 'https://trial2.seabook.pro'

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      proxy: {
        '/data': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        },
        '/api': {
          target: apiBase,
          changeOrigin: true,
          headers: {
            'X-Vitrine-API-Key': env.VITE_JETBOOK_API_KEY || '',
          },
        },
      },
    },
    preview: {
      allowedHosts: true,
      port: 4173,
      host: '0.0.0.0',
    },
  }
})
