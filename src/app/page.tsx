import Image from "next/image";

export default function ComingSoonPage() {
  return (
    <main className="cs-root">
      <div aria-hidden="true" className="cs-glow" />
      <div className="cs-shell">
        <header className="cs-brand">
          <Image
            src="/logo.svg"
            alt="Sensabrokers"
            width={220}
            height={44}
            priority
          />
        </header>

        <section className="cs-hero">
          <span className="cs-pill" aria-label="Estado: próximamente">
            <span className="cs-dot" aria-hidden="true" />
            Próximamente. Volvemos muy pronto.
          </span>

          <h1 className="cs-h1 font-serif">
            Estamos construyendo la forma más{" "}
            <span className="cs-emph">humana</span> de encontrar tu hipoteca ideal.
          </h1>

          <p className="cs-sub">
            Sensabrokers está por estrenar una nueva experiencia para ayudarte
            a conseguir la casa de tus sueños en Yucatán, con asesoría real y
            tecnología que trabaja para ti.
          </p>
        </section>

        <footer className="cs-foot">
          Sensabrokers &copy; 2026 &middot; Mérida, Yucatán &middot;{" "}
          <a href="mailto:hola@sensabrokers.com">hola@sensabrokers.com</a>
        </footer>
      </div>
    </main>
  );
}
