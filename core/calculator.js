import { pricing } from "./pricing.js";
import { getPlatformBaseUSD } from "./platform.js";
import { EXCHANGE_GAIN, EXCHANGE_RATE } from "./exchange.js";

export function computeQuote(state) {
  const emp = Number(state.employees);

  const baseUSD = getPlatformBaseUSD(emp);

  let modulesBaseUSD = 0;
  let modulesCount = 0;

  // módulos incluidos en el paquete
  for (const key in state.modules) {
    if (state.modules[key]) {
      modulesCount++; // solo conteo informativo
    }
  }

  // add-ons con costo adicional
  for (const key in state.addons) {
    if (state.addons[key]) {
      modulesBaseUSD += pricing.modules[key].usd_base;
      modulesCount++;
    }
  }

  const perEmpUSD = (baseUSD + modulesBaseUSD) * (1 + EXCHANGE_GAIN);

  const perEmpMXN = perEmpUSD * EXCHANGE_RATE;

  let monthlyUSD = perEmpUSD * emp;
  let monthlyMXN = perEmpMXN * emp;

  const supportUSD = pricing.support[state.support] || 0;
  const supportMXN = supportUSD * EXCHANGE_RATE;

  monthlyUSD += supportUSD;
  monthlyMXN += supportMXN;

  let initialMXN = 0;

  if (state.bioNeeded) {
    const bio = pricing.biometric[state.bioType];
    const device = bio.mxn_device_cost * state.bioCount;
    const install = bio.usd_install * state.bioCount * EXCHANGE_RATE;

    initialMXN = device + install;
  }

  const totalInitialMXN = initialMXN + monthlyMXN;

  return {
    emp,
    modulesCount,
    baseUSD,
    modulesBaseUSD,
    supportMXN,
    monthlyMXN,
    monthlyUSD,
    initialMXN,
    totalInitialMXN,
  };
}
