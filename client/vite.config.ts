import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";

/** GitHub Pages serves HTTP 404 for unknown paths; this emits a 404.html that redirects SPA routes to `/` then restores the path (see injected script in index.html). */
let ghSpaOutDir = "";

function githubPagesSpaFallback(): Plugin {
  return {
    name: "github-pages-spa-fallback",
    configResolved(config) {
      ghSpaOutDir = path.resolve(config.root, config.build.outDir);
    },
    transformIndexHtml(html) {
      const restoreScript = `<script>(function(){try{var p=sessionStorage.getItem("gh-spa-path");if(p!=null){sessionStorage.removeItem("gh-spa-path");history.replaceState(null,"",p);}}catch(e){}})();</script>`;
      return html.replace("<head>", `<head>${restoreScript}`);
    },
    closeBundle() {
      const redirectPage = `<!DOCTYPE html>
<html lang="en-CA">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Redirecting…</title>
<script>
(function () {
  var pathname = window.location.pathname || "/";
  var segments = pathname.split("/").filter(Boolean);
  var last = segments[segments.length - 1] || "";
  if (pathname.indexOf("/assets/") === 0 || /^[^/]+\\.[a-zA-Z0-9]{1,12}$/.test(last)) {
    document.documentElement.innerHTML = '<body style="font-family:system-ui,sans-serif;padding:2rem"><p>404 Not Found</p></body>';
    return;
  }
  try {
    sessionStorage.setItem("gh-spa-path", pathname + window.location.search + window.location.hash);
  } catch (e) {}
  window.location.replace(window.location.origin + "/");
})();
</script>
</head>
<body></body>
</html>`;
      fs.writeFileSync(path.join(ghSpaOutDir, "404.html"), redirectPage, "utf8");
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
