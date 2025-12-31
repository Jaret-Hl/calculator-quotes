import { parseCurrencyMXN } from "./currency.js";

export function computeBiometricCost(bio, cantidad) {

  if (!bio || !cantidad || cantidad <= 0)
    return { total: 0, dispositivo: 0, instalacion: 0 };

  const costoDispositivo = parseCurrencyMXN(bio.costo_dispositivo_mxn);
  const costoInstalacion = parseCurrencyMXN(bio.costo_instalacion_mxn);

  const total =
    (costoDispositivo + costoInstalacion) * cantidad;

  return {
    cantidad,

    dispositivoUnit: costoDispositivo,
    instalacionUnit: costoInstalacion,

    totalDispositivos: costoDispositivo * cantidad,
    totalInstalacion: costoInstalacion * cantidad,

    total
  };
}
