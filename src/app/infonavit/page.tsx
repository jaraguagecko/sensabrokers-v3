import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Crédito INFONAVIT — Calculadora y requisitos",
  description:
    "Calcula cuánto crédito INFONAVIT te corresponde según tus puntos, salario y antigüedad. Checklist de requisitos y guía gratuita para derechohabientes en Yucatán.",
  openGraph: {
    title: "Calculadora INFONAVIT | Sensabrokers Yucatán",
    description: "Descubre cuánto crédito INFONAVIT te dan en 2 minutos. Gratis, sin registro.",
  },
};

export default function InfonavitPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "¿Cuánto crédito da INFONAVIT?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "El monto depende de tu salario, antigüedad cotizando, edad y subcuenta de vivienda. Con nuestra calculadora puedes estimarlo en 2 minutos.",
                },
              },
              {
                "@type": "Question",
                name: "¿Cuántos puntos necesito para crédito INFONAVIT?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Con el Modelo T100 vigente en 2026, necesitas mínimo 100 puntos para solicitar tu crédito INFONAVIT.",
                },
              },
            ],
          }),
        }}
      />

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="badge-gold inline-block mb-4">INFONAVIT · Modelo T100 2026</span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            ¿Cuánto crédito{" "}
            <span style={{ color: "var(--color-brand-gold)" }}>te da INFONAVIT</span>?
          </h1>
          <p className="mt-5 text-lg text-gray-400 max-w-2xl mx-auto">
            Calculadora gratuita basada en el Modelo T100. Ingresa tu salario, antigüedad y datos básicos para estimar tu crédito en 2 minutos.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/infonavit/calculadora" className="btn-gold text-center">
              Calcular mi crédito →
            </Link>
            <Link href="/infonavit/requisitos" className="btn-outline-gold text-center">
              Ver requisitos
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "🧮",
              title: "Calculadora de puntos",
              body: "Calcula tus puntos T100 y el monto estimado de crédito según tu perfil.",
              href: "/infonavit/calculadora",
              cta: "Calcular",
            },
            {
              icon: "📋",
              title: "Checklist de requisitos",
              body: "Lista completa de documentos necesarios para tramitar tu crédito INFONAVIT.",
              href: "/infonavit/requisitos",
              cta: "Ver checklist",
            },
            {
              icon: "🤝",
              title: "INFONAVIT + banco",
              body: "¿Quieres combinar tu crédito INFONAVIT con uno bancario? Te explicamos cómo funciona el Cofinavit.",
              href: "/hipotecas/matcher",
              cta: "Explorar opciones",
            },
          ].map((f) => (
            <div key={f.title} className="card-dark p-5 flex flex-col gap-3">
              <span className="text-2xl">{f.icon}</span>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="text-gray-400 text-sm flex-1">{f.body}</p>
              <Link href={f.href} className="btn-outline-gold text-sm text-center">
                {f.cta} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {[
              {
                q: "¿Cuántos puntos necesito para obtener crédito INFONAVIT?",
                a: "Con el Modelo T100 (vigente desde 2024), necesitas mínimo 100 puntos. La calculadora te dice exactamente cuántos tienes según tu perfil.",
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
                a: "Una vez con tus puntos completos y documentos listos, el proceso suele tomar 4-8 semanas. Carolina te guía en cada paso.",
              },
            ].map((item) => (
              <div key={item.q} className="card-dark p-5">
                <h3 className="font-semibold text-sm mb-2">{item.q}</h3>
                <p className="text-gray-400 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
