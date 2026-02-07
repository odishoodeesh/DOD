import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // This allows the frontend to access process.env.API_KEY exactly as required 
    // by the Gemini SDK guidelines, mapping it from Vercel's build environment.
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
  },
  build: {
    outDir: 'dist',
    target: 'esnext'
  }
});