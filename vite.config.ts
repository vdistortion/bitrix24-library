import { defineConfig } from 'vite';

export default defineConfig({
  publicDir: false,
  build: {
    lib: {
      entry: './lib/index.ts',
      name: 'bitrix24-library',
      fileName: 'index',
    },
  },
});
