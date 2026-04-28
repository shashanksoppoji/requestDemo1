-- Run in Supabase → SQL Editor, or use Supabase CLI: supabase db push

create extension if not exists "pgcrypto";

create table if not exists public.form_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  answers jsonb not null default '{}'::jsonb
);

comment on table public.form_submissions is 'Demo form rows; answers stores field ids from src/config/form.config.ts';

alter table public.form_submissions enable row level security;

-- No public policies: only server (service role key) inserts/selects via API routes.
