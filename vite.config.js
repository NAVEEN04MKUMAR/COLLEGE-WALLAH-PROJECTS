import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "tailwindcss";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
  react(),
  tailwindcss({jit:true}),
],

 server: {
        fs: {
            strict: false,
        },
    },

    build: {
    rollupOptions: {
      input: {
        main: './main.jsx', // Adjust the file path as needed
      },
    },
  },
});

