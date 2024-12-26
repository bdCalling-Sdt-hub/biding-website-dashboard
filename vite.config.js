import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "167.71.20.155",
    // host: "192.168.10.26",
    // host: "167.71.20.155",
    port: "3001",
  },
})
