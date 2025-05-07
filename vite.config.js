import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
<<<<<<< Updated upstream
  plugins: [react()],
  base: 'https://hammaddotio.github.io/silly-smile-wallpaper-images/'
=======
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/silly-smile-wallpaper-images/'
>>>>>>> Stashed changes
})
