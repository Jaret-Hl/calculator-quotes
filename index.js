import { goToStep } from "./ui/navigation.js";
import { renderSummary } from "./ui/summary.js";
import { bindEvents } from "./ui/events.js";
import { state } from "./state/state.js";

document.addEventListener("DOMContentLoaded", () => {
  bindEvents();

  renderSummary(state);
  goToStep(1);
});
