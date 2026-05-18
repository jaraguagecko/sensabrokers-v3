import type { Metadata } from "next";
import { Badge, Button, Card, Container, Heading, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Hipotecas bancarias en Yucatán",
  description:
    "Compara hipotecas de Banorte, Scotiabank, Santander, HSBC, Citibanamex, HIR Casa y más. El matcher encuentra tu mejor opción según tu perfil en 2 minutos.",
  openGraph: {
    title: "Hipotecas bancarias en Yucatán | Sensabrokers",
    description: "Matcher hipotecario gratuito. Compara 8+ instituciones para tu perfil.",
  },
};

type Bank = {
  name: string;
  tasaDesde: string;
  plazo: string;
  enganche: string;
  ingreso: string;
  perfil: string;
  tags: string[];
};

const banks: Bank[] = [
  {
    name: "Banorte",
    tasaDesde: "9.15%",
    plazo: "20 años",
    enganche: "5%",
    ingreso: "$12,000",
    perfil: "Formal",
    tags: ["Score bueno+"],
  },
  {
    name: "Santander",
    tasaDesde: "9.20%",
    plazo: "20 años",
    enganche: "10%",
    ingreso: "$15,000",
    perfil: "Formal",
    tags: ["Score bueno+"],
  },
  {
    name: "HSBC",
    tasaDesde: "9.30%",
    plazo: "20 años",
    enganche: "10%",
    ingreso: "$15,000",
    perfil: "Formal",
    tags: ["Sin comisión apertura"],
  },
  {
    name: "Scotiabank",
    tasaDesde: "9.50%",
    plazo: "20 años",
    enganche: "25%",
    ingreso: "$10,000",
    perfil: "Formal",
    tags: ["Acepta Infonavit"],
  },
  {
    name: "Citibanamex",
    tasaDesde: "9.50%",
    plazo: "20 años",
    enganche: "10%",
    ingreso: "$15,000",
    perfil: "Formal",
    tags: ["Score bueno+"],
  },
  {
    name: "Afirme",
    tasaDesde: "9.80%",
    plazo: "20 años",
    enganche: "15%",
    ingreso: "$12,000",
    perfil: "Formal / Informal",
    tags: ["Acepta informal"],
  },
  {
    name: "HIR Casa",
    tasaDesde: "9.90% fija",
    plazo: "20 años",
    enganche: "30%",
    ingreso: "$15,000",
    perfil: "Todo tipo ingreso",
    tags: ["Tasa fija", "Acepta informal"],
  },
  {
    name: "MiFel",
    tasaDesde: "10.50%",
    plazo: "20 años",
    enganche: "20%",
    ingreso: "$8,000",
    perfil: "Mixto / Informal",
    tags: ["Score regular", "Acepta informal"],
  },
];

