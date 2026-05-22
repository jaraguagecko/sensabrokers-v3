"use client";
import { useState } from "react";
import { Button, Card, Input } from "@/components/ui";
import { track, FunnelEvent } from "@/lib/analytics";

export default function GuiaEmailGate() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/guide-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nombre.trim(), email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrorMsg(data.error === "invalid_email" ? "El email no es válido." : "Algo salió mal, intenta de nuevo.");
        setStatus("error");
        return;
      }
      track(FunnelEvent.GuiaEmailSubmitted, { email_domain: email.split("@")[1] });
      setDownloadUrl(data.download_url);
      setStatus("success");
    } catch {
      setErrorMsg("Error de red. Intenta de nuevo.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <Card className="p-8 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="font-display text-xl font-semibold mb-2">¡Te enviamos la guía!</h3>
        <p className="text-[var(--text-muted)] text-sm mb-6">
          Revisa tu inbox (y el spam, por si acaso). También puedes descargarla directamente:
        </p>
        {downloadUrl && (
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-white rounded-md font-semibold hover:opacity-90 transition-opacity"
          >
            Descargar guía PDF →
          </a>
        )}
        <p className="mt-6 text-xs text-[var(--text-subtle)]">
          ¿Lista para el siguiente paso?{" "}
          <a href="/infonavit/agendar" className="underline text-[var(--accent)]">
            Agenda con Carolina
          </a>
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="guia-nombre" className="block text-sm font-medium mb-1">
            Tu nombre
          </label>
          <Input
            id="guia-nombre"
            type="text"
            placeholder="María García"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            autoComplete="given-name"
          />
        </div>
        <div>
          <label htmlFor="guia-email" className="block text-sm font-medium mb-1">
            Tu email <span className="text-[var(--text-subtle)] font-normal">(te enviamos la guía aquí)</span>
          </label>
          <Input
            id="guia-email"
            type="email"
            placeholder="maria@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        {status === "error" && (
          <p className="text-sm text-red-500">{errorMsg}</p>
        )}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={status === "loading" || !email}
          className="w-full"
        >
          {status === "loading" ? "Enviando…" : "Enviarme la guía gratis →"}
        </Button>
        <p className="text-xs text-[var(--text-subtle)] text-center">
          Sin spam. Solo la guía y, si quieres, una llamada con Carolina.
        </p>
      </form>
    </Card>
  );
}
