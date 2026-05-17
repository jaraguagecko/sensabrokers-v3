// Reglas de calculo INFONAVIT (Modelo T100 vigente 2026)
// POST-MVP: Esta seccion sera revisada por el socio experto.
// Para modificar logica de calculo, editar SOLO este archivo.

export const INFONAVIT_CONFIG = {
  puntos_minimos: 100,

  puntos_bimestres: [
    { min: 0, max: 2, puntos: 0 },
    { min: 3, max: 8, puntos: 12 },
    { min: 9, max: 17, puntos: 17 },
    { min: 18, max: 29, puntos: 21 },
    { min: 30, max: Infinity, puntos: 28 },
  ],

  puntos_edad: [
    { min: 17, max: 29, puntos: 16 },
    { min: 30, max: 39, puntos: 17 },
    { min: 40, max: 55, puntos: 18 },
    { min: 56, max: Infinity, puntos: 16 },
  ],

  // Salario en pesos MXN
  puntos_salario: [
    { min: 0, max: 19164, puntos: 16 },
    { min: 19165, max: 28746, puntos: 17 },
    { min: 28747, max: 57494, puntos: 19 },
    { min: 57495, max: 67076, puntos: 21 },
    { min: 67077, max: Infinity, puntos: 23 },
  ],

  puntos_subcuenta: [
    { min: 0, max: 9999, puntos: 16 },
    { min: 10000, max: 24999, puntos: 17 },
    { min: 25000, max: 49999, puntos: 18 },
    { min: 50000, max: Infinity, puntos: 19 },
  ],

  puntos_tipo_trabajador: {
    planta: 18,
    eventual: 13,
  },

  puntos_capacidad_pago: {
    buena: 18,
    irregular: 16,
  },

  // Monto de credito estimado (formula simplificada para MVP)
  // Real: depende de valuacion de SHF y formula actuarial INFONAVIT
  factor_credito_por_veces_salario: {
    hasta_6_meses: 0,
    de_6m_a_1a: 15,
    de_1a_a_2a: 20,
    de_2a_a_5a: 25,
    mas_de_5a: 30,
  },

  // Plazo maximo segun edad
  plazo_maximo_por_edad: [
    { edad_max: 45, plazo_max_anios: 30 },
    { edad_max: 50, plazo_max_anios: 25 },
    { edad_max: 55, plazo_max_anios: 20 },
    { edad_max: 60, plazo_max_anios: 15 },
    { edad_max: 65, plazo_max_anios: 10 },
  ],

  tasa_infonavit_pct: 12.0, // Tasa en VSM (se ajusta anualmente)

  salario_minimo_diario: 248.93, // 2026, se actualiza con decreto oficial
};

export type AntiguedadRange =
  | "menos_6m"
  | "6m_1a"
  | "1a_2a"
  | "2a_5a"
  | "5a_10a"
  | "10a_mas";

export function antiguedadToBimestres(range: AntiguedadRange): number {
  const map: Record<AntiguedadRange, number> = {
    menos_6m: 1,
    "6m_1a": 4,
    "1a_2a": 10,
    "2a_5a": 20,
    "5a_10a": 35,
    "10a_mas": 60,
  };
  return map[range];
}

export function calcularPuntosINFONAVIT(params: {
  salario: number;
  antiguedadBimestres: number;
  edad: number;
  tipoTrabajador: "planta" | "eventual";
  subcuenta: number;
  capacidadPago: "buena" | "irregular";
}): number {
  const { salario, antiguedadBimestres, edad, tipoTrabajador, subcuenta, capacidadPago } = params;

  const pBimestres =
    INFONAVIT_CONFIG.puntos_bimestres.find(
      (r) => antiguedadBimestres >= r.min && antiguedadBimestres <= r.max
    )?.puntos ?? 0;

  const pEdad =
    INFONAVIT_CONFIG.puntos_edad.find(
      (r) => edad >= r.min && edad <= r.max
    )?.puntos ?? 16;

  const pSalario =
    INFONAVIT_CONFIG.puntos_salario.find(
      (r) => salario >= r.min && salario <= r.max
    )?.puntos ?? 16;

  const pSubcuenta =
    INFONAVIT_CONFIG.puntos_subcuenta.find(
      (r) => subcuenta >= r.min && subcuenta <= r.max
    )?.puntos ?? 16;

  const pTrabajador = INFONAVIT_CONFIG.puntos_tipo_trabajador[tipoTrabajador];
  const pCapacidad = INFONAVIT_CONFIG.puntos_capacidad_pago[capacidadPago];

  return pBimestres + pEdad + pSalario + pSubcuenta + pTrabajador + pCapacidad;
}

export function estimarMontoCredito(params: {
  salario: number;
  antiguedadBimestres: number;
  subcuenta: number;
}): number {
  const { salario, antiguedadBimestres, subcuenta } = params;
  let veces = 0;
  if (antiguedadBimestres <= 2) veces = 0;
  else if (antiguedadBimestres <= 8) veces = 15;
  else if (antiguedadBimestres <= 17) veces = 20;
  else if (antiguedadBimestres <= 29) veces = 25;
  else veces = 30;

  const base = salario * veces;
  return Math.round(base + subcuenta * 0.5);
}
