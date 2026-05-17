import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hipotecas bancarias en Yucatán",
  description:
    "Compara hipotecas de Banorte, Scotiabank, Santander, HSBC, Citibanamex, HIR Casa y más. El matcher encuentra tu mejor opción según tu perfil en 2 minutos.",
  openGraph: {
    title: "Hipotecas bancarias en Yucatán | Sensabrokers",
    description: "Matcher hipotecario gratuito. Compara 8+ instituciones para tu perfil.",
  },
};

const banks = [
  { name: "Banorte", tasa: "9.15%", enganche: "5%", perfil: "Formal" },
  { name: "Scotiabank", tasa: "9.50%", enganche: "25%", perfil: "Formal" },
  { name: "Santander", tasa: "9.20%", enganche: "10%", perfil: "Formal" },
  { name: "HSBC", tasa: "9.30%", enganche: "10%", perfil: "Sin comisión apertura" },
  { name: "Citibanamex", tasa: "9.50%", enganche: "10%", perfil: "Formal" },
  { name: "Afirme", tasa: "9.80%", enganche: "15%", perfil: "Formal / Informal" },
  { name: "Banregio", tasa: "10.00%", enganche: "20%", perfil: "Mixto" },
  { name: "HIR Casa", tasa: "9.90% fija", enganche: "30%", perfil: "Todo tipo ingreso" },
  { name: "MiFel", tasa: "10.50%", enganche: "20%", perfil: "Informal" },
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
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="badge-gold inline-block mb-4">Hipotecas bancarias · 8+ opciones</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 leading-tight">
            Encuentra tu{" "}
            <span style={{ color: "var(--color-brand-gold)" }}>mejor hipoteca</span>
          </h1>
          <p className="mt-5 text-lg text-gray-400 max-w-2xl mx-auto">
            Nuestro matcher evalúa tu perfil y te muestra las opciones reales disponibles — sin sesgos, priorizando lo que te conviene a ti.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/hipotecas/matcher" className="btn-gold text-center">
              Usar el Matcher gratis →
            </Link>
            <a
              href="https://calendly.com/sensabrokers/consulta"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold text-center"
            >
              Hablar con Carolina
            </a>
          </div>
        </div>
      </section>

      {/* Banks table */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-2">Opciones disponibles</h2>
          <p className="text-gray-400 text-sm mb-6">
            Tasas orientativas. El matcher calcula la opción exacta para tu perfil.
          </p>
          <div className="card-dark overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left px-4 py-3 text-gray-400 font-medium">Institución</th>
                    <th className="text-left px-4 py-3 text-gray-400 font-medium">Tasa desde</th>
                    <th className="text-left px-4 py-3 text-gray-400 font-medium">Enganche min.</th>
                    <th className="text-left px-4 py-3 text-gray-400 font-medium">Perfil</th>
                  </tr>
                </thead>
                <tbody>
                  {banks.map((b, i) => (
                    <tr key={b.name} className={`border-b border-gray-800 ${i % 2 === 0 ? "" : "bg-gray-900/30"}`}>
                      <td className="px-4 py-3 font-medium text-white">{b.name}</td>
                      <td className="px-4 py-3" style={{ color: "var(--color-brand-gold)" }}>{b.tasa}</td>
                      <td className="px-4 py-3 text-gray-300">{b.enganche}</td>
                      <td className="px-4 py-3 text-gray-400">{b.perfil}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-3">
            * Tasas anuales fijas orientativas. Sujetas a aprobación y perfil crediticio. Fuente: Creditaria / páginas oficiales de cada institución.
          </p>
        </div>
      </section>

      {/* CTA matcher */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto card-dark p-8">
          <h2 className="text-2xl font-bold mb-3">
            ¿Cuál es la mejor para ti?
          </h2>
          <p className="text-gray-400 mb-6 text-sm">
            El matcher analiza tu tipo de ingreso, monto, enganche y propósito para mostrarte únicamente las opciones viables para tu perfil.
          </p>
          <Link href="/hipotecas/matcher" className="btn-gold inline-block">
            Iniciar matcher → 2 min
          </Link>
        </div>
      </section>
    </>
  );
}
