import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";
import path from "path";

export default defineConfig({
  base: "/",
  plugins: [
    vue(),
    // vuetify({
    //   autoImport: { labs: true },
    // }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
  },
  server: {
    port: 3000,
    open: true,
    hmr: false,
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
