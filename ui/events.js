import { state } from "../state/state.js";
import { $ } from "./dom.js";
import { goToStep } from "./navigation.js";
import { renderSummary } from "./summary.js";
import { renderAddons } from "../js/addons/addons.renderer.js";
import { initAddons } from "../js/addons/addons.init.js";

export function bindEvents() {
  // -------- STEP 1 --------
  $("#toStep2")?.addEventListener("click", () => {
    const val = Number($("#employeeCount").value) || 1;
    state.employees = Math.max(1, val);
    goToStep(2);
    renderSummary(state);
  });

  $("#backTo1")?.addEventListener("click", () => goToStep(1));

  // -------- STEP 2 --------
  $("#toStep3")?.addEventListener("click", () => {
    goToStep(3);
    renderSummary(state);
  });

  $("#backTo2")?.addEventListener("click", () => goToStep(2));

  // -------- STEP 3 --------
  $("#toStep4")?.addEventListener("click", () => {
    goToStep(4);
    renderSummary(state);
  });

  $("#backTo3")?.addEventListener("click", () => goToStep(3));

  // -------- STEP 4 --------
  $("#toStep5")?.addEventListener("click", () => {
    goToStep(5);
    renderSummary(state);
  });

  // -------- INPUTS DINÁMICOS - TIEMPO REAL --------

  // Cambio en número de empleados
  $("#employeeCount")?.addEventListener("input", (e) => {
    state.employees = Number(e.target.value) || 1;
    renderSummary(state);
  });

  // Botones de rango de empleados
  document.querySelectorAll(".sizeBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const min = Number(btn.dataset.min);
      const max = Number(btn.dataset.max);
      const avg = Math.floor((min + max) / 2);
      state.employees = avg;
      $("#employeeCount").value = avg;
      renderSummary(state);
    });
  });

  document.getElementById("cotizacion_personalizada")?.addEventListener("click", () => {
    // $("#employeeCount").focus();
    console.log("Cotización personalizada seleccionada");
  });

  // Cambio en número de sedes
  $("#locations")?.addEventListener("change", (e) => {
    state.locations = Number(e.target.value);
    renderSummary(state);
  });

  // Módulos adicionales (checkboxes)
  document.querySelectorAll(".moduleCheckbox").forEach((cb) => {
    cb.addEventListener("change", (e) => {
      const key = e.target.dataset.key;
      state.addons[key] = e.target.checked;
      renderSummary(state);
    });
  });

  // Biométricos - necesidad
  document.querySelectorAll('input[name="bioNeeded"]').forEach((r) => {
    r.addEventListener("change", (e) => {
      state.bioNeeded = e.target.value === "yes";
      const bioDetails = document.querySelector("#bioDetails");
      if (bioDetails) {
        bioDetails.style.display = state.bioNeeded ? "block" : "none";
      }
      if (!state.bioNeeded) {
        state.bioCount = 0;
      } else {
        state.bioCount = Number($("#bioCount").value) || 1;
      }
      renderSummary(state);
    });
  });

  // Biométricos - cantidad
  $("#bioCount")?.addEventListener("input", (e) => {
    state.bioCount = Number(e.target.value) || 0;
    renderSummary(state);
  });

  // Biométricos - tipo
  $("#bioType")?.addEventListener("change", (e) => {
    state.bioType = e.target.value;
    renderSummary(state);
  });

  // Soporte (SLA) - actualización en tiempo real
  document.querySelectorAll(".supportCard").forEach((card) => {
    card.addEventListener("click", () => {
      const input = card.querySelector("input");
      if (input) {
        // Marcar como seleccionado
        document.querySelectorAll('input[name="support"]').forEach(r => r.checked = false);
        input.checked = true;
        
        // Actualizar estado
        state.support = input.value;
        
        // Highlight visual
        document.querySelectorAll(".supportCard").forEach(c => {
          c.classList.remove("ring-2", "ring-slate-500", "bg-slate-50");
        });
        card.classList.add("ring-2", "ring-slate-500", "bg-slate-50");
        
        // Actualizar resumen en tiempo real
        renderSummary(state);
      }
    });
  });

  // -------- ADDONS QUESTION --------
  const addonsYesBtn = document.getElementById("addonsYes");
  const addonsNoBtn = document.getElementById("addonsNo");
  const addonsContainer = document.getElementById("addonsContainer");

  if (addonsYesBtn) {
    addonsYesBtn.addEventListener("click", async () => {
      if (addonsContainer) {
        addonsContainer.classList.remove("hidden");
        
        // Cargar y renderizar addons
        const addons = await initAddons();
        renderAddons(addons, "addonsContainer");
      }
    });
  }

  if (addonsNoBtn) {
    addonsNoBtn.addEventListener("click", () => {
      if (addonsContainer) {
        addonsContainer.classList.add("hidden");
      }
      // Limpiar addons seleccionados
      state.addons = {};
      renderSummary(state);
    });
  }

  // -------- BOTONES DE ACCIÓN --------
  $("#startBtn")?.addEventListener("click", () => {
    goToStep(1);
  });

  $("#quickSave")?.addEventListener("click", () => {
    alert("Funcionalidad de guardado próximamente");
  });

  $("#quickCall")?.addEventListener("click", () => {
    alert("Funcionalidad de llamada próximamente");
  });

  $("#downloadPdf")?.addEventListener("click", () => {
    alert("Generación de PDF próximamente");
  });

  $("#scheduleCall")?.addEventListener("click", () => {
    alert("Agendar llamada próximamente");
  });

  $("#saveQuote")?.addEventListener("click", () => {
    alert("Guardar cotización próximamente");
  });
}
