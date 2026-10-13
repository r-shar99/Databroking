import { NextResponse } from "next/server";
import { attioConfigured, pushLeadToAttio } from "@/lib/attio";
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

  const lead = parsed.data;
  const { website, startedAt } = lead;
  // Bots: pretend success so they don't retry.
  if (website || (startedAt && Date.now() - startedAt < 2000)) {
    return NextResponse.json({ ok: true });
  }

  if (!attioConfigured()) {
    console.error("ATTIO_API_KEY / ATTIO_OWNER_EMAIL not set");
    return NextResponse.json({ ok: false, error: "Intake is not configured yet." }, { status: 503 });
  }

  try {
    await pushLeadToAttio(lead, req.headers.get("referer") ?? "");
  } catch (err) {
    console.error("Attio push failed", err, lead.email);
    return NextResponse.json({ ok: false, error: "Couldn't save your submission. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
