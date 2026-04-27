import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";

/** GitHub Pages has no SPA rewrites; HashRouter avoids 404 on in-app routes. This 404.html redirects bare paths (e.g. /register) to /#/register for bookmarks. */
let ghSpaOutDir = "";

function githubPagesSpaFallback(): Plugin {
  return {
    name: "github-pages-spa-fallback",
    configResolved(config) {
      ghSpaOutDir = path.resolve(config.root, config.build.outDir);
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
  var tail = pathname.replace(/^\\/+|\\/+$/g, "");
  if (!tail) {
    window.location.replace(window.location.origin + "/");
    return;
  }
  window.location.replace(window.location.origin + "/#/" + tail + window.location.search);
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
