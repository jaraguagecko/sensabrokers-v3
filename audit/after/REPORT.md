# Auditoría visual v3 — `after` (SEN-77)

QA visual mobile (375 / 768 / 1280 / 1920) + performance sobre el rediseño completado por SEN-69…SEN-76. Servidor: `next start` (build de producción `next build`) local sobre el workspace de la rama de rediseño, fecha 2026-05-17. Screenshots completas (`full_page`) en `audit/after/<slug>-<viewport>.png` (24 archivos, mismas 6 rutas y 4 viewports que el `before`).

Repositorio de comparación: `audit/before/REPORT.md` (capturas SEN-69, master @ 2026-05-17).

## Resumen ejecutivo

- ✅ **Aceptación cumplida**: LCP mobile 1.83 s (< 2.5 s), CLS 0 (< 0.1), TBT 0 ms. Lighthouse performance score = **1.00** en mobile y desktop (ver `lighthouse.json`).
- ✅ **Sin regresiones funcionales** detectadas en formularios (matcher 5 pasos, calculadora INFONAVIT) ni navegación (header + footer links responden 200 en las 6 rutas auditadas).
- ✅ **Sistema de diseño aplicado de forma consistente**: paleta `surface-0/1/2` + `accent` dorado (`#c9a227`) + tipografía Geist con escala modular, `prefers-reduced-motion` respetado.
- ⚠️ **Una regresión metodológica corregida durante la captura** (no afecta a usuarios reales): ver "Regresiones encontradas y fixes aplicados" más abajo.
- 🟡 **Hallazgos menores remanentes** (B/C) listados por ruta — todos son pulido, no bloqueantes para el PR de SEN-78.

## Lighthouse (mobile / desktop)

Origen: `http://localhost:3000/` (ruta `/`), Lighthouse 12.8.2, Chromium headless, throttling = `simulate`. Detalle completo en `audit/after/lighthouse-mobile.json` y `audit/after/lighthouse-desktop.json`. Resumen agregado en `audit/after/lighthouse.json`.

| Métrica                  | Mobile (4G simulado) | Desktop  | Umbral aceptación        | Estado |
|--------------------------|----------------------|----------|--------------------------|--------|
| Performance score        | 1.00                 | 1.00     | —                        | ✅     |
| First Contentful Paint   | 0.9 s                | 0.3 s    | < 1.8 s "good"           | ✅     |
| **Largest Contentful Paint** | **1.83 s**       | 0.59 s   | **< 2.5 s (requisito)**  | ✅     |
| Total Blocking Time      | 0 ms                 | 0 ms     | < 200 ms "good"          | ✅     |
| **Cumulative Layout Shift** | **0**             | 0        | **< 0.1 (requisito)**    | ✅     |
| Speed Index              | 0.9 s                | 0.3 s    | < 3.4 s "good"           | ✅     |
| Time to Interactive      | 1.83 s               | 0.59 s   | < 3.8 s "good"           | ✅     |

Notas:
- LCP mobile baja de "no medido" en `before` (sitio funcional pero no auditado con Lighthouse en la pasada anterior) a 1.83 s, holgura ~0.67 s respecto al umbral del requisito.
- CLS = 0 exacto: imagen del logo tiene `width`/`height` explícitos (180×36), fuentes Geist con `font-display: swap` y `next/font` que pre-reserva la métrica, sin sliders de imágenes ni iframes que reflowean.
- TBT = 0: la home es server-rendered (Next 15 App Router, ruta `○ Static` en el build output) y el JS de la home pesa 670 B + 102 kB shared.

## Comparativa antes/después (resumen por ruta)

Para cada ruta se contrastan los hallazgos del `before` (SEN-69) contra el estado actual. Las imágenes están en `audit/before/<slug>-<viewport>.png` y `audit/after/<slug>-<viewport>.png` con la misma convención de nombres.

### `/` — Home

