// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://miguel-Fran.com',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});
