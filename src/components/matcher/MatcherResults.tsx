"use client";
import type { ProductResult, MatcherInput } from "@/lib/matcher";

interface Props {
  results: ProductResult[];
  noResults: boolean;
  input: MatcherInput;
  onReset: () => void;
}

export default function MatcherResults({ results, noResults, onReset }: Props) {
  const disclosure =
    "Sensabrokers cobra una comisión del 0.5% sobre el monto del crédito aprobado, pagadera al cierre. Esta comisión es cobrada al banco/financiera, no al cliente.";

  if (noResults || results.length === 0) {
    return (
      <div className="card-dark p-6 text-center">
        <span className="text-4xl mb-4 block">🤔</span>
        <h2 className="text-xl font-bold mb-2">Tu perfil necesita evaluación personalizada</h2>
        <p className="text-gray-400 text-sm mb-6">
          No encontramos una opción automática para tu combinación de variables, pero eso no significa que no haya opciones. Carolina puede analizarlo con productos especializados.
        </p>
        <a
          href="https://calendly.com/sensabrokers/consulta"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold inline-block mb-4"
        >
          Agendar con Carolina →
        </a>
        <br />
        <button onClick={onReset} className="text-gray-400 text-sm underline mt-2">
          Volver a intentar con otro perfil
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <span className="text-3xl">🎯</span>
        <h2 className="text-xl font-bold mt-2">
          {results.length === 1 ? "1 opción" : `${results.length} opciones`} para tu perfil
        </h2>
        <p className="text-gray-400 text-sm mt-1">Ordenadas por conveniencia para ti</p>
      </div>

      {results.map((r, i) => (
        <div
          key={r.id}
          className={`card-dark p-5 ${i === 0 ? "border border-yellow-600/50" : ""}`}
        >
          {i === 0 && (
            <div className="badge-gold mb-3 inline-block">⭐ Mejor opción</div>
          )}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-bold">{r.name}</h3>
              <p className="text-xs text-gray-500 capitalize">{r.channel === "hir_casa" ? "HIR Casa" : "Creditaria · Canal bancario"}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-lg font-bold" style={{ color: "var(--color-brand-gold)" }}>
                {r.tasa_fija ? `${r.tasa_fija}%` : `${r.tasa_min}%`}
              </p>
              <p className="text-xs text-gray-500">{r.tasa_fija ? "Tasa fija" : "Tasa anual desde"}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
            <div>
              <p className="text-gray-500 text-xs">Enganche mínimo</p>
              <p className="font-semibold">{r.enganche_min_pct}%</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Plazo máximo</p>
              <p className="font-semibold">{r.plazo_max_anios} años</p>
            </div>
            {r.sin_comision_apertura && (
              <div className="col-span-2">
                <span className="badge-gold text-xs">Sin comisión de apertura</span>
              </div>
            )}
            {r.aceptan_ingresos_informales && (
              <div className="col-span-2">
                <span className="badge-gold text-xs">Acepta ingresos informales</span>
              </div>
            )}
          </div>

          <div className="mt-3 pt-3 border-t border-gray-800">
            <p className="text-xs text-gray-500 mb-1">Documentos requeridos:</p>
            <p className="text-xs text-gray-400">{r.docs.join(" · ")}</p>
          </div>
        </div>
      ))}

      {/* Disclosure */}
      <div className="bg-gray-900 rounded-lg p-4 text-xs text-gray-500">
        <p className="font-semibold text-gray-400 mb-1">Comisión Sensabrokers</p>
        <p>{disclosure}</p>
      </div>

      <div className="bg-gray-900 rounded-lg p-4 text-xs text-gray-600">
        <p>
          Los resultados son orientativos y no constituyen una oferta de crédito. La aprobación final está sujeta al análisis crediticio de cada institución. Tasas sujetas a cambios sin previo aviso.
        </p>
      </div>

      {/* CTA */}
      <div className="card-dark p-5 text-center">
        <h3 className="font-semibold mb-2">¿Listo para dar el siguiente paso?</h3>
        <p className="text-gray-400 text-sm mb-4">
          Carolina te ayuda a pre-calificar con el banco que más te convenga y a preparar tu expediente.
        </p>
        <a
          href="https://calendly.com/sensabrokers/consulta"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold inline-block mb-3"
        >
          Agendar consulta gratis →
        </a>
        <br />
        <button onClick={onReset} className="text-gray-400 text-sm underline mt-2">
          Evaluar otro perfil
        </button>
      </div>
    </div>
  );
}
