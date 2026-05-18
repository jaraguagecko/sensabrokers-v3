import type { Metadata } from "next";
import MatcherForm from "@/components/matcher/MatcherForm";
import { Badge, Container, Heading, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Matcher hipotecario — Encuentra tu hipoteca ideal",
  description:
    "Responde 5 preguntas y descubre qué hipotecas aplican para tu perfil. Gratis, sin registro. Resultados en 2 minutos.",
};

export default function MatcherPage() {
  return (
    <Section spacing="xl" className="pt-28">
      <Container width="sm">
        <div className="text-center mb-8">
          <Badge className="mb-3">Matcher MVP · 2 minutos</Badge>
          <Heading as={1} size="2xl">Tu hipoteca ideal</Heading>
          <p className="text-gray-400 mt-3 text-sm">
            Sin registro · Sin costo · Sin compromiso
          </p>
        </div>
        <MatcherForm />
      </Container>
    </Section>
  );
}
