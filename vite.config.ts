import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      stylus: {
        imports: [path.resolve(__dirname, 'src/css/styles.css')],
      },
    },
  },
});
