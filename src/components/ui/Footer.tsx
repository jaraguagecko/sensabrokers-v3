import Link from "next/link";
import Image from "next/image";

const servicios = [
  { href: "/hipotecas", label: "Hipotecas bancarias" },
  { href: "/hipotecas/matcher", label: "Matcher hipotecario" },
  { href: "/infonavit", label: "Crédito INFONAVIT" },
  { href: "/infonavit/calculadora", label: "Calculadora INFONAVIT" },
];

const recursos = [
  { href: "/infonavit/requisitos", label: "Requisitos INFONAVIT" },
  { href: "/#nosotros", label: "Por qué Sensabrokers" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border-subtle bg-surface-0 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <Link href="/" aria-label="Sensabrokers — Inicio" className="inline-block">
              <Image
                src="/brand/logo-dark.svg"
                alt="Sensabrokers"
                width={180}
                height={36}
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm text-text-muted leading-relaxed">
              Broker hipotecario independiente en Yucatán. Comisión del 0.5% sobre el crédito aprobado, pagadera al cierre.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-[var(--tracking-wide)] text-xs">
              Servicios
            </h3>
            <ul className="space-y-2.5 text-sm text-text-muted">
              {servicios.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="hover:text-accent transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-[var(--tracking-wide)] text-xs">
              Recursos
            </h3>
            <ul className="space-y-2.5 text-sm text-text-muted">
              {recursos.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="hover:text-accent transition-colors">
                    {r.label}
                  </Link>
                </li>
              ))}
              <li>
                <span className="text-text-subtle">Aviso de privacidad · próximamente</span>
              </li>
              <li>
                <span className="text-text-subtle">Términos de uso · próximamente</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-[var(--tracking-wide)] text-xs">
              Contacto
            </h3>
            <ul className="space-y-2.5 text-sm text-text-muted">
              <li>
                <a
                  href="https://calendly.com/sensabrokers/consulta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  Agenda una consulta
                </a>
              </li>
              <li>
                <a
                  href="mailto:hola@sensabrokers.com"
                  className="hover:text-accent transition-colors"
                >
                  hola@sensabrokers.com
                </a>
              </li>
              <li className="text-text-subtle">Mérida, Yucatán · México</li>
              <li className="text-text-subtle">Lun a Vie · 9:00–18:00</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border-subtle flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-xs text-text-subtle">
          <p>© {year} Sensabrokers. Todos los derechos reservados.</p>
          <p className="max-w-2xl md:text-right">
            Los resultados mostrados son orientativos y no constituyen una oferta de crédito. La aprobación final está sujeta al análisis crediticio de cada institución. Información sujeta a cambios sin previo aviso.
          </p>
        </div>
      </div>
    </footer>
  );
}
