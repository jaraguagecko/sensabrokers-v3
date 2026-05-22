import type { Metadata } from "next";
import { Badge, Container, Heading, Section } from "@/components/ui";
import AgendarForm from "@/components/agendar/AgendarForm";

export const metadata: Metadata = {
  title: "Agenda una cita con Carolina — INFONAVIT / Hipoteca",
  description:
    "¿Listo para avanzar con tu crédito INFONAVIT o hipoteca? Agenda una llamada de 15 minutos con Carolina, sin costo y sin compromiso.",
};

export default function AgendarPage() {
  return (
    <Section spacing="xl" className="pt-32 relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 warm-paper-bg opacity-50 pointer-events-none" />
      <Container width="sm" className="relative">
        <div className="text-center mb-10">
          <Badge>Sin costo · 15 minutos</Badge>
          <Heading as={1} size="3xl" className="mt-6 font-display">
            Hablemos de{" "}
            <span className="warm-underline">tu crédito</span>
          </Heading>
          <p className="text-[var(--text-muted)] mt-4 text-sm leading-relaxed max-w-md mx-auto">
            Carolina revisa tu caso en persona. Nada de bots, nada de guiones. Una llamada para saber exactamente dónde estás y qué opciones tienes.
          </p>
        </div>

        <AgendarForm />

        <div className="mt-8 p-4 bg-[var(--surface-1)] rounded-lg text-sm text-[var(--text-muted)] text-center">
          <p>¿Prefieres empezar por tu cuenta?</p>
          <div className="flex justify-center gap-4 mt-2 flex-wrap">
            <a href="/infonavit/calculadora" className="underline text-[var(--accent)]">Calcular mis puntos INFONAVIT</a>
            <a href="/infonavit/guia" className="underline text-[var(--accent)]">Descargar guía gratis</a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