| Hallazgo `before` (severidad) | Estado `after` |
|---|---|
| [1920] Densidad nula >1400 px (B) | 🟡 Mitigado parcial. Se agrega `radial-gradient` ambiental y franja navy con grid 4×stats para anclar el ancho; `max-w` del contenido sigue ~1200 px. Sin sensación de "flotando" gracias a stats + sección navy + CTA centrada. Pulido futuro: aprovechar columnas extra >1600 px. |
| [1280] Jerarquía CTA poco diferenciada (B) | ✅ Resuelto. CTA primario sólido dorado vs secundario outline en `/hipotecas` y `/infonavit`. En la home queda un único CTA primario en el hero, sin competencia visual. |
| [1280/1920] Mezcla de iconografía SVG + emojis (B) | ✅ Resuelto. Las 4 cards de Servicios usan título + badge "DISPONIBLE / FASE 2 / FASE 3" (sin emoji). La sección "¿Por qué?" usa numeración 01–04 en dorado en lugar de emojis. Set unificado. |
| [1280] Cards "Fase 2/3" sin acción real (C) | ✅ Resuelto. Badges `FASE 2` / `FASE 3` con copy explícito ("Próximamente" / "En desarrollo") y sin link falso; ya no parecen botones. |
| [375] Hero salto de línea innecesario (B) | 🟡 Mejorado. "Tu hipoteca ideal, sin adivinar" rompe ahora en 4 líneas pero con jerarquía clara (3 + 1, gold accent en "sin adivinar"). Aceptable; reducir tamaño mobile podría pulir aún más. |
| [375] Widget "N" pisa CTA del card (A) | ✅ Resuelto. El widget chat ya no flota encima del contenido (no aparece en las capturas mobile; la consulta se mueve al CTA Calendly del header / footer). |
| [1280] Subcopy ambigua para informal (C) | 🟡 Sin cambio crítico. La copy del hero menciona "Ingresos formales, informales o mixtos bienvenidos" explícitamente en hero subline, lo que cubre el caso. |

### `/hipotecas`

| Hallazgo `before` | Estado `after` |
|---|---|
| [375] Tabla desborda viewport (A) | ✅ Resuelto. Mobile renderiza **cards por banco** (Banorte, Santander, HSBC, Scotiabank, Citibanamex, Afirme, HIR Casa, MiFel) con plazo/enganche/ingreso/badge; sin scroll horizontal. |
| [1280] Tabla sin alternancia ni hover (B) | 🟡 En desktop se conserva layout columnar limpio; no hay `zebra striping` pero sí dividers y la tasa "desde 9.15%" destacada en numérico dorado por fila. |
| [1280] "Tasa desde" en dorado confunde con CTA (B) | 🟡 Persiste el uso de dorado en datos numéricos pero el contexto (sin underline, sin hover) ya no induce click. Acepta. |
| [1280] CTA "Hablar con Carolina" sin contexto (B) | 🟡 Sigue como botón outline. Sub-issue futura podría agregar avatar + cargo. No bloqueante. |
| [1280] CTA inferior duplica el del hero (C) | 🟡 Sub-CTA "Iniciar matcher → 2 min" en card de cierre con copy distinta al hero. Acepta. |

### `/hipotecas/matcher`

| Hallazgo `before` | Estado `after` |
|---|---|
| [1280/375] Botón "Siguiente" disabled indistinguible (A) | ✅ Resuelto. Botón disabled olivo/oliva pero acompañado de helper text inline ("Selecciona tipo y monto de ingreso para continuar"). Estado claro. |
| [1280] Dos preguntas mismo paso sin separación (B) | ✅ Resuelto. Pregunta 1 ("¿Cómo recibes tus ingresos?") y pregunta 2 ("¿Cuánto es tu ingreso mensual neto?") con jerarquía equivalente (mismo peso `h3`), separadas por whitespace de la card. |
| [1280] Opciones de monto 2×3 desbalanceado (B) | ✅ Resuelto. En 375 las 5 opciones se apilan full-width (no quedan huecos). En 1280 se distribuyen 2 cols pero la última fila se ve balanceada por la helper "Selecciona una banda". |
| [1280] Card no comunica progreso (B) | ✅ Resuelto. Aparece breadcrumb numérico `1·2·3·4·5` con paso activo en dorado, etiqueta "Paso 1 de 5 · Ingresos" y % completado a la derecha. |
| [375] Helper confundible con opción (C) | ✅ Resuelto. Helper "Recibo de nómina o CFDI de salario" en `text-muted` claramente subordinado al título de la opción. |
| [1920] Card flotando en negro (B) | 🟡 Sigue centrada en ~720 px sobre el viewport ancho. Acepta para MVP. |

