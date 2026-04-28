# Form → Excel (Vercel) — LogiKal Control Tower

Next.js form that stores submissions in **Upstash Redis** (via the [Vercel Marketplace](https://vercel.com/marketplace?category=storage&search=redis)) and lets you **download a `.xlsx` file** of all rows. The landing page is the LogiKal brochure with a working demo form.

## Use this folder as a new project

1. **Copy or move** this entire directory to wherever you keep projects (for example `Documents\logikal-control-tower`). You can rename the folder; the app name inside `package.json` is only for metadata.
2. **Open that folder** in Cursor or VS Code (**File → Open Folder**).
3. **One-shot setup (Windows):** in PowerShell at the project root, run:
   ```powershell
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
   .\scripts\setup-all.ps1
   ```
   This runs `npm install`, `npm run build`, and creates a first **git** commit if Git is installed. Or run the same steps manually: `npm install` → `npm run dev` for local preview.
4. Open [http://localhost:3000](http://localhost:3000). The form needs Redis to save submissions locally: copy `.env.example` to `.env.local` and add real `UPSTASH_*` values (see below), or test after your first Vercel deploy where Upstash is linked.

## Put the project on GitHub (needed for Vercel Git deploys)

1. Create a **new empty** repository on GitHub (no README/license) under your account.
2. In the project folder, run (replace the URL with your repo):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: LogiKal landing and form"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. If Git is not installed, install [Git for Windows](https://git-scm.com/download/win) first, or use the GitHub Desktop app to publish the folder.

## Deploy to Vercel (step by step)

1. Go to [vercel.com](https://vercel.com) and sign in (recommended: **Continue with GitHub**).
2. Click **Add New…** → **Project** → **Import** your GitHub repository. Authorize Vercel if asked.
3. On the import screen, leave **Framework Preset** as **Next.js** and **Root Directory** as `./` (do not change unless this app lives in a subfolder of a monorepo).
4. **Environment variables** — open **Environment Variables** and add:
   - **Name:** `EXPORT_SECRET`  
   - **Value:** a long random string (e.g. from a password manager, or run `openssl rand -hex 32` in Git Bash).  
   - Apply to **Production**, **Preview**, and **Development**.
5. **Redis (required for the form)** — still in the Vercel dashboard for this project:
   - Open the **Storage** or **Integrations** tab (or [Marketplace → Upstash Redis](https://vercel.com/marketplace/upstash)).
   - Create an **Upstash Redis** database and **connect** it to this Vercel project.  
   Vercel will inject `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` automatically; you do **not** need to copy them by hand unless you use a manual env file.
6. Click **Deploy**. Wait for the build to finish; open the production URL from the success screen.
7. **Smoke test:** submit the demo form on the live site. If you get a **503** or “Redis is not configured”, the Upstash integration is missing or not linked — fix Storage/Integrations, then **Redeploy** from the Deployments tab.

**Download Excel in production**

`https://YOUR_PROJECT.vercel.app/api/export?token=PASTE_EXPORT_SECRET_HERE`

Use the same `EXPORT_SECRET` you set in step 4. The file name looks like `submissions-YYYY-MM-DD.xlsx`.

**CLI alternative (optional):** install the [Vercel CLI](https://vercel.com/docs/cli), run `npm i -g vercel`, then from the project folder run `vercel` and follow the prompts; link the same env vars in the dashboard afterward.

## Customise

- **Landing page (LogiKal brochure):** `src/components/logikal/LogikalBrochure.tsx` — sections and copy. Styles: `src/app/logikal-brochure.css` (colours, spacing, `var(--navy)`, `var(--green)`, etc.). Form layout: `src/components/logikal/LogikalRequestForm.tsx`.
- **Fields & labels:** `src/config/form.config.ts` — add/remove `formFields`; each `id` is a name attribute and a column in Excel.

### Form submit returns “Redis is not configured” (503)

The app **must** talk to **Upstash Redis** to store submissions. Until these env vars are set, `POST /api/submit` cannot work.

**Local (`npm run dev`):**

1. [Upstash console](https://console.upstash.com/) → **Redis** → **Create database** (free tier is fine).
2. Open the DB → **REST API** → copy **`UPSTASH_REDIS_REST_URL`** and **`UPSTASH_REDIS_REST_TOKEN`**.
3. In the project root, create **`.env.local`** (see **`.env.example`**) with both values. Optional: set **`EXPORT_SECRET`** for testing export.
4. Restart the dev server (env is only read at startup).

**Vercel:**

1. **Project → Settings → Environment Variables** — add the same two variables (or use **Storage → Upstash Redis → Connect** so Vercel fills them).
2. **Redeploy** so the new vars are available to the runtime.

## Local `.env` (optional but useful before deploy)

Copy `.env.example` to `.env.local` and set `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, and `EXPORT_SECRET` (get REST URL/token from the [Upstash console](https://console.upstash.com/) or after you connect Upstash to your Vercel project and copy from the dashboard). Then `npm run dev` and test the form locally.

## Practices included

- Server-side validation (Zod), honeypot field, and export protected by a secret.
- `timingSafeEqual` for token comparison.
- No submission data in client-side state after success; export is server-only.

## Vercel build failed at “Linting and checking…”

Production builds **skip ESLint blocking** (`eslint.ignoreDuringBuilds` in `next.config.ts`) so deploys succeed; run **`npm run lint`** locally and fix issues when time allows.

If it still fails, open the deployment on Vercel → **Building** → expand the step after “Linting” — the exact **TypeScript** or **missing env** message is usually there.

## Optional hardening (later)

- Move export behind login (e.g. Vercel Auth, Clerk) instead of a query token.
- Add [Vercel WAF or Upstash rate limiting](https://vercel.com/docs/edge-config) for `POST /api/submit`.
- [Turnstile](https://developers.cloudflare.com/turnstile/) or hCaptcha for public forms.
"# requestDemo1" 
