import type { Metadata } from "next";
import { Badge, Button, Card, Container, Heading, ScrollReveal, Section } from "@/components/ui";
import AdvisorCard from "@/components/warm/AdvisorCard";
import Testimonial from "@/components/warm/Testimonial";
import TrustStrip from "@/components/warm/TrustStrip";

export const metadata: Metadata = {
  title: "Sensabrokers — Te acompañamos hasta las llaves de tu casa",
  description:
    "Asesoría hipotecaria humana en Yucatán. Comparamos opciones contigo, te escribimos por WhatsApp y no cobramos hasta el cierre.",
};

type Service = {
  title: string;
  description: string;
  cta: string;
  href: string;
};

const services: Service[] = [
  {
    title: "Hipotecas con bancos",
    description:
      "Nos sentamos contigo, miramos tu situación y comparamos 8+ bancos y SOFOM para encontrar la tasa que de verdad te conviene. Tus ingresos pueden ser formales, informales o mixtos — los escuchamos sin juzgar.",
    cta: "Probar el matcher",
    href: "/hipotecas/matcher",
  },
  {
    title: "Crédito INFONAVIT",
    description:
      "Te explicamos en claro cuánto te presta el instituto según tus puntos, tu salario y tu antigüedad. Sin tecnicismos, sin que te marees con la calculadora oficial.",
    cta: "Calcular contigo",
    href: "/infonavit/calculadora",
  },
];

const valores = [
  {
    title: "Te respondemos como vecinos",
    body: "Cuando nos escribas, te contesta una persona — con su nombre, su WhatsApp y sus horarios. No turnos de bot, no formularios eternos.",
  },
  {
    title: "No cobramos hasta el cierre",
    body: "Nuestra comisión es del 0.5% sobre el crédito aprobado y se paga cuando firmas las llaves. Si no logramos tu casa, no nos cobramos nada.",
  },
  {
    title: "Entendemos ingresos informales",
    body: "Si trabajas por tu cuenta, tienes tu negocio o mezclas ingresos, sabemos exactamente qué bancos te van a escuchar — y cuáles no vale la pena ni tocar.",
  },
  {
    title: "Decidimos contigo, no por ti",
    body: "Te ponemos las opciones en la mesa, te explicamos los pros y los contras, y tú decides. Nosotros solo acompañamos.",
  },
];

const stats = [
  { label: "Bancos y SOFOM aliados", value: "8+" },
  { label: "Productos hipotecarios", value: "9+" },
  { label: "Comisión sobre el crédito", value: "0.5%" },
  { label: "Cuándo nos pagas", value: "Al cierre" },
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

      {/* Hero — warm, conversacional */}
      <Section spacing="xl" className="pt-32 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none warm-paper-bg opacity-60"
        />
        <Container width="lg" className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <Badge>Asesoría hipotecaria humana · Yucatán</Badge>
              <Heading as={1} size="4xl" className="mt-6 font-display">
                Te ayudamos a encontrar{" "}
                <span className="warm-underline">tu casa</span>,
                <br className="hidden sm:block" />
                sin que te marees con tasas.
              </Heading>
              <p className="mt-6 text-lg text-text-muted max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Somos un broker hipotecario independiente en Mérida.
                Nos sentamos contigo, comparamos opciones reales, y te acompañamos
                paso a paso hasta el día en que recibes las llaves.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Button href="/hipotecas/matcher" variant="primary" size="lg">
                  Empezar contigo →
                </Button>
                <Button
                  href="https://wa.me/529999999999"
                  external
                  variant="secondary"
                  size="lg"
                >
                  Escríbenos por WhatsApp
                </Button>
              </div>
              <p className="mt-4 text-xs text-text-subtle">
                Sin registro · Sin costo · Te respondemos hoy mismo
              </p>
            </div>

            <div className="relative">
              <AdvisorCard />
            </div>
          </div>
        </Container>
      </Section>

      {/* Trust strip */}
      <Section spacing="sm">
        <Container>
          <ScrollReveal>
            <TrustStrip />
          </ScrollReveal>
        </Container>
      </Section>

      {/* Stats */}
      <Section spacing="md">
        <Container>
          <ScrollReveal className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div
                key={s.label}
                className="text-center border-l border-border-subtle first:border-l-0 md:border-l px-4"
              >
                <div className="text-2xl md:text-3xl font-display font-bold text-accent">{s.value}</div>
                <div className="mt-1 text-xs text-text-subtle uppercase tracking-[var(--tracking-wide)]">
                  {s.label}
                </div>
              </div>
            ))}
          </ScrollReveal>
        </Container>
      </Section>

      {/* Servicios */}
      <Section spacing="lg">
        <Container>
          <ScrollReveal className="text-center mb-12">
            <Heading as={2} size="2xl" className="font-display">
              ¿En qué te acompañamos?
            </Heading>
            <p className="text-text-muted mt-3 text-sm max-w-xl mx-auto">
              Dos caminos, una misma manera de trabajar: contigo, no por ti.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 80}>
                <Card padding="lg" interactive className="flex flex-col gap-5 h-full">
                  <div className="flex items-start justify-between gap-3">
                    <Heading as={3} size="md" className="font-display">{s.title}</Heading>
                    <Badge variant="gold" size="sm">Disponible</Badge>
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed">{s.description}</p>
                  <div className="mt-auto pt-2">
                    <Button href={s.href} variant="secondary" size="sm">
                      {s.cta} →
                    </Button>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Testimonial */}
      <Section spacing="lg" tone="muted">
        <Container width="md">
          <ScrollReveal>
            <Testimonial
              quote="Daniela nos escribió por WhatsApp el mismo día. Nos explicó todo en palabras de uso diario, comparó tres bancos con nuestros números, y al final cerramos con la tasa más baja. Sentimos que teníamos a alguien de la familia ayudándonos."
              name="Carmen, 38"
              detail="Mérida · compró su primera casa en 2024"
            />
          </ScrollReveal>
        </Container>
      </Section>

      {/* Valores */}
      <Section spacing="lg" id="nosotros">
        <Container>
          <ScrollReveal className="text-center mb-12">
            <Heading as={2} size="2xl" className="font-display">
              Así trabajamos contigo
            </Heading>
            <p className="text-text-muted mt-3 text-sm max-w-xl mx-auto">
              Cuatro cosas que nos importan más que cerrar la venta.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valores.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 70}>
                <Card padding="md" interactive className="h-full">
                  <div className="text-accent font-mono text-sm mb-3">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <Heading as={3} size="sm" className="mb-2 font-display">{v.title}</Heading>
                  <p className="text-text-muted text-sm leading-relaxed">{v.body}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA final */}
      <Section spacing="xl" className="text-center">
        <Container width="sm">
          <ScrollReveal>
            <Heading as={2} size="2xl" className="mb-4 font-display">
              ¿Empezamos a buscar{" "}
              <span className="warm-underline">tu casa</span>?
            </Heading>
            <p className="text-text-muted mb-10 leading-relaxed">
              Cuéntanos un poco sobre tu situación. En dos minutos te decimos qué opciones reales tienes — gratis, sin registro, y con una persona de verdad escuchando.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button href="/hipotecas/matcher" size="lg">
                Probar el matcher
              </Button>
              <Button href="https://wa.me/529999999999" external variant="secondary" size="lg">
                Hablar por WhatsApp
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </>
  );
}
