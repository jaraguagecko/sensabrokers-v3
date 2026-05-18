import type { Metadata } from "next";
import { Badge, Button, Card, Container, Heading, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Crédito INFONAVIT — Calculadora y requisitos",
  description:
    "Calcula cuánto crédito INFONAVIT te corresponde según tus puntos, salario y antigüedad. Checklist de requisitos y guía gratuita para derechohabientes en Yucatán.",
  openGraph: {
    title: "Calculadora INFONAVIT | Sensabrokers Yucatán",
    description: "Descubre cuánto crédito INFONAVIT te dan en 2 minutos. Gratis, sin registro.",
  },
};

const features = [
  {
    eyebrow: "Paso 1",
    title: "Calculadora de puntos",
    body: "Estima tus puntos T100 y el monto orientativo del crédito a partir de tu salario IMSS, antigüedad cotizando y subcuenta.",
    href: "/infonavit/calculadora",
    cta: "Calcular mi crédito",
  },
  {
    eyebrow: "Paso 2",
    title: "Checklist de requisitos",
    body: "Documentos por categoría —identificación, laboral, propiedad— marcados como obligatorios u opcionales.",
    href: "/infonavit/requisitos",
    cta: "Ver checklist",
  },
  {
    eyebrow: "Paso 3",
    title: "INFONAVIT + banco (Cofinavit)",
    body: "¿Tu crédito INFONAVIT no alcanza? Combínalo con uno bancario para aumentar el monto y mantener la tasa social.",
    href: "/hipotecas/matcher",
    cta: "Explorar opciones",
  },
];

const faq = [
  {
    q: "¿Cuántos puntos necesito para obtener crédito INFONAVIT?",
    a: "Con el Modelo T100 (vigente desde 2024), necesitas mínimo 100 puntos. La calculadora te dice cuántos tienes según tu perfil.",
  },
  {
    q: "¿Qué pasa si ya usé mi crédito INFONAVIT?",
    a: "Si pagaste tu crédito anterior completamente, puedes solicitar un segundo crédito. HIR Casa también acepta perfiles con segundo crédito.",
  },
  {
    q: "¿Puedo combinar INFONAVIT con un crédito bancario?",
    a: "Sí, el esquema Cofinavit permite sumar tu crédito INFONAVIT con uno bancario para aumentar el monto total. Scotiabank, por ejemplo, acepta este esquema.",
  },
  {
    q: "¿Cuánto tarda el trámite?",
    a: "Una vez con tus puntos completos y documentos listos, el proceso suele tomar 4–8 semanas. Carolina te guía en cada paso.",
  },
];

export default function InfonavitPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      {/* Hero */}
      <Section spacing="xl" className="pt-32 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(201,162,39,0.10), transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(13,27,42,0.6), transparent 70%)",
          }}
        />
        <Container width="lg" className="text-center relative">
          <Badge>INFONAVIT · Modelo T100 2026</Badge>
          <Heading as={1} size="4xl" className="mt-6">
            ¿Cuánto crédito{" "}
            <span className="text-accent">te da INFONAVIT</span>?
          </Heading>
          <p className="mt-6 text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
            Calculadora gratuita basada en el Modelo T100. Ingresa tu salario, antigüedad y datos básicos para estimar tu crédito en menos de 2 minutos.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/infonavit/calculadora" size="lg">
              Calcular mi crédito →
            </Button>
            <Button href="/infonavit/requisitos" variant="secondary" size="lg">
              Ver requisitos
            </Button>
          </div>
          <p className="mt-4 text-xs text-text-subtle">
            Sin registro · Sin costo · Estimación orientativa
          </p>
        </Container>
      </Section>

      {/* Features / Steps */}
      <Section spacing="lg">
        <Container>
          <div className="text-center mb-12">
            <Heading as={2} size="2xl">Tu ruta INFONAVIT en 3 pasos</Heading>
            <p className="text-text-muted mt-3 text-sm">
              Calcula, prepara documentos y, si conviene, combínalo con un banco.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <Card key={f.title} padding="lg" className="flex flex-col gap-4">
                <div className="text-accent font-mono text-sm">{f.eyebrow}</div>
                <Heading as={3} size="md">{f.title}</Heading>
                <p className="text-text-muted text-sm leading-relaxed flex-1">{f.body}</p>
                <div className="pt-2">
                  <Button href={f.href} variant="secondary" size="sm">
                    {f.cta} →
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section spacing="lg" tone="muted">
        <Container width="md">
          <div className="text-center mb-12">
            <Heading as={2} size="2xl">Preguntas frecuentes</Heading>
            <p className="text-text-muted mt-3 text-sm">
              Lo que más nos preguntan sobre el Modelo T100 y el trámite.
            </p>
          </div>
          <div className="space-y-4">
            {faq.map((item) => (
              <Card key={item.q} padding="md">
                <Heading as={3} size="sm" className="mb-2">{item.q}</Heading>
                <p className="text-text-muted text-sm leading-relaxed">{item.a}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section spacing="xl" className="text-center">
        <Container width="sm">
          <Heading as={2} size="2xl" className="mb-4">
            ¿Listo para saber{" "}
            <span className="text-accent">cuánto te toca</span>?
          </Heading>
          <p className="text-text-muted mb-10 leading-relaxed">
            Ingresa tu salario IMSS, antigüedad y subcuenta. Te decimos si calificas y un estimado del monto.
          </p>
          <Button href="/infonavit/calculadora" size="lg">
            Calcular mi crédito — gratis →
          </Button>
        </Container>
      </Section>
    </>
  );
}
