# Shaaz Driving Academy — full stack website

This repository contains a **React (Vite + TypeScript)** frontend, a **Node.js (Express)** API, and a **MongoDB** database via **Prisma**. Contact messages and registration interest are stored in the database. **Stripe** powers secure card payments (deposits/fees); optional **Resend** can email you when forms are submitted.

## Project layout

| Path | Purpose |
|------|---------|
| `client/` | React SPA — marketing pages, FAQ, register, pay |
| `server/` | REST API — contact, registration, Stripe Checkout, health |
| `server/prisma/` | Prisma schema (MongoDB) |
| `docs/DEPLOY.md` | **Deploy the API** (Render, Atlas, `VITE_API_URL`, Stripe) |
| `render.yaml` | Optional Render Blueprint for the API |
| `legacy-static/` | Previous single-page HTML/CSS (archived) |

## Prerequisites

- Node.js 20+ recommended
- npm
- [Docker](https://www.docker.com/) (for local MongoDB only)

## Local development

1. **Install dependencies** (from the repo root):

   ```bash
   npm install
   ```

2. **Start MongoDB** (one terminal):

   ```bash
   docker compose up -d
   ```

3. **Configure the API** — copy `server/.env.example` to `server/.env` if needed. Defaults expect `DATABASE_URL` for local Docker (see `.env.example`).

4. **Apply the Prisma schema** to the database:

   ```bash
   npm run db:push --workspace=server
   ```

5. **Run client + API together**:

   ```bash
   npm run dev
   ```

   - Site: [http://localhost:5173](http://localhost:5173)
   - API: [http://localhost:4000](http://localhost:4000)  
   - Vite proxies `/api/*` to the API during development.

6. **Inspect data** (optional):

   ```bash
   npm run db:studio --workspace=server
   ```

## Production: API + live forms + Stripe

GitHub Pages only hosts the **static** frontend. The API must run on a Node host with **MongoDB** (e.g. **Render** + **MongoDB Atlas**).

Follow **[docs/DEPLOY.md](docs/DEPLOY.md)** step by step.

## Production build

```bash
npm run build
```

- Client output: `client/dist/`
- Server output: `server/dist/`

Production start (syncs Prisma schema to MongoDB, then runs the server):

```bash
cd server && npm run start:prod
```

Set `CLIENT_ORIGIN` and `PUBLIC_APP_URL` to your public site. For GitHub Pages, set the **`VITE_API_URL`** repository secret to your API origin (no trailing slash).

### Custom domain (GitHub Pages)

The `CNAME` file lives in `client/public/CNAME` so each build includes `www.shaazdriving.com`.

**Repo settings:** Pages source = **GitHub Actions**; **Actions secrets:** `VITE_API_URL` = your deployed API URL (see [docs/DEPLOY.md](docs/DEPLOY.md)).

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
