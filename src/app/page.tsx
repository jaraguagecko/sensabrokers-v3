import type { Metadata } from "next";
import { Badge, Button, Card, Container, Heading, ScrollReveal, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Sensabrokers — Tu broker hipotecario en Yucatán",
  description:
    "Conectamos tu perfil con las mejores opciones hipotecarias y de crédito INFONAVIT en Yucatán. Transparencia total, comisión al cierre.",
};

type Service = {
  title: string;
  description: string;
  cta: string;
  href: string;
  badge: string;
  available: boolean;
};

const services: Service[] = [
  {
    title: "Hipotecas bancarias",
    description:
      "Comparamos 8+ bancos y SOFOM para encontrar la tasa más baja para tu perfil. Ingresos formales, informales o mixtos bienvenidos.",
    cta: "Usar el Matcher",
    href: "/hipotecas/matcher",
    badge: "Disponible",
    available: true,
  },
  {
    title: "Crédito INFONAVIT",
    description:
      "Calcula cuánto crédito te da el instituto según tus puntos, salario y antigüedad. Checklist y guía de requisitos incluidos.",
    cta: "Calcular mi crédito",
    href: "/infonavit/calculadora",
    badge: "Disponible",
    available: true,
  },
  {
    title: "Inversiones inmobiliarias",
    description:
      "Preventas y oportunidades de inversión en Yucatán con análisis de ROI proyectado y financiamiento integrado.",
    cta: "Próximamente",
    href: "#fase2",
    badge: "Fase 2",
    available: false,
  },
  {
    title: "IA inmobiliaria",
    description:
      "Asistente de valuación, análisis de colonias y matching de propiedades impulsado por inteligencia artificial.",
    cta: "En desarrollo",
    href: "#fase3",
    badge: "Fase 3",
    available: false,
  },
];

const differentiators = [
  {
    title: "Transparencia total",
    body: "Comisión del 0.5% sobre el crédito aprobado, pagadera al cierre. Sin cargos ocultos ni cuotas de consultoría.",
  },
  {
    title: "Ingresos informales bienvenidos",
    body: "Somos especialistas en perfiles mixtos, freelancers y negocios propios. Conocemos productos que los bancos no te muestran.",
  },
  {
    title: "Resultado en 2 minutos",
    body: "El matcher evalúa tu perfil contra 9 productos hipotecarios en segundos y te muestra tus mejores opciones reales.",
  },
  {
    title: "Primer broker con matcher",
    body: "Ningún competidor en Yucatán tiene una herramienta de matching automático. Tú llegas primero.",
  },
];

const stats = [
  { label: "Productos hipotecarios", value: "9+" },
  { label: "Bancos y SOFOM", value: "8+" },
  { label: "Comisión sobre crédito", value: "0.5%" },
  { label: "Pago de comisión", value: "Al cierre" },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Sensabrokers",
            description: "Broker hipotecario independiente en Yucatán, México.",
            url: "https://sensabrokers.com",
            areaServed: {
              "@type": "City",
              name: "Mérida",
              containedInPlace: { "@type": "State", name: "Yucatán" },
            },
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
          <Badge>Broker hipotecario independiente · Yucatán</Badge>
          <Heading as={1} size="4xl" className="mt-6">
            Tu hipoteca ideal,{" "}
            <span className="text-accent">sin adivinar</span>
          </Heading>
          <p className="mt-6 text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
            Evaluamos tu perfil y te mostramos las mejores opciones reales — sin sesgos, sin favoritismos al banco. Ingresos formales, informales o mixtos bienvenidos.
          </p>
          <div className="mt-10 flex justify-center">
            <Button href="/hipotecas/matcher" variant="primary" size="lg">
              Usar el Matcher gratis →
            </Button>
          </div>
          <p className="mt-4 text-xs text-text-subtle">
            Sin registro · Sin costo · Resultado en 2 minutos
          </p>
        </Container>
      </Section>

      {/* Stats / social proof placeholder */}
      <Section spacing="md">
        <Container>
          <ScrollReveal className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div
                key={s.label}
                className="text-center border-l border-border-subtle first:border-l-0 md:border-l px-4"
              >
                <div className="text-2xl md:text-3xl font-bold text-accent">{s.value}</div>
                <div className="mt-1 text-xs text-text-subtle uppercase tracking-[var(--tracking-wide)]">
                  {s.label}
                </div>
              </div>
            ))}
          </ScrollReveal>
        </Container>
      </Section>

      {/* Services */}
      <Section spacing="lg">
        <Container>
          <ScrollReveal className="text-center mb-12">
            <Heading as={2} size="2xl">Servicios</Heading>
            <p className="text-text-muted mt-3 text-sm">
              Selecciona lo que mejor se adapta a tu situación
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 80}>
                <Card
                  padding="lg"
                  interactive={s.available}
                  className={`flex flex-col gap-5 h-full ${s.available ? "" : "opacity-60"}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <Heading as={3} size="md">{s.title}</Heading>
                    <Badge variant={s.available ? "gold" : "neutral"} size="sm">{s.badge}</Badge>
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed">{s.description}</p>
                  <div className="mt-auto pt-2">
                    {s.available ? (
                      <Button href={s.href} variant="secondary" size="sm">
                        {s.cta} →
                      </Button>
                    ) : (
                      <span className="text-text-subtle text-sm font-medium">{s.cta}</span>
                    )}
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Differentiators */}
      <Section spacing="lg" tone="muted" id="nosotros">
        <Container>
          <ScrollReveal className="text-center mb-12">
            <Heading as={2} size="2xl">¿Por qué Sensabrokers?</Heading>
            <p className="text-text-muted mt-3 text-sm">
              El broker que trabaja para ti, no para el banco
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((d, i) => (
              <ScrollReveal key={d.title} delay={i * 70}>
                <Card padding="md" interactive className="h-full">
                  <div className="text-accent font-mono text-sm mb-3">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <Heading as={3} size="sm" className="mb-2">{d.title}</Heading>
                  <p className="text-text-muted text-sm leading-relaxed">{d.body}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section spacing="xl" className="text-center">
        <Container width="sm">
          <ScrollReveal>
            <Heading as={2} size="2xl" className="mb-4">
              ¿Listo para encontrar tu{" "}
              <span className="text-accent">hipoteca ideal</span>?
            </Heading>
            <p className="text-text-muted mb-10 leading-relaxed">
              Responde 5 preguntas y descubre qué opciones aplican para tu perfil — gratis, sin registro.
            </p>
            <Button href="/hipotecas/matcher" size="lg">
              Empezar ahora — es gratis →
            </Button>
          </ScrollReveal>
        </Container>
      </Section>
    </>
  );
}
