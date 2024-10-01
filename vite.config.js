// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/chat': {
//         target: 'http://localhost:3000',
//         changeOrigin: true,  // Optional: depending on CORS issues
//         rewrite: (path) => path.replace(/^\/chat/, ''),  // Optional: to rewrite URL path
//       }
//     }
//   }
// })
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
