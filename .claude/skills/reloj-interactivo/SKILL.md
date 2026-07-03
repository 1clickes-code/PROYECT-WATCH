---
name: reloj-interactivo
description: Dirige la construcción y el mantenimiento de PROYECT-WATCH, la web donde un usuario identifica su reloj mecánico, lo ve descompuesto en piezas, y por cada pieza obtiene diagnóstico de avería y disponibilidad de repuesto. Usar para cualquier trabajo en este proyecto: iterar el mockup (`mockup/`), añadir o corregir piezas/contenido de reparación, o avanzar hacia la implementación real.
---

# Skill: reloj-interactivo

Lee primero `CLAUDE.md` en la raíz del repo para el contexto completo (idea
de producto, decisiones y su historial, fases). Esta skill se centra en el
"cómo" del día a día.

## El producto, en una frase

El usuario elige/identifica su reloj → lo ve descompuesto en piezas →
por cada pieza: qué es, por qué importa, qué síntomas indican que está
averiada, qué revisar, y qué tan fácil es conseguir el repuesto.

## Flujo de trabajo: Moca antes que implementación

Este proyecto avanza en mockups desechables antes de comprometer arquitectura:

1. Todo cambio de producto/UX se prueba primero en `mockup/index.html`
   (HTML autocontenido, sin build, abrible en local).
2. Cada mockup relevante se enseña al usuario (enlace de previsualización)
   **antes** de tocar `src/` o de plantear un deploy.
3. Solo cuando el usuario valida el mockup se traslada ese diseño/contenido
   a la implementación real bajo `src/`.
4. No dupliques esfuerzo: mientras se itera el mockup, no sincronices cada
   cambio con `src/data/components.ts` — eso se hace una vez al final de
   cada ronda de validación, no en cada iteración del mockup.

## Regla de oro: una única fuente de verdad de contenido en cada pista

- Mientras se itera el mockup, los datos de piezas viven embebidos como JS
  plano dentro de `mockup/index.html`.
- En la implementación real, `src/data/components.ts` es la fuente de verdad
  (hoy solo tiene contenido educativo v1; le faltan los campos de reparación
  hasta que se migre el mockup validado).
- Nunca escribas texto narrativo o de diagnóstico directamente en un
  componente de UI: debe vivir en el objeto de datos de la pieza.

## Checklist de "pieza completa"

Cada pieza (en el mockup o en `components.ts`) necesita:

1. `id`, `name`, `category` correctos (`energia`, `transmision`,
   `regulacion`, `estructura`, `visualizacion`).
2. `shortDescription`: qué es/hace, 1-3 frases, español, sin jerga innecesaria.
3. `importance`: por qué es crítica — no repetir la descripción, explicar
   el "y si fallara, pasaría esto".
4. `commonIssues`: síntomas típicos de avería de esa pieza, tal como los
   notaría el dueño del reloj (p. ej. "el reloj se para en pocas horas"),
   no jerga de taller pura.
5. `checkPoints`: qué revisaría un relojero para diagnosticarla.
6. `availability`: nivel (`alta`/`media`/`baja`) + nota de por qué (pieza
   genérica por medidas vs. específica del calibre vs. requiere montaje
   profesional).
7. Comprobado visualmente abriendo el archivo/arrancando el dev server, no
   solo que el código sea válido.

## Reglas del diagrama interactivo (mockup v2)

- El esquema es un **diagrama 2D de concentrador y radios** (hub-and-spoke):
  un nodo central ("tu reloj") rodeado por 5 nodos de categoría; al elegir
  una categoría se listan sus piezas; al elegir una pieza se abre el panel
  de detalle. No se necesita 3D ni geometría realista para este propósito.
- El "reloj" seleccionado (arquetipo) determina qué piezas existen: filtrar
  la lista según sus flags (`hasSegundero`, `hasRotor`, etc.), no mostrar
  piezas que ese arquetipo no tiene.
- Añadir un arquetipo de reloj nuevo es más barato que añadir piezas nuevas:
  reutiliza el catálogo de piezas existente y solo decide qué subconjunto
  aplica.

## Restricciones del proyecto (no negociables sin confirmarlo con el usuario)

- **Beta privada de pruebas**: no analítica, no deploy a dominio público,
  `noindex` en cualquier `index.html` publicado.
- Los mockups deben funcionar como archivo local (`file://`), sin servidor
  ni dependencias externas (CDNs, fuentes remotas, etc.) — todo inline.
- Sin backend ni persistencia: todo vive en el cliente.
- Contenido siempre en español.
- No introducir un framework de UI (React/Vue/etc.) para el mockup — HTML/
  CSS/JS plano es suficiente y mantiene el archivo autocontenido.
