import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-[#050505] mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <span className="text-xl font-bold">
              <span style={{ color: "var(--color-brand-gold)" }}>Sensa</span>
              <span className="text-white">brokers</span>
            </span>
            <p className="mt-3 text-gray-400 text-sm max-w-xs">
              Broker hipotecario independiente en Yucatán. Transparencia total, comisión al cierre.
            </p>
            <p className="mt-2 text-xs text-gray-600">
              Comisión: 0.5% sobre monto del crédito aprobado, pagadera al cierre.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Servicios</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/hipotecas" className="hover:text-white transition-colors">Hipotecas bancarias</Link></li>
              <li><Link href="/infonavit" className="hover:text-white transition-colors">Crédito INFONAVIT</Link></li>
              <li><Link href="/hipotecas/matcher" className="hover:text-white transition-colors">Matcher hipotecario</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><span className="text-gray-600">Aviso de privacidad</span></li>
              <li><span className="text-gray-600">Términos de uso</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 text-xs text-gray-600">
          <p>
            © {new Date().getFullYear()} Sensabrokers. Los resultados mostrados son orientativos y no constituyen una oferta de crédito. La aprobación final está sujeta al análisis crediticio de cada institución. Información sujeta a cambios sin previo aviso.
          </p>
        </div>
      </div>
    </footer>
  );
}
