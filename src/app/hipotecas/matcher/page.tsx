import type { Metadata } from "next";
import MatcherForm from "@/components/matcher/MatcherForm";
import { Badge, Container, Heading, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Matcher — Encontremos tu hipoteca juntos",
  description:
    "Respóndenos 5 preguntas y te decimos qué hipotecas son reales para ti. Gratis, sin registro, sin compromiso — con una persona escuchando.",
};

export default function MatcherPage() {
  return (
    <Section spacing="xl" className="pt-28">
      <Container width="sm">
        <div className="text-center mb-8">
          <Badge className="mb-3">Matcher · 2 minutos contigo</Badge>
          <Heading as={1} size="2xl" className="font-display">
            Encontremos <span className="warm-underline">tu hipoteca</span> juntos
          </Heading>
          <p className="text-[var(--text-muted)] mt-3 text-sm">
            Sin registro · Sin costo · Sin compromiso · Te responde una persona
          </p>
        </div>
        <MatcherForm />
      </Container>
    </Section>
  );
}
