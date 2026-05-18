"use client";
import type { ProductResult, MatcherInput } from "@/lib/matcher";
import { Badge, Button, Card, Heading } from "@/components/ui";

interface Props {
  results: ProductResult[];
  noResults: boolean;
  input: MatcherInput;
  onReset: () => void;
}

const DISCLOSURE =
  "Sensabrokers cobra una comisión del 0.5% sobre el monto del crédito aprobado, pagadera al cierre. Esta comisión es cobrada al banco/financiera, no al cliente.";

function channelLabel(channel: string) {
  if (channel === "hir_casa") return "HIR Casa · canal directo";
  return "Creditaria · canal bancario";
}

export default function MatcherResults({ results, noResults, onReset }: Props) {
  if (noResults || results.length === 0) {
    return (
      <Card padding="lg" className="text-center">
        <span className="text-4xl mb-4 block" aria-hidden="true">🤔</span>
        <Heading as={2} size="lg" className="mb-2">
          Tu perfil necesita evaluación personalizada
        </Heading>
        <p className="text-[var(--text-muted)] text-sm mb-6 max-w-md mx-auto">
          No encontramos una opción automática para tu combinación de variables, pero eso
          no significa que no haya opciones. Carolina puede analizarlo con productos
          especializados.
        </p>
        <Button href="https://calendly.com/sensabrokers/consulta" external className="mb-4">
          Agendar con Carolina →
        </Button>
        <br />
        <button
          onClick={onReset}
          className="text-[var(--text-muted)] text-sm underline mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] rounded"
        >
          Volver a intentar con otro perfil
        </button>
      </Card>
    );
  }

  const sorted = [...results].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
  const top = sorted[0];
  const topScore = top?.score ?? 1;

  return (
    <div className="space-y-4">
      <header className="text-center mb-2">
        <span className="text-3xl" aria-hidden="true">🎯</span>
        <Heading as={2} size="lg" className="mt-2">
          {sorted.length === 1 ? "1 opción" : `${sorted.length} opciones`} para tu perfil
        </Heading>
        <p className="text-[var(--text-muted)] text-sm mt-1">
          Ordenadas por conveniencia (tasa, plazo y compatibilidad).
        </p>
      </header>

      {sorted.map((r, i) => {
        const isTop = i === 0;
        const matchPct = Math.max(
          50,
          Math.round(((r.score ?? 0) / Math.max(topScore, 1)) * 100),
        );
        const benefits: string[] = [];
        if (r.sin_comision_apertura) benefits.push("Sin comisión de apertura");
        if (r.aceptan_ingresos_informales) benefits.push("Acepta ingresos informales");
        if (r.tasa_fija) benefits.push("Tasa fija de por vida");

        return (
          <Card
            key={r.id}
            className={
              isTop
                ? "border-[var(--accent)] shadow-[var(--shadow-gold)] relative overflow-hidden"
                : "transition-colors hover:border-[var(--border-strong)]"
            }
          >
            {isTop && (
              <div className="absolute top-0 right-0 bg-[var(--accent)] text-[var(--text-onbrand)] text-[10px] font-bold uppercase tracking-wide px-3 py-1 rounded-bl-[var(--radius-md)]">
                ⭐ Mejor opción
              </div>
            )}

            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <Heading as={3} size="sm">{r.name}</Heading>
                <p className="text-xs text-[var(--text-subtle)] mt-0.5">
                  {channelLabel(r.channel)}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-2xl font-bold leading-none" style={{ color: "var(--accent)" }}>
                  {r.tasa_fija ? `${r.tasa_fija}%` : `${r.tasa_min}%`}
                </p>
                <p className="text-xs text-[var(--text-subtle)] mt-1">
                  {r.tasa_fija ? "Tasa fija" : "Tasa anual desde"}
                </p>
              </div>
            </div>

            {/* Match bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-[var(--text-subtle)]">Compatibilidad con tu perfil</span>
                <span className="text-[var(--text-primary)] font-semibold">{matchPct}%</span>
              </div>
              <div className="h-1.5 bg-[var(--surface-2)] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-[width] duration-[var(--duration-slow)] ease-[var(--ease-out)]"
                  style={{
                    width: `${matchPct}%`,
                    background:
                      "linear-gradient(90deg, var(--brand-gold), var(--brand-gold-light))",
                  }}
                />
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-3 mt-4 text-sm">
              <div>
                <dt className="text-[var(--text-subtle)] text-xs">Enganche mínimo</dt>
                <dd className="font-semibold text-[var(--text-primary)] mt-0.5">
                  {r.enganche_min_pct}%
                </dd>
              </div>
              <div>
                <dt className="text-[var(--text-subtle)] text-xs">Plazo máximo</dt>
                <dd className="font-semibold text-[var(--text-primary)] mt-0.5">
                  {r.plazo_max_anios} años
                </dd>
              </div>
              {r.tasa_max && !r.tasa_fija && (
                <div className="col-span-2">
                  <dt className="text-[var(--text-subtle)] text-xs">Rango de tasa</dt>
                  <dd className="text-[var(--text-muted)] mt-0.5">
                    {r.tasa_min}% – {r.tasa_max}% según perfil
                  </dd>
                </div>
              )}
            </dl>

            {benefits.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {benefits.map((b) => (
                  <Badge key={b} size="sm" variant="gold">{b}</Badge>
                ))}
              </div>
            )}

            <details className="mt-4 pt-3 border-t border-[var(--border-subtle)] group">
              <summary className="cursor-pointer text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center gap-1 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] rounded">
                <span className="transition-transform group-open:rotate-90 inline-block">▸</span>
                Documentos requeridos ({r.docs.length})
              </summary>
              <ul className="mt-2 text-xs text-[var(--text-muted)] space-y-1 list-disc list-inside">
                {r.docs.map((d) => (
                  <li key={d} className="capitalize">{d}</li>
                ))}
              </ul>
            </details>
          </Card>
        );
      })}

      {/* Disclosure: clearer copy + structure */}
      <div className="bg-[var(--surface-1)] border border-[var(--border-subtle)] rounded-[var(--radius-md)] p-4 text-xs space-y-3">
        <div>
          <p className="font-semibold text-[var(--text-primary)] mb-1">
            Comisión Sensabrokers
          </p>
          <p className="text-[var(--text-muted)]">{DISCLOSURE}</p>
        </div>
        <div className="border-t border-[var(--border-subtle)] pt-3">
          <p className="text-[var(--text-subtle)]">
            Los resultados son orientativos y no constituyen una oferta de crédito.
            La aprobación final está sujeta al análisis crediticio de cada institución.
            Tasas sujetas a cambios sin previo aviso.
          </p>
        </div>
      </div>

      {/* CTA + Calendly fallback */}
      <Card className="text-center bg-[linear-gradient(180deg,var(--surface-1),var(--surface-2))]">
        <Heading as={3} size="sm" className="mb-2">
          ¿Listo para dar el siguiente paso?
        </Heading>
        <p className="text-[var(--text-muted)] text-sm mb-4 max-w-md mx-auto">
          Carolina te ayuda a pre-calificar con el banco que más te convenga y
          a preparar tu expediente. Consulta gratuita, sin compromiso.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button href="https://calendly.com/sensabrokers/consulta" external>
            Agendar consulta gratis →
          </Button>
          <Button onClick={onReset} variant="ghost">
            Evaluar otro perfil
          </Button>
        </div>
      </Card>
    </div>
  );
}
