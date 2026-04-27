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

   **Email — notify you when someone registers or uses Contact** (optional but recommended):

   | Key | Purpose |
   |-----|---------|
   | `RESEND_API_KEY` | API key from [Resend](https://resend.com) (free tier available) |
   | `RESEND_FROM` | A **verified** sender address on your domain, e.g. `Shaaz Driving <onboarding@resend.dev>` for testing, or `Shaaz <noreply@yourdomain.com>` after you [verify your domain](https://resend.com/docs/dashboard/domains/introduction) |
   | `SITE_OWNER_EMAIL` | Inbox(es) where alerts are sent — comma-separated for multiple (e.g. `nahiabaksh21@gmail.com` for testing, or `shohan@…,nahiabaksh21@gmail.com` for both). |
   | `PUBLIC_CONTACT_EMAIL` | (Optional) Phone/email shown to customers in the automatic **thank-you** email after registration; defaults match the site if unset. |
   | `PUBLIC_CONTACT_PHONE` | (Optional) Same — display phone for that thank-you email. |

   **Resend quick setup:** (1) Create a Resend account. (2) **API Keys** → create a key → paste as `RESEND_API_KEY` on Render. (3) For testing, Resend allows sending **from** `onboarding@resend.dev` — use `RESEND_FROM=Shaaz <onboarding@resend.dev>` and set `SITE_OWNER_EMAIL` to the email you use to log into Resend (or any inbox Resend accepts for testing). (4) Redeploy the API. (5) Submit a test registration — you should get **“New registration: …”** in your owner inbox. Production: add your real domain in Resend and use a `noreply@…` on that domain.

   **SMS to your phone when someone registers** (optional):

   | Key | Purpose |
   |-----|---------|
   | `TWILIO_ACCOUNT_SID` | Twilio account SID from [Twilio Console](https://console.twilio.com/) |
   | `TWILIO_AUTH_TOKEN` | Twilio auth token from your Twilio project |
   | `TWILIO_FROM_PHONE` | Twilio phone number (E.164), e.g. `+14165550123` |
   | `SITE_OWNER_PHONE` | Shohan's phone number to receive registration SMS (E.164), e.g. `+16475550123` |

   If all four Twilio variables are set, each registration sends an SMS containing all submitted form fields (name, email, phone, course interest, notes). If any variable is missing, SMS is skipped and email notifications still work.

   **Emails land in Junk / Spam:** This is common until you fully authenticate your **own** domain (not `@resend.dev`). In Resend: **Domains** → add **shaazdriving.com** (or your domain) → add the **DNS records** they show (**SPF**, **DKIM**, often **DMARC**). Then set `RESEND_FROM` to an address on that domain, e.g. `Shaaz Driving <notifications@shaazdriving.com>`. In Outlook/Hotmail: open the message → **Not junk** / **Never block sender**; add the sender to **Safe senders**. Low-volume transactional mail improves after DNS verifies (can take up to 48 hours).

5. Deploy. When it is live, open `https://YOUR-SERVICE.onrender.com/api/health` — you should see JSON with `"ok": true`.

**Note:** Free Render web services **spin down** after idle time; the first request after sleep can take ~30–60 seconds.

**“Localhost” in logs vs your browser:** Logs may say `listening on …:10000` (or another port). That is **inside Render’s network**. Do **not** open `http://localhost:10000` on your own computer — that is not your API. Always use the service URL Render shows, e.g. `https://shaazdrivingacademy.onrender.com` and test `https://shaazdrivingacademy.onrender.com/api/health`.

## 3. Point the website at the API

1. **API URL in the static site:** The client reads **`VITE_API_URL`** from **`client/.env.production`** (committed). It should be your Render API origin **with no trailing slash**, e.g. `https://shaazdrivingacademy.onrender.com`. After changing hosts, edit that file (and the `PROD_FALLBACK_API` constant in `client/src/api.ts` if you use the fallback) and push — then redeploy Pages.
2. Optional: GitHub **Secrets / Variables** named `VITE_API_URL` are **not** required for the default setup (the workflow no longer injects an empty value that would override `.env.production`).
3. Re-run **Deploy to GitHub Pages** after pushing client changes.

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
- **No email when someone registers (API still returns success):** The API saves the row even if email fails. On Render, open **Logs** and search for `[email]`. If you see `Owner notification skipped — missing env`, set `RESEND_API_KEY`, `RESEND_FROM`, and `SITE_OWNER_EMAIL` on the web service, then redeploy. If you see `Resend error`, fix the message from Resend (invalid API key, unverified domain, or test-mode recipient rules). With `RESEND_FROM` using `onboarding@resend.dev`, set `SITE_OWNER_EMAIL` to an address Resend allows for testing (often the Gmail you use for your Resend account), e.g. `nahiabaksh21@gmail.com`.
- **Website shows “staff email alert did not send” after Register/Contact:** Resend rejected every recipient. Most often **`RESEND_FROM` does not match the verified sending domain.** In Resend → **Domains**, note which hostname is verified (e.g. `send.shaazdriving.com`). On Render, set `RESEND_FROM` to an address on **that** domain, e.g. `Shaaz Driving <noreply@send.shaazdriving.com>` — not `noreply@shaazdriving.com` unless the **root** domain is verified separately. Redeploy the API and test again.
