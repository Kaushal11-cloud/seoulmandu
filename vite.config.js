import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  // Use relative base path so site works on both custom domains
  // and GitHub Pages repo subpaths (e.g. https://username.github.io/repo-name/)
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), 'index.html'),
        privacy: resolve(process.cwd(), 'privacy-policy.html'),
        privacypolicy: resolve(process.cwd(), 'privacypolicy.html'),
      },
    },
  },
  server: {
    host: true, // Expose server to local network for mobile device testing
    port: 5173,
  },
  preview: {
    host: true,
    port: 4173,
  },
});

