import { state } from "../../state/state.js";
import { renderSummary } from "../../ui/summary.js";
import { selectAddon } from "../../core/packages.js";
import { iconoIncluido, textoClase } from "./addons.helpers.js";

export function renderAddons(addons, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  addons.forEach((addon) => {
    // Check if addon is included in the selected package
    const addonsIncluidos = state.paqueteSeleccionado?.addonsIncluidos || [];
    const isIncluded = addonsIncluidos.includes(addon.id);

    // Auto-select included addons in state if not already selected
    if (isIncluded && !state.addons[addon.id]) {
      state.addons[addon.id] = addon;
    }

    const isSelected =
      state.addons[addon.id] !== undefined && state.addons[addon.id] !== null;

    const card = document.createElement("label");

    card.className = `addonCard cursor-pointer block mb-3 p-4 border-2 rounded-xl transition-all duration-200 
      ${
        isIncluded
          ? "border-green-500 bg-green-50/40 shadow-sm"
          : isSelected
          ? "border-blue-600 bg-blue-50/40 shadow-sm"
          : "border-slate-100 bg-white hover:border-blue-200 shadow-sm"
      }
      ${isIncluded ? "opacity-75" : ""}`;

    card.innerHTML = `
      <div class="flex items-center gap-3">
        <input 
          type="checkbox" 
          class="addonCheckbox w-5 h-5 rounded border-2 text-blue-600 focus:ring-2 focus:ring-blue-500" 
          data-addon-id="${addon.id}"
          ${isSelected || isIncluded ? "checked" : ""}
          ${isIncluded ? "disabled" : ""}
        />
        
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <h3 class="font-bold text-slate-800">${addon.nombre}</h3>
            <span class="text-[10px] font-semibold text-slate-400 uppercase">${
              addon.etiqueta
            }</span>
            ${
              isIncluded
                ? '<span class="text-[10px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">INCLUIDO EN TU PAQUETE</span>'
                : ""
            }
          </div>
          <p class="text-xs text-slate-500 mt-0.5">${
            isIncluded
              ? "Este módulo ya está incluido en tu paquete sin costo adicional"
              : "Módulo adicional disponible"
          }</p>
        </div>

        <button type="button" class="toggle-addon-details text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg transition-all active:scale-95">
          <span>Ver detalles</span>
          <svg class="w-3 h-3 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </button>
      </div>

      <div class="addon-details-content hidden mt-4 pt-4 border-t ${
        isIncluded ? "border-green-100" : "border-blue-100"
      }">
        <p class="text-[10px] font-semibold text-slate-400 uppercase mb-2">Información del módulo:</p>
        <div class="text-xs text-slate-600 space-y-1">
          ${
            isIncluded
              ? '<p class="text-green-700 font-semibold">✓ Este módulo está incluido sin costo adicional en tu paquete actual.</p>'
              : '<p>Este módulo se calcula de forma independiente según el número de empleados.</p><p class="text-[10px] text-slate-400 italic mt-2">El precio se ajusta automáticamente según tu plan actual.</p>'
          }
        </div>
      </div>
    `;

    // EVENTO CLICK EN CHECKBOX (solo si no está incluido)
    const checkbox = card.querySelector(".addonCheckbox");
    if (!isIncluded) {
      checkbox.addEventListener("change", (e) => {
        e.stopPropagation();
        const isChecked = checkbox.checked;

        selectAddon(addon, isChecked);
        renderAddons(addons, containerId);
        renderSummary(state);
      });
    }

    // EVENTO TOGGLE DETALLES
    const toggleBtn = card.querySelector(".toggle-addon-details");
    const details = card.querySelector(".addon-details-content");
    const icon = toggleBtn.querySelector("svg");
    eventToggleDetail(toggleBtn, details, icon);

    container.appendChild(card);
  });
}

export function eventToggleDetail(toggleBtn, details, icon) {
  toggleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isHidden = details.classList.contains("hidden");
    details.classList.toggle("hidden");
    icon.classList.toggle("rotate-180");
    toggleBtn.querySelector("span").innerText = isHidden
      ? "Cerrar"
      : "Ver detalles";
  });
}
