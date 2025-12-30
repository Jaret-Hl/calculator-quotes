import { computePackageCost } from "../core/calculator.js";
import { $ } from "./dom.js";

export function renderSummary(state) {

  // aseguramos que haya paquete seleccionado
  const paquete = state.paqueteSeleccionado;
  if (!paquete) return;

  // ejecutar motor de precios
  const price = computePackageCost(state, paquete);

  // actualizar panel lateral compacto
  $("#sumEmployees").innerText = state.employees;
  $("#sumTotal").innerText = `$${price.totalMXN.toFixed(2)} MXN`;

  // etiqueta según tipo de tabulador
  const modeLabel =
    price.mode === "mensual"
      ? "Costo mensual del paquete"
      : "Costo por empleado";

  // render detalle resumen principal
  $("#summaryHtml").innerHTML = `
    <div class="grid gap-2 text-sm">

      <div class="font-semibold mt-2">Paquete seleccionado</div>
      <div>${paquete.nombre}</div>

      <div class="border-b pb-2"></div>

      <div class="font-semibold mt-2">Rango aplicado</div>
      <div>${price.range.min} – ${price.range.max} empleados</div>

      <div class="font-semibold mt-2">Modo de cálculo</div>
      <div>${modeLabel}</div>

      <div class="border-b pb-2"></div>

      <div class="font-bold text-lg flex justify-between">
        <span>Total mensual</span>
        <span>$${price.totalMXN.toFixed(2)} MXN</span>
      </div>
    </div>
  `;
}
