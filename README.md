# Shaaz Driving Academy — full stack website

This repository contains a **React (Vite + TypeScript)** frontend, a **Node.js (Express)** API, and a **SQLite** database via **Prisma**. Contact messages and registration interest are stored in the database. **Stripe** powers secure card payments (deposits/fees); optional **Resend** can email you when forms are submitted.

## Project layout

| Path | Purpose |
|------|---------|
| `client/` | React SPA — marketing pages, FAQ, register, pay |
| `server/` | REST API — contact, registration, Stripe Checkout, health |
| `server/prisma/` | Database schema and migrations |
| `legacy-static/` | Previous single-page HTML/CSS (archived) |

## Prerequisites

- Node.js 20+ recommended
- npm

## Local development

1. **Install dependencies** (from the repo root):

   ```bash
   npm install
   ```

2. **Configure the API** — copy `server/.env.example` to `server/.env` (already present for local dev with defaults):

   - `DATABASE_URL` — SQLite file (default: `file:./dev.db` under `server/prisma/`)
   - `PORT` — API port (default `4000`)
   - `CLIENT_ORIGIN` — must match the Vite dev server (`http://localhost:5173`)

3. **Apply database migrations** (first run or after schema changes):

   ```bash
   npm run db:migrate --workspace=server
   ```

4. **Run client + API together**:

   ```bash
   npm run dev
   ```

   - Site: [http://localhost:5173](http://localhost:5173)
   - API: [http://localhost:4000](http://localhost:4000)  
   - Vite proxies `/api/*` to the API during development, so forms work without extra env vars.

5. **Inspect data** (optional):

   ```bash
   npm run db:studio --workspace=server
   ```

## Production build

```bash
npm run build
```

- Client output: `client/dist/`
- Server output: `server/dist/`

Run the API in production:

```bash
cd server
node dist/index.js
```

Set `CLIENT_ORIGIN` to your real site URL (e.g. `https://www.shaazdriving.com`). Set `PUBLIC_APP_URL` to that same public URL so Stripe returns learners to your site after payment.

For the React app, set `VITE_API_URL` at **build time** to your public API base URL (no trailing slash), e.g.:

```bash
cd client
VITE_API_URL=https://api.example.com npm run build
```

### Database in production

SQLite is fine for a single small server. For managed hosting or higher traffic, switch Prisma to **PostgreSQL**: change `provider` and `url` in `server/prisma/schema.prisma`, run migrations, and set `DATABASE_URL` accordingly.

### Custom domain (GitHub Pages)

The previous root `CNAME` for `www.shaazdriving.com` is mirrored in `client/public/CNAME` so static exports include it. GitHub Pages only serves **static** files; you still need to host the API separately (Railway, Render, Fly.io, a VPS, etc.) and configure `VITE_API_URL` as above.

## API endpoints

- `GET /api/health` — liveness check (includes whether Stripe is configured)
- `GET /api/payment-options` — catalog of pay-online items (amounts defined in `server/src/payments.ts`)
- `POST /api/checkout-session` — JSON body: `{ productKey, customerEmail? }` — returns `{ url }` for Stripe Checkout
- `POST /api/contact` — JSON body: `{ name, email, message }`
- `POST /api/register-interest` — JSON body: `{ fullName, email, phone?, courseType?, notes? }`

### Stripe

Use [Stripe](https://stripe.com) test keys while developing. Adjust deposit amounts in `server/src/payments.ts` (amounts are in **cents**, CAD). After a successful payment, users land on `/pay/success` on your site.

## License

Private project for Shaaz Driving Academy.
