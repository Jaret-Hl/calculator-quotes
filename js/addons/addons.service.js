export async function getAddons() {
  const response = await fetch('/data/addons.json');

  if (!response.ok) {
    throw new Error('No se pudo cargar modulos');
  }

  return await response.json();
}
