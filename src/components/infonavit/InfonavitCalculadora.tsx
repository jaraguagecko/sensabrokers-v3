"use client";
import { useState } from "react";
import {
  calcularPuntosINFONAVIT,
  estimarMontoCredito,
  antiguedadToBimestres,
  INFONAVIT_CONFIG,
  type AntiguedadRange,
} from "../../../config/infonavit-rules.config";
import { Badge, Button, Card, Input } from "@/components/ui";

interface FormData {
  salario: number;
  antiguedad: AntiguedadRange;
  edad: number;
  tipoTrabajador: "planta" | "eventual";
  creditoPrevio: boolean;
  subcuenta: number;
  modalidad: "infonavit" | "cofinavit" | "mejoravit";
  capacidadPago: "buena" | "irregular";
}

const defaultForm: Partial<FormData> = {
  tipoTrabajador: "planta",
  creditoPrevio: false,
  capacidadPago: "buena",
  modalidad: "infonavit",
};

const ANTIGUEDAD_OPTIONS: { label: string; value: AntiguedadRange }[] = [
  { label: "Menos de 6 meses", value: "menos_6m" },
  { label: "6 meses – 1 año", value: "6m_1a" },
  { label: "1 – 2 años", value: "1a_2a" },
  { label: "2 – 5 años", value: "2a_5a" },
  { label: "5 – 10 años", value: "5a_10a" },
  { label: "Más de 10 años", value: "10a_mas" },
];

function formatMXN(n: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(n);
}

function plazoMaximoPorEdad(edad: number): number {
  const row = INFONAVIT_CONFIG.plazo_maximo_por_edad.find((r) => edad <= r.edad_max);
  return row?.plazo_max_anios ?? 0;
}

const optionClass = (selected: boolean) =>
  [
    "w-full text-left p-3 rounded-[var(--radius-md)] border text-sm transition-all",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]",
    selected
      ? "border-[var(--accent)] bg-[rgba(201,162,39,0.10)] text-[var(--text-primary)]"
      : "border-[var(--border-subtle)] text-text-muted hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]",
  ].join(" ");

