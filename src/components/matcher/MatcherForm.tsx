"use client";
import { useState } from "react";
import type { MatcherInput, ProductResult, Proposito } from "@/lib/matcher";
import MatcherResults from "./MatcherResults";
import { Button, Card, Input } from "@/components/ui";
import { track, FunnelEvent } from "@/lib/analytics";

type Step = 1 | 2 | 3 | 4 | 5;

const STEP_TITLES: Record<Step, string> = {
  1: "Ingresos",
  2: "Crédito",
  3: "Perfil",
  4: "Datos",
  5: "Confirmar",
};

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

const PROPOSITOS: { label: string; value: Proposito }[] = [
  { label: "Compra de vivienda (primera)", value: "compra_primera" },
  { label: "Compra de vivienda (inversión / segunda)", value: "compra_inversion" },
  { label: "Compra en preventa", value: "compra_preventa" },
  { label: "Refinanciamiento", value: "refinanciamiento" },
  { label: "Liquidez con garantía hipotecaria", value: "liquidez" },
  { label: "Segundo crédito", value: "segundo_credito" },
  { label: "Construcción en terreno propio", value: "construccion" },
];

const SCORE_OPTIONS = [
  { label: "Excelente (>740)", value: "excelente", desc: "Sin deudas vencidas, historial limpio" },
  { label: "Bueno (680–740)", value: "bueno", desc: "Historial sólido, alguna tardanza menor" },
  { label: "Regular (600–680)", value: "regular", desc: "Alguna deuda en proceso" },
  { label: "Bajo (<600)", value: "bajo", desc: "Deudas vencidas o reportado" },
  { label: "No sé / No tengo historial", value: "no_se", desc: "Te orientamos cómo saberlo" },
] as const;

const LABORAL_OPTIONS = [
  { label: "Empleado con +2 años en empresa actual", value: "empleado_2mas" },
  { label: "Empleado con menos de 2 años", value: "empleado_menos2" },
  { label: "Negocio propio con +2 años", value: "negocio_2mas" },
  { label: "Negocio propio con menos de 2 años", value: "negocio_menos2" },
  { label: "Jubilado / Pensionado", value: "jubilado" },
] as const;

const DERECHOHABIENTE_OPTIONS = [
  { label: "INFONAVIT", value: "infonavit" },
  { label: "FOVISSSTE", value: "fovissste" },
  { label: "Ambos (INFONAVIT + FOVISSSTE)", value: "ambos" },
  { label: "Ninguno / No aplica", value: "ninguno" },
] as const;

const TIPO_INGRESO_OPTIONS = [
  { label: "Formal (nómina / salario)", value: "formal", desc: "Recibo de nómina o CFDI de salario" },
  { label: "Informal (honorarios, negocio, freelance)", value: "informal", desc: "Sin recibo de nómina formal" },
  { label: "Mixto (nómina + ingresos adicionales)", value: "mixto", desc: "Combino ambas fuentes" },
] as const;

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

const OPTION_BASE =
  "w-full text-left rounded-[var(--radius-md)] border transition-all duration-[var(--duration-base)] ease-[var(--ease-standard)] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-1)] " +
  "cursor-pointer";
const OPTION_ON =
  "border-[var(--accent)] bg-[rgba(201,162,39,0.12)] text-[var(--text-primary)] shadow-[0_0_0_1px_var(--accent)_inset]";
const OPTION_OFF =
  "border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-2)]";

function OptionButton({
  selected,
  onClick,
  children,
  className = "",
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`${OPTION_BASE} ${selected ? OPTION_ON : OPTION_OFF} ${className}`}
    >
      {children}
    </button>
  );
}

function FieldLabel({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div className="mb-2 flex items-baseline justify-between gap-2">
      <h3 className="text-sm font-semibold text-[var(--text-primary)]">{children}</h3>
      {hint && <span className="text-xs text-[var(--text-subtle)]">{hint}</span>}
    </div>
  );
}

function findLabel<T extends { value: V; label: string }, V>(
  options: readonly T[],
  value: V | undefined,
): string | undefined {
  return options.find((o) => o.value === value)?.label;
}

