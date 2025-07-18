import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Chunk separato per MUI material
          if (id.includes('@mui/material')) {
            return 'mui-material';
          }
          // Chunk separato per MUI icons
          if (id.includes('@mui/icons-material')) {
            return 'mui-icons';
          }
          // Chunk separato per Apollo Client
          if (id.includes('@apollo/client') || id.includes('graphql')) {
            return 'apollo';
          }
          // Chunk per node_modules in generale
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    },
    // Aumenta il limite di warning per chunk
    chunkSizeWarningLimit: 1000
  }
})
