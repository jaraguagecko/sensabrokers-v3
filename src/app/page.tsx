import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sensabrokers — Tu broker hipotecario en Yucatán",
  description:
    "Conectamos tu perfil con las mejores opciones hipotecarias y de crédito INFONAVIT en Yucatán. Transparencia total, comisión al cierre.",
};

const services = [
  {
    title: "Hipotecas bancarias",
    description:
      "Comparamos 8+ bancos y SOFOM para encontrar la tasa más baja para tu perfil. Ingresos formales, informales o mixtos bienvenidos.",
    cta: "Usar el Matcher",
    href: "/hipotecas/matcher",
    badge: "Matcher MVP",
    icon: "🏦",
  },
  {
    title: "Crédito INFONAVIT",
    description:
      "Calcula cuánto crédito te da el instituto según tus puntos, salario y antigüedad. Checklist y guía de requisitos incluidos.",
    cta: "Calcular mi crédito",
    href: "/infonavit/calculadora",
    badge: "Calculadora",
    icon: "🏠",
  },
  {
    title: "Fase 2 — Inversiones",
    description:
      "Preventas y oportunidades de inversión en Yucatán con análisis de ROI. Próximamente.",
    cta: "Notificarme",
    href: "#fase2",
    badge: "Próximamente",
    icon: "📈",
    disabled: true,
  },
  {
    title: "Fase 3 — IA Inmobiliaria",
    description:
      "Asistente de IA para valuación, análisis de colonias y matching de propiedades. En desarrollo.",
    cta: "En desarrollo",
    href: "#fase3",
    badge: "En desarrollo",
    icon: "🤖",
    disabled: true,
  },
];

const differentiators = [
  {
    icon: "🔍",
    title: "Transparencia total",
    body: "Comisión del 0.5% sobre el crédito aprobado, pagadera al cierre. Sin cargos ocultos ni cuotas de consultoría.",
  },
  {
    icon: "👥",
    title: "Ingresos informales bienvenidos",
    body: "Somos especialistas en perfiles mixtos, freelancers y negocios propios. Conocemos productos que los bancos no te muestran.",
  },
  {
    icon: "⚡",
    title: "Resultado en 2 minutos",
    body: "El matcher evalúa tu perfil contra 9 productos hipotecarios en segundos y te muestra tus mejores opciones.",
  },
  {
    icon: "🏆",
    title: "Primer broker con matcher",
    body: "Ningún competidor en Yucatán tiene una herramienta de matching automático. Tú llegas primero.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* JSON-LD LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Sensabrokers",
            description: "Broker hipotecario independiente en Yucatán, México.",
            url: "https://sensabrokers.com",
            areaServed: { "@type": "City", name: "Mérida", containedInPlace: { "@type": "State", name: "Yucatán" } },
          }),
        }}
      />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="badge-gold mb-4 inline-block">Broker hipotecario independiente · Yucatán</span>
          <h1 className="text-4xl md:text-6xl font-bold mt-4 leading-tight">
            Tu hipoteca ideal,{" "}
            <span style={{ color: "var(--color-brand-gold)" }}>sin adivinar</span>
          </h1>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
            Evaluamos tu perfil y te mostramos las mejores opciones reales — sin sesgos, sin favoritismos al banco.
            Ingresos formales, informales o mixtos bienvenidos.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/hipotecas/matcher" className="btn-gold text-center">
              Usar el Matcher gratis →
            </Link>
            <Link href="/infonavit/calculadora" className="btn-outline-gold text-center">
              Calcular crédito INFONAVIT
            </Link>
          </div>
          <p className="mt-4 text-xs text-gray-600">
            Sin registro · Sin costo · Resultado en 2 minutos
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2">Servicios</h2>
          <p className="text-gray-400 text-center mb-10 text-sm">Selecciona lo que mejor se adapta a tu situación</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s) => (
              <div
                key={s.title}
                className={`card-dark p-6 flex flex-col gap-4 ${s.disabled ? "opacity-60" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-3xl">{s.icon}</span>
                  <span className="badge-gold">{s.badge}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{s.description}</p>
                </div>
                {s.disabled ? (
                  <span className="text-gray-600 text-sm font-medium">{s.cta}</span>
                ) : (
                  <Link
                    href={s.href}
                    className="btn-gold text-sm text-center mt-auto"
                  >
                    {s.cta} →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-16 px-6 bg-[#050d1a]" id="nosotros">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2">¿Por qué Sensabrokers?</h2>
          <p className="text-gray-400 text-center mb-10 text-sm">
            El broker que trabaja para ti, no para el banco
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((d) => (
              <div key={d.title} className="card-dark p-5">
                <span className="text-2xl">{d.icon}</span>
                <h3 className="text-base font-semibold mt-3 mb-2">{d.title}</h3>
                <p className="text-gray-400 text-sm">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para encontrar tu{" "}
            <span style={{ color: "var(--color-brand-gold)" }}>hipoteca ideal</span>?
          </h2>
          <p className="text-gray-400 mb-8">
            Responde 5 preguntas y descubre qué opciones aplican para tu perfil — gratis, sin registro.
          </p>
          <Link href="/hipotecas/matcher" className="btn-gold inline-block">
            Empezar ahora — es gratis →
          </Link>
        </div>
      </section>
    </>
  );
}
