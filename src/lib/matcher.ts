// Matcher hipotecario — motor de reglas determinista
// Logica de negocio en /config/matcher/*.yaml — NO hardcodear aqui.

export type TipoIngreso = "formal" | "informal" | "mixto";
export type ScoreLabel = "excelente" | "bueno" | "regular" | "bajo" | "no_se";
export type SituacionLaboral =
  | "empleado_2mas"
  | "empleado_menos2"
  | "negocio_2mas"
  | "negocio_menos2"
  | "jubilado"
  | "sin_empleo";
export type Proposito =
  | "compra_primera"
  | "compra_inversion"
  | "compra_preventa"
  | "refinanciamiento"
  | "liquidez"
  | "cambio_infonavit"
  | "construccion"
  | "terreno_construccion"
  | "segundo_credito";

export interface MatcherInput {
  tipoIngreso: TipoIngreso;
  ingresoMensual: number;
  coAcreditado: boolean;
  coAcreditadoIngreso?: number;
  coAcreditadoTipoIngreso?: TipoIngreso;
  montoCredito: number;
  enganches: number;
  proposito: Proposito;
  estado: string;
  edad: number;
  score: ScoreLabel;
  situacionLaboral: SituacionLaboral;
  tieneTerreno: boolean;
  esDerechohabiente: "infonavit" | "fovissste" | "ambos" | "ninguno";
}

export interface ProductResult {
  id: string;
  name: string;
  channel: string;
  tasa_min: number;
  tasa_max?: number;
  tasa_fija?: number;
  enganche_min_pct: number;
  plazo_max_anios: number;
  score: number;
  elegible: boolean;
  razones_exclusion: string[];
  docs: string[];
  sin_comision_apertura?: boolean;
  aceptan_ingresos_informales?: boolean;
}

const SCORE_ORDER: Record<ScoreLabel, number> = {
  excelente: 740,
  bueno: 680,
  regular: 600,
  bajo: 400,
  no_se: 600,
};

export function runMatcher(
  input: MatcherInput,
  products: Record<string, unknown>[]
): ProductResult[] {
  const ingresoTotal =
    input.coAcreditado && input.coAcreditadoIngreso
      ? input.ingresoMensual + input.coAcreditadoIngreso
      : input.ingresoMensual;

  const antiguedadMeses = situacionToMeses(input.situacionLaboral);
  const scoreValue = SCORE_ORDER[input.score];

  const results: ProductResult[] = products.map((p) => {
    const prod = p as Record<string, unknown>;
    const razones: string[] = [];

    // Elegibilidad checks
    const tiposAceptados = prod.tipo_ingreso as string[];
    if (!tiposAceptados.includes(input.tipoIngreso)) {
      if (
        !(
          input.coAcreditado &&
          input.coAcreditadoTipoIngreso === "formal" &&
          tiposAceptados.includes("formal")
        )
      ) {
        razones.push("Tipo de ingreso no aceptado por este producto");
      }
    }

    const ingresoMin = prod.ingreso_min as number;
    if (ingresoTotal < ingresoMin) {
      razones.push(`Ingreso mínimo requerido: $${ingresoMin.toLocaleString()}`);
    }

    const scoreMin = prod.score_min as string;
    const scoreMinVal = SCORE_ORDER[scoreMin as ScoreLabel] ?? 600;
    if (scoreValue < scoreMinVal) {
      razones.push(`Score mínimo: ${scoreMin}`);
    }

    const antiguedadMin = prod.antiguedad_laboral_min as number;
    if (antiguedadMeses < antiguedadMin) {
      razones.push(`Antigüedad mínima: ${antiguedadMin} meses`);
    }

    const propositos = prod.propositos as string[];
    if (!propositos.includes(input.proposito)) {
      razones.push("Propósito no cubierto por este producto");
    }

    const elegible = razones.length === 0;

    // Scoring de los elegibles
    let score = 0;
    if (elegible) {
      const tasa = (prod.tasa_fija as number) ?? (prod.tasa_min as number);
      score += Math.max(0, (15 - tasa) / 15) * 35;
      const enganche = prod.enganche_min_pct as number;
      score += Math.max(0, (50 - enganche) / 50) * 20;
      const ingresoRelativo = Math.min(1, ingresoMin / Math.max(1, ingresoTotal));
      score += (1 - ingresoRelativo) * 20;
      const plazo = prod.plazo_max_anios as number;
      score += (plazo / 30) * 10;
      if (prod.aceptan_ingresos_informales && input.tipoIngreso !== "formal") {
        score += 15;
      }
    }

    return {
      id: prod.id as string,
      name: prod.name as string,
      channel: prod.channel as string,
      tasa_min: (prod.tasa_min as number) ?? (prod.tasa_fija as number),
      tasa_max: prod.tasa_max as number | undefined,
      tasa_fija: prod.tasa_fija as number | undefined,
      enganche_min_pct: prod.enganche_min_pct as number,
      plazo_max_anios: prod.plazo_max_anios as number,
      score,
      elegible,
      razones_exclusion: razones,
      docs: prod.docs as string[],
      sin_comision_apertura: prod.sin_comision_apertura as boolean | undefined,
      aceptan_ingresos_informales: prod.aceptan_ingresos_informales as boolean | undefined,
    };
  });

  return results
    .filter((r) => r.elegible)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function situacionToMeses(s: SituacionLaboral): number {
  switch (s) {
    case "empleado_2mas": return 24;
    case "empleado_menos2": return 12;
    case "negocio_2mas": return 24;
    case "negocio_menos2": return 12;
    case "jubilado": return 24;
    case "sin_empleo": return 0;
  }
}
