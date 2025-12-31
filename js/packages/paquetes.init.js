import { getPaquetes } from './paquetes.service.js';
import { renderPaquetes } from './paquetes.renderer.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const paquetes = await getPaquetes();
    renderPaquetes(paquetes, 'paquetesContainer');
  } catch (error) {
    console.error(error);
  }
});
