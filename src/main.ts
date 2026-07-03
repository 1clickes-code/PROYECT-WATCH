import "./style.css";
import { orderedComponents } from "./data/components";

/**
 * Fase 0: solo scaffolding. Todavía no hay escena 3D (eso es la Fase 1,
 * el mockup). Este placeholder confirma que el proyecto arranca y que el
 * contenido de `components.ts` está disponible.
 */
const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <main style="max-width:640px;margin:0 auto;padding:4rem 1.5rem;">
    <h1>Cómo funciona un reloj mecánico</h1>
    <p>Beta interna en construcción. Fase 0 completada (scaffolding + contenido).</p>
    <p>Piezas cargadas desde <code>src/data/components.ts</code>: ${orderedComponents.length}</p>
    <ol>
      ${orderedComponents.map((c) => `<li>${c.name}</li>`).join("")}
    </ol>
  </main>
`;
