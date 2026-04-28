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
  id: string;
  created_at: string;
  answers: Record<string, unknown> | null;
};

export async function insertSubmission(
  answers: Record<string, string>
): Promise<StoredSubmission> {
  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from(TABLE)
    .insert({ answers })
    .select("id, created_at, answers")
    .single();

  if (error) {
    throw new Error(`Supabase insert failed: ${error.message}`);
  }

  const row = data as Row;
  return {
    id: row.id,
    createdAt: row.created_at,
    data: normalizeAnswers(row.answers),
  };
}

function normalizeAnswers(
  raw: Record<string, unknown> | null
): Record<string, string | undefined> {
  if (!raw || typeof raw !== "object") return {};
  const out: Record<string, string | undefined> = {};
  for (const [k, v] of Object.entries(raw)) {
    out[k] = v == null ? "" : String(v);
  }
  return out;
}

export async function listSubmissions(): Promise<StoredSubmission[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from(TABLE)
    .select("id, created_at, answers")
    .order("created_at", { ascending: false })
    .limit(5000);

  if (error) {
    throw new Error(`Supabase query failed: ${error.message}`);
  }

  const rows = (data ?? []) as Row[];
  return rows.map((row) => ({
    id: row.id,
    createdAt: row.created_at,
    data: normalizeAnswers(row.answers),
  }));
}