export default function HipotecasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Matcher hipotecario Sensabrokers",
            serviceType: "Intermediación hipotecaria",
            provider: { "@type": "Organization", name: "Sensabrokers" },
            areaServed: { "@type": "State", name: "Yucatán" },
            description: "Herramienta gratuita para comparar hipotecas bancarias según perfil crediticio.",
          }),
        }}
      />

      {/* Hero */}
      <Section spacing="lg" className="pt-32">
        <Container width="lg" className="text-center">
          <Badge className="mb-4">Hipotecas bancarias · 8+ instituciones</Badge>
          <Heading as={1} size="3xl" className="mt-2">
            Encuentra tu{" "}
            <span style={{ color: "var(--accent)" }}>mejor hipoteca</span>
          </Heading>
          <p className="mt-5 text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
            Compara tasa, plazo y requisitos reales — el matcher filtra las opciones
            viables para tu perfil en 2 minutos.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/hipotecas/matcher">Usar el Matcher gratis →</Button>
            <Button
              href="https://calendly.com/sensabrokers/consulta"
              external
              variant="secondary"
            >
              Hablar con Carolina
            </Button>
          </div>
        </Container>
      </Section>

      {/* Banks table */}
      <Section spacing="md">
        <Container width="lg">
          <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
            <div>
              <Heading as={2} size="lg" className="mb-1">Opciones disponibles</Heading>
              <p className="text-[var(--text-subtle)] text-sm">
                Tasas y requisitos orientativos · validados con Creditaria 2026-05-16
              </p>
            </div>
            <Button href="/hipotecas/matcher" variant="secondary" size="sm">
              Filtrar por mi perfil →
            </Button>
          </div>

          {/* Desktop / tablet: real table */}
          <Card padding="none" className="overflow-hidden hidden md:block">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)] bg-[var(--surface-2)]/40">
                    <th className="text-left px-4 py-3 text-[var(--text-subtle)] font-medium uppercase tracking-wide text-xs">Institución</th>
                    <th className="text-left px-4 py-3 text-[var(--text-subtle)] font-medium uppercase tracking-wide text-xs">Tasa desde</th>
                    <th className="text-left px-4 py-3 text-[var(--text-subtle)] font-medium uppercase tracking-wide text-xs">Plazo máx.</th>
                    <th className="text-left px-4 py-3 text-[var(--text-subtle)] font-medium uppercase tracking-wide text-xs">Enganche mín.</th>
                    <th className="text-left px-4 py-3 text-[var(--text-subtle)] font-medium uppercase tracking-wide text-xs">Ingreso mín.</th>
                    <th className="text-left px-4 py-3 text-[var(--text-subtle)] font-medium uppercase tracking-wide text-xs">Perfil</th>
                    <th className="text-left px-4 py-3 text-[var(--text-subtle)] font-medium uppercase tracking-wide text-xs">Beneficios</th>
                  </tr>
                </thead>
                <tbody>
                  {banks.map((b, i) => (
                    <tr
                      key={b.name}
                      className={`border-b border-[var(--border-subtle)] last:border-0 transition-colors hover:bg-[var(--surface-2)]/40 ${
                        i % 2 === 0 ? "" : "bg-[var(--surface-2)]/20"
                      }`}
                    >
                      <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">{b.name}</td>
                      <td className="px-4 py-3 font-semibold" style={{ color: "var(--accent)" }}>{b.tasaDesde}</td>
                      <td className="px-4 py-3 text-[var(--text-muted)]">{b.plazo}</td>
                      <td className="px-4 py-3 text-[var(--text-muted)]">{b.enganche}</td>
                      <td className="px-4 py-3 text-[var(--text-muted)]">{b.ingreso}</td>
                      <td className="px-4 py-3 text-[var(--text-muted)]">{b.perfil}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {b.tags.map((t) => (
                            <Badge key={t} size="sm" variant="neutral">{t}</Badge>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Mobile: cards */}
          <div className="grid gap-3 md:hidden">
            {banks.map((b) => (
              <Card key={b.name} padding="md">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">{b.name}</p>
                    <p className="text-xs text-[var(--text-subtle)] mt-0.5">{b.perfil}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold leading-tight" style={{ color: "var(--accent)" }}>
                      {b.tasaDesde}
                    </p>
                    <p className="text-xs text-[var(--text-subtle)]">desde</p>
                  </div>
                </div>
                <dl className="grid grid-cols-3 gap-2 text-xs border-t border-[var(--border-subtle)] pt-3">
                  <div>
                    <dt className="text-[var(--text-subtle)]">Plazo</dt>
                    <dd className="text-[var(--text-primary)] font-medium mt-0.5">{b.plazo}</dd>
                  </div>
                  <div>
                    <dt className="text-[var(--text-subtle)]">Enganche</dt>
                    <dd className="text-[var(--text-primary)] font-medium mt-0.5">{b.enganche}</dd>
                  </div>
                  <div>
                    <dt className="text-[var(--text-subtle)]">Ingreso</dt>
                    <dd className="text-[var(--text-primary)] font-medium mt-0.5">{b.ingreso}</dd>
                  </div>
                </dl>
                {b.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {b.tags.map((t) => (
                      <Badge key={t} size="sm" variant="neutral">{t}</Badge>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>

          <p className="text-xs text-[var(--text-subtle)] mt-4">
            * Tasas anuales orientativas. Sujetas a aprobación y perfil crediticio.
            Fuente: Creditaria y páginas oficiales de cada institución.
          </p>
        </Container>
      </Section>

      {/* CTA matcher */}
      <Section spacing="lg" className="text-center">
        <Container width="sm">
          <Card padding="lg">
            <Heading as={2} size="xl" className="mb-3">¿Cuál es la mejor para ti?</Heading>
            <p className="text-[var(--text-muted)] mb-6 text-sm">
              El matcher analiza tu ingreso, monto, enganche y propósito para mostrarte
              únicamente las opciones viables — sin sesgos.
            </p>
            <Button href="/hipotecas/matcher">Iniciar matcher → 2 min</Button>
          </Card>
        </Container>
      </Section>
    </>
  );
}
