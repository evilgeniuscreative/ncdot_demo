const path = require('path')

import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/demo_ncdot/',
  optimizeDeps: {},
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
              @import "./src/scss/variables.scss";
              @import "./src/scss/colors.scss";
            `
      }
    }
  }
})
