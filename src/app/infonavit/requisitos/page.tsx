import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Requisitos INFONAVIT 2026 — Checklist completo",
  description:
    "Lista completa de documentos y requisitos para tramitar tu crédito INFONAVIT en 2026. Descarga el checklist o agenda con Carolina para que te oriente.",
};

const requisitos = [
  {
    categoria: "Identificación",
    docs: [
      { item: "INE o IFE vigente (ambas caras)", obligatorio: true },
      { item: "CURP", obligatorio: true },
      { item: "RFC con homoclave", obligatorio: true },
      { item: "Acta de nacimiento", obligatorio: true },
    ],
  },
  {
    categoria: "Comprobante de domicilio",
    docs: [
      { item: "Recibo de luz, agua, teléfono o predial (máx. 3 meses de antigüedad)", obligatorio: true },
    ],
  },
  {
    categoria: "Situación laboral",
    docs: [
      { item: "Número de Seguridad Social (NSS)", obligatorio: true },
      { item: "Constancia de saldo de subcuenta de vivienda", obligatorio: true },
      { item: "Recibos de nómina de los últimos 3 meses", obligatorio: true },
      { item: "Carta de trabajo en papel membretado (con puesto, antigüedad, salario)", obligatorio: true },
      { item: "Última declaración anual de impuestos (si eres trabajador independiente)", obligatorio: false },
    ],
  },
  {
    categoria: "Estado civil",
    docs: [
      { item: "Acta de matrimonio (si aplica)", obligatorio: false },
      { item: "Acta de divorcio o acuerdo de disolución (si aplica)", obligatorio: false },
    ],
  },
  {
    categoria: "Información de la propiedad",
    docs: [
      { item: "Aviso de privacidad firmado del vendedor", obligatorio: true },
      { item: "Título de propiedad o escrituras (para usado)", obligatorio: true },
      { item: "Contrato de compraventa o promesa (para nueva o preventa)", obligatorio: false },
      { item: "Avalúo INFONAVIT (lo asigna el Instituto)", obligatorio: true },
    ],
  },
];

export default function RequisitosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Cómo tramitar un crédito INFONAVIT",
            description: "Documentos y pasos para obtener tu crédito INFONAVIT en 2026",
            step: [
              { "@type": "HowToStep", name: "Verificar puntos (mín. 100 con Modelo T100)", position: 1 },
              { "@type": "HowToStep", name: "Reunir documentos de identificación, laboral y propiedad", position: 2 },
              { "@type": "HowToStep", name: "Solicitar avalúo INFONAVIT de la propiedad", position: 3 },
              { "@type": "HowToStep", name: "Presentar solicitud en portal Mi Cuenta INFONAVIT", position: 4 },
              { "@type": "HowToStep", name: "Firma ante notario y firma de escrituras", position: 5 },
            ],
          }),
        }}
      />

      <section className="pt-32 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="badge-gold inline-block mb-3">Checklist 2026</span>
            <h1 className="text-3xl md:text-4xl font-bold">Requisitos INFONAVIT</h1>
            <p className="text-gray-400 mt-2 text-sm max-w-lg mx-auto">
              Lista completa de documentos para tu crédito. Márcalos conforme los vayas consiguiendo.
            </p>
          </div>

          <div className="space-y-5">
            {requisitos.map((cat) => (
              <div key={cat.categoria} className="card-dark p-5">
                <h2 className="font-semibold text-sm text-yellow-500 uppercase tracking-wider mb-3">
                  {cat.categoria}
                </h2>
                <ul className="space-y-2">
                  {cat.docs.map((doc) => (
                    <li key={doc.item} className="flex items-start gap-3 text-sm">
                      <span className={`mt-0.5 shrink-0 text-base ${doc.obligatorio ? "text-green-400" : "text-gray-600"}`}>
                        {doc.obligatorio ? "✅" : "⬜"}
                      </span>
                      <span className={doc.obligatorio ? "text-gray-200" : "text-gray-500"}>
                        {doc.item}
                        {!doc.obligatorio && <span className="ml-1 text-xs text-gray-600">(si aplica)</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Process steps */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Pasos del trámite</h2>
            <ol className="space-y-3">
              {[
                "Verifica que tienes mínimo 100 puntos en Mi Cuenta INFONAVIT",
                "Elige tu propiedad y firma carta de intención con el vendedor",
                "Solicita el avalúo INFONAVIT a través del portal",
                "Presenta tu solicitud con todos los documentos",
                "Firma de escrituras ante notario (INFONAVIT lo designa)",
                "¡Listo! Recibes las llaves",
              ].map((step, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span
                    className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-black"
                    style={{ background: "var(--color-brand-gold)" }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-gray-300 text-sm pt-1">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* CTA */}
          <div className="mt-8 card-dark p-5 text-center">
            <h3 className="font-semibold mb-2">¿Tienes dudas sobre algún documento?</h3>
            <p className="text-gray-400 text-sm mb-4">
              Carolina te orienta en la preparación de tu expediente sin costo.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://calendly.com/sensabrokers/consulta"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                Agendar con Carolina →
              </a>
              <Link href="/infonavit/calculadora" className="btn-outline-gold">
                Calcular mis puntos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
