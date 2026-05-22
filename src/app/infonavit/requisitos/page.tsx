import type { Metadata } from "next";
import { Badge, Button, Card, Container, Heading, Section } from "@/components/ui";
import RequisitosTracked from "@/components/infonavit/RequisitosTracked";

export const metadata: Metadata = {
  title: "Requisitos INFONAVIT 2026 — Lo que necesitas tener listo",
  description:
    "Te decimos en claro qué papeles necesitas para tu crédito INFONAVIT, en qué orden y cuáles son opcionales. Con una persona dispuesta a ayudarte si algo te falta.",
};

type Doc = { item: string; obligatorio: boolean };
type Categoria = {
  eyebrow: string;
  titulo: string;
  resumen: string;
  docs: Doc[];
};

const categorias: Categoria[] = [
  {
    eyebrow: "01",
    titulo: "Identificación personal",
    resumen: "Documentos básicos que comprueban quién eres.",
    docs: [
      { item: "INE o IFE vigente (ambas caras)", obligatorio: true },
      { item: "CURP", obligatorio: true },
      { item: "RFC con homoclave", obligatorio: true },
      { item: "Acta de nacimiento", obligatorio: true },
    ],
  },
  {
    eyebrow: "02",
    titulo: "Comprobante de domicilio",
    resumen: "Para acreditar tu residencia actual.",
    docs: [
      {
        item: "Recibo de luz, agua, teléfono o predial (máx. 3 meses de antigüedad)",
        obligatorio: true,
      },
    ],
  },
  {
    eyebrow: "03",
    titulo: "Situación laboral e ingresos",
    resumen: "Lo que confirma tu cotización y capacidad de pago.",
    docs: [
      { item: "Número de Seguridad Social (NSS)", obligatorio: true },
      { item: "Constancia de saldo de subcuenta de vivienda", obligatorio: true },
      { item: "Recibos de nómina de los últimos 3 meses", obligatorio: true },
      {
        item: "Carta de trabajo en papel membretado (puesto, antigüedad, salario)",
        obligatorio: true,
      },
      {
        item: "Última declaración anual de impuestos (si eres trabajador independiente)",
        obligatorio: false,
      },
    ],
  },
  {
    eyebrow: "04",
    titulo: "Estado civil",
    resumen: "Sólo si aplica a tu situación personal.",
    docs: [
      { item: "Acta de matrimonio", obligatorio: false },
      { item: "Acta de divorcio o acuerdo de disolución", obligatorio: false },
    ],
  },
  {
    eyebrow: "05",
    titulo: "Información de la propiedad",
    resumen: "Documentación del inmueble que vas a adquirir.",
    docs: [
      { item: "Aviso de privacidad firmado del vendedor", obligatorio: true },
      { item: "Título de propiedad o escrituras (para usado)", obligatorio: true },
      {
        item: "Contrato de compraventa o promesa (para nueva o preventa)",
        obligatorio: false,
      },
      { item: "Avalúo INFONAVIT (lo asigna el Instituto)", obligatorio: true },
    ],
  },
];

const pasos = [
  "Verifica que tienes mínimo 100 puntos en Mi Cuenta INFONAVIT.",
  "Elige tu propiedad y firma carta de intención con el vendedor.",
  "Solicita el avalúo INFONAVIT a través del portal.",
  "Presenta tu solicitud con todos los documentos.",
  "Firma de escrituras ante notario (INFONAVIT lo designa).",
  "Recibes las llaves de tu nueva vivienda.",
];

