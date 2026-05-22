import { NextRequest, NextResponse } from "next/server";
import { insertLead } from "@/lib/supabase";
import { sendAgendarConfirmation, notifyCarolinaNewLead } from "@/lib/email";

export const runtime = "nodejs";

function isValidEmail(s: unknown): s is string {
  return typeof s === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: NextRequest) {
  let body: {
    nombre?: string;
    email?: string;
    telefono?: string;
    tema?: string;
    horario?: string;
    modalidad_interes?: string;
  } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  const nombre = (body.nombre || "").trim() || null;
  const telefono = (body.telefono || "").trim() || null;
  const tema = (body.tema || "").trim() || null;
  const horario = (body.horario || "").trim() || null;
  const modalidad = (body.modalidad_interes || "").trim() || null;

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  if (!nombre || !telefono) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const lead = await insertLead({
    source: "funnel_infonavit",
    funnel_stage: "bottom",
    nombre,
    email,
    telefono,
    tema,
    horario,
    modalidad_interes: modalidad,
    user_agent: req.headers.get("user-agent") || null,
  });

  const [confirm, notify] = await Promise.all([
    sendAgendarConfirmation(email, nombre),
    notifyCarolinaNewLead({ nombre, email, telefono, tema, horario, modalidad_interes: modalidad, source: "funnel_infonavit" }),
  ]);

  return NextResponse.json({
    ok: true,
    lead_persisted: lead.ok,
    confirmation_sent: confirm.ok,
    carolina_notified: notify.ok,
  });
}
