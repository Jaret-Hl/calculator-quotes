import { state, updateState } from "../state/state.js";
import { $ } from "./dom.js";
import { goToStep } from "./navigation.js";
import { renderSummary } from "./summary.js";
import { renderAddons } from "../js/addons/addons.renderer.js";
import { initAddons } from "../js/addons/addons.init.js";
import { debounce } from "../utils/debounce.js";

// Debounced update for employee count
const updateEmployeeCount = debounce((value) => {
  const count = Math.max(1, parseInt(value) || 1);
  updateState({ 
    employeeCount: count,
    employeeRange: count 
  });
}, 300);

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
    // Sincronizar slider
    const slider = $("#employeeRangeSlider");
    if (slider && state.employees <= 100) {
      slider.value = state.employees;
    }
    renderSummary(state);
  });

  // Employee count input - con debounce
  const employeeInput = document.getElementById("employeeCount");
  if (employeeInput) {
    employeeInput.addEventListener("input", (e) => {
      const value = e.target.value;
      updateEmployeeCount(value);
    });
    
    // Sincronizar con el slider también
    employeeInput.addEventListener("change", (e) => {
      const slider = document.getElementById("employeeRangeSlider");
      if (slider) {
        slider.value = Math.min(100, parseInt(e.target.value) || 1);
      }
    });
  }

  // Slider de rango de empleados
  $("#employeeRangeSlider")?.addEventListener("input", (e) => {
    const value = Number(e.target.value);
    state.employees = value;
    $("#employeeCount").value = value;
    renderSummary(state);
  });

  // Employee range slider - actualización inmediata
  const employeeSlider = document.getElementById("employeeRangeSlider");
  if (employeeSlider) {
    employeeSlider.addEventListener("input", (e) => {
      const value = parseInt(e.target.value);
      updateState({ 
        employeeCount: value,
        employeeRange: value 
      });
      
      // Sincronizar input
      if (employeeInput) {
        employeeInput.value = value;
      }
    });
  }

  document.getElementById("cotizacion_personalizada")?.addEventListener("click", () => {
    $("#employeeCount").focus();
    $("#employeeCount").select();
    console.log("Cotización personalizada seleccionada");
  });

  // Cambio en número de sedes
  $("#locations")?.addEventListener("change", (e) => {
    state.locations = Number(e.target.value);
    renderSummary(state);
  });

  // Locations select
  const locationsSelect = document.getElementById("locations");
  if (locationsSelect) {
    locationsSelect.addEventListener("change", (e) => {
      updateState({ locations: parseInt(e.target.value) });
    });
  }

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

  // Biometric radios - Event delegation
  const bioRadios = document.querySelectorAll('input[name="bioNeeded"]');
  bioRadios.forEach(radio => {
    radio.addEventListener("change", (e) => {
      const needsBio = e.target.value === "yes";
      updateState({ 
        biometricNeeded: needsBio,
        // Reset biometric count if not needed
        biometricCount: needsBio ? state.biometricCount : 0
      });
      
      // Toggle bioDetails visibility
      const bioDetails = document.getElementById("bioDetails");
      if (bioDetails) {
        bioDetails.classList.toggle("hidden", !needsBio);
      }
    });
  });

  // Biométricos - cantidad
  $("#bioCount")?.addEventListener("input", (e) => {
    state.bioCount = Number(e.target.value) || 0;
    renderSummary(state);
  });

  // Biometric count
  const bioCountInput = document.getElementById("bioCount");
  if (bioCountInput) {
    bioCountInput.addEventListener("input", debounce((e) => {
      updateState({ biometricCount: Math.max(0, parseInt(e.target.value) || 0) });
    }, 300));
  }

  // Biométricos - tipo
  $("#bioType")?.addEventListener("change", (e) => {
    state.bioType = e.target.value;
    renderSummary(state);
  });

  // Biometric type
  const bioTypeSelect = document.getElementById("bioType");
  if (bioTypeSelect) {
    bioTypeSelect.addEventListener("change", (e) => {
      updateState({ biometricType: e.target.value });
    });
  }

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

  // Support level - Event delegation
  const supportCards = document.querySelectorAll('.supportCard');
  supportCards.forEach(card => {
    card.addEventListener("click", () => {
      const radio = card.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        updateState({ supportLevel: radio.value });
        
        // Update visual feedback
        supportCards.forEach(c => c.classList.remove("border-slate-500", "bg-slate-50"));
        card.classList.add("border-slate-500", "bg-slate-50");
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

  // -------- RENDERIZADO INICIAL --------
  // Renderizar resumen con valores por defecto al cargar
  renderSummary(state);
}

// Initialize default state on first load
document.addEventListener("DOMContentLoaded", () => {
  // Set initial values from DOM
  const employeeInput = document.getElementById("employeeCount");
  const employeeSlider = document.getElementById("employeeRangeSlider");
  
  if (employeeInput && employeeSlider) {
    const initialValue = parseInt(employeeInput.value) || 5;
    updateState({ 
      employeeCount: initialValue,
      employeeRange: initialValue 
    });
  }
  
  // Initialize biometric details visibility
  const bioNeededYes = document.querySelector('input[name="bioNeeded"][value="yes"]');
  const bioDetails = document.getElementById("bioDetails");
  if (bioDetails && bioNeededYes) {
    bioDetails.classList.toggle("hidden", !bioNeededYes.checked);
  }
});

// Biometrics radio buttons - show/hide details
const bioNeededYes = document.getElementById("bioNeededYes");
const bioNeededNo = document.getElementById("bioNeededNo");
const bioDetails = document.getElementById("bioDetails");

bioNeededYes?.addEventListener("change", () => {
  if (bioDetails) {
    bioDetails.classList.remove("hidden");
  }
});

bioNeededNo?.addEventListener("change", () => {
  if (bioDetails) {
    bioDetails.classList.add("hidden");
  }
});