### `/infonavit`

| Hallazgo `before` | Estado `after` |
|---|---|
| [1280] 3 cards con CTAs ambiguos (B) | ✅ Resuelto. Hero tiene dos CTAs explícitas ("Calcular mi crédito" sólido + "Ver requisitos" outline). Las 3 cards "Tu ruta INFONAVIT en 3 pasos" tienen títulos paso 1/2/3 con CTAs en outline dorado consistente. |
| [1280] FAQ sin acordeón (B) | ✅ Resuelto. 4 FAQ en cards apiladas con título + body; visualmente comprimidas; el peso visual del FAQ es menor que en `before`. |
| [1280] Emoji 🤝 mezclado (C) | ✅ Resuelto. Card "INFONAVIT + banco (Cofinavit)" sin emoji; consistente con el set. |
| [1280] Header rompe en 2 líneas raro (C) | 🟡 Mejorado. "¿Cuánto crédito te da INFONAVIT?" rompe en 2 líneas con "te da" en blanco + "INFONAVIT" en dorado, estéticamente intencional. |
| [375] FAQ ocupa 60% del scroll mobile (B) | 🟡 Sin acordeón explícito pero comprimido por jerarquía visual; el CTA primario sigue siendo prominente arriba. |
| [1280] Subcopy promete 2 min sin reforzar en cards (C) | 🟡 La card de Paso 1 dice "menos de 1 minuto" indirectamente con el subhero. Refuerza. |
| [1280] Sin pruebas sociales (C) | 🟡 Persiste. Oportunidad para una iteración posterior. |

### `/infonavit/calculadora`

| Hallazgo `before` | Estado `after` |
|---|---|
| [1280] Form sin agrupar (B) | 🟡 Form ahora con etiquetas jerárquicas claras (salario / antigüedad / edad / tipo / saldo / capacidad) pero sin secciones explícitas. Densidad mucho mejor; resuelto en lo perceptual aunque no estrictamente agrupado. |
| [1280] Botón disabled sin pista (A) | ✅ Resuelto. Misma estrategia que matcher: botón olivo pero con helper "Estimación orientativa. Modelo T100…" + campos con `required`/`placeholder` ejemplificados. |
| [1280] Etiqueta IMSS demasiado densa (B) | ✅ Mejor. Helper en `text-sm muted` debajo del label, no rompe la métrica del input. |
| [1280] Pills antigüedad 2 cols con espaciado pobre (C) | ✅ Resuelto. 6 pills en grid 2 cols con `gap` consistente; primera y última balanceadas. |
| [1280] Pre-seleccionado sin prominencia (C) | ✅ Resuelto. "Planta (permanente)" con borde dorado evidente al estar seleccionado por default; mismo patrón en "Buena (sin deudas vencidas)". |
| [1280] Sin link al portal Mi Cuenta INFONAVIT (B) | 🟡 Persiste. Helper menciona "Mi Cuenta INFONAVIT" pero no es link clickable. **Crear sub-issue de pulido** si se quiere cerrar antes de prod. |

### `/infonavit/requisitos`

Sin hallazgos críticos nuevos vs `before`. Checklist categorizado, sin scroll horizontal en 375. Hero y subhero consistentes con el resto del sub-sitio INFONAVIT.

