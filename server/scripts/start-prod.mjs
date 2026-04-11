/**
 * Production start: ensure MongoDB URI has a database name, then db push + server.
 * Prisma requires /dbname before ? — Atlas often omits it (P1013).
 */
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const serverRoot = join(__dirname, "..");

function ensureDatabaseUrl() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL is not set");
    process.exit(1);
  }
  const name = process.env.MONGODB_DATABASE || "shaaz";
  let fixed = url;
  if (/\.mongodb\.net\/\?/.test(fixed)) {
    fixed = fixed.replace(/(\.mongodb\.net)\/\?/, `$1/${name}?`);
  } else if (/\.mongodb\.net\?(?!\/)/.test(fixed)) {
    fixed = fixed.replace(/(\.mongodb\.net)\?/, `$1/${name}?`);
  }
  if (fixed !== url) {
    console.warn(`[start-prod] Inserted database name "${name}" in DATABASE_URL (required by Prisma).`);
    process.env.DATABASE_URL = fixed;
  }
}

ensureDatabaseUrl();

const push = spawnSync("npx", ["prisma", "db", "push"], {
  cwd: serverRoot,
  stdio: "inherit",
  env: process.env,
  shell: process.platform === "win32",
});

if (push.status !== 0 && push.status !== null) {
  process.exit(push.status);
}
if (push.error) {
  console.error(push.error);
  process.exit(1);
}

const run = spawnSync(process.execPath, ["dist/index.js"], {
  cwd: serverRoot,
  stdio: "inherit",
  env: process.env,
});

process.exit(run.status ?? (run.error ? 1 : 0));
