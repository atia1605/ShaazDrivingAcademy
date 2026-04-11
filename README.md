# Shaaz Driving Academy — full stack website

This repository contains a **React (Vite + TypeScript)** frontend, a **Node.js (Express)** API, and a **PostgreSQL** database via **Prisma**. Contact messages and registration interest are stored in the database. **Stripe** powers secure card payments (deposits/fees); optional **Resend** can email you when forms are submitted.

## Project layout

| Path | Purpose |
|------|---------|
| `client/` | React SPA — marketing pages, FAQ, register, pay |
| `server/` | REST API — contact, registration, Stripe Checkout, health |
| `server/prisma/` | Database schema and migrations |
| `docs/DEPLOY.md` | **Deploy the API** (Render, Neon, `VITE_API_URL`, Stripe) |
| `render.yaml` | Optional Render Blueprint for the API |
| `legacy-static/` | Previous single-page HTML/CSS (archived) |

## Prerequisites

- Node.js 20+ recommended
- npm
- [Docker](https://www.docker.com/) (for local PostgreSQL only)

## Local development

1. **Install dependencies** (from the repo root):

   ```bash
   npm install
   ```

2. **Start PostgreSQL** (one terminal):

   ```bash
   docker compose up -d
   ```

3. **Configure the API** — copy `server/.env.example` to `server/.env` if needed. Defaults expect:

   - `DATABASE_URL` — `postgresql://postgres:postgres@localhost:5432/shaaz`
   - `PORT` — `4000`
   - `CLIENT_ORIGIN` — include `http://localhost:5173` (and production origin when testing CORS)

4. **Apply database migrations**:

   ```bash
   npm run db:migrate --workspace=server
   ```

5. **Run client + API together**:

   ```bash
   npm run dev
   ```

   - Site: [http://localhost:5173](http://localhost:5173)
   - API: [http://localhost:4000](http://localhost:4000)  
   - Vite proxies `/api/*` to the API during development, so forms work without `VITE_API_URL`.

6. **Inspect data** (optional):

   ```bash
   npm run db:studio --workspace=server
   ```

## Production: API + live forms + Stripe

GitHub Pages only hosts the **static** frontend. The API must run on a Node host with Postgres (e.g. **Render** + **Neon**).

Follow **[docs/DEPLOY.md](docs/DEPLOY.md)** step by step: create a database, deploy `server/`, set `VITE_API_URL` in GitHub Actions secrets, then redeploy the site.

## Production build

```bash
npm run build
```

- Client output: `client/dist/`
- Server output: `server/dist/`

Production start (runs migrations, then the server):

```bash
cd server && npm run start:prod
```

Set `CLIENT_ORIGIN` and `PUBLIC_APP_URL` to your public site (e.g. `https://www.shaazdriving.com`). For the React app on GitHub Pages, set the **`VITE_API_URL`** repository secret to your API origin (no trailing slash).

### Custom domain (GitHub Pages)

The `CNAME` file lives in `client/public/CNAME` so each build includes `www.shaazdriving.com`.

**Repo settings to check:**

1. **Settings → Pages → Build and deployment:** Source must be **GitHub Actions**.
2. **Settings → Pages → Custom domain:** `www.shaazdriving.com` (DNS must point at GitHub).
3. **Actions secrets:** `VITE_API_URL` = your deployed API URL (see [docs/DEPLOY.md](docs/DEPLOY.md)).

## API endpoints

- `GET /api/health` — liveness check (includes whether Stripe is configured)
- `GET /api/payment-options` — catalog of pay-online items (amounts in `server/src/payments.ts`)
- `POST /api/checkout-session` — JSON: `{ productKey, customerEmail? }` → `{ url }` for Stripe Checkout
- `POST /api/contact` — JSON: `{ name, email, message }`
- `POST /api/register-interest` — JSON: `{ fullName, email, phone?, courseType?, notes? }`

### Stripe

Use [Stripe](https://stripe.com) test keys while developing. Adjust amounts in `server/src/payments.ts` (values are in **cents**, CAD).

## License

Private project for Shaaz Driving Academy.
