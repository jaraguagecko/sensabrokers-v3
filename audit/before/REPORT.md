# Auditoría visual v3 — `before` (SEN-69)

Captura: 6 rutas × 4 viewports (375, 768, 1280, 1920). Servidor: `next dev` local sobre `master @ 2026-05-17`. Screenshots completas (`full_page`) en `audit/before/<slug>-<viewport>.png` (24 archivos).

Notación: `[viewport]` indica dónde se observa el hallazgo. Severidad: **A** = blocker, **B** = importante, **C** = pulido.

Convenciones globales que aparecen en todas las rutas:
- Paleta: negro `#000` + azul muy oscuro (`#0B1320` aprox.) + amarillo/dorado (`#E5B73B`) + texto blanco/`zinc-300`. Acento dorado se usa tanto para CTA primario como para `<strong>` decorativo en headings → diluye la jerarquía.
- Header sticky con `Hipotecas / INFONAVIT / Nosotros / Agenda consulta`. En `375` aparece hamburguesa sin estado focus visible.
- Widget circular "N" (asistente / chat) flotando en el borde izquierdo (no esquina) en `1280/1920`. En `375` se monta encima del contenido del hero.
- Footer con `Aviso de privacidad` y `Términos de uso` en gris azulado de muy baja luminosidad sobre fondo casi negro → contraste estimado < 3:1.

---

## `/` — Home

Screenshots: `home-375.png`, `home-768.png`, `home-1280.png`, `home-1920.png`.

1. **[1920] Densidad nula a partir de ~1400 px (B)**. El contenido permanece centrado en ~1200 px y deja dos bandas negras enormes a los lados; el hero, el grid `Servicios` y el grid `¿Por qué Sensabrokers?` se sienten "flotando" en una pantalla vacía. Falta capa visual (gradient, blob, ilustración o `max-width` mayor) para 1440+.
2. **[1280] Jerarquía CTA poco diferenciada (B)**. "Usar el Matcher gratis" (sólido amarillo) y "Calcular crédito INFONAVIT" (outline) tienen tamaño tipográfico y peso casi iguales. El secundario compite visualmente con el primario; debería ser claramente menor o `ghost`. Además el botón outline pierde el borde casi del todo sobre `#000`.
3. **[1280/1920] Mezcla de iconografía (B)**. Cards de `Servicios` usan SVG monocromos (`🏛`/`🏠`/línea/robot), pero la sección `¿Por qué Sensabrokers?` usa emojis nativos (🔍 👥 ⚡ 🏆). Cambia de set de iconos a media página → quiebra la consistencia visual.
4. **[1280] Cards "Fase 2" / "Fase 3" sin acción real (C)**. Llevan badge `PRÓXIMAMENTE` / `EN DESARROLLO` y el texto "Notificarme" / "En desarrollo" parece link pero está deshabilitado y no se distingue del párrafo. Sugiere un estado disabled más explícito o quitar la card si no aporta conversión.
5. **[375] Hero hace doble salto de línea innecesario (B)**. "Tu hipoteca ideal, sin adivinar" rompe en 4 líneas (`Tu` / `hipoteca` / `ideal,` / `sin adivinar`) por el `font-size` heredado de desktop. Es la primera impresión móvil y se siente apretada. Reducir tipografía mobile o reescribir a 2 líneas máximo.
6. **[375] Widget "N" pisa el botón "Usar el Matcher" del card (A)**. El círculo aparece dentro del card "Hipotecas bancarias", tapando ~10 px del CTA. Sea fijo o sticky, debe respetar safe-area.
7. **[1280] Subcopy del hero ambigua para el target informal (C)**. "Evaluamos tu perfil y te mostramos las mejores opciones reales — sin sesgos, sin favoritismos al banco." Es la promesa al cliente formal; para freelancer/informal (que el sitio destaca como diferenciador) la frase clave debería estar en el hero, no en la card de bullets.

---

## `/hipotecas`

Screenshots: `hipotecas-375.png`, `hipotecas-768.png`, `hipotecas-1280.png`, `hipotecas-1920.png`.

1. **[375] Tabla "Opciones disponibles" desborda el viewport (A)**. La columna `Perfil` queda cortada — se ven `Form…`, `Sin com…`, `Todo tipo ingre…`. El desbordamiento implica scroll horizontal o truncado; ninguno está señalizado. Hay que reflowear (cards apilados por banco en mobile) o agregar `overflow-x` explícito con sombra de borde.
2. **[1280] Tabla sin alternancia de fila ni hover (B)**. 9 filas a `text-zinc-300` sobre `#0F172A` con divisor sutil; el ojo se pierde al cruzar fila ↔ columna. Falta `:hover` y `zebra striping` para escaneo.
3. **[1280] "Tasa desde" en amarillo confunde con CTA (B)**. El dorado se usa para el call-to-action principal del sitio; reutilizarlo en datos numéricos hace que el usuario crea que cada celda es clickeable.
4. **[1280] CTA "Hablar con Carolina" sin contexto (B)**. Es un botón outline sin foto/avatar de Carolina ni cargo. Para un broker independiente, la confianza humana es el principal driver de conversión; debería incluir foto + 1 línea de quién es.
5. **[1280] Bloque inferior "¿Cuál es la mejor para ti?" duplica CTA (C)**. Repite el botón amarillo del hero ("Iniciar matcher → 2 min" vs "Usar el Matcher gratis →"). Mismo destino, copy distinto → el usuario duda si son acciones distintas. Unificar wording.
6. **[1280] Nota legal de tasas con tamaño muy pequeño (C)**. "* Tasas anuales fijas orientativas…" a ~11 px y bajo contraste; legal y comercialmente relevante. Subir a 12-13 px y al menos `zinc-400`.
7. **[1920] Layout sigue confinado al mismo `max-w` (C)**. La tabla y la card de cierre se ven huérfanas en pantalla ancha; aprovechar el espacio horizontal para mostrar columnas adicionales (plazo, comisión apertura) o un comparativo visual.

