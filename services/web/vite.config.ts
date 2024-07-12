import * as path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    }
  },
  resolve: {
    alias: {
      "@/components": path.resolve(__dirname, "./src/views/components"),
      "@/containers": path.resolve(__dirname, "./src/views/containers"),
      "@/layouts": path.resolve(__dirname, "./src/views/layouts"),
      "@/screens": path.resolve(__dirname, "./src/views/screens"),
      "@": path.resolve(__dirname, "./src"),
    }
  },
})
