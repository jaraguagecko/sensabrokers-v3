import { NextRequest, NextResponse } from "next/server";
import { insertLead } from "@/lib/supabase";
import { sendGuiaAutoresponder } from "@/lib/email";

export const runtime = "nodejs";

function isValidEmail(s: unknown): s is string {
  return typeof s === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: NextRequest) {
  let body: { nombre?: string; email?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const email = (body.email || "").trim().toLowerCase();
  const nombre = (body.nombre || "").trim() || null;
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const lead = await insertLead({
    source: "lead_magnet_guia_infonavit",
    funnel_stage: "top",
    nombre,
    email,
    user_agent: req.headers.get("user-agent") || null,
  });

  const mail = await sendGuiaAutoresponder(email, nombre);

  return NextResponse.json({
    ok: true,
    lead_persisted: lead.ok,
    email_sent: mail.ok,
    download_url: process.env.GUIA_PDF_URL || null,
  });
}
