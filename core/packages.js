import { state } from "../state/state.js";

export function selectPaquete(paquete) {

  state.paqueteSeleccionado = {
    id: paquete.id,
    nombre: paquete.nombre,
    etiqueta: paquete.etiqueta,
    tabuladores: paquete.tabuladores
  };

  // limpiar addons cuando cambia paquete
  state.addons = {};

  console.log("Paquete seleccionado:", paquete.nombre);
}
// Determina qué rango aplica según número de empleados
export function findTabuladorForEmployees(paquete, employees) {

  return paquete.tabuladores.find(t =>
    employees >= t.min &&
    employees <= t.max
  ) || null;
}

export function resolveRangedCost(tab, empleados) {
  const costo = parseCurrencyMXN(tab.costo);

  const isFlatRange =
    tab.min_empleados === 1 && tab.max_empleados === 5;

  return {
    modalidad: isFlatRange ? "monto_fijo" : "por_empleado",
    costoBase: costo,
    total: isFlatRange ? costo : costo * empleados
  };
}
