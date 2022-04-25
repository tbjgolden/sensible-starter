import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import compress from "vite-plugin-compress";
import pages from "vite-plugin-pages";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    watch: {
      ignored: ["**/tsconfig.json"],
    },
  },
  resolve: {
    alias: [
      { find: "_", replacement: path.resolve(process.cwd(), "src") },
      { find: "_c", replacement: path.resolve(process.cwd(), "src", "components") },
      { find: "_u", replacement: path.resolve(process.cwd(), "src", "utilities") },
    ],
  },
  plugins: [
    react(),
    compress({ brotli: false }),
    pages(),
    //
  ],
});
