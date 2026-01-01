import { notify } from "./observers.js";

export const state = {
  step: 1,
  employees: null,
  locations: 1,

  paqueteSeleccionado: null,

  modules: {},

  addons: {},

  bioNeeded: false,
  bioCount: 0,
  bioType: "basic",
  support: "standard",
};

/**
 * Update state and notify observers
 * @param {Object} updates - Partial state updates
 */
export function updateState(updates) {
  Object.assign(state, updates);
  notify(state);
}

/**
 * Get current state (read-only)
 * @returns {Object} Current state
 */
export function getState() {
  return { ...state };
}
