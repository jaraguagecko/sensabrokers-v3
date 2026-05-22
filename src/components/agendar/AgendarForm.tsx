"use client";
import { useState } from "react";
import { Button, Card, Input, Select, Textarea } from "@/components/ui";
import { track, FunnelEvent } from "@/lib/analytics";

const TEMAS = [
  { value: "", label: "¿Sobre qué quieres hablar?" },
  { value: "calculadora_infonavit", label: "Revisar mi puntuación INFONAVIT" },
  { value: "cofinavit", label: "COFINAVIT (credito mixto)" },
  { value: "hipoteca_banco", label: "Hipoteca bancaria" },
  { value: "terreno_construccion", label: "Terreno + crédito construcción" },
  { value: "otro", label: "Otro" },
];

const HORARIOS = [
  { value: "", label: "¿Cuándo prefieres?" },
  { value: "manana", label: "Mañanas (9–12 h)" },
  { value: "tarde", label: "Tardes (13–17 h)" },
  { value: "flexible", label: "Flexible" },
];

export default function AgendarForm() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    tema: "",
    horario: "",
    notas: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function set(field: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/agendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre.trim(),
          email: form.email.trim(),
          telefono: form.telefono.trim(),
          tema: form.tema,
          horario: form.horario,
          payload: form.notas ? { notas: form.notas.trim() } : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrorMsg(data.error === "invalid_email" ? "El email no es válido." : "Algo salió mal, intenta de nuevo.");
        setStatus("error");
        return;
      }
      track(FunnelEvent.AgendarSubmitted, { tema: form.tema, horario: form.horario });
      setStatus("success");
    } catch {
      setErrorMsg("Error de red. Intenta de nuevo.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <Card className="p-8 text-center">
        <div className="text-4xl mb-4">🎉</div>
        <h3 className="font-display text-xl font-semibold mb-2">¡Carolina te contactará pronto!</h3>
        <p className="text-[var(--text-muted)] text-sm mb-4">
          Recibimos tu solicitud. Carolina te escribirá en menos de 24 horas hábiles.
        </p>
        <p className="text-sm text-[var(--text-subtle)]">
          ¿Urgente? Escríbele directo por{" "}
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_CAROLINA_WHATSAPP || "5219991234567"}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-[var(--accent)]"
          >
            WhatsApp
          </a>
          .
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ag-nombre" className="block text-sm font-medium mb-1">Nombre *</label>
            <Input id="ag-nombre" type="text" placeholder="María García" value={form.nombre} onChange={set("nombre")} required autoComplete="name" />
          </div>
          <div>
            <label htmlFor="ag-telefono" className="block text-sm font-medium mb-1">WhatsApp / Teléfono *</label>
            <Input id="ag-telefono" type="tel" placeholder="+52 999 123 4567" value={form.telefono} onChange={set("telefono")} required autoComplete="tel" />
          </div>
        </div>
        <div>
          <label htmlFor="ag-email" className="block text-sm font-medium mb-1">Email *</label>
          <Input id="ag-email" type="email" placeholder="maria@ejemplo.com" value={form.email} onChange={set("email")} required autoComplete="email" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ag-tema" className="block text-sm font-medium mb-1">Tema</label>
            <Select id="ag-tema" value={form.tema} onChange={set("tema")}>
              {TEMAS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </Select>
          </div>
          <div>
            <label htmlFor="ag-horario" className="block text-sm font-medium mb-1">Horario preferido</label>
            <Select id="ag-horario" value={form.horario} onChange={set("horario")}>
              {HORARIOS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </Select>
          </div>
        </div>
        <div>
          <label htmlFor="ag-notas" className="block text-sm font-medium mb-1">Notas (opcional)</label>
          <Textarea id="ag-notas" placeholder="Cuéntanos brevemente tu situación…" value={form.notas} onChange={set("notas")} rows={3} />
        </div>
        {status === "error" && (
          <p className="text-sm text-red-500">{errorMsg}</p>
        )}
        <Button type="submit" variant="primary" size="lg" disabled={status === "loading" || !form.nombre || !form.email || !form.telefono} className="w-full">
          {status === "loading" ? "Enviando…" : "Solicitar cita con Carolina →"}
        </Button>
        <p className="text-xs text-[var(--text-subtle)] text-center">Sin costo. Carolina te contacta dentro de 24 horas hábiles.</p>
      </form>
    </Card>
  );
}
