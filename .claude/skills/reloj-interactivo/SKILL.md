---
name: reloj-interactivo
description: Dirige la construcción y el mantenimiento de la web interactiva del reloj mecánico de PROYECT-WATCH (escena 3D en Three.js que se explosiona por scroll con GSAP ScrollTrigger, y su contenido educativo). Usar para cualquier trabajo en este proyecto: añadir o corregir piezas del reloj, tocar la escena 3D, ajustar la narrativa de scroll, o avanzar de fase (mockup, scroll storytelling, pulido, contenido).
---

# Skill: reloj-interactivo

Esta skill es la referencia de trabajo para PROYECT-WATCH. Lee primero
`CLAUDE.md` en la raíz del repo para el contexto completo (idea de producto,
stack, fases). Esta skill se centra en el "cómo" del día a día.

## Regla de oro: `src/data/components.ts` es la fuente de verdad

Todo lo que existe en la escena 3D y en la narrativa de scroll debe
corresponder a una entrada de `clockComponents` en ese archivo. Nunca:

- Añadas una pieza a la escena 3D sin su entrada de contenido correspondiente.
- Escribas texto narrativo directamente en un componente de UI: debe vivir en
  `shortDescription` / `importance` de `components.ts`.

## Checklist de "pieza completa"

Antes de dar por terminada una pieza nueva o modificada, comprobar:

1. Existe en `clockComponents` con `id`, `category`, `explodeOrder` correctos
   (el orden debe respetar la cadena cinemática: energía → transmisión →
   regulación → estructura/visualización).
2. `shortDescription` explica QUÉ es/hace en 1-3 frases, en español, sin
   jerga innecesaria.
3. `importance` explica POR QUÉ es crítica para que el reloj funcione — no
   repetir la descripción, aportar el "y si no estuviera, pasaría esto".
4. Tiene representación geométrica en `src/scene/watchParts.ts` (en fase de
   mockup, construida con primitivas de Three.js) posicionada de forma
   coherente con las piezas vecinas (`relatedIds`).
5. Tiene una posición "explosionada" definida en `src/scene/explode.ts`
   (dirección y distancia a la que se aleja del conjunto al llegar su turno
   de scroll).
6. Se ha comprobado visualmente con `npm run dev`, no solo que compile.

## Cómo funciona la sincronización scroll → escena (Fase 2 en adelante)

- El progreso de scroll (0 a 1) es la única variable de estado de la
  narrativa. Todo se deriva de ella: no usar temporizadores ni animaciones
  independientes del scroll salvo micro-detalles decorativos (p. ej. el
  volante oscilando de fondo).
- `explodeOrder` determina en qué tramo de scroll le toca a cada pieza
  separarse y mostrar su panel. Repartir el rango 0-1 en tantos tramos como
  `orderedComponents.length`, con transiciones suaves entre tramos
  (no cortes bruscos).
- Cuando una pieza tiene el foco, las piezas no relacionadas deben atenuarse
  (opacidad/emisión reducida) para dirigir la atención, y las piezas en
  `relatedIds` pueden permanecer resaltadas como contexto.
- Respetar `prefers-reduced-motion`: si está activo, sustituir las
  transiciones animadas por cambios instantáneos entre estados, sin eliminar
  la funcionalidad.

## Fases y qué hacer en cada una

Seguir el orden de `CLAUDE.md` § Fases del proyecto. No adelantar trabajo de
pulido (Fase 3) o sustitución de modelo real (Fase 4) mientras el mockup
(Fase 1) no esté validado con el usuario — este es un proyecto beta que se
itera en pasos cortos y revisables, no un desarrollo de una sola pasada.

## Restricciones del proyecto (no negociables sin confirmarlo con el usuario)

- Es una **beta privada de pruebas**: no añadir analítica, no desplegar en un
  dominio público, mantener `<meta name="robots" content="noindex,nofollow">`
  en `index.html`.
- Sin backend ni persistencia: todo vive en el cliente.
- Contenido siempre en español.
- No introducir un framework de UI (React/Vue/etc.) ni librerías de estado
  para una sola vista narrativa — mantener la solución en Vite + TS +
  Three.js + GSAP tal como está decidido en `CLAUDE.md`.