---

## `/hipotecas/matcher`

Screenshots: `hipotecas-matcher-375.png`, `hipotecas-matcher-768.png`, `hipotecas-matcher-1280.png`, `hipotecas-matcher-1920.png`.

1. **[1280/375] Botón "Siguiente" disabled indistinguible (A)**. Color olivo opaco; no comunica claramente "selecciona algo arriba". Usuarios pueden creer que el botón está roto. Añadir helper text ("Selecciona una opción para continuar") y un estilo disabled estándar (gris neutro + cursor `not-allowed`).
2. **[1280] Dos preguntas en el mismo paso sin separación visual fuerte (B)**. "¿Cómo recibes tus ingresos?" + "¿Cuánto es tu ingreso mensual neto?" comparten card. El segundo bloque parece secundario por la diferencia de jerarquía del título. Necesita divider/encabezado del mismo peso o splittearse en pasos 1.a / 1.b.
3. **[1280] Opciones de monto en 2×3 desbalanceado (B)**. 5 botones en grid 2 cols → "Más de $100,000" queda solo en una fila a la izquierda, generando hueco a la derecha. Pasar a 3 cols o full-width la última.
4. **[1280] Card no comunica progreso suficiente (B)**. "Paso 1 de 5 · 0% completado" es la única señal; falta breadcrumb de pasos o etiquetas (Ingresos · Monto · Enganche · Propósito · Contacto) para reducir abandono.
5. **[375] Radio buttons custom con etiqueta + helper en mismo color jerárquico (C)**. "Formal (nómina/salario)" y "Recibo de nómina o CFDI de salario" tienen luminosidad muy cercana; el helper se confunde con la opción. Bajar opacidad o tamaño del helper.
6. **[1280] Sin botón "Atrás" en paso 1 visible aún (C)**. Anticipar dónde aparecerá en pasos siguientes; si se pondrá fuera de la card romperá la unidad visual.
7. **[1920] Toda la card flotando en negro (B)**. Igual problema que home: 60% de la pantalla es vacío. Considerar split-layout (formulario izq + resumen/empatía der + foto Carolina).

---

## `/infonavit`

Screenshots: `infonavit-375.png`, `infonavit-768.png`, `infonavit-1280.png`, `infonavit-1920.png`.

1. **[1280] 3 cards de acción con CTAs ambiguos (B)**. "Calcular →", "Ver checklist →", "Explorar opciones →" — los tres son outline dorado del mismo peso. El usuario no sabe cuál es la acción principal (probablemente la calculadora). Promover la primera a sólida.
2. **[1280] FAQ sin acordeón (B)**. 4 preguntas siempre abiertas → fold se llena de texto, baja densidad de información útil arriba. Implementar `<details>` o acordeón controlado, mantener la primera abierta.
3. **[1280] Card "INFONAVIT + banco" con emoji 🤝 (C)**. Mismo problema de iconografía mixta que en home; los otros dos cards usan SVG (📋/grid). Unificar set.
4. **[1280] Header "¿Cuánto crédito te da INFONAVIT?" rompe en 2 líneas en 1280 pero centrado raro (C)**. "te da INFONAVIT" baja a otra línea con coloración mixta blanco/amarillo → la palabra clave "INFONAVIT" queda sola en la línea 2, leíble pero estética asimétrica.
5. **[375] Bloques FAQ ocupan ~60% del scroll mobile (B)**. Sin acordeón el scroll es muy largo; el CTA primario "Calcular mi crédito" desaparece muy arriba. Necesita CTA sticky inferior móvil.
6. **[1280] Subcopy promete "estimar tu crédito en 2 minutos" pero no se ve un tiempo estimado en cada card (C)**. Promesa de 2 min sólo aparece en el hero; reforzarla en la card de Calculadora.
7. **[1280] Sin pruebas sociales (C)**. Página de producto pesado en regulación; no hay testimonios, logos de bancos asociados, ni "X usuarios calcularon su crédito". Oportunidad de redesign.

---

## `/infonavit/calculadora`

Screenshots: `infonavit-calculadora-375.png`, `infonavit-calculadora-768.png`, `infonavit-calculadora-1280.png`, `infonavit-calculadora-1920.png`.

