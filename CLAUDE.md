# PROYECT-WATCH — Reloj mecánico interactivo (explosionado por scroll)

## Estado del proyecto

**Beta interna de pruebas.** No se despliega en público, no se indexa, no tiene
analítica ni dominio propio todavía. El objetivo de esta fase es validar el
concepto (UX + viabilidad técnica del 3D) antes de invertir en contenido final
o en un modelo 3D de producción. Cualquier `index.html` que se publique debe
llevar `<meta name="robots" content="noindex,nofollow">` mientras dure la beta.

## Idea del producto

Una página web de una sola vista (scrollytelling) que explica el funcionamiento
de un **reloj mecánico de pulsera/bolsillo**. Al hacer scroll hacia abajo, el
reloj (renderizado en 3D) se "explosiona": sus piezas se separan unas de otras
en el espacio, en el orden en que participan en la cadena cinemática (de la
fuente de energía a la indicación de la hora). Cada pieza que se separa:

1. Se aísla visualmente (cámara/foco/resaltado) de las demás.
2. Muestra un panel de texto sincronizado con el scroll: qué es, cómo funciona
   y **por qué es importante** para que el reloj funcione.
3. Vuelve a integrarse en el conjunto al continuar el scroll, dando paso a la
   siguiente pieza.

Al llegar al final, el reloj se recompone completo y funcionando (agujas en
movimiento, volante oscilando).

## Decisiones ya tomadas con el usuario

- **Visual: 3D real con Three.js**, no una ilustración 2D plana. La cámara y
  la posición de las piezas se controlan a partir del progreso de scroll.
- **Tipo de reloj: mecánico de pulsera/bolsillo** (con volante, áncora,
  escape, barrilete de muelle real), no un reloj de pared con péndulo.
- Contenido en **español**.

## Stack técnico

- **Vite + TypeScript** — bundler y dev server, cero framework de UI pesado
  (no hace falta React/Vue para una sola vista narrativa).
- **Three.js** — escena 3D, geometría de las piezas, cámara, luces.
- **GSAP + ScrollTrigger** — vincular el progreso de scroll con: posición de
  cámara, posición "explosionada" de cada pieza, y aparición/desaparición de
  los paneles de texto. Es el estándar de facto para scrollytelling con
  Three.js y evita reinventar interpolación/easing/timelines a mano.
- Sin backend. Sitio 100% estático (se podrá desplegar en cualquier hosting
  estático el día que se decida salir de beta).

### Por qué no un modelo GLTF de producción todavía

No tenemos (ni hemos modelado) un archivo 3D real de un reloj. Para no
bloquear el mockup en la disponibilidad de un modelo:

- **Fase de mockup**: el reloj se construye con **geometría procedural de
  Three.js** (cilindros, toroides, engranajes generados por código) que
  representan cada pieza de forma esquemática pero reconocible y
  correctamente proporcionada/posicionada.
- Cuando el concepto esté validado, esa geometría procedural se puede
  sustituir por un `.glb` real pieza por pieza (ver `public/models/`), sin
  tocar la lógica de scroll/explosión: la escena identifica las piezas por
  `id`, no por cómo están construidas.

## Estructura de carpetas

```
PROYECT-WATCH/
├── CLAUDE.md
├── README.md
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── public/
│   └── models/          # aquí irán los .glb reales cuando existan
├── src/
│   ├── main.ts          # punto de entrada
│   ├── style.css
│   ├── data/
│   │   └── components.ts   # fuente única de verdad del contenido educativo
│   ├── scene/
│   │   ├── ClockScene.ts   # setup de Three.js (cámara, luces, render loop)
│   │   ├── watchParts.ts   # construcción procedural de cada pieza
│   │   └── explode.ts      # lógica de "explosión" ligada al scroll
│   └── ui/
│       └── ScrollNarrative.ts  # paneles de texto sincronizados con el scroll
└── .claude/
    └── skills/
        └── reloj-interactivo/SKILL.md
```

## Modelo de contenido (`src/data/components.ts`)

Cada pieza del reloj es un objeto con esta forma (ver el archivo para el
detalle real, ya poblado con las ~20 piezas de un reloj mecánico):

```ts
interface ClockComponent {
  id: string;              // identificador único, referenciado por la escena 3D
  name: string;             // nombre de la pieza
  category:
    | "energia"        // almacenan/liberan la energía (muelle, barrilete)
    | "transmision"    // tren de ruedas que transmite el movimiento
    | "regulacion"     // escape + áncora + volante: el "corazón" que regula el tiempo
    | "estructura"     // platina, puentes, rubíes, caja
    | "visualizacion"; // esfera, agujas, cristal
  shortDescription: string; // qué es / qué hace, 1-3 frases
  importance: string;       // por qué es crítica para el funcionamiento del reloj
  explodeOrder: number;     // orden de aparición en el recorrido de scroll
  relatedIds?: string[];    // piezas con las que interactúa directamente
}
```

Esta lista es la única fuente de verdad del contenido: tanto la narrativa
(texto) como la escena 3D (qué piezas existen, en qué orden se explosionan)
se derivan de aquí. Añadir o corregir contenido educativo se hace editando
este archivo, no repartiendo texto por la UI.

## Fases del proyecto

- **Fase 0 (esta entrega):** scaffolding del proyecto, `CLAUDE.md`, skill de
  Claude Code, y el contenido educativo de las piezas ya redactado en
  `components.ts`. Sin escena 3D todavía.
- **Fase 1 — Mockup:** construir el reloj con geometría procedural, sin
  scroll todavía; validar que la composición, el layout de piezas y la
  cámara se ven bien estáticos.
- **Fase 2 — Scroll storytelling:** conectar GSAP ScrollTrigger para
  explosionar/recomponer piezas y sincronizar los paneles de texto.
- **Fase 3 — Pulido:** materiales/iluminación, `prefers-reduced-motion`,
  responsive/móvil, rendimiento (instancing de piezas repetidas como
  tornillos/rubíes).
- **Fase 4 — Contenido y sustitución de modelo:** revisar/ampliar textos,
  y si se decide, sustituir la geometría procedural por un `.glb` real.

## Convenciones

- Todo el contenido visible (textos, nombres de piezas) en español.
- Commits descriptivos en español o inglés, consistentes con el resto.
- No añadir analítica, tracking ni servicios externos mientras sea beta.
- No hay backend ni base de datos: todo el estado vive en el cliente.
- Verificar cambios visuales arrancando el dev server (`npm run dev`) y
  mirando el resultado en el navegador — no basta con que compile.

## La Skill del proyecto

`.claude/skills/reloj-interactivo/SKILL.md` es la skill que dirige la
construcción y el mantenimiento de esta web. Se invoca para cualquier
trabajo sobre este proyecto (añadir piezas, ajustar la animación de scroll,
tocar contenido). Contiene el checklist de "pieza completa" y las reglas de
la escena 3D para que el resultado sea consistente entre sesiones.
