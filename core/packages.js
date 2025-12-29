import { state } from "../state/state.js";

export function selectPaquete(paquete) {

  // Guardamos paquete seleccionado
  state.paquete = paquete.id;

  // Los módulos incluidos vienen marcados por defecto
  state.modules = {};

  paquete.caracteristicas.forEach(c => {
    state.modules[c.key] = c.incluido === true;
  });

  // Reset de addons
  state.addons = {};

  console.log("Paquete seleccionado:", paquete.id);
}
