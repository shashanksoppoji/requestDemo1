import { Redis } from "@upstash/redis";

const LIST_KEY = "form:submissions";

export type StoredSubmission = {
  id: string;
  createdAt: string;
  data: Record<string, string | undefined>;
};

function getRedis() {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export function isKvConfigured() {
  return getRedis() != null;
}

export async function appendSubmission(
  data: Record<string, string | undefined>
): Promise<StoredSubmission> {
  const redis = getRedis();
  if (!redis) {
    throw new Error(
      "Redis is not configured. Add Upstash via Vercel Marketplace and set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN (or KV_REST_API_URL and KV_REST_API_TOKEN)."
    );
  }
  const row: StoredSubmission = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    data,
  };
  await redis.lpush(LIST_KEY, JSON.stringify(row));
  return row;
}

export async function listSubmissions(): Promise<StoredSubmission[]> {
  const redis = getRedis();
  if (!redis) {
    return [];
  }
  const raw = await redis.lrange(LIST_KEY, 0, -1);
  const out: StoredSubmission[] = [];
  for (const item of raw) {
    if (typeof item !== "string") continue;
    try {
      out.push(JSON.parse(item) as StoredSubmission);
    } catch {
      continue;
    }
  }
  return out.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
