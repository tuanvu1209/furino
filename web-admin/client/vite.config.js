import { defineConfig } from 'vite';
// @ts-ignore
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
  },
  optimizeDeps: {
    exclude: ['js-big-decimal'],
  },
  resolve: {
    alias: {
      path: 'path-browserify',
    },
  },
});
