export function getPlatformBaseUSD(count) {
  if (count <= 500) return 3.58;
  if (count <= 1000) return 2.32;
  if (count <= 2500) return 1.55;
  if (count <= 5000) return 1.2;
  return 0.88;
}
