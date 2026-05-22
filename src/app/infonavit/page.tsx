import type { Metadata } from "next";
import { Badge, Button, Card, Container, Heading, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Crédito INFONAVIT — Te ayudamos a entenderlo",
  description:
    "Te explicamos en claro cuánto crédito INFONAVIT te corresponde según tus puntos, salario y antigüedad. Sin tecnicismos, con un asesor humano.",
  openGraph: {
    title: "INFONAVIT con asesor humano | Sensabrokers Yucatán",
    description: "Calculamos juntos cuánto te da INFONAVIT. Gratis, sin registro, con explicación humana.",
  },
};

const features = [
  {
    eyebrow: "Primero",
    title: "Calculamos juntos tus puntos",
    body: "Te decimos cuántos puntos T100 tienes y, en palabras de uso diario, cuánto te puede prestar el instituto. Sin que tengas que descifrar la página oficial.",
    href: "/infonavit/calculadora",
    cta: "Empezar contigo",
  },
  {
    eyebrow: "Después",
    title: "Te decimos qué papeles necesitas",
    body: "Una lista clara, dividida en lo que es obligatorio y lo que conviene tener a la mano. Si te falta uno, te decimos dónde lo consigues.",
    href: "/infonavit/requisitos",
    cta: "Ver la lista",
  },
  {
    eyebrow: "Si conviene",
    title: "INFONAVIT + banco (Cofinavit)",
    body: "Si lo que te da el instituto no alcanza para tu casa, te explicamos cómo sumarle un crédito de banco — sin perder la tasa social.",
    href: "/hipotecas/matcher",
    cta: "Explorar contigo",
  },
];

const faq = [
  {
    q: "¿Cuántos puntos necesito para que me den crédito?",
    a: "Con el Modelo T100 (vigente desde 2024) necesitas mínimo 100 puntos. Si quieres, te ayudamos a calcularlos en dos minutos — sin entrar a la página oficial.",
  },
  {
    q: "Ya usé mi crédito antes. ¿Me dan otro?",
    a: "Sí, si ya pagaste el primero por completo. Te explicamos qué opciones de segundo crédito hay (incluido HIR Casa) y cuál te conviene más.",
  },
  {
    q: "¿Puedo juntar INFONAVIT con un banco?",
    a: "Sí. Se llama Cofinavit y suma tu crédito INFONAVIT con uno bancario para llegar al monto que necesitas — manteniendo la tasa social. Te lo explicamos sin tecnicismos.",
  },
  {
    q: "¿Cuánto tarda todo el trámite?",
    a: "Con los puntos listos y los papeles a la mano, suele tomar 4 a 8 semanas. Daniela te avisa por WhatsApp en cada paso para que no te quedes esperando sin saber qué pasa.",
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
        <div aria-hidden="true" className="absolute inset-0 warm-paper-bg opacity-50 pointer-events-none" />
        <Container width="lg" className="text-center relative">
          <Badge>INFONAVIT · Modelo T100 2026</Badge>
          <Heading as={1} size="4xl" className="mt-6 font-display">
            ¿Cuánto te ayuda{" "}
            <span className="warm-underline">INFONAVIT</span>?
          </Heading>
          <p className="mt-6 text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
            Te explicamos en claro, con tus números reales, cuánto te puede
            prestar el instituto. Sin descifrar la página oficial, sin tecnicismos
            — y con una persona dispuesta a contestarte si tienes dudas.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/infonavit/calculadora" size="lg">
              Calcular contigo →
            </Button>
            <Button href="/infonavit/requisitos" variant="secondary" size="lg">
              Ver qué necesito
            </Button>
          </div>
          <p className="mt-4 text-xs text-text-subtle">
            Sin registro · Sin costo · Te respondemos hoy mismo
          </p>
        </Container>
      </Section>

      {/* Features / Steps */}
      <Section spacing="lg">
        <Container>
          <div className="text-center mb-12">
            <Heading as={2} size="2xl" className="font-display">Te acompañamos en 3 pasos</Heading>
            <p className="text-text-muted mt-3 text-sm">
              Calculamos contigo, juntamos los papeles, y si hace falta lo sumamos a un banco.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <Card key={f.title} padding="lg" className="flex flex-col gap-4">
                <div className="text-accent font-mono text-sm">{f.eyebrow}</div>
                <Heading as={3} size="md" className="font-display">{f.title}</Heading>
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
            <Heading as={2} size="2xl" className="font-display">Lo que más nos preguntan</Heading>
            <p className="text-text-muted mt-3 text-sm">
              Dudas reales de personas reales, contestadas en español de uso diario.
            </p>
          </div>
          <div className="space-y-4">
            {faq.map((item) => (
              <Card key={item.q} padding="md">
                <Heading as={3} size="sm" className="mb-2 font-display">{item.q}</Heading>
                <p className="text-text-muted text-sm leading-relaxed">{item.a}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section spacing="xl" className="text-center">
        <Container width="sm">
          <Heading as={2} size="2xl" className="mb-4 font-display">
            ¿Vemos juntos{" "}
            <span className="warm-underline">cuánto te toca</span>?
          </Heading>
          <p className="text-text-muted mb-10 leading-relaxed">
            Cuéntanos tu salario IMSS, tu antigüedad y lo que tienes en la subcuenta. En dos minutos te decimos si calificas y cuánto te pueden prestar.
          </p>
          <Button href="/infonavit/calculadora" size="lg">
            Calcular contigo — es gratis
          </Button>
        </Container>
      </Section>
    </>
  );
}
