import { createRequire } from "node:module";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import ckeditor5 from "@ckeditor/vite-plugin-ckeditor5";
const require = createRequire(import.meta.url);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    ckeditor5({ theme: require.resolve("@ckeditor/ckeditor5-theme-lark") }),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
