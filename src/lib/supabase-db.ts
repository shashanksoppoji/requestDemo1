import { createClient } from "@supabase/supabase-js";
import type { StoredSubmission } from "@/lib/submission";

const TABLE =
  process.env.SUPABASE_FORM_TABLE?.trim().replace(/^["']|["']$/g, "") ||
  "form_submissions";

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() &&
      process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  );
}

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) {
    throw new Error(
      "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (Project Settings → API in Supabase)."
    );
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

type Row = {
  id: number;
  created_at: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  company: string | null;
  job_title: string | null;
  phone: string | null;
  interest: string | null;
  message: string | null;
};

export async function insertSubmission(
  answers: Record<string, string>
): Promise<StoredSubmission> {
  const supabase = getServiceClient();
  const rowToInsert = {
    first_name: answers.firstName ?? "",
    last_name: answers.lastName ?? "",
    email: answers.email ?? "",
    company: answers.company ?? "",
    job_title: answers.jobTitle ?? "",
    phone: answers.phone ?? "",
    interest: answers.interest ?? "",
    message: answers.message ?? "",
  };

  const { data, error } = await supabase
    .from(TABLE)
    .insert(rowToInsert)
    .select("id, created_at, first_name, last_name, email, company, job_title, phone, interest, message")
    .single();

  if (error) {
    throw new Error(`Supabase insert failed: ${error.message}`);
  }

  const row = data as Row;
  return {
    id: row.id,
    createdAt: row.created_at,
    data: rowToFormData(row),
  };
}

function rowToFormData(row: Row): Record<string, string | undefined> {
  return {
    firstName: row.first_name ?? "",
    lastName: row.last_name ?? "",
    email: row.email ?? "",
    company: row.company ?? "",
    jobTitle: row.job_title ?? "",
    phone: row.phone ?? "",
    interest: row.interest ?? "",
    message: row.message ?? "",
  };
}

export async function listSubmissions(): Promise<StoredSubmission[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from(TABLE)
    .select("id, created_at, first_name, last_name, email, company, job_title, phone, interest, message")
    .order("created_at", { ascending: false })
    .limit(5000);

  if (error) {
    throw new Error(`Supabase query failed: ${error.message}`);
  }

  const rows = (data ?? []) as Row[];
  return rows.map((row) => ({
    id: row.id,
    createdAt: row.created_at,
    data: rowToFormData(row),
  }));
}
