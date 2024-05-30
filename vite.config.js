import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,  // Set the development server to listen on port 3000
    proxy: {
      '/example': 'http://localhost:5173',  // Proxy API requests to the back-end server
    },
  },
  build: {
    outDir: 'public',  // Ensure the build output directory matches what your server serves
  },
});