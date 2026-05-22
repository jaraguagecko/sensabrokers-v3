# SEN-79 — v3.2-warm Visual Audit

Versión paralela "cálida / tradicional / cercana" de Sensabrokers. Branch: `redesign/v3.2-warm`. La v3.1 (oscura, fintech, dorada) sigue siendo la productiva en `sensabrokers.com`.

## Capturas

Mismo flujo que SEN-78. Playwright + Chromium, `reduced_motion=reduce` para forzar `.reveal` a opacidad 1. Páginas estáticas servidas con `npm run start`.

- Mobile: 375×812 → `mobile/*.png`
- Desktop: 1280×800 → `desktop/*.png`

Rutas capturadas:

- `/` — home
- `/hipotecas` — landing comparativa
- `/hipotecas/matcher` — formulario
- `/infonavit` — landing
- `/infonavit/calculadora` — calculadora
- `/infonavit/requisitos` — checklist

## Cambios visuales clave vs v3.1

| Aspecto | v3.1 (productiva) | v3.2-warm |
|---|---|---|
| Fondo | Negro/navy oscuro | Crema cálido (`#f7f1e6`) con sutil grano de papel |
| Acento | Dorado (`#c9a227`) | Terracota mate (`#b8593a`) |
| Headlines | Geist sans, tracking apretado | Fraunces serif, tracking neutro |
| Logo | `logo-dark.svg` | `logo-light.svg` |
| Hero | Texto centrado + radial dark | Texto + AdvisorCard (foto/ilustración + cita) |
| Énfasis | Color sólido `text-accent` | Subrayado pintado a mano (`warm-underline`) |
| Trust signals | Stats numéricos | TrustStrip ("asesor humano", "sin bots", "WhatsApp directo", "sin costo hasta el cierre") + stats |
| Asesor | Nombre suelto (Carolina) | AdvisorCard con cara/cita/CTAs WhatsApp + Calendly |
| Testimonial | No había | Card con quote serif + nombre/contexto (Carmen, 38 — Mérida) |
| Voz/copy | "Encuentra tu mejor hipoteca" | "Te ayudamos a encontrar tu casa, sin que te marees con tasas" |
| CTAs | "Usar el Matcher gratis →" | "Empezar contigo", "Escríbenos por WhatsApp" |

## Cómo se logró sin romper v3.1

- `<html data-theme="warm">` (solo en este branch). Toda la paleta se sobreescribe vía tokens semánticos en `globals.css`.
- Las primitivas `--brand-gold` / `--brand-navy` también se repintan en `[data-theme="warm"]`, así Button/Card/Badge heredan los nuevos colores sin tocar su código.
- Tipografía serif vía `next/font/google` (`Fraunces`, var `--font-serif`). Headings adoptan serif solo en warm theme.
- Texturas: utilidad `.warm-paper-bg` con dos `repeating-linear-gradient` muy sutiles.
- Énfasis manuscrito: utilidad `.warm-underline` (gradiente terracota en el `background-image` del span).
- Nuevos componentes en `src/components/warm/`:
  - `AdvisorCard` — foto/ilustración SVG (placeholder marcado como `MOCKUP`) + cita + CTAs.
  - `Testimonial` — bloque con quote en serif itálica + autor.
  - `TrustStrip` — 4 badges con iconos (asesor humano, sin bots, WhatsApp, sin costo).
- Asset humano: `public/brand/advisor-illustration.svg` — ilustración hecha a mano (no foto stock). Etiqueta visible "Mockup" para sustituir cuando haya material real de la asesora.

## Lo que NO cambió

- Arquitectura del repo, rutas, datos.
- `MatcherForm`, `MatcherResults`, `InfonavitCalculadora`: misma lógica.
- Componentes base (`Button`, `Card`, `Heading`, `Badge`): solo heredan los nuevos tokens.
- Master sigue con v3.1.

## Performance

Build prod (`npm run build`):

- Bundle: First Load JS shared 102 kB (igual que v3.1).
- Páginas: incrementos despreciables (Fraunces se carga en `display=swap` desde Google Fonts CDN).
- LCP esperado: similar a v3.1, mismo HTML y assets. Texturas son CSS-only, sin imágenes.

## Pendientes para "promover" v3.2 si gusta

1. Sustituir `advisor-illustration.svg` por foto real de la asesora (o ilustración encargada).
2. Sustituir testimonial mock por uno real con permiso.
3. Reemplazar el `wa.me/529999999999` placeholder por el número de WhatsApp Business real.
4. Decidir si v3.2 reemplaza a v3.1 (merge a master) o si se mezclan elementos (ej. mantener fondo oscuro de v3.1 + AdvisorCard de v3.2).
