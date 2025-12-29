import { state } from "../state/state.js";
import { renderSummary } from "../ui/summary.js";
import { selectPaquete } from "../core/packages.js";
import { iconoIncluido, textoClase } from "./paquetes.helpers.js";

export function renderPaquetes(paquetes, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  paquetes.forEach((paquete) => {
    const isSelected = state.paqueteSeleccionado?.id === paquete.id;
    const card = document.createElement("div");
    
    card.className = `paqueteCard group mb-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 
      ${isSelected ? "border-blue-600 bg-blue-50/40 shadow-sm" : "border-slate-100 bg-white hover:border-blue-200 shadow-sm"}`;

    card.innerHTML = `
      <div class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}">
            ${isSelected ? '<div class="w-1.5 h-1.5 rounded-full bg-white"></div>' : ''}
          </div>
          
          <div>
            <div class="flex items-center gap-2">
              <h3 class="font-bold text-slate-800">${paquete.nombre}</h3>
              ${paquete.ui.highlight ? '<span class="bg-green-100 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Especial</span>' : ''}
            </div>
            <p class="text-xs text-slate-500">${paquete.etiqueta}</p>
          </div>
        </div>

        <button type="button" class="toggle-details text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg transition-all active:scale-95">
          <span>Ver detalles</span>
          <svg class="w-3 h-3 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </button>
      </div>

      <div class="details-content hidden mt-4 pt-4 border-t border-blue-100">
        <p class="text-[10px] font-semibold text-slate-400 uppercase mb-2">Incluye:</p>
        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs text-slate-600">
          ${paquete.caracteristicas
            .map((caracteristica => `
              <li class="flex items-center gap-2">
                ${iconoIncluido(caracteristica.incluido)}
                <span class="${textoClase(caracteristica.incluido)}">
                  ${caracteristica.label} ${caracteristica.nota ?? ''} ${caracteristica.limite ?? ''}
                </span>
              </li>
            `)).join('')}
        </ul>
        <p class="text-[10px] text-slate-400 mt-3 italic">Los módulos adicionales se seleccionan por separado</p>
      </div>
    `;

    // EVENTO CLICK EN LA CARD
    card.addEventListener("click", (e) => {
      if (e.target.closest('.toggle-details')) return;

      // 1. Seleccionar paquete (sin sus características como addons)
      selectPaquete(paquete);

      // 2. Mostrar sección de addons y limpiar selección previa
      const addonsQuestion = document.getElementById("addonsQuestion");
      const addonsContainer = document.getElementById("addonsContainer");
      
      if (addonsQuestion) addonsQuestion.classList.remove("hidden");
      if (addonsContainer) addonsContainer.classList.add("hidden");

      // 3. Actualizar UI
      renderPaquetes(paquetes, containerId); 
      renderSummary(state);
    });

    // EVENTO TOGGLE
    const toggleBtn = card.querySelector('.toggle-details');
    const details = card.querySelector('.details-content');
    const icon = toggleBtn.querySelector('svg');

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = details.classList.contains('hidden');
      
      details.classList.toggle('hidden');
      icon.classList.toggle('rotate-180');
      toggleBtn.querySelector('span').innerText = isHidden ? 'Cerrar' : 'Ver detalles';
    });

    container.appendChild(card);
  });
}
