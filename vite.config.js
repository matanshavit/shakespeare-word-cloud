import { defineConfig } from 'vite';

export default defineConfig({
  base: '/shakespeare-word-cloud/',
  server: {
    port: 3000,
    open: true
  }
});
