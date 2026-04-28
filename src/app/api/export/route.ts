import { Buffer } from "node:buffer";
import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { buildSubmissionsWorkbook } from "@/lib/excel";
import { listSubmissions } from "@/lib/kv";

export const runtime = "nodejs";

function safeCompare(a: string, b: string) {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const secret = process.env.EXPORT_SECRET;
  if (!secret || !token || !safeCompare(token, secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = await listSubmissions();
  const xlsx = await buildSubmissionsWorkbook(rows);
  const filename = `submissions-${new Date().toISOString().slice(0, 10)}.xlsx`;
  const contentType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

  const body = new Blob([Buffer.from(xlsx)], { type: contentType });
  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
