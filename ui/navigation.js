import { state } from "../state/state.js";
import { $all } from "./dom.js";

export function goToStep(n) {
  state.step = n;

  $all(".step").forEach(el => el.classList.add("hidden"));
  document.querySelector(`.step[data-step="${n}"]`)
    ?.classList.remove("hidden");

  const dots = $all("#stepIndicators .step-dot");

  dots.forEach((d, i) => {
    d.className =
      "step-dot " + (i + 1 <= n ? "bg-slate-900" : "bg-gray-300");
  });
}
