import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
//import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: [path.resolve(__dirname, "src/data/**")],
    },
  },
  plugins: [react() /*, eslint()*/],
  /* esbuild: {
    supported: {
      "top-level-await": true, //browsers can handle top-level-await features
    },
  }, */
});
