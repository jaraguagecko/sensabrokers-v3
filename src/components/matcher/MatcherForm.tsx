"use client";
import { useState } from "react";
import type { MatcherInput, ProductResult } from "@/lib/matcher";
import MatcherResults from "./MatcherResults";

type Step = 1 | 2 | 3 | 4 | 5;

const INCOME_BANDS = [
  { label: "Menos de $15,000", value: 12000 },
  { label: "$15,000 – $30,000", value: 22000 },
  { label: "$30,000 – $50,000", value: 40000 },
  { label: "$50,000 – $100,000", value: 70000 },
  { label: "Más de $100,000", value: 150000 },
];

const CREDIT_BANDS = [
  { label: "$500,000 – $1,000,000", value: 750000 },
  { label: "$1,000,000 – $2,000,000", value: 1500000 },
  { label: "$2,000,000 – $5,000,000", value: 3000000 },
  { label: "$5,000,000 – $10,000,000", value: 7500000 },
  { label: "Más de $10,000,000", value: 12000000 },
];

const PROPOSITOS = [
  { label: "Compra de vivienda (primera)", value: "compra_primera" },
  { label: "Compra de vivienda (inversión / segunda)", value: "compra_inversion" },
  { label: "Compra en preventa", value: "compra_preventa" },
  { label: "Refinanciamiento", value: "refinanciamiento" },
  { label: "Liquidez con garantía hipotecaria", value: "liquidez" },
  { label: "Segundo crédito", value: "segundo_credito" },
  { label: "Construcción en terreno propio", value: "construccion" },
];

const defaultInput: Partial<MatcherInput> = {
  tipoIngreso: undefined,
  ingresoMensual: 0,
  coAcreditado: false,
  montoCredito: 0,
  enganches: 0,
  proposito: undefined,
  estado: "Yucatán",
  edad: 35,
  score: undefined,
  situacionLaboral: undefined,
  tieneTerreno: false,
  esDerechohabiente: "ninguno",
};

