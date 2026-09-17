import {defineConfig} from 'vite';
// Inspect the same prerendered Angular output used for publication.
export default defineConfig({
  root: new URL('../build/', import.meta.url).pathname,
  server: {host:'0.0.0.0',allowedHosts:['terminal.local']},
});
