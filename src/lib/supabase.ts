import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  if (cached) return cached;
  cached = createClient(url, key, { auth: { persistSession: false } });
  return cached;
}

export type FunnelStage = "top" | "middle" | "bottom";

export type LeadInsert = {
  source: string;
  funnel_stage?: FunnelStage;
  nombre?: string | null;
  email?: string | null;
  telefono?: string | null;
  modalidad_interes?: string | null;
  tiene_terreno_propio?: boolean | null;
  interes_fase3_construccion?: boolean | null;
  infonavit_puntos?: number | null;
  infonavit_salario?: number | null;
  infonavit_modalidad?: string | null;
  tema?: string | null;
  horario?: string | null;
  payload?: Record<string, unknown> | null;
  user_agent?: string | null;
};

export async function insertLead(lead: LeadInsert): Promise<{ ok: boolean; id?: string; error?: string }> {
  const client = getSupabaseAdmin();
  if (!client) {
    console.warn("[supabase] missing env, lead not persisted", { source: lead.source });
    return { ok: false, error: "supabase_not_configured" };
  }
  const { data, error } = await client
    .from("leads")
    .insert({ ...lead, created_at: new Date().toISOString() })
    .select("id")
    .single();
  if (error) {
    console.error("[supabase] insert failed", error);
    return { ok: false, error: error.message };
  }
  return { ok: true, id: data?.id };
}
