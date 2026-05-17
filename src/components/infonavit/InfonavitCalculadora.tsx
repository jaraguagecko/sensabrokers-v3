"use client";
import { useState } from "react";
import {
  calcularPuntosINFONAVIT,
  estimarMontoCredito,
  antiguedadToBimestres,
  INFONAVIT_CONFIG,
  type AntiguedadRange,
} from "../../../config/infonavit-rules.config";

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
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);
}

export default function InfonavitCalculadora() {
  const [form, setForm] = useState<Partial<FormData>>(defaultForm);
  const [result, setResult] = useState<{ puntos: number; monto: number; califica: boolean } | null>(null);

  function calcular() {
    if (!form.salario || !form.antiguedad || !form.edad || !form.tipoTrabajador || form.subcuenta === undefined) return;

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

    setResult({ puntos, monto, califica: puntos >= INFONAVIT_CONFIG.puntos_minimos });
  }

  function reset() {
    setResult(null);
    setForm(defaultForm);
  }

  if (result) {
    return (
      <div className="card-dark p-6 space-y-4">
        <div className="text-center">
          {result.califica ? (
            <>
              <span className="text-4xl">✅</span>
              <h2 className="text-xl font-bold mt-2">¡Calificas para crédito INFONAVIT!</h2>
            </>
          ) : (
            <>
              <span className="text-4xl">⏳</span>
              <h2 className="text-xl font-bold mt-2">Aún no alcanzas el mínimo</h2>
            </>
          )}
        </div>

        {/* Points bar */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Tus puntos</span>
            <span className="font-bold text-white">{result.puntos} / 124 máx.</span>
          </div>
          <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.min(100, (result.puntos / 124) * 100)}%`,
                background: result.califica
                  ? "linear-gradient(90deg, #c9a227, #e8c84a)"
                  : "linear-gradient(90deg, #6b7280, #9ca3af)",
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>0</span>
            <span className="text-yellow-600">Mínimo: {INFONAVIT_CONFIG.puntos_minimos}</span>
            <span>124</span>
          </div>
        </div>

        {result.califica && result.monto > 0 && (
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <p className="text-gray-400 text-sm">Crédito estimado</p>
            <p className="text-3xl font-bold mt-1" style={{ color: "var(--color-brand-gold)" }}>
              {formatMXN(result.monto)}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              * Estimación orientativa basada en el Modelo T100. El monto real puede variar.
            </p>
          </div>
        )}

        {!result.califica && (
          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-sm text-gray-300 font-medium mb-2">¿Qué necesitas para llegar a 100 puntos?</p>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Más tiempo cotizando (lleva más bimestres)</li>
              <li>• Aumentar tu subcuenta de vivienda</li>
              <li>• Verificar que tu empleador reporte correctamente</li>
            </ul>
          </div>
        )}

        <div className="card-dark p-4 text-center">
          <p className="text-sm text-gray-400 mb-3">
            {result.califica
              ? "Carolina te ayuda a iniciar el trámite y preparar tu expediente."
              : "Carolina puede orientarte sobre cómo acumular puntos más rápido."}
          </p>
          <a
            href="https://calendly.com/sensabrokers/consulta"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-block mb-3"
          >
            Agendar consulta gratis →
          </a>
        </div>

        <div className="text-xs text-gray-600 text-center">
          Estimación basada en el Modelo T100 INFONAVIT 2026. Pendiente validación con socio experto.
          <br />El monto real se determina en valuación oficial.
        </div>

        <button onClick={reset} className="w-full btn-outline-gold text-sm">
          Calcular de nuevo
        </button>
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
    <div className="card-dark p-6 space-y-5">
      {/* Salario */}
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-1">
          Salario mensual integrado (cotización IMSS)
        </label>
        <p className="text-xs text-gray-500 mb-2">
          Es el salario base que reporta tu patrón al IMSS, no tu neto de bolsillo.
        </p>
        <input
          type="number"
          min={0}
          placeholder="Ej: 15000"
          value={form.salario || ""}
          onChange={(e) => setForm({ ...form, salario: parseFloat(e.target.value) || 0 })}
          className="input-dark"
        />
      </div>

      {/* Antiguedad */}
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Antigüedad cotizando INFONAVIT
        </label>
        <div className="grid grid-cols-2 gap-2">
          {ANTIGUEDAD_OPTIONS.map((o) => (
            <button
              key={o.value}
              onClick={() => setForm({ ...form, antiguedad: o.value })}
              className={`p-3 rounded-lg border text-sm text-left transition-all ${
                form.antiguedad === o.value
                  ? "border-yellow-500 bg-yellow-500/10 text-white"
                  : "border-gray-700 text-gray-400 hover:border-gray-500"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {/* Edad */}
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-1">Edad</label>
        <input
          type="number"
          min={18}
          max={70}
          placeholder="Ej: 32"
          value={form.edad || ""}
          onChange={(e) => setForm({ ...form, edad: parseInt(e.target.value) || 0 })}
          className="input-dark"
        />
      </div>

      {/* Tipo trabajador */}
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">Tipo de trabajador</label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Planta (permanente)", value: "planta" },
            { label: "Eventual (temporal)", value: "eventual" },
          ].map((o) => (
            <button
              key={o.value}
              onClick={() => setForm({ ...form, tipoTrabajador: o.value as "planta" | "eventual" })}
              className={`p-3 rounded-lg border text-sm transition-all ${
                form.tipoTrabajador === o.value
                  ? "border-yellow-500 bg-yellow-500/10 text-white"
                  : "border-gray-700 text-gray-400 hover:border-gray-500"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {/* Subcuenta */}
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-1">
          Saldo en subcuenta de vivienda (aproximado)
        </label>
        <p className="text-xs text-gray-500 mb-2">
          Lo puedes consultar en Mi Cuenta INFONAVIT o tu estado de cuenta IMSS.
        </p>
        <input
          type="number"
          min={0}
          placeholder="Ej: 30000 (o 0 si no sabes)"
          value={form.subcuenta !== undefined ? form.subcuenta : ""}
          onChange={(e) => setForm({ ...form, subcuenta: parseFloat(e.target.value) || 0 })}
          className="input-dark"
        />
      </div>

      {/* Historial crediticio */}
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">Capacidad de pago / historial</label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Buena (sin deudas vencidas)", value: "buena" },
            { label: "Irregular (algún retraso)", value: "irregular" },
          ].map((o) => (
            <button
              key={o.value}
              onClick={() => setForm({ ...form, capacidadPago: o.value as "buena" | "irregular" })}
              className={`p-3 rounded-lg border text-sm transition-all ${
                form.capacidadPago === o.value
                  ? "border-yellow-500 bg-yellow-500/10 text-white"
                  : "border-gray-700 text-gray-400 hover:border-gray-500"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={calcular}
        disabled={!canCalculate}
        className="btn-gold w-full disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Calcular mis puntos y crédito →
      </button>

      <p className="text-xs text-gray-600 text-center">
        Estimación orientativa. Modelo T100 INFONAVIT 2026. Pendiente validación con socio experto post-MVP.
      </p>
    </div>
  );
}
