# Deploy the API (forms, Stripe, database)

The **React site** on GitHub Pages is static. The **API** (`server/`) must run on a host that supports **Node.js** and **PostgreSQL**.

## 1. Create a PostgreSQL database

Use any managed Postgres. Free options:

- **[Neon](https://neon.tech)** — serverless Postgres, free tier  
- **[Supabase](https://supabase.com)** — Postgres + extras  
- **Render PostgreSQL** — if available on your plan  

Copy the **connection string** (usually starts with `postgresql://` or `postgres://`). This becomes `DATABASE_URL`.

## 2. Deploy the API on Render

1. Sign up at [render.com](https://render.com) and connect your GitHub account.
2. **New → Blueprint** → connect the `ShaazDrivingAcademy` repo, or **New → Web Service** and select the repo.
3. Configure:
   - **Root directory:** leave empty (repository root).
   - **Build command:**  
     `npm ci && npm run db:generate --workspace=server && npm run build --workspace=server`
   - **Start command:**  
     `cd server && npm run start:prod`
   - **Instance type:** Free (or paid for production traffic).

4. In **Environment**, add:

   | Key | Example value |
   |-----|----------------|
   | `DATABASE_URL` | `postgresql://user:pass@host.region.aws.neon.tech/neondb?sslmode=require` |
   | `CLIENT_ORIGIN` | `https://www.shaazdriving.com` |
   | `PUBLIC_APP_URL` | `https://www.shaazdriving.com` |
   | `STRIPE_SECRET_KEY` | `sk_live_...` or `sk_test_...` from [Stripe](https://dashboard.stripe.com/apikeys) |
   | `NODE_VERSION` | `20` (optional if already in `render.yaml`) |

   Optional (email alerts when forms are used):

   | Key | Purpose |
   |-----|---------|
   | `RESEND_API_KEY` | [Resend](https://resend.com) API key |
   | `RESEND_FROM` | Verified sender, e.g. `Shaaz <noreply@yourdomain.com>` |
   | `SITE_OWNER_EMAIL` | Where to receive notifications |

5. Deploy. When it is live, open `https://YOUR-SERVICE.onrender.com/api/health` — you should see JSON with `"ok": true`.

**Note:** Free Render web services **spin down** after idle time; the first request after sleep can take ~30–60 seconds.

## 3. Point the website at the API

The GitHub Actions build for the **client** must know your API base URL.

1. In GitHub: **Repository → Settings → Secrets and variables → Actions**.
2. Add or update **`VITE_API_URL`** to your API origin **with no trailing slash**, e.g.  
   `https://shaaz-driving-api.onrender.com`
3. Re-run the **Deploy to GitHub Pages** workflow (Actions → workflow → **Run workflow**), or push any commit to `main`.

After redeploy, contact forms, registration, and Stripe checkout on **www.shaazdriving.com** will call that API.

## 4. Stripe live mode

- Use **live** secret keys only when you are ready to charge real cards.  
- Set **success/cancel** URLs: the server uses `PUBLIC_APP_URL` for Stripe redirects.  
- Test with **test keys** first (`sk_test_...`).

## 5. Local development (Postgres)

```bash
docker compose up -d
```

Set in `server/.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/shaaz"
```

Then:

```bash
npm run db:migrate --workspace=server
npm run dev
```

(Migrate creates tables in your local Postgres.)

## Troubleshooting

- **CORS errors in the browser:** `CLIENT_ORIGIN` must exactly match the site origin (`https://www.shaazdriving.com`, no path). You can set multiple origins separated by commas.
- **503 on `/api/checkout-session`:** `STRIPE_SECRET_KEY` missing or invalid.
- **Database errors on start:** `DATABASE_URL` wrong, or migrations not applied — `start:prod` runs `prisma migrate deploy` automatically.
