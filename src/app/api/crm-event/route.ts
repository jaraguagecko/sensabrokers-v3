import { NextRequest, NextResponse } from "next/server";
import { insertLead, type FunnelStage } from "@/lib/supabase";

export const runtime = "nodejs";

type EventBody = {
  source: string;
  funnel_stage?: FunnelStage;
  nombre?: string;
  email?: string;
  telefono?: string;
  modalidad_interes?: string;
  tiene_terreno_propio?: boolean;
  interes_fase3_construccion?: boolean;
  infonavit_puntos?: number;
  infonavit_salario?: number;
  infonavit_modalidad?: string;
  payload?: Record<string, unknown>;
};

export async function POST(req: NextRequest) {
  let body: EventBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  if (!body.source || typeof body.source !== "string") {
    return NextResponse.json({ error: "missing_source" }, { status: 400 });
  }

  const result = await insertLead({
    source: body.source,
    funnel_stage: body.funnel_stage,
    nombre: body.nombre || null,
    email: body.email ? body.email.trim().toLowerCase() : null,
    telefono: body.telefono || null,
    modalidad_interes: body.modalidad_interes || null,
    tiene_terreno_propio: typeof body.tiene_terreno_propio === "boolean" ? body.tiene_terreno_propio : null,
    interes_fase3_construccion: typeof body.interes_fase3_construccion === "boolean" ? body.interes_fase3_construccion : null,
    infonavit_puntos: typeof body.infonavit_puntos === "number" ? body.infonavit_puntos : null,
    infonavit_salario: typeof body.infonavit_salario === "number" ? body.infonavit_salario : null,
    infonavit_modalidad: body.infonavit_modalidad || null,
    payload: body.payload || null,
    user_agent: req.headers.get("user-agent") || null,
  });

  return NextResponse.json({ ok: true, persisted: result.ok });
}
