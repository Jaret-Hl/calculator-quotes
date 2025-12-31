import { renderAddons } from "./addons.renderer.js";

export async function initAddons() {
  try {
    const response = await fetch("/data/addons.json");
    const addons = await response.json();
    
    // Guardar en una variable global o estado si es necesario
    window.addonsData = addons;
    
    console.log("Addons cargados:", addons);
    return addons;
  } catch (error) {
    console.error("Error cargando addons:", error);
    return [];
  }
}