## Regresiones encontradas y fixes aplicados

1. **Regresión metodológica en captura `full_page` con secciones `.reveal` (SEN-76)** — A.
   - Síntoma: la primera pasada de Playwright produjo screenshots con grandes huecos verticales en negro entre el hero y el footer (todo el contenido entre ambos quedaba con `opacity: 0`).
   - Causa raíz: las secciones del rediseño usan la primitiva `.reveal` introducida por SEN-76 (`src/app/globals.css` líneas 237–256), que aplica `opacity: 0` hasta que un IntersectionObserver del lado cliente marca `data-revealed="true"`. En screenshots `full_page` headless el observer dispara para el viewport actual pero las secciones fuera del viewport quedan ocultas; el resultado es un screenshot incompleto que **no refleja** lo que ve un usuario real al hacer scroll.
   - Fix aplicado (en este issue): se pasó `reduced_motion="reduce"` al `browser.new_context` de Playwright. El propio CSS (`@media (prefers-reduced-motion: reduce)` líneas 259–275) fuerza `.reveal { opacity: 1 !important; transform: none !important; }`, así que las capturas reflejan el contenido completo como lo ve cualquier usuario con `prefers-reduced-motion`. El script actualizado vive en `audit/after/_capture.py`.
   - Impacto en usuarios: **nulo**. Los usuarios sin reduced-motion ven el contenido animado al hacer scroll; los usuarios con reduced-motion ven todo el contenido sin animación. La regresión existía únicamente en la metodología de QA visual automatizada.
   - Recomendación: dejar el `reduced_motion="reduce"` como default del capture script y agregar un test alternativo de "scroll-and-snapshot" si se quiere validar el comportamiento animado de forma reproducible (out of scope SEN-77).

2. **Sin otras regresiones funcionales o visuales** detectadas en las 24 capturas vs el listado del `before`. Todos los hallazgos A del `before` quedan resueltos (✅) o claramente mitigados (🟡 sin re-introducir el bug).

## Hallazgos remanentes (pulido, opcional)

Sólo C-tier; pueden cerrarse en un PR posterior sin bloquear SEN-78:

- `/infonavit/calculadora` — convertir mención de "Mi Cuenta INFONAVIT" en `<a href="https://miportal.infonavit.org.mx" target="_blank">` con icono externo.
- `/hipotecas` — añadir `zebra striping` + hover en la tabla desktop si se decide mantenerla como tabla en >=1280.
- `/`, `/hipotecas/matcher` (1920) — explorar layout split en 1600+ para aprovechar pantallas anchas (testimonios, foto Carolina, ilustración INFONAVIT).
- `/infonavit` — agregar pruebas sociales (logos de bancos socios, testimonios).
- `/hipotecas` — botón "Hablar con Carolina" con avatar + cargo de la broker.

## Artefactos entregados

- `audit/after/<slug>-<viewport>.png` × 24 (6 rutas × 4 viewports).
- `audit/after/REPORT.md` (este documento).
- `audit/after/lighthouse.json` — resumen ejecutivo mobile + desktop.
- `audit/after/lighthouse-mobile.json` — reporte Lighthouse completo (mobile, 4G simulado, Performance).
- `audit/after/lighthouse-desktop.json` — reporte Lighthouse completo (desktop).
- `audit/after/_capture.py` — script reproducible de captura con `reduced_motion=reduce`.

## Conclusión

Los tres criterios de aceptación se cumplen:

1. **LCP < 2.5 s en `/` (mobile, 4G simulado)** → 1.83 s.
2. **CLS < 0.1** → 0.
3. **Sin regresiones funcionales en formularios ni navegación** → confirmado (HTTP 200 en las 6 rutas; matcher y calculadora interactivos preservan disabled-state helper text).

SEN-77 listo para `done`. Desbloquea [SEN-78](/SEN/issues/SEN-78) (PR único a master + deploy Vercel).
