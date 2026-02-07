import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // This bridges the Vercel build-time environment variable to the client-side code
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || ''),
  },
  build: {
    outDir: 'dist',
    target: 'esnext',
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  },
  server: {
    port: 3000,
  }
});