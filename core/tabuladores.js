import { resolveRangedCost } from "./packages.js";

export function getCostFromTabuladores(entity, empleados) {
  const tab = entity.tabuladores.find(t =>
    empleados >= t.min_empleados &&
    empleados <= t.max_empleados
  );

  if (!tab) return null;

  return resolveRangedCost(tab, empleados);
}