1. **[1280] Form de 6 campos sin agrupar (B)**. Salario / Antigüedad / Edad / Tipo de trabajador / Saldo subcuenta / Capacidad de pago aparecen en una sola columna larga sin secciones. Agrupar en `Datos laborales` / `Datos financieros` para reducir la sensación de cuestionario.
2. **[1280] Botón "Calcular mis puntos y crédito" disabled por defecto sin pista (A)**. Mismo patrón que matcher; con 6 campos vacíos el usuario ve un botón "muerto" como CTA principal. Mantener disabled pero añadir microcopy "Completa los campos para calcular".
3. **[1280] "Salario mensual integrado (cotización IMSS)" texto demasiado denso (B)**. Etiqueta + helper "Es el salario base que reporta tu patrón al IMSS, no tu neto de bolsillo." es bueno, pero hace `wrap` y empuja el input. Considerar tooltip `(?)` para no romper densidad.
4. **[1280] Pills de antigüedad (Menos de 6 meses, 6m–1 año, etc.) en grid 2 cols con espaciado pobre (C)**. Se ven como botones radio inflados; convertir a `chips` compactos en una sola fila scrollable o un slider.
5. **[1280] "Tipo de trabajador" sólo Planta/Eventual con el primer estado seleccionado por default (C)**. No es obvio que "Planta" está pre-seleccionado (borde dorado sutil). Subir la prominencia del estado seleccionado.
6. **[1280] "Saldo en subcuenta de vivienda" sin enlace al portal Mi Cuenta INFONAVIT (B)**. El helper menciona el portal pero no linkea; el usuario sale del flujo a buscar Google. Añadir `<a href="https://miportal.infonavit.org.mx" target="_blank">` con icono externo.
7. **[1280] Disclaimer "Estimación orientativa. Modelo T100 INFONAVIT 2026" centrado al pie del form (C)**. Importante regulatorio, pero compite con el botón de submit por proximidad; separar con `mt-6` y poner color `zinc-500`.

---

## `/infonavit/requisitos`

Screenshots: `infonavit-requisitos-375.png`, `infonavit-requisitos-768.png`, `infonavit-requisitos-1280.png`, `infonavit-requisitos-1920.png`.

1. **[1280/1920] Hero se monta DEBAJO del header sticky (A)**. El bloque "CHECKLIST 2026 / Requisitos INFONAVIT / Lista completa…" aparece superpuesto con el navbar (se ven nombres del nav cruzando el título). Falta `padding-top` o `scroll-margin` en el `<main>` (o el navbar no es opaco). Bug visual evidente en desktop.
2. **[1280] Checklist "pre-marcado" engañoso (A)**. La mayoría de items vienen con checkbox verde "✓" por default; el usuario no marcó nada. Sugiere progreso falso. Estado inicial debe ser `unchecked` excepto si hay persistencia previa.
3. **[1280] Items "(si aplica)" duplican etiqueta (C)**. "Acta de matrimonio (si aplica) (si aplica)" — el helper aparece dos veces en la línea. Bug de copy/renderizado.
4. **[1280] "Pasos del trámite" usan numeritos circulares pero sin línea conectora (C)**. Visualmente parecen 6 items sueltos; agregar conector vertical (timeline) para reforzar secuencia.
5. **[1280] CTA dual "Agendar con Carolina" + "Calcular mis puntos" sin priorización (B)**. Mismo peso visual; el calculador es probablemente la conversión preferida. Promover uno.
6. **[1280] Categorías (IDENTIFICACIÓN, COMPROBANTE DE DOMICILIO…) usan dorado pero los items son blanco — falta separación de subbloques en mobile (B)**. En `375` los grupos se funden, sin background diferenciado.
7. **[375] No hay "guardar progreso" del checklist (C)**. Si el usuario marca 3 de 18 y refresca, pierde el estado. Para un flow de 18 docs, persistencia local (localStorage) es básico.

---

## Hallazgos globales para el redesign v3.1

- **Sistema de colores**: separar dorado-CTA del dorado-acento decorativo. Definir token `--color-action` vs `--color-emphasis`.
- **Iconografía**: elegir UN set (SVG line, SVG fill, o emoji); eliminar la mezcla.
- **Estados disabled**: estandarizar (color + helper text) — actualmente parece un "submit roto" en matcher y calculadora.
- **Responsive de datos tabulares**: la tabla de bancos en `/hipotecas` debe reflowear en mobile.
- **Layout >1440 px**: definir si se aprovecha el ancho (split, ilustración) o se mantiene el `max-w` con un fondo más rico — hoy queda hueco.
- **Trust signals**: añadir foto y bio breve de Carolina, contador de usuarios atendidos, logos de bancos.
- **Navbar overlap en /infonavit/requisitos**: bug bloqueante para hacer un "after" justo.
- **Footer contraste accesible**: subir tono de links legales a `zinc-400` mínimo.
- **CTA sticky mobile** en formularios largos (matcher, calculadora, requisitos).
- **Microcopy de progreso** en formularios multi-paso (breadcrumb de pasos en matcher).
