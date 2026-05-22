import { Resend } from "resend";

let cached: Resend | null = null;

function client(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (cached) return cached;
  cached = new Resend(key);
  return cached;
}

const FROM = process.env.RESEND_FROM || "Sensabrokers <hola@sensabrokers.com>";
const CAROLINA = process.env.CAROLINA_EMAIL || "carolina@sensabrokers.com";

type SendInput = { to: string; subject: string; html: string; replyTo?: string };

export async function sendEmail({ to, subject, html, replyTo }: SendInput): Promise<{ ok: boolean; id?: string; error?: string }> {
  const c = client();
  if (!c) {
    console.warn("[email] RESEND_API_KEY missing, skipping send", { to, subject });
    return { ok: false, error: "resend_not_configured" };
  }
  try {
    const result = await c.emails.send({ from: FROM, to, subject, html, replyTo });
    if (result.error) return { ok: false, error: result.error.message };
    return { ok: true, id: result.data?.id };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[email] send failed", msg);
    return { ok: false, error: msg };
  }
}

function wrap(body: string) {
  return `<!doctype html><html><body style="font-family:Inter,system-ui,sans-serif;line-height:1.5;color:#1a1a1a;max-width:560px;margin:0 auto;padding:24px;">${body}<hr style="border:none;border-top:1px solid #e5e5e5;margin:32px 0 16px;"/><p style="font-size:12px;color:#888;">Sensabrokers — Tu broker hipotecario en Yucatán.<br/>Si no esperabas este correo, ignóralo.</p></body></html>`;
}

export async function sendGuiaAutoresponder(to: string, nombre: string | null) {
  const pdfUrl = process.env.GUIA_PDF_URL || "https://sensabrokers.com/guia-infonavit.pdf";
  const wa = process.env.CAROLINA_WHATSAPP || "5219991234567";
  const html = wrap(`
    <h2 style="font-family:Georgia,serif;color:#1a1a1a;">Aquí está tu guía INFONAVIT${nombre ? `, ${nombre}` : ""}</h2>
    <p>Como prometimos: la guía completa para entender tu crédito INFONAVIT, paso a paso, sin letra chiquita.</p>
    <p style="margin:24px 0;"><a href="${pdfUrl}" style="display:inline-block;padding:12px 24px;background:#1a1a1a;color:#fff;text-decoration:none;border-radius:6px;">Descargar guía (PDF)</a></p>
    <p>Cuando quieras revisar tu caso con alguien real, escríbele a Carolina por WhatsApp:</p>
    <p><a href="https://wa.me/${wa}" style="color:#1a4a3a;">→ Hablar con Carolina (WhatsApp)</a></p>
    <p style="margin-top:24px;">Un saludo,<br/>El equipo de Sensabrokers</p>
  `);
  return sendEmail({ to, subject: "Tu guía INFONAVIT 📩", html });
}

export async function sendChecklistAutoresponder(to: string, nombre: string | null) {
  const wa = process.env.CAROLINA_WHATSAPP || "5219991234567";
  const html = wrap(`
    <h2 style="font-family:Georgia,serif;">Tu checklist de requisitos INFONAVIT${nombre ? `, ${nombre}` : ""}</h2>
    <p>Aquí tienes el checklist que descargaste. Si ya juntaste el 70% de los puntos, vale la pena que platiquemos para que no te equivoques en la elección de modalidad.</p>
    <p style="margin:24px 0;"><a href="https://sensabrokers.com/infonavit/agendar" style="display:inline-block;padding:12px 24px;background:#1a4a3a;color:#fff;text-decoration:none;border-radius:6px;">Agendar con Carolina (15 min)</a></p>
    <p>O escríbele directo por <a href="https://wa.me/${wa}">WhatsApp</a>.</p>
  `);
  return sendEmail({ to, subject: "Checklist INFONAVIT — siguiente paso", html });
}

export async function sendAgendarConfirmation(to: string, nombre: string | null) {
  const html = wrap(`
    <h2 style="font-family:Georgia,serif;">Recibimos tu solicitud${nombre ? `, ${nombre}` : ""}</h2>
    <p>Carolina recibió tu mensaje y te contactará en menos de 24 horas hábiles.</p>
    <p>Mientras tanto, si tienes una urgencia, escríbele directo: <a href="https://wa.me/${process.env.CAROLINA_WHATSAPP || "5219991234567"}">WhatsApp Carolina</a>.</p>
  `);
  return sendEmail({ to, subject: "Recibimos tu solicitud — Sensabrokers", html });
}

export async function notifyCarolinaNewLead(lead: {
  nombre?: string | null;
  email?: string | null;
  telefono?: string | null;
  tema?: string | null;
  horario?: string | null;
  source?: string | null;
  modalidad_interes?: string | null;
}) {
  const waNumber = (lead.telefono || "").replace(/\D/g, "");
  const waLink = waNumber ? `https://wa.me/${waNumber}` : null;
  const html = wrap(`
    <h2 style="font-family:Georgia,serif;">🔔 Lead nuevo (${lead.source || "funnel"})</h2>
    <table style="border-collapse:collapse;width:100%;">
      <tr><td style="padding:6px 0;color:#666;">Nombre</td><td><strong>${lead.nombre || "—"}</strong></td></tr>
      <tr><td style="padding:6px 0;color:#666;">Email</td><td><a href="mailto:${lead.email || ""}">${lead.email || "—"}</a></td></tr>
      <tr><td style="padding:6px 0;color:#666;">Teléfono</td><td>${lead.telefono || "—"}</td></tr>
      <tr><td style="padding:6px 0;color:#666;">Tema</td><td>${lead.tema || "—"}</td></tr>
      <tr><td style="padding:6px 0;color:#666;">Horario</td><td>${lead.horario || "—"}</td></tr>
      <tr><td style="padding:6px 0;color:#666;">Modalidad</td><td>${lead.modalidad_interes || "—"}</td></tr>
    </table>
    ${waLink ? `<p style="margin:24px 0;"><a href="${waLink}" style="display:inline-block;padding:12px 24px;background:#25D366;color:#fff;text-decoration:none;border-radius:6px;">Abrir WhatsApp del prospecto</a></p>` : ""}
  `);
  return sendEmail({ to: CAROLINA, subject: `Lead nuevo — ${lead.nombre || lead.email || "sin nombre"}`, html });
}
