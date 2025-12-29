import { state } from "../state/state.js";
import { $ } from "./dom.js";
import { goToStep } from "./navigation.js";
import { renderSummary } from "./summary.js";

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

  // -------- INPUTS DINÁMICOS --------

  $("#employeeCount")?.addEventListener("input", (e) => {
    state.employees = Number(e.target.value) || 1;
    renderSummary(state);
  });

  document.querySelectorAll(".moduleCheckbox").forEach((cb) => {
    cb.addEventListener("change", (e) => {
      const key = e.target.dataset.key;

      state.addons[key] = e.target.checked;

      renderSummary(state);
    });
  });

  document.querySelectorAll('input[name="bioNeeded"]').forEach((r) => {
    r.addEventListener("change", (e) => {
      state.bioNeeded = e.target.value === "yes";
      document.querySelector("#bioDetails").style.display = state.bioNeeded
        ? "block"
        : "none";
      renderSummary(state);
    });
  });

  $("#bioCount")?.addEventListener("input", (e) => {
    state.bioCount = Number(e.target.value) || 0;
    renderSummary(state);
  });

  $("#bioType")?.addEventListener("change", (e) => {
    state.bioType = e.target.value;
    renderSummary(state);
  });

  document.querySelectorAll(".supportCard").forEach((card) => {
    card.addEventListener("click", () => {
      const input = card.querySelector("input");
      input.checked = true;
      state.support = input.value;
      renderSummary(state);
    });
  });
}

const addonsQuestion = document.getElementById("addonsQuestion");
const addonsContainer = document.getElementById("addonsContainer");

document.getElementById("addonsYes")?.addEventListener("click", () => {
  addonsContainer.classList.remove("hidden");
});

document.getElementById("addonsNo")?.addEventListener("click", () => {
  addonsContainer.classList.add("hidden");
});
