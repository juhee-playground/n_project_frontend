import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";

import path from "path";

export default defineConfig({
  base: "/",
  plugins: [
    vue(),
    vuetify({
      autoImport: { labs: true },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "roboto-fontface": "/node_modules/roboto-fontface",
    },
  },
  build: {
    outDir: "dist",
  },
  server: {
    port: 3000,
    historyApiFallback: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