export default function MatcherForm() {
  const [step, setStep] = useState<Step>(1);
  const [started, setStarted] = useState(false);
  const [input, setInput] = useState<Partial<MatcherInput>>(defaultInput);
  const [results, setResults] = useState<ProductResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [edadTouched, setEdadTouched] = useState(false);

  const progress = (step / 5) * 100;

  const step1Valid = !!input.tipoIngreso && !!input.ingresoMensual;
  const step2Valid = !!input.montoCredito && !!input.enganches && !!input.proposito;
  const step3Valid = !!input.score && !!input.situacionLaboral;
  const edadValid = typeof input.edad === "number" && input.edad >= 18 && input.edad <= 80;
  const step4Valid = edadValid && !!input.esDerechohabiente;

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
        track(FunnelEvent.MatcherCompleted, { result_count: data.results.length });
      } else {
        setNoResults(true);
        setResults([]);
        track(FunnelEvent.MatcherCompleted, { result_count: 0 });
      }
    } catch {
      setNoResults(true);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  function goTo(target: Step) {
    if (target === step) return;
    if (target < step) {
      setStep(target);
      return;
    }
    if (target === 2 && !started) {
      setStarted(true);
      track(FunnelEvent.MatcherStarted);
    }
    const canReach2 = step1Valid;
    const canReach3 = canReach2 && step2Valid;
    const canReach4 = canReach3 && step3Valid;
    const canReach5 = canReach4 && step4Valid;
    if (
      (target === 2 && canReach2) ||
      (target === 3 && canReach3) ||
      (target === 4 && canReach4) ||
      (target === 5 && canReach5)
    ) {
      setStep(target);
    }
  }

  if (results !== null) {
    return (
      <MatcherResults
        results={results}
        noResults={noResults}
        input={input as MatcherInput}
        onReset={() => {
          setResults(null);
          setNoResults(false);
          setStep(1);
          setInput(defaultInput);
          setEdadTouched(false);
        }}
      />
    );
  }

  return (
    <Card padding="lg">
      {/* Stepper */}
      <div className="mb-6">
        <div className="flex items-center justify-between gap-1 mb-3">
          {([1, 2, 3, 4, 5] as Step[]).map((s) => {
            const isDone = s < step;
            const isActive = s === step;
            const reachable = s <= step;
            return (
              <button
                key={s}
                type="button"
                onClick={() => goTo(s)}
                disabled={!reachable}
                aria-current={isActive ? "step" : undefined}
                className={`group flex-1 flex flex-col items-center gap-1.5 py-1 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] ${
                  reachable ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                }`}
              >
                <span
                  className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold border transition-all duration-[var(--duration-base)] ${
                    isActive
                      ? "bg-[var(--accent)] text-[var(--text-onbrand)] border-[var(--accent)] scale-110"
                      : isDone
                        ? "bg-[var(--accent)]/20 text-[var(--accent)] border-[var(--accent)]/40"
                        : "bg-[var(--surface-2)] text-[var(--text-subtle)] border-[var(--border-subtle)]"
                  }`}
                >
                  {isDone ? "✓" : s}
                </span>
                <span
                  className={`hidden sm:block text-[10px] uppercase tracking-wide ${
                    isActive ? "text-[var(--text-primary)] font-semibold" : "text-[var(--text-subtle)]"
                  }`}
                >
                  {STEP_TITLES[s]}
                </span>
              </button>
            );
          })}
        </div>
        <div className="flex justify-between text-xs text-[var(--text-subtle)] mb-2">
          <span>
            Paso <span className="text-[var(--text-primary)] font-semibold">{step}</span> de 5 ·{" "}
            {STEP_TITLES[step]}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1 bg-[var(--surface-2)] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-[width] duration-[var(--duration-slow)] ease-[var(--ease-out)]"
            style={{
              width: `${progress}%`,
              background:
                "linear-gradient(90deg, var(--brand-gold), var(--brand-gold-light))",
            }}
          />
        </div>
      </div>

      {/* Animated step body */}
      <div key={step} className="step-fade">
        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-1 text-[var(--text-primary)]">
              ¿Cómo recibes tus ingresos?
            </h2>
            <p className="text-[var(--text-muted)] text-sm mb-5">
              Esta es la variable más importante para filtrar opciones.
            </p>
            <div className="space-y-3 mb-6">
              {TIPO_INGRESO_OPTIONS.map((o) => (
                <OptionButton
                  key={o.value}
                  selected={input.tipoIngreso === o.value}
                  onClick={() =>
                    setInput({ ...input, tipoIngreso: o.value as MatcherInput["tipoIngreso"] })
                  }
                  className="p-4"
                >
                  <div className="font-medium text-sm text-[var(--text-primary)]">{o.label}</div>
                  <div className="text-[var(--text-subtle)] text-xs mt-0.5">{o.desc}</div>
                </OptionButton>
              ))}
            </div>

            <FieldLabel hint="Selecciona una banda">
              ¿Cuánto es tu ingreso mensual neto?
            </FieldLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
              {INCOME_BANDS.map((b) => (
                <OptionButton
                  key={b.value}
                  selected={input.ingresoMensual === b.value}
                  onClick={() => setInput({ ...input, ingresoMensual: b.value })}
                  className="p-3 text-sm text-center"
                >
                  {b.label}
                </OptionButton>
              ))}
            </div>

            <Button disabled={!step1Valid} onClick={() => setStep(2)} fullWidth>
              Siguiente →
            </Button>
            {!step1Valid && (
              <p className="text-xs text-[var(--text-subtle)] mt-2 text-center">
                Selecciona tipo y monto de ingreso para continuar.
              </p>
            )}
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-1 text-[var(--text-primary)]">
              El crédito que necesitas
            </h2>
            <p className="text-[var(--text-muted)] text-sm mb-5">
              Aproximado, puedes ajustarlo después.
            </p>

            <FieldLabel>Monto del crédito</FieldLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
              {CREDIT_BANDS.map((b) => (
                <OptionButton
                  key={b.value}
                  selected={input.montoCredito === b.value}
                  onClick={() => setInput({ ...input, montoCredito: b.value })}
                  className="p-3 text-sm text-center"
                >
                  {b.label}
                </OptionButton>
              ))}
            </div>

            <FieldLabel hint="% del valor de la vivienda">Enganche disponible</FieldLabel>
            <div className="grid grid-cols-4 gap-2 mb-5">
              {[5, 10, 20, 30].map((p) => (
                <OptionButton
                  key={p}
                  selected={input.enganches === p}
                  onClick={() => setInput({ ...input, enganches: p })}
                  className="p-3 text-sm font-medium text-center"
                >
                  {p}%
                </OptionButton>
              ))}
            </div>

            <FieldLabel>Propósito</FieldLabel>
            <div className="space-y-2 mb-6">
              {PROPOSITOS.map((p) => (
                <OptionButton
                  key={p.value}
                  selected={input.proposito === p.value}
                  onClick={() =>
                    setInput({ ...input, proposito: p.value as MatcherInput["proposito"] })
                  }
                  className="p-3 text-sm"
                >
                  {p.label}
                </OptionButton>
              ))}
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setStep(1)} variant="secondary" className="flex-1">
                ← Atrás
              </Button>
              <Button disabled={!step2Valid} onClick={() => setStep(3)} className="flex-1">
                Siguiente →
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-1 text-[var(--text-primary)]">
              Tu perfil crediticio
            </h2>
            <p className="text-[var(--text-muted)] text-sm mb-5">
              Si no sabes tu score, selecciona &quot;No sé&quot; y te orientamos.
            </p>

            <FieldLabel>Score crediticio aproximado</FieldLabel>
            <div className="space-y-2 mb-5">
              {SCORE_OPTIONS.map((o) => (
                <OptionButton
                  key={o.value}
                  selected={input.score === o.value}
                  onClick={() =>
                    setInput({ ...input, score: o.value as MatcherInput["score"] })
                  }
                  className="p-3 text-sm"
                >
                  <span className="font-medium text-[var(--text-primary)]">{o.label}</span>
                  <span className="text-[var(--text-subtle)] ml-2 text-xs">{o.desc}</span>
                </OptionButton>
              ))}
            </div>

            <FieldLabel>Situación laboral</FieldLabel>
            <div className="space-y-2 mb-5">
              {LABORAL_OPTIONS.map((o) => (
                <OptionButton
                  key={o.value}
                  selected={input.situacionLaboral === o.value}
                  onClick={() =>
                    setInput({
                      ...input,
                      situacionLaboral: o.value as MatcherInput["situacionLaboral"],
                    })
                  }
                  className="p-3 text-sm"
                >
                  {o.label}
                </OptionButton>
              ))}
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setStep(2)} variant="secondary" className="flex-1">
                ← Atrás
              </Button>
              <Button disabled={!step3Valid} onClick={() => setStep(4)} className="flex-1">
                Siguiente →
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-xl font-semibold mb-1 text-[var(--text-primary)]">
              Datos adicionales
            </h2>
            <p className="text-[var(--text-muted)] text-sm mb-5">
              Afectan el plazo máximo y productos disponibles.
            </p>

            <div className="mb-5">
              <label className="text-sm font-semibold text-[var(--text-primary)] block mb-2">
                Edad
              </label>
              <Input
                type="number"
                min={18}
                max={80}
                value={input.edad ?? ""}
                onChange={(e) => {
                  const raw = parseInt(e.target.value, 10);
                  setInput({ ...input, edad: Number.isNaN(raw) ? undefined : raw });
                  setEdadTouched(true);
                }}
                onBlur={() => setEdadTouched(true)}
                placeholder="Ej: 35"
                aria-invalid={edadTouched && !edadValid}
              />
              {edadTouched && !edadValid && (
                <p className="text-xs text-[var(--danger)] mt-1">
                  Ingresa una edad entre 18 y 80 años.
                </p>
              )}
            </div>

            <div className="mb-5">
              <label className="text-sm font-semibold text-[var(--text-primary)] block mb-2">
                ¿Eres derechohabiente?
              </label>
              <div className="space-y-2">
                {DERECHOHABIENTE_OPTIONS.map((o) => (
                  <OptionButton
                    key={o.value}
                    selected={input.esDerechohabiente === o.value}
                    onClick={() =>
                      setInput({
                        ...input,
                        esDerechohabiente: o.value as MatcherInput["esDerechohabiente"],
                      })
                    }
                    className="p-3 text-sm"
                  >
                    {o.label}
                  </OptionButton>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setStep(3)} variant="secondary" className="flex-1">
                ← Atrás
              </Button>
              <Button disabled={!step4Valid} onClick={() => setStep(5)} className="flex-1">
                Siguiente →
              </Button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="text-xl font-semibold mb-1 text-[var(--text-primary)]">
              ¿Alguien más suma ingresos?
            </h2>
            <p className="text-[var(--text-muted)] text-sm mb-5">
              Un co-acreditado puede abrir más opciones.
            </p>

            <div className="space-y-3 mb-6">
              <OptionButton
                selected={input.coAcreditado === false}
                onClick={() => setInput({ ...input, coAcreditado: false })}
                className="p-4"
              >
                <div className="font-medium text-[var(--text-primary)] text-sm">
                  No, solicito solo/a
                </div>
              </OptionButton>
              <OptionButton
                selected={input.coAcreditado === true}
                onClick={() => setInput({ ...input, coAcreditado: true })}
                className="p-4"
              >
                <div className="font-medium text-[var(--text-primary)] text-sm">
                  Sí, tengo co-acreditado
                </div>
                <div className="text-[var(--text-subtle)] text-xs mt-0.5">
                  Pareja, familiar, socio
                </div>
              </OptionButton>
            </div>

            {input.coAcreditado && (
              <div className="space-y-3 mb-6 p-4 bg-[var(--surface-2)] rounded-[var(--radius-md)] border border-[var(--border-subtle)] step-fade">
                <div>
                  <label className="text-sm text-[var(--text-primary)] block mb-2 font-medium">
                    Tipo de ingreso del co-acreditado
                  </label>
                  <div className="flex gap-2">
                    {(["formal", "informal", "mixto"] as const).map((t) => (
                      <OptionButton
                        key={t}
                        selected={input.coAcreditadoTipoIngreso === t}
                        onClick={() =>
                          setInput({
                            ...input,
                            coAcreditadoTipoIngreso: t as MatcherInput["tipoIngreso"],
                          })
                        }
                        className="flex-1 p-2 text-xs capitalize text-center"
                      >
                        {t}
                      </OptionButton>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-[var(--text-primary)] block mb-2 font-medium">
                    Ingreso mensual del co-acreditado
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {INCOME_BANDS.map((b) => (
                      <OptionButton
                        key={b.value}
                        selected={input.coAcreditadoIngreso === b.value}
                        onClick={() => setInput({ ...input, coAcreditadoIngreso: b.value })}
                        className="p-2 text-xs text-center"
                      >
                        {b.label}
                      </OptionButton>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Editable summary */}
            <div className="bg-[var(--surface-2)] rounded-[var(--radius-md)] border border-[var(--border-subtle)] p-4 mb-6 text-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-[var(--text-primary)]">Resumen de tu perfil</p>
                <span className="text-xs text-[var(--text-subtle)]">Editable</span>
              </div>
              <ul className="space-y-2">
                <SummaryRow
                  label="Tipo de ingreso"
                  value={findLabel(TIPO_INGRESO_OPTIONS, input.tipoIngreso) ?? "—"}
                  onEdit={() => setStep(1)}
                />
                <SummaryRow
                  label="Ingreso mensual"
                  value={findLabel(INCOME_BANDS, input.ingresoMensual) ?? "—"}
                  onEdit={() => setStep(1)}
                />
                <SummaryRow
                  label="Monto del crédito"
                  value={findLabel(CREDIT_BANDS, input.montoCredito) ?? "—"}
                  onEdit={() => setStep(2)}
                />
                <SummaryRow
                  label="Enganche"
                  value={input.enganches ? `${input.enganches}%` : "—"}
                  onEdit={() => setStep(2)}
                />
                <SummaryRow
                  label="Propósito"
                  value={findLabel(PROPOSITOS, input.proposito) ?? "—"}
                  onEdit={() => setStep(2)}
                />
                <SummaryRow
                  label="Score"
                  value={findLabel(SCORE_OPTIONS, input.score) ?? "—"}
                  onEdit={() => setStep(3)}
                />
                <SummaryRow
                  label="Situación laboral"
                  value={findLabel(LABORAL_OPTIONS, input.situacionLaboral) ?? "—"}
                  onEdit={() => setStep(3)}
                />
                <SummaryRow
                  label="Edad"
                  value={input.edad ? `${input.edad} años` : "—"}
                  onEdit={() => setStep(4)}
                />
                <SummaryRow
                  label="Derechohabiente"
                  value={
                    findLabel(DERECHOHABIENTE_OPTIONS, input.esDerechohabiente) ?? "—"
                  }
                  onEdit={() => setStep(4)}
                />
              </ul>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setStep(4)} variant="secondary" className="flex-1">
                ← Atrás
              </Button>
              <Button onClick={submit} disabled={loading} className="flex-1">
                {loading ? "Evaluando..." : "Ver mis opciones →"}
              </Button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .step-fade {
          animation: stepFade var(--duration-slow) var(--ease-out);
        }
        @keyframes stepFade {
          from {
            opacity: 0;
            transform: translateY(8px);
            filter: blur(2px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .step-fade {
            animation: none;
          }
        }
      `}</style>
    </Card>
  );
}

function SummaryRow({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <li className="flex items-center justify-between gap-3 py-1">
      <div className="min-w-0">
        <p className="text-[var(--text-subtle)] text-xs">{label}</p>
        <p className="text-[var(--text-primary)] text-sm truncate">{value}</p>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="text-xs text-[var(--accent)] hover:text-[var(--accent-hover)] underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] rounded px-1 shrink-0"
      >
        Editar
      </button>
    </li>
  );
}
