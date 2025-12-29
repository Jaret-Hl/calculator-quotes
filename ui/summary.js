import { computeQuote } from "../core/calculator.js";
import { $ } from "./dom.js";

export function renderSummary(state) {
  const r = computeQuote(state);

  $("#sumEmployees").innerText = r.emp;
  $("#sumModules").innerText = r.modulesCount;
  $("#sumInstallation").innerText =
    r.initialMXN === 0 ? "$0 MXN" : `$${r.initialMXN.toFixed(2)} MXN`;
  $("#sumTotal").innerText = `$${r.monthlyMXN.toFixed(2)} MXN`;

  $("#summaryHtml").innerHTML = `
    <div class="grid gap-2 text-sm">
      <div class="font-semibold mt-2">Costo por Empleado</div>
      <div class="flex justify-between ml-4">
        <span>Módulos</span>
        <span>${r.modulesCount}</span>
      </div>

      <div class="border-b pb-2"></div>

      <div class="font-semibold mt-2">Resumen</div>
      <div class="flex justify-between">
        <span>Plataforma + Módulos</span>
        <span>$${(r.monthlyMXN - r.supportMXN).toFixed(2)} MXN</span>
      </div>
      <div class="flex justify-between">
        <span>Soporte</span>
        <span>$${r.supportMXN.toFixed(2)} MXN</span>
      </div>

      <div class="border-t pt-2 font-bold text-lg flex justify-between">
        <span>Total Mensual</span>
        <span>$${r.monthlyMXN.toFixed(2)} MXN</span>
      </div>

      <div class="border-t pt-2 font-bold text-lg flex justify-between">
        <span>Costo Inicial + 1er Mes</span>
        <span>$${r.totalInitialMXN.toFixed(2)} MXN</span>
      </div>
    </div>
  `;
}
