import type { Metadata } from "next";
import { Badge, Container, Heading, Section } from "@/components/ui";
import GuiaEmailGate from "@/components/guia/GuiaEmailGate";

export const metadata: Metadata = {
  title: "Guía INFONAVIT Gratis — Todo lo que necesitas saber",
  description:
    "Descarga gratis la guía completa de INFONAVIT: puntos, modalidades, documentos y cómo sacar el mayor crédito posible. Sin registro complicado.",
};

const BENEFICIOS = [
  "Cómo se calculan tus puntos T100 (y cómo subirlos)",
  "Las 3 modalidades y cuál te conviene según tu perfil",
  "Documentos que piden — sin sorpresas en el notario",
  "Errores comunes que retrasan o cancelan el trámite",
  "Qué pasa si tienes terreno propio (opción de construcción)",
];

export default function GuiaPage() {
  return (
    <Section spacing="xl" className="pt-32 relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 warm-paper-bg opacity-50 pointer-events-none" />
      <Container width="sm" className="relative">
        <div className="text-center mb-10">
          <Badge>Guía gratuita · 2026</Badge>
          <Heading as={1} size="3xl" className="mt-6 font-display">
            La guía INFONAVIT que{" "}
            <span className="warm-underline">nadie te da en la oficina</span>
          </Heading>
          <p className="text-[var(--text-muted)] mt-4 text-sm leading-relaxed max-w-md mx-auto">
            Explícita, sin tecnicismos, en español de verdad. Te la enviamos al correo en segundos.
          </p>
        </div>

        <ul className="mb-8 space-y-3">
          {BENEFICIOS.map((b) => (
            <li key={b} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
              <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-xs font-bold">✓</span>
              {b}
            </li>
          ))}
        </ul>

        <GuiaEmailGate />

        <p className="text-center text-xs text-[var(--text-subtle)] mt-6">
          ¿Prefieres hablar directamente?{" "}
          <a href="/infonavit/agendar" className="underline text-[var(--accent)]">
            Agenda con Carolina (gratis)
          </a>
        </p>
      </Container>
    </Section>
  );
}
