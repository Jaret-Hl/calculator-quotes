import { findTabuladorForEmployees } from "./packages.js";

export function computePackageCost(state, paquete) {

  const emp = Number(state.employees);

  const tab = findTabuladorForEmployees(paquete, emp);

  if (!tab) {
    return {
      mode: "none",
      unitCost: 0,
      employees: emp,
      range: null,
      totalMXN: 0
    };
  }

  // rango 1–5 — costo mensual fijo
  if (tab.tipo === "mensual") {

    return {
      mode: "mensual",
      unitCost: tab.precio,
      employees: emp,
      range: { min: tab.min, max: tab.max },
      totalMXN: tab.precio
    };
  }

  // rangos 6+ — precio unitario por empleado
  return {
    mode: "unitario",
    unitCost: tab.precio,
    employees: emp,
    range: { min: tab.min, max: tab.max },
    totalMXN: emp * tab.precio
  };
}