export default function RequisitosPage() {
  return (
    <>
      <RequisitosTracked />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Cómo tramitar un crédito INFONAVIT",
            description: "Documentos y pasos para obtener tu crédito INFONAVIT en 2026",
            step: pasos.map((s, i) => ({
              "@type": "HowToStep",
              name: s,
              position: i + 1,
            })),
          }),
        }}
      />

      {/* Hero */}
      <Section spacing="xl" className="pt-32 relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 warm-paper-bg opacity-50 pointer-events-none" />
        <Container width="md" className="text-center relative">
          <Badge>Lista 2026</Badge>
          <Heading as={1} size="3xl" className="mt-6 font-display">
            Lo que necesitas{" "}
            <span className="warm-underline">tener listo</span>
          </Heading>
          <p className="text-text-muted mt-4 text-base leading-relaxed max-w-lg mx-auto">
            Te lo ponemos sencillo, agrupado por temas. Lo que dice{" "}
            <span className="text-accent font-semibold">obligatorio</span> es indispensable;
            lo opcional solo si te aplica. Si te falta algo, te decimos dónde lo consigues.
          </p>
        </Container>
      </Section>

      {/* Checklist por categoría */}
      <Section spacing="lg">
        <Container width="md">
          <div className="space-y-6">
            {categorias.map((cat) => {
              const obligatorios = cat.docs.filter((d) => d.obligatorio).length;
              const opcionales = cat.docs.length - obligatorios;
              return (
                <Card key={cat.titulo} padding="lg">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="text-accent font-mono text-sm mb-1">{cat.eyebrow}</div>
                      <Heading as={2} size="md" className="font-display">{cat.titulo}</Heading>
                      <p className="text-text-muted text-sm mt-1 leading-relaxed">
                        {cat.resumen}
                      </p>
                    </div>
                    <div className="shrink-0 flex flex-col items-end gap-1">
                      <Badge size="sm">
                        {obligatorios} {obligatorios === 1 ? "obligatorio" : "obligatorios"}
                      </Badge>
                      {opcionales > 0 && (
                        <Badge variant="neutral" size="sm">
                          {opcionales} {opcionales === 1 ? "opcional" : "opcionales"}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-border-subtle">
                    {cat.docs.map((doc) => (
                      <li
                        key={doc.item}
                        className="flex items-start gap-3 text-sm pt-3"
                      >
                        <span
                          className={
                            "mt-0.5 shrink-0 inline-flex w-5 h-5 items-center justify-center rounded-[var(--radius-sm)] border " +
                            (doc.obligatorio
                              ? "border-[var(--accent)] bg-[rgba(201,162,39,0.15)] text-[var(--accent)]"
                              : "border-[var(--border-strong)] text-text-subtle")
                          }
                          aria-hidden="true"
                        >
                          {doc.obligatorio ? "✓" : ""}
                        </span>
                        <span
                          className={
                            doc.obligatorio
                              ? "text-[var(--text-primary)]"
                              : "text-text-muted"
                          }
                        >
                          {doc.item}
                          {!doc.obligatorio && (
                            <span className="ml-2 text-xs text-text-subtle">
                              (si aplica)
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Pasos del trámite */}
      <Section spacing="lg" tone="muted">
        <Container width="md">
          <div className="text-center mb-10">
            <Heading as={2} size="2xl" className="font-display">De los puntos a las llaves</Heading>
            <p className="text-text-muted mt-3 text-sm">
              El camino completo, paso a paso, con quien te avisa en cada momento.
            </p>
          </div>
          <ol className="space-y-4">
            {pasos.map((step, i) => (
              <li key={i}>
                <Card padding="md">
                  <div className="flex gap-4 items-start">
                    <span
                      className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-[var(--text-onbrand)]"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--brand-gold), var(--brand-gold-light))",
                      }}
                    >
                      {i + 1}
                    </span>
                    <p className="text-text-muted text-sm pt-1.5 leading-relaxed">
                      {step}
                    </p>
                  </div>
                </Card>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* CTA */}
      <Section spacing="xl" className="text-center">
        <Container width="sm">
          <Heading as={2} size="2xl" className="mb-4 font-display">
            ¿Te falta un papel o tienes una duda?
          </Heading>
          <p className="text-text-muted mb-10 leading-relaxed">
            Escríbenos por WhatsApp y Daniela te orienta — sin costo, sin compromiso, y sin que tengas que armar un expediente perfecto antes de hablar con nosotros.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="https://wa.me/529999999999" external size="lg">
              Escribir por WhatsApp
            </Button>
            <Button href="/infonavit/calculadora" variant="secondary" size="lg">
              Calcular mis puntos
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
