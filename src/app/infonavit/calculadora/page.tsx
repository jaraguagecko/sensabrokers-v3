import type { Metadata } from "next";
import InfonavitCalculadora from "@/components/infonavit/InfonavitCalculadora";
import { Badge, Container, Heading, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Calculadora INFONAVIT — Vemos juntos cuánto te dan",
  description:
    "Cuéntanos tu salario, antigüedad y subcuenta. En menos de un minuto te decimos cuántos puntos T100 tienes y cuánto crédito te puede prestar INFONAVIT. Gratis, sin registro.",
};

export default function CalculadoraPage() {
  return (
    <Section spacing="xl" className="pt-32 relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 warm-paper-bg opacity-50 pointer-events-none" />
      <Container width="sm" className="relative">
        <div className="text-center mb-10">
          <Badge>Modelo T100 · 2026</Badge>
          <Heading as={1} size="3xl" className="mt-6 font-display">
            Calculemos juntos{" "}
            <span className="warm-underline">tu INFONAVIT</span>
          </Heading>
          <p className="text-text-muted mt-4 text-sm leading-relaxed max-w-md mx-auto">
            Estimación con el sistema de puntos vigente. Te decimos un número real en menos de un minuto — sin entrar a la página oficial.
          </p>
        </div>
        <InfonavitCalculadora />
      </Container>
    </Section>
  );
}
