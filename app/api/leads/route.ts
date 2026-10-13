import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/leads";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const { website, startedAt, ...lead } = parsed.data;
  // Bots: pretend success so they don't retry.
  if (website || (startedAt && Date.now() - startedAt < 2000)) {
    return NextResponse.json({ ok: true });
  }

  const url = process.env.SHEETS_WEBHOOK_URL;
  const secret = process.env.SHEETS_WEBHOOK_SECRET;
  if (!url || !secret) {
    console.error("SHEETS_WEBHOOK_URL / SHEETS_WEBHOOK_SECRET not set");
    return NextResponse.json({ ok: false, error: "Intake is not configured yet." }, { status: 503 });
  }

  const row = {
    ...lead,
    dataTypes: lead.dataTypes.join(", "),
    submittedAt: new Date().toISOString(),
    source: req.headers.get("referer") ?? "",
  };

  try {
    // Apps Script answers with a 302 to googleusercontent; fetch follows it.
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, lead: row }),
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
    });
    const out = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!res.ok || !out?.ok) throw new Error(out?.error ?? `HTTP ${res.status}`);
  } catch (err) {
    console.error("Sheets webhook failed", err);
    return NextResponse.json({ ok: false, error: "Couldn't save your submission. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
