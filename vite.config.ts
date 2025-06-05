import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  base: "/CineScope/", // Matches your repository name
  build: {
    outDir: "dist", // Ensure the output directory is correct
  },
})