export default function InfonavitCalculadora() {
  const [form, setForm] = useState<Partial<FormData>>(defaultForm);
  const [result, setResult] = useState<{
    puntos: number;
    monto: number;
    plazo: number;
    califica: boolean;
  } | null>(null);

  function calcular() {
    if (
      !form.salario ||
      !form.antiguedad ||
      !form.edad ||
      !form.tipoTrabajador ||
      form.subcuenta === undefined
    )
      return;

    const bimestres = antiguedadToBimestres(form.antiguedad);
    const puntos = calcularPuntosINFONAVIT({
      salario: form.salario,
      antiguedadBimestres: bimestres,
      edad: form.edad,
      tipoTrabajador: form.tipoTrabajador,
      subcuenta: form.subcuenta ?? 0,
      capacidadPago: form.capacidadPago ?? "buena",
    });

    const monto = estimarMontoCredito({
      salario: form.salario,
      antiguedadBimestres: bimestres,
      subcuenta: form.subcuenta ?? 0,
    });

    const plazo = plazoMaximoPorEdad(form.edad);

    setResult({
      puntos,
      monto,
      plazo,
      califica: puntos >= INFONAVIT_CONFIG.puntos_minimos,
    });
  }

  function reset() {
    setResult(null);
    setForm(defaultForm);
  }

  if (result) {
    const pct = Math.min(100, (result.puntos / 124) * 100);

    return (
      <div className="space-y-6">
        {/* Headline */}
        <Card padding="lg" className="text-center">
          <Badge variant={result.califica ? "gold" : "neutral"}>
            {result.califica ? "Calificas" : "Aún no alcanzas el mínimo"}
          </Badge>
          <h2 className="text-2xl font-bold mt-4 text-[var(--text-primary)]">
            {result.califica
              ? "¡Calificas para crédito INFONAVIT!"
              : "Aún no llegas a 100 puntos"}
          </h2>
          <p className="text-text-muted text-sm mt-2 max-w-md mx-auto leading-relaxed">
            {result.califica
              ? "Con tu perfil actual ya puedes iniciar el trámite. Aquí va tu resumen."
              : "Te faltan puntos para alcanzar el mínimo de 100. Revisa cómo subir tu puntaje abajo."}
          </p>
        </Card>

        {/* Hierarchized result: Puntos / Monto / Plazo */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Puntos */}
          <Card padding="md">
            <p className="text-xs uppercase tracking-[var(--tracking-wide)] text-text-subtle">
              Puntos T100
            </p>
            <p className="mt-2 text-3xl font-bold text-[var(--text-primary)]">
              {result.puntos}
              <span className="text-text-subtle text-lg font-medium"> / 124</span>
            </p>
            <div className="mt-3 h-2 bg-[var(--surface-2)] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${pct}%`,
                  background: result.califica
                    ? "linear-gradient(90deg, var(--brand-gold), var(--brand-gold-light))"
                    : "linear-gradient(90deg, var(--border-strong), var(--text-subtle))",
                }}
              />
            </div>
            <p className="mt-2 text-xs text-text-subtle">
              Mínimo {INFONAVIT_CONFIG.puntos_minimos} pts.
            </p>
          </Card>

          {/* Monto */}
          <Card padding="md" className={result.califica ? "border-[rgba(201,162,39,0.4)]" : ""}>
            <p className="text-xs uppercase tracking-[var(--tracking-wide)] text-text-subtle">
              Crédito estimado
            </p>
            <p
              className="mt-2 text-3xl font-bold"
              style={{
                color: result.califica
                  ? "var(--accent)"
                  : "var(--text-subtle)",
              }}
            >
              {result.califica && result.monto > 0 ? formatMXN(result.monto) : "—"}
            </p>
            <p className="mt-3 text-xs text-text-subtle leading-relaxed">
              {result.califica
                ? "Estimación orientativa. El monto real lo determina la valuación oficial."
                : "Disponible al alcanzar 100 puntos."}
            </p>
          </Card>

          {/* Plazo */}
          <Card padding="md">
            <p className="text-xs uppercase tracking-[var(--tracking-wide)] text-text-subtle">
              Plazo máximo
            </p>
            <p className="mt-2 text-3xl font-bold text-[var(--text-primary)]">
              {result.plazo > 0 ? `${result.plazo}` : "—"}
              {result.plazo > 0 && (
                <span className="text-text-subtle text-lg font-medium"> años</span>
              )}
            </p>
            <p className="mt-3 text-xs text-text-subtle leading-relaxed">
              Según tu edad ({form.edad}). El plazo se reduce con la edad al cierre.
            </p>
          </Card>
        </div>

        {/* Mejora o siguiente paso */}
        {!result.califica && (
          <Card padding="md">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
              ¿Cómo llegar a 100 puntos?
            </h3>
            <ul className="text-sm text-text-muted space-y-2">
              <li>• Acumula más bimestres cotizando con tu patrón actual.</li>
              <li>• Verifica que tu empleador reporte el salario integrado correcto.</li>
              <li>• Considera aportaciones voluntarias a tu subcuenta de vivienda.</li>
            </ul>
          </Card>
        )}

        {/* CTA */}
        <Card padding="lg" className="text-center">
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
            {result.califica
              ? "Carolina te ayuda a iniciar el trámite"
              : "¿Quieres una revisión personalizada?"}
          </h3>
          <p className="text-text-muted text-sm mb-6 max-w-md mx-auto leading-relaxed">
            {result.califica
              ? "Prepara tu expediente y elige propiedad con asesoría sin costo para derechohabientes."
              : "Carolina puede orientarte sobre cómo acumular puntos más rápido o combinar INFONAVIT con un banco."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button href="https://calendly.com/sensabrokers/consulta" external>
              Agendar consulta gratis →
            </Button>
            <Button onClick={reset} variant="secondary">
              Calcular de nuevo
            </Button>
          </div>
        </Card>

        <p className="text-xs text-text-subtle text-center leading-relaxed">
          Estimación basada en el Modelo T100 INFONAVIT 2026. Pendiente validación con socio
          experto. El monto real se determina en valuación oficial.
        </p>
      </div>
    );
  }

  const canCalculate =
    form.salario &&
    form.antiguedad &&
    form.edad &&
    form.tipoTrabajador &&
    form.subcuenta !== undefined;

  return (
    <Card padding="lg" className="space-y-6">
      {/* Salario */}
      <div>
        <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1">
          Salario mensual integrado (cotización IMSS)
        </label>
        <p className="text-xs text-text-subtle mb-2">
          Es el salario base que reporta tu patrón al IMSS, no tu neto de bolsillo.
        </p>
        <Input
          type="number"
          min={0}
          placeholder="Ej: 15000"
          value={form.salario || ""}
          onChange={(e) => setForm({ ...form, salario: parseFloat(e.target.value) || 0 })}
        />
      </div>

      {/* Antiguedad */}
      <div>
        <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
          Antigüedad cotizando INFONAVIT
        </label>
        <div className="grid grid-cols-2 gap-2">
          {ANTIGUEDAD_OPTIONS.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => setForm({ ...form, antiguedad: o.value })}
              className={optionClass(form.antiguedad === o.value)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {/* Edad */}
      <div>
        <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1">
          Edad
        </label>
        <Input
          type="number"
          min={18}
          max={70}
          placeholder="Ej: 32"
          value={form.edad || ""}
          onChange={(e) => setForm({ ...form, edad: parseInt(e.target.value) || 0 })}
        />
      </div>

      {/* Tipo trabajador */}
      <div>
        <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
          Tipo de trabajador
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Planta (permanente)", value: "planta" },
            { label: "Eventual (temporal)", value: "eventual" },
          ].map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() =>
                setForm({ ...form, tipoTrabajador: o.value as "planta" | "eventual" })
              }
              className={optionClass(form.tipoTrabajador === o.value)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {/* Subcuenta */}
      <div>
        <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1">
          Saldo en subcuenta de vivienda (aproximado)
        </label>
        <p className="text-xs text-text-subtle mb-2">
          Lo puedes consultar en Mi Cuenta INFONAVIT o tu estado de cuenta IMSS.
        </p>
        <Input
          type="number"
          min={0}
          placeholder="Ej: 30000 (o 0 si no sabes)"
          value={form.subcuenta !== undefined ? form.subcuenta : ""}
          onChange={(e) => setForm({ ...form, subcuenta: parseFloat(e.target.value) || 0 })}
        />
      </div>

      {/* Capacidad de pago */}
      <div>
        <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
          Capacidad de pago / historial
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Buena (sin deudas vencidas)", value: "buena" },
            { label: "Irregular (algún retraso)", value: "irregular" },
          ].map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() =>
                setForm({ ...form, capacidadPago: o.value as "buena" | "irregular" })
              }
              className={optionClass(form.capacidadPago === o.value)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <Button onClick={calcular} disabled={!canCalculate} fullWidth size="lg">
        Calcular mis puntos y crédito →
      </Button>

      <p className="text-xs text-text-subtle text-center leading-relaxed">
        Estimación orientativa. Modelo T100 INFONAVIT 2026. Pendiente validación con socio experto post-MVP.
      </p>
    </Card>
  );
}
