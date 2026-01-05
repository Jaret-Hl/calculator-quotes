import { state } from "../state/state.js";

export function selectPaquete(paquete) {

  state.paqueteSeleccionado = {
    id: paquete.id,
    nombre: paquete.nombre,
    etiqueta: paquete.etiqueta,
    tabuladores: paquete.tabuladores,
    addonsIncluidos: paquete.addonsIncluidos || []
  };

  // limpiar addons cuando cambia paquete
  state.addons = {};

  console.log("Paquete seleccionado:", paquete.nombre);
  console.log("Addons incluidos:", paquete.addonsIncluidos);
}
// Determina qué rango aplica según número de empleados
export function findTabuladorForEmployees(paquete, employees) {

  return paquete.tabuladores.find(t =>
    employees >= t.min &&
    employees <= t.max
  ) || null;
}

export function selectAddon(addon, isSelected) {
  if (isSelected) {
    state.addons[addon.id] = {
      id: addon.id,
      nombre: addon.nombre,
      etiqueta: addon.etiqueta,
      tabuladores: addon.tabuladores
    };
  } else {
    delete state.addons[addon.id];
  }
  console.log("Addon actualizado:", addon.nombre, "->", isSelected);
}

export function findTabuladorForEmployeesAddon(addon, employees) {
  return addon.tabuladores.find(t =>
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
