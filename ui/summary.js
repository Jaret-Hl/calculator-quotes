import { calculateQuote } from "../core/calculator.js";
import { $ } from "./dom.js";

export function renderSummary(state) {
  // ejecutar motor de precios completo
  const quote = calculateQuote(state);

  // actualizar panel lateral compacto
  $("#sumEmployees").innerText = state.employees;
  $("#sumModules").innerText = quote.details.addonsCount;
  $("#sumInstallation").innerText = `$${quote.biometricsCost.toFixed(2)} MXN`;
  $("#sumTotal").innerText = `$${quote.totalMXN.toFixed(2)} MXN`;

  // render detalle resumen principal (Step 5)
  const paquete = state.paqueteSeleccionado;
  
  if (!paquete) {
    $("#summaryHtml").innerHTML = `
      <div class="text-center text-slate-500 py-8">
        <p>Selecciona un paquete para ver el resumen</p>
      </div>
    `;
    return;
  }

  const modeLabel =
    quote.details.mode === "mensual"
      ? "Costo mensual fijo"
      : "Costo por empleado";

  $("#summaryHtml").innerHTML = `
    <div class="grid gap-3 text-sm">

      <div class="font-semibold text-base">Paquete seleccionado</div>
      <div class="bg-white p-3 rounded border">
        <div class="font-medium">${quote.details.packageName}</div>
        <div class="text-slate-600 text-xs mt-1">${modeLabel}</div>
      </div>

      <div class="border-b pb-2"></div>

      <div class="flex justify-between">
        <span class="text-slate-600">Costo base del paquete</span>
        <span class="font-medium">$${quote.baseCost.toFixed(2)} MXN</span>
      </div>

      ${quote.addonsCost > 0 ? `
      <div class="flex justify-between">
        <span class="text-slate-600">Módulos adicionales (${quote.details.addonsCount})</span>
        <span class="font-medium">+$${quote.addonsCost.toFixed(2)} MXN</span>
      </div>
      ` : ''}

      ${quote.biometricsCost > 0 ? `
      <div class="flex justify-between">
        <span class="text-slate-600">Biométricos (${quote.details.bioCount} dispositivo${quote.details.bioCount > 1 ? 's' : ''} ${quote.details.bioType})</span>
        <span class="font-medium">+$${quote.biometricsCost.toFixed(2)} MXN</span>
      </div>
      ` : ''}

      ${quote.supportCost > 0 ? `
      <div class="flex justify-between">
        <span class="text-slate-600">Soporte ${quote.details.support}</span>
        <span class="font-medium">+$${quote.supportCost.toFixed(2)} MXN/mes</span>
      </div>
      ` : ''}

      <div class="border-t pt-3"></div>

      <div class="flex justify-between items-center">
        <span class="font-bold text-lg">Total mensual</span>
        <span class="font-bold text-2xl text-slate-700">$${quote.totalMXN.toFixed(2)} MXN</span>
      </div>

      <div class="text-xs text-slate-500 mt-2">
        ${state.employees} empleado${state.employees > 1 ? 's' : ''} • Rango: ${quote.details.range?.min || 0}–${quote.details.range?.max || 0}
      </div>
    </div>
  `;
}
