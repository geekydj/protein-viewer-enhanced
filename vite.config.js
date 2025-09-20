import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './landing.html',
        upload: './upload.html',
        viewer: './simple-viewer.html'
      }
    },
    assetsInclude: ['**/*.pdb']
  },
  publicDir: 'public',
  server: {
    port: 3000,
    host: true
  }
})