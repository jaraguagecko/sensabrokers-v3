import type { Metadata } from "next";
import InfonavitCalculadora from "@/components/infonavit/InfonavitCalculadora";
import { Badge, Container, Heading, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Calculadora INFONAVIT — ¿Cuánto crédito me dan?",
  description:
    "Ingresa tu salario, antigüedad y datos básicos para calcular cuántos puntos T100 tienes y cuánto crédito INFONAVIT puedes obtener. Gratis, sin registro.",
};

export default function CalculadoraPage() {
  return (
    <Section spacing="xl" className="pt-32 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(201,162,39,0.08), transparent 60%)",
        }}
      />
      <Container width="sm" className="relative">
        <div className="text-center mb-10">
          <Badge>Modelo T100 · 2026</Badge>
          <Heading as={1} size="3xl" className="mt-6">
            Calculadora <span className="text-accent">INFONAVIT</span>
          </Heading>
          <p className="text-text-muted mt-4 text-sm leading-relaxed max-w-md mx-auto">
            Estimación basada en el sistema de puntos vigente. Resultado en menos de un minuto.
          </p>
        </div>
        <InfonavitCalculadora />
      </Container>
    </Section>
  );
}
