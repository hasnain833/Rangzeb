import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { glob } from "glob";
import { resolve } from "path";

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    host: true,
    port: 5173,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'src/pages/about.html'),
        contact: resolve(__dirname, 'src/pages/contact.html'),
        influencerpkgs: resolve(__dirname, 'src/pages/influencerpkgs.html'),
        productpkgs: resolve(__dirname, 'src/pages/productpkgs.html'),
        socialpkgs: resolve(__dirname, 'src/pages/socialpkgs.html'),
        weddingpkgs: resolve(__dirname, 'src/pages/weddingpkgs.html'),
      },
    },
  },
});
