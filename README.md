# LogiKal demo form — Next.js + **Supabase** + Excel export

Submitted data is saved in PostgreSQL (**Supabase**). No Google Cloud, SharePoint admin, or Redis required—just two API keys from the Supabase dashboard.

## 1. Create Supabase project

1. Go to **[supabase.com](https://supabase.com)** → **New project** (free tier is enough).
2. When the project is ready, open **SQL Editor** → **New query**, paste the contents of `supabase/migrations/001_form_submissions.sql`, then **Run**.

That creates table **`form_submissions`** with separate columns:

`id`, `created_at`, `first_name`, `last_name`, `email`, `company`, `job_title`, `phone`, `interest`, `message`.

The `id` column is an auto-incrementing number (`1, 2, 3, ...`).

If you already created the older JSON version of the table and it has no important data, run this first in SQL Editor:

```sql
drop table if exists public.form_submissions;
```

Then run `supabase/migrations/001_form_submissions.sql`.

## 2. Environment variables

In **Supabase** → **Project Settings** → **API**:

| Env variable | Copy from |
|----------------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | **Project URL** |
| `SUPABASE_SERVICE_ROLE_KEY` | **service_role** secret (server-only — never expose in browser or client bundles except this name makes it explicit) |

Also set:

| Variable | Purpose |
|-----------|---------|
| `EXPORT_SECRET` | Long random string; used only for `GET /api/export?token=...` to download `.xlsx` |

Locally: copy `.env.example` → **`.env.local** and fill values. Restart `npm run dev` after edits.

On **Vercel**: **Project → Settings → Environment variables** → add the same vars → redeploy.

## 3. Run locally

```bash
npm install
npm run dev
```

Submit the form → **Supabase → Table Editor → `form_submissions`** → you should see one row per submission, with each answer in its own column.

## 4. Download Excel

`https://YOUR_DOMAIN/api/export?token=YOUR_EXPORT_SECRET`

## Customize

| What | Where |
|------|--------|
| Fields | `src/config/form.config.ts` |
| Landing page | `src/components/logikal/`, `src/app/logikal-brochure.css` |

## Security notes

- **Service role key** bypasses Row Level Security. Use it **only** in API routes (`/api/submit`, `/api/export`). Do not pass it to React components or `NEXT_PUBLIC_*`.
- Prefer **HTTPS** everywhere in production (`export` token stays secret).

## Practices

Server-side validation (Zod), honeypot, export guarded by `EXPORT_SECRET`, timingsafe token compare.
