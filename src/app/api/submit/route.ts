import { NextResponse } from "next/server";
import { formFields, formValuesSchema } from "@/config/form.config";
import { appendSubmission } from "@/lib/kv";

export const runtime = "nodejs";

function formDataToObject(fd: FormData) {
  const o: Record<string, string> = {
    _honeypot: String(fd.get("_honeypot") ?? ""),
  };
  for (const f of formFields) {
    o[f.id] = String(fd.get(f.id) ?? "").trim();
  }
  return o;
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (
    !contentType.includes("multipart/form-data") &&
    !contentType.includes("application/x-www-form-urlencoded")
  ) {
    return NextResponse.json(
      { ok: false, error: "Unsupported content type" },
      { status: 415 }
    );
  }

  let fd: FormData;
  try {
    fd = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }

  const raw = formDataToObject(fd);
  const parsed = formValuesSchema.safeParse(raw);
  if (!parsed.success) {
    const msg = parsed.error.issues.map((e) => e.message).join("; ");
    return NextResponse.json({ ok: false, error: msg }, { status: 422 });
  }

  const data: Record<string, string> = {};
  for (const f of formFields) {
    const v = parsed.data[f.id as keyof typeof parsed.data];
    data[f.id] = v === undefined || v === null ? "" : String(v);
  }

  try {
    await appendSubmission(data);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Server error";
    return NextResponse.json({ ok: false, error: message }, { status: 503 });
  }

  return NextResponse.json({ ok: true, message: "Thank you" }, { status: 201 });
}
