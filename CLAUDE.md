# PROYECT-WATCH — Asistente visual de despiece y reparación de relojes mecánicos

## Estado del proyecto

**Beta interna de pruebas.** No se despliega en público, no se indexa, no tiene
analítica ni dominio propio todavía. El objetivo de esta fase es validar el
concepto con mockups desechables antes de invertir en la implementación real.
Cualquier `index.html` que se publique debe llevar
`<meta name="robots" content="noindex,nofollow">` mientras dure la beta.

## Idea del producto (pivote v2)

> Historial: la v1 era una página educativa genérica tipo scrollytelling
> ("cómo funciona un reloj"). El usuario la reorientó a un caso de uso más
> concreto y útil: **identificar y diagnosticar el reloj de una persona real**.

Una página web sencilla donde cualquier persona:

1. **Introduce/selecciona su reloj** (marca, modelo o tipo de mecanismo).
2. Ve su reloj **descompuesto en todas sus piezas** de forma interactiva.
3. Por cada pieza puede ver:
   - Qué es y para qué sirve.
   - Por qué es importante para el funcionamiento del reloj.
   - **Síntomas típicos de avería** en esa pieza (para saber si el problema
     de su reloj viene de ahí).
   - **Qué revisar** para diagnosticarla.
   - **Disponibilidad del repuesto** (fácil de encontrar / específica del
     fabricante / requiere relojero especializado).

El objetivo final es que alguien con un reloj mecánico que falla pueda
entender **qué pieza es probablemente la culpable y qué tan fácil es
conseguir el repuesto**, no solo aprender teoría de relojería en abstracto.
El contenido educativo de la v1 (qué hace cada pieza) se mantiene y es la
base de todo lo demás — simplemente se reutiliza con un propósito práctico.

## Decisiones y su evolución

- **Tipo de reloj de referencia:** mecánico de pulsera/bolsillo (con volante,
  áncora, escape, barrilete de muelle real). Se mantiene.
- **Contenido en español.** Se mantiene.
- **Visual — revisado:** la v1 decidió 3D real con Three.js para un reloj
  genérico. Con el pivote a "tu reloj real", un único modelo 3D genérico deja
  de tener sentido: cada marca/modelo tiene un aspecto distinto y no existe
  (ni es realista modelar ahora) un `.glb` por cada reloj que un usuario
  pueda tener. Para el **Moca** se adapta a un **diagrama interactivo 2D**
  (HTML/CSS/JS, sin dependencias): un esquema tipo "concentrador y radios"
  (hub-and-spoke) que agrupa las piezas por categoría funcional y permite
  entrar al detalle de cada una. Es fiel al espíritu "descomponer piezas
  para diagnosticar", más rápido de construir/iterar, y no depende de tener
  arte 3D por modelo de reloj. Si más adelante se decide dar soporte real a
  modelos concretos con imágenes/planos reales, se puede sustituir el
  esquema genérico por uno específico sin cambiar la lógica de datos.
- **"Selector de reloj" en esta fase:** no hay una base de datos real de
  relojes. El Moca ofrece 3 arquetipos genéricos (manual con segundero,
  manual sin segundero, automático) que ya bastan para demostrar que
  distintos relojes muestran distintas piezas (p. ej. el automático añade
  el rotor de cuerda automática). Una base de datos real de marcas/calibres
  es trabajo de una fase posterior, no de este mockup.

## Proceso de trabajo: Moca (mockup) antes que implementación real

Este proyecto se construye en dos pistas separadas a propósito:

- **`mockup/`** — prototipos desechables, HTML autocontenido (todo inline,
  sin build, abrible localmente con doble clic o `file://`). Sirven para
  iterar rápido la idea y el UX con el usuario antes de comprometerse a una
  arquitectura. Cada mockup relevante se enseña como enlace de previsualización
  antes de tocar nada de contenido/UI "de verdad".
- **`src/`** (Vite + TypeScript) — el scaffold de la implementación real,
  pensado originalmente para la v1 (3D + scroll). Se mantiene en el repo pero
  **en pausa** hasta que el Moca de la v2 esté validado; en ese momento se
  decide si se reconstruye sobre este scaffold o se simplifica (ya que la v2
  probablemente no necesite Three.js/GSAP si el diagrama 2D funciona bien).

## Estructura de carpetas

```
PROYECT-WATCH/
├── CLAUDE.md
├── README.md
├── mockup/
│   └── index.html        # Moca autocontenido de la v2 (selector + despiece + reparación)
├── index.html             # entrada de la v1 (Vite), en pausa
├── package.json
├── vite.config.ts
├── tsconfig.json
├── public/
│   └── models/            # .glb reales, solo si retomamos la vía 3D
├── src/
│   ├── main.ts
│   ├── style.css
│   ├── data/
│   │   └── components.ts  # contenido educativo v1 (sin datos de reparación todavía)
│   ├── scene/              # escena Three.js v1, en pausa
│   └── ui/
└── .claude/
    └── skills/
        └── reloj-interactivo/SKILL.md
```

## Modelo de contenido

Cada pieza tiene, como mínimo:

```
id, name, category (energia | transmision | regulacion | estructura | visualizacion),
shortDescription, importance,
commonIssues (síntomas típicos de avería),
checkPoints (qué revisar para diagnosticarla),
availability ("alta" | "media" | "baja", + nota explicando por qué)
```

En el Moca (`mockup/index.html`) estos datos viven embebidos en el propio
HTML como JS plano, para que el archivo sea autosuficiente. Cuando se valide
el UX, este contenido se traslada/fusiona a `src/data/components.ts` (que hoy
solo tiene `shortDescription`/`importance`, sin los campos de reparación) para
que vuelva a haber una única fuente de verdad.

## Fases del proyecto

- **Fase 0:** scaffolding v1, `CLAUDE.md`, skill de Claude Code, contenido
  educativo inicial. *(hecho)*
- **Fase 1 — Pivote a v2 + Moca:** reorientar el producto a "identifica tu
  reloj → despiece → diagnóstico y disponibilidad de repuestos"; construir
  el mockup HTML autocontenido en `mockup/index.html` y revisarlo con el
  usuario. *(en curso)*
- **Fase 2 — Iterar el Moca:** ajustar UX/contenido/estructura según feedback
  directo sobre el mockup, sin backend ni build todavía.
- **Fase 3 — Implementación real:** una vez validado el Moca, decidir stack
  definitivo (probablemente Vite + TS sin necesidad de Three.js si el 2D
  convence) e implementarlo sobre `src/`, fusionando el contenido.
- **Fase 4 — Contenido y datos reales:** ampliar de arquetipos genéricos a
  marcas/calibres reales si el producto lo justifica; búsqueda/disponibilidad
  real de repuestos (posible integración externa, fuera de alcance ahora).

## Convenciones

- Todo el contenido visible en español.
- Commits descriptivos en español o inglés, consistentes con el resto.
- No añadir analítica, tracking ni servicios externos mientras sea beta.
- No hay backend ni base de datos: todo el estado vive en el cliente.
- Los mockups de `mockup/` deben poder abrirse como archivo local
  (`file://`) sin servidor ni build — cero dependencias externas, todo
  inline.
- Verificar cambios visuales abriendo el archivo/arrancando el dev server —
  no basta con que el código sea válido.

## La Skill del proyecto

`.claude/skills/reloj-interactivo/SKILL.md` dirige la construcción y el
mantenimiento de esta web, incluyendo el flujo de trabajo "Moca primero,
implementación después" y el checklist de "pieza completa" (ahora con los
campos de reparación/disponibilidad).
