import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";

/**
 * GitHub Pages serves 404.html for unknown paths. Copy index.html so the SPA loads
 * with BrowserRouter (clean URLs like /faq for SEO). Real missing assets still 404 from /assets/.
 */
let ghSpaOutDir = "";

function githubPagesSpaFallback(): Plugin {
  return {
    name: "github-pages-spa-fallback",
    configResolved(config) {
      ghSpaOutDir = path.resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const indexPath = path.join(ghSpaOutDir, "index.html");
      const dest404 = path.join(ghSpaOutDir, "404.html");
      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, dest404);
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), githubPagesSpaFallback()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
});
