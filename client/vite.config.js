// Imp defineConfig from vite
import { defineConfig } from 'vite'
// Imp react plugin
import react from '@vitejs/plugin-react'

// Exp default config
export default defineConfig({
  // Set react plugin
  plugins: [react()],
  // Cfg dev srvr
  server: {
    // Add proxy rules
    proxy: {
      // Catch api routes
      '/api': {
        // Tgt backend port
        target: 'http://localhost:3001',
        // Update origin header
        changeOrigin: true
      }
    }
  }
})