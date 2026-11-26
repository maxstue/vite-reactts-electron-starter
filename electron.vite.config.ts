import react from '@vitejs/plugin-react';
import { defineConfig } from 'electron-vite';

export default defineConfig({
  main: {
    build: { rolldownOptions: { output: { entryFileNames: 'index.js' } } },
  },
  preload: {
    // Sandboxed preload scripts run as CommonJS.
    build: { rolldownOptions: { output: { format: 'cjs', entryFileNames: 'index.cjs' } } },
  },
  renderer: {
    plugins: [react()],
    build: { minify: true },
    server: {
      host: '127.0.0.1',
      headers: {
        'Content-Security-Policy': [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline'",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data:",
          "connect-src 'self' ws://127.0.0.1:*",
          "object-src 'none'",
          "base-uri 'none'",
        ].join('; '),
      },
    },
  },
});
