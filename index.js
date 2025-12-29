import { state } from "./state/state.js";
import { goToStep } from "./ui/navigation.js";
import { renderSummary } from "./ui/summary.js";
import { bindEvents } from "./ui/events.js";

document.addEventListener("DOMContentLoaded", () => {
  bindEvents();
  goToStep(1);
  renderSummary(state);
});
