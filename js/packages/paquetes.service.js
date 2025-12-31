export async function getPaquetes() {
  const response = await fetch('./data/paquetes.json');

  if (!response.ok) {
    throw new Error('No se pudo cargar paquetes');
  }

  return await response.json();
}
