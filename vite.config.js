import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // host: "192.168.10.26",
    host: "159.203.183.245",
    port: "3001",
  },
})