export default function MatcherForm() {
  const [step, setStep] = useState<Step>(1);
  const [input, setInput] = useState<Partial<MatcherInput>>(defaultInput);
  const [results, setResults] = useState<ProductResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const progress = ((step - 1) / 5) * 100;

  async function submit() {
    setLoading(true);
    try {
      const res = await fetch("/api/matcher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setResults(data.results);
      } else {
        setNoResults(true);
        setResults([]);
      }
    } catch {
      setNoResults(true);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  if (results !== null) {
    return <MatcherResults results={results} noResults={noResults} input={input as MatcherInput} onReset={() => { setResults(null); setNoResults(false); setStep(1); setInput(defaultInput); }} />;
  }

  return (
    <div className="card-dark p-6 md:p-8">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Paso {step} de 5</span>
          <span>{Math.round(progress)}% completado</span>
        </div>
        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%`, background: "linear-gradient(90deg, #c9a227, #e8c84a)" }}
          />
        </div>
      </div>

      {/* Step 1: Tipo ingreso + ingresos */}
      {step === 1 && (
        <div>
          <h2 className="text-xl font-semibold mb-1">¿Cómo recibes tus ingresos?</h2>
          <p className="text-gray-400 text-sm mb-5">Esta es la variable más importante para filtrar opciones.</p>
          <div className="space-y-3 mb-6">
            {[
              { label: "Formal (nómina / salario)", value: "formal", desc: "Recibo de nómina o CFDI de salario" },
              { label: "Informal (honorarios, negocio, freelance)", value: "informal", desc: "Sin recibo de nómina formal" },
              { label: "Mixto (nómina + ingresos adicionales)", value: "mixto", desc: "Combino ambas fuentes" },
            ].map((o) => (
              <button
                key={o.value}
                onClick={() => setInput({ ...input, tipoIngreso: o.value as MatcherInput["tipoIngreso"] })}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  input.tipoIngreso === o.value
                    ? "border-yellow-500 bg-yellow-500/10"
                    : "border-gray-700 hover:border-gray-500"
                }`}
              >
                <div className="font-medium text-sm">{o.label}</div>
                <div className="text-gray-500 text-xs mt-0.5">{o.desc}</div>
              </button>
            ))}
          </div>

          <h3 className="text-base font-semibold mb-3">¿Cuánto es tu ingreso mensual neto?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
            {INCOME_BANDS.map((b) => (
              <button
                key={b.value}
                onClick={() => setInput({ ...input, ingresoMensual: b.value })}
                className={`p-3 rounded-lg border text-sm transition-all ${
                  input.ingresoMensual === b.value
                    ? "border-yellow-500 bg-yellow-500/10 text-white"
                    : "border-gray-700 text-gray-400 hover:border-gray-500"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>

          <button
            disabled={!input.tipoIngreso || !input.ingresoMensual}
            onClick={() => setStep(2)}
            className="btn-gold w-full disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Siguiente →
          </button>
        </div>
      )}

      {/* Step 2: Monto + enganche + proposito */}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-semibold mb-1">El crédito que necesitas</h2>
          <p className="text-gray-400 text-sm mb-5">Aproximado, puedes ajustarlo después.</p>

          <h3 className="text-sm font-semibold text-gray-300 mb-2">Monto del crédito</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
            {CREDIT_BANDS.map((b) => (
              <button
                key={b.value}
                onClick={() => setInput({ ...input, montoCredito: b.value })}
                className={`p-3 rounded-lg border text-sm transition-all ${
                  input.montoCredito === b.value
                    ? "border-yellow-500 bg-yellow-500/10 text-white"
                    : "border-gray-700 text-gray-400 hover:border-gray-500"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>

          <h3 className="text-sm font-semibold text-gray-300 mb-2">Enganche disponible (%)</h3>
          <div className="grid grid-cols-4 gap-2 mb-5">
            {[5, 10, 20, 30].map((p) => (
              <button
                key={p}
                onClick={() => setInput({ ...input, enganches: p })}
                className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                  input.enganches === p
                    ? "border-yellow-500 bg-yellow-500/10 text-white"
                    : "border-gray-700 text-gray-400 hover:border-gray-500"
                }`}
              >
                {p}%
              </button>
            ))}
          </div>

          <h3 className="text-sm font-semibold text-gray-300 mb-2">Propósito</h3>
          <div className="space-y-2 mb-6">
            {PROPOSITOS.map((p) => (
              <button
                key={p.value}
                onClick={() => setInput({ ...input, proposito: p.value as MatcherInput["proposito"] })}
                className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${
                  input.proposito === p.value
                    ? "border-yellow-500 bg-yellow-500/10 text-white"
                    : "border-gray-700 text-gray-400 hover:border-gray-500"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="btn-outline-gold flex-1">← Atrás</button>
            <button
              disabled={!input.montoCredito || !input.enganches || !input.proposito}
              onClick={() => setStep(3)}
              className="btn-gold flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Siguiente →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Perfil crediticio */}
      {step === 3 && (
        <div>
          <h2 className="text-xl font-semibold mb-1">Tu perfil crediticio</h2>
          <p className="text-gray-400 text-sm mb-5">Si no sabes tu score, selecciona &quot;No sé&quot; y te orientamos.</p>

          <h3 className="text-sm font-semibold text-gray-300 mb-2">Score crediticio aproximado</h3>
          <div className="space-y-2 mb-5">
            {[
              { label: "Excelente (>740)", value: "excelente", desc: "Sin deudas vencidas, historial limpio" },
              { label: "Bueno (680–740)", value: "bueno", desc: "Historial sólido, alguna tardanza menor" },
              { label: "Regular (600–680)", value: "regular", desc: "Alguna deuda en proceso" },
              { label: "Bajo (<600)", value: "bajo", desc: "Deudas vencidas o reportado" },
              { label: "No sé / No tengo historial", value: "no_se", desc: "Te mostramos opciones y cómo saberlo" },
            ].map((o) => (
              <button
                key={o.value}
                onClick={() => setInput({ ...input, score: o.value as MatcherInput["score"] })}
                className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${
                  input.score === o.value
                    ? "border-yellow-500 bg-yellow-500/10 text-white"
                    : "border-gray-700 text-gray-400 hover:border-gray-500"
                }`}
              >
                <span className="font-medium text-white">{o.label}</span>
                <span className="text-gray-500 ml-2">{o.desc}</span>
              </button>
            ))}
          </div>

          <h3 className="text-sm font-semibold text-gray-300 mb-2">Situación laboral</h3>
          <div className="space-y-2 mb-5">
            {[
              { label: "Empleado con +2 años en empresa actual", value: "empleado_2mas" },
              { label: "Empleado con menos de 2 años", value: "empleado_menos2" },
              { label: "Negocio propio con +2 años", value: "negocio_2mas" },
              { label: "Negocio propio con menos de 2 años", value: "negocio_menos2" },
              { label: "Jubilado / Pensionado", value: "jubilado" },
            ].map((o) => (
              <button
                key={o.value}
                onClick={() => setInput({ ...input, situacionLaboral: o.value as MatcherInput["situacionLaboral"] })}
                className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${
                  input.situacionLaboral === o.value
                    ? "border-yellow-500 bg-yellow-500/10 text-white"
                    : "border-gray-700 text-gray-400 hover:border-gray-500"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="btn-outline-gold flex-1">← Atrás</button>
            <button
              disabled={!input.score || !input.situacionLaboral}
              onClick={() => setStep(4)}
              className="btn-gold flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Siguiente →
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Edad + derechohabiencia */}
      {step === 4 && (
        <div>
          <h2 className="text-xl font-semibold mb-1">Datos adicionales</h2>
          <p className="text-gray-400 text-sm mb-5">Afectan el plazo máximo y productos disponibles.</p>

          <div className="mb-5">
            <label className="text-sm font-semibold text-gray-300 block mb-2">Edad</label>
            <input
              type="number"
              min={18}
              max={80}
              value={input.edad || ""}
              onChange={(e) => setInput({ ...input, edad: parseInt(e.target.value) || 35 })}
              placeholder="Ej: 35"
              className="input-dark"
            />
          </div>

          <div className="mb-5">
            <label className="text-sm font-semibold text-gray-300 block mb-2">¿Eres derechohabiente?</label>
            <div className="space-y-2">
              {[
                { label: "INFONAVIT", value: "infonavit" },
                { label: "FOVISSSTE", value: "fovissste" },
                { label: "Ambos (INFONAVIT + FOVISSSTE)", value: "ambos" },
                { label: "Ninguno / No aplica", value: "ninguno" },
              ].map((o) => (
                <button
                  key={o.value}
                  onClick={() => setInput({ ...input, esDerechohabiente: o.value as MatcherInput["esDerechohabiente"] })}
                  className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${
                    input.esDerechohabiente === o.value
                      ? "border-yellow-500 bg-yellow-500/10 text-white"
                      : "border-gray-700 text-gray-400 hover:border-gray-500"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(3)} className="btn-outline-gold flex-1">← Atrás</button>
            <button
              disabled={!input.edad || !input.esDerechohabiente}
              onClick={() => setStep(5)}
              className="btn-gold flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Siguiente →
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Co-acreditado + confirm */}
      {step === 5 && (
        <div>
          <h2 className="text-xl font-semibold mb-1">¿Alguien más suma ingresos?</h2>
          <p className="text-gray-400 text-sm mb-5">Un co-acreditado puede abrir más opciones.</p>

          <div className="space-y-3 mb-6">
            <button
              onClick={() => setInput({ ...input, coAcreditado: false })}
              className={`w-full text-left p-4 rounded-lg border text-sm transition-all ${
                input.coAcreditado === false
                  ? "border-yellow-500 bg-yellow-500/10"
                  : "border-gray-700 hover:border-gray-500"
              }`}
            >
              <div className="font-medium text-white">No, solicito solo/a</div>
            </button>
            <button
              onClick={() => setInput({ ...input, coAcreditado: true })}
              className={`w-full text-left p-4 rounded-lg border text-sm transition-all ${
                input.coAcreditado === true
                  ? "border-yellow-500 bg-yellow-500/10"
                  : "border-gray-700 hover:border-gray-500"
              }`}
            >
              <div className="font-medium text-white">Sí, tengo co-acreditado</div>
              <div className="text-gray-500 text-xs mt-0.5">Pareja, familiar, socio</div>
            </button>
          </div>

          {input.coAcreditado && (
            <div className="space-y-3 mb-6 p-4 bg-gray-800/50 rounded-lg">
              <div>
                <label className="text-sm text-gray-300 block mb-2">Tipo de ingreso del co-acreditado</label>
                <div className="flex gap-2">
                  {["formal", "informal", "mixto"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setInput({ ...input, coAcreditadoTipoIngreso: t as MatcherInput["tipoIngreso"] })}
                      className={`flex-1 p-2 rounded border text-xs capitalize transition-all ${
                        input.coAcreditadoTipoIngreso === t
                          ? "border-yellow-500 bg-yellow-500/10 text-white"
                          : "border-gray-700 text-gray-400"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-300 block mb-2">Ingreso mensual del co-acreditado</label>
                <div className="grid grid-cols-2 gap-2">
                  {INCOME_BANDS.map((b) => (
                    <button
                      key={b.value}
                      onClick={() => setInput({ ...input, coAcreditadoIngreso: b.value })}
                      className={`p-2 rounded border text-xs transition-all ${
                        input.coAcreditadoIngreso === b.value
                          ? "border-yellow-500 bg-yellow-500/10 text-white"
                          : "border-gray-700 text-gray-400"
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Summary */}
          <div className="bg-gray-800/50 rounded-lg p-4 mb-6 text-sm space-y-1">
            <p className="font-semibold text-gray-300 mb-2">Resumen de tu perfil:</p>
            <p className="text-gray-400">Ingreso: <span className="text-white">{INCOME_BANDS.find(b => b.value === input.ingresoMensual)?.label}</span></p>
            <p className="text-gray-400">Crédito: <span className="text-white">{CREDIT_BANDS.find(b => b.value === input.montoCredito)?.label}</span></p>
            <p className="text-gray-400">Score: <span className="text-white capitalize">{input.score?.replace("_", " ")}</span></p>
            <p className="text-gray-400">Tipo ingreso: <span className="text-white capitalize">{input.tipoIngreso}</span></p>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(4)} className="btn-outline-gold flex-1">← Atrás</button>
            <button
              onClick={submit}
              disabled={loading}
              className="btn-gold flex-1 disabled:opacity-60"
            >
              {loading ? "Evaluando..." : "Ver mis opciones →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
