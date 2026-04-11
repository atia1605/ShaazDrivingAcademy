# Deploy the API (forms, Stripe, database)

The **React site** on GitHub Pages is static. The **API** (`server/`) must run on a host that supports **Node.js** and **MongoDB** (via [Prisma MongoDB](https://www.prisma.io/docs/concepts/database-connectors/mongodb)).

## 1. Create a MongoDB database

**Recommended for production:** [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) — free tier, managed cluster.

1. Create a project and a **cluster** (e.g. M0 free).
2. **Database Access:** add a database user (username + password).
3. **Network Access:** allow access from everywhere (`0.0.0.0/0`) for Render, or Render’s outbound IPs if you prefer lockdown.
4. **Connect** → Drivers → copy the **connection string** (starts with `mongodb+srv://`).
5. Replace `<password>` with your user’s password.

### Prisma requires a database name in the URL (fixes `P1013`)

Atlas often gives you a string that ends with **`mongodb.net/?retryWrites=...`** — there is **no database name** between the host and `?`. **Prisma will fail** with:

`Database must be defined in the connection string` ([P1013](https://www.prisma.io/docs/reference/api-reference/error-reference#p1013)).

**Fix:** insert your database name **after** the host, **before** the query string:

| Wrong | Right |
|--------|--------|
| `...@cluster.mongodb.net/?retryWrites=true...` | `...@cluster.mongodb.net/shaaz?retryWrites=true...` |

Use any name you like (`shaaz`, `production`, etc.). MongoDB will create it when Prisma runs `db push`.

**Example `DATABASE_URL` for Render:**

```text
mongodb+srv://MYUSER:MYPASSWORD@nahia16.ujjzkva.mongodb.net/shaaz?retryWrites=true&w=majority&appName=Cluster0
```

(URL-encode special characters in the password if needed.)

That full string becomes `DATABASE_URL` on Render.

**Automatic fix on deploy:** If you still paste Atlas’s default string with **`...mongodb.net/?...`** (no name before `?`), the server’s `start-prod` script inserts **`/shaaz`** before `?` so Prisma can start. You can override the name with env **`MONGODB_DATABASE`** (default `shaaz`).

**Local development:** use Docker from the repo root: `docker compose up -d` and the `DATABASE_URL` in `server/.env.example`.

## 2. Deploy the API on Render

1. Sign up at [render.com](https://render.com) and connect your GitHub account.
2. **New → Web Service** and select the `ShaazDrivingAcademy` repo.
3. Configure:

   - **Root directory:** leave **empty** (repository root).
   - **Runtime:** **Node**
   - **Build command:**  
     `npm ci && npm run db:generate --workspace=server && npm run build --workspace=server`
   - **Start command:**  
     `cd server && npm run start:prod`  
     (This runs `prisma db push` to sync the schema, then starts the server.)

4. In **Environment**, add:

   | Key | Example value |
   |-----|----------------|
   | `DATABASE_URL` | `mongodb+srv://user:pass@cluster.xxxxx.mongodb.net/shaaz?retryWrites=true&w=majority` |
   | `CLIENT_ORIGIN` | `https://www.shaazdriving.com` |
   | `PUBLIC_APP_URL` | `https://www.shaazdriving.com` |
   | `STRIPE_SECRET_KEY` | `sk_live_...` or `sk_test_...` from [Stripe](https://dashboard.stripe.com/apikeys) |
   | `NODE_VERSION` | `20` |

   Optional (email alerts when forms are used):

   | Key | Purpose |
   |-----|---------|
   | `RESEND_API_KEY` | [Resend](https://resend.com) API key |
   | `RESEND_FROM` | Verified sender, e.g. `Shaaz <noreply@yourdomain.com>` |
   | `SITE_OWNER_EMAIL` | Where to receive notifications |

5. Deploy. When it is live, open `https://YOUR-SERVICE.onrender.com/api/health` — you should see JSON with `"ok": true`.

**Note:** Free Render web services **spin down** after idle time; the first request after sleep can take ~30–60 seconds.

## 3. Point the website at the API

1. In GitHub: **Repository → Settings → Secrets and variables → Actions**.
2. Set **`VITE_API_URL`** to your API origin **with no trailing slash**, e.g.  
   `https://shaaz-driving-api.onrender.com`
3. Re-run the **Deploy to GitHub Pages** workflow (or push to `main`).

## 4. Stripe

- Use **test** keys until you are ready for real charges.
- `PUBLIC_APP_URL` must be your public site URL for Stripe return redirects.

## 5. Local development (MongoDB)

```bash
docker compose up -d
```

Ensure `server/.env` has `DATABASE_URL` matching `server/.env.example`, then:

```bash
npm run db:push --workspace=server
npm run dev
```

(`db:push` applies the Prisma schema to your local MongoDB.)

## Troubleshooting

- **`P1013` / “Database must be defined in the connection string”:** Your Atlas URL is missing **`/dbname`** before `?`. Example: `...mongodb.net/shaaz?retryWrites=...` (see section above).
- **CORS in the browser:** `CLIENT_ORIGIN` must match the site origin (`https://www.shaazdriving.com`). Multiple origins: comma-separated.
- **503 on `/api/checkout-session`:** `STRIPE_SECRET_KEY` missing or invalid.
- **Prisma / Mongo connection errors:** Check Atlas network access, user/password in the URI, and that `DATABASE_URL` uses `mongodb+srv://` for Atlas.
- **`directConnection=true`:** Use for a **single local** MongoDB node; Atlas SRV URLs usually do not need it.
