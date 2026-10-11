import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  // Use relative base path so site works on both custom domains
  // and GitHub Pages repo subpaths (e.g. https://username.github.io/repo-name/)
  base: './',
});
