import { findTabuladorForEmployees, findTabuladorForEmployeesAddon } from "./packages.js";

export function computePackageCost(state, paquete) {
  const emp = Number(state.employees);

  const tab = findTabuladorForEmployees(paquete, emp);

  if (!tab) {
    return {
      mode: "none",
      unitCost: 0,
      employees: emp,
      range: null,
      totalMXN: 0,
    };
  }

  // rango 1–5 — costo mensual fijo
  if (tab.tipo === "mensual") {
    return {
      mode: "mensual",
      unitCost: tab.precio,
      employees: emp,
      range: { min: tab.min, max: tab.max },
      totalMXN: tab.precio,
    };
  }

  // rangos 6+ — precio unitario por empleado
  return {
    mode: "unitario",
    unitCost: tab.precio,
    employees: emp,
    range: { min: tab.min, max: tab.max },
    totalMXN: emp * tab.precio,
  };
}

export function computeAddonCost(state, addon) {
  const emp = Number(state.employees);
  const tab = findTabuladorForEmployeesAddon(addon, emp);

  if (!tab) {
    return 0;
  }

  // rango 1–5 — costo mensual fijo
  if (tab.tipo === "mensual") {
    return tab.precio;
  }
  // rangos 6+ — precio unitario por empleado
  return emp * tab.precio;
}

export const calculateQuote = (state) => {
  const { employees, paqueteSeleccionado, addons, bioNeeded, bioCount, bioType, support } = state;
  const emp = Number(employees);

  // 1. calcular costo base del paquete
  const baseCost = paqueteSeleccionado 
    ? computePackageCost(state, paqueteSeleccionado)
    : { totalMXN: 0, mode: 'none', unitCost: 0, range: null };

  // 2. calcular costo de addons
  let addonsCost = 0;
  const addonsArray = Object.keys(addons).filter(key => addons[key]);
  for (const addonKey of addonsArray) {
    const addon = addons[addonKey];
    const addonCost = computeAddonCost(state, addon);
    addonsCost += addonCost;
  }

  // 3. calcular costo de biométricos
  let biometricsCost = 0;
  if (bioNeeded && bioCount > 0) {
    const bioUnitPrices = {
      basic: 3500,
      advanced: 5500,
      terminal: 7500
    };
    const installationCost = 1500; // por dispositivo
    biometricsCost = (bioUnitPrices[bioType] + installationCost) * bioCount;
  }

  // 4. calcular costo de soporte
  let supportCost = 0;
  const supportPrices = {
    standard: 0,
    advanced: 50,
    premium: 150
  };
  supportCost = supportPrices[support] || 0;

  // 5. total general
  const totalMXN = baseCost.totalMXN + addonsCost + biometricsCost + supportCost;
  
  return {
    baseCost: baseCost.totalMXN,
    addonsCost,
    biometricsCost,
    supportCost,
    totalMXN,
    details: {
      packageName: paqueteSeleccionado?.nombre || 'Sin paquete',
      employees: emp,
      range: baseCost.range,
      mode: baseCost.mode,
      unitCost: baseCost.unitCost,
      addonsCount: addonsArray.length,
      bioCount,
      bioType,
      support
    },
  };
};
