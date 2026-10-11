import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  // Use relative base path so site works on both custom domains
  // and GitHub Pages repo subpaths (e.g. https://username.github.io/repo-name/)
  base: './',
  server: {
    host: true, // Expose server to local network for mobile device testing
    port: 5173,
  },
  preview: {
    host: true,
    port: 4173,
  },
});
