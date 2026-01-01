import { renderSummary } from "../ui/summary.js";

const observers = new Set();

/**
 * Subscribe a callback to state changes
 * @param {Function} callback 
 */
export function subscribe(callback) {
  observers.add(callback);
  return () => observers.delete(callback); // Return unsubscribe function
}

/**
 * Notify all observers of state change
 * @param {Object} state 
 */
export function notify(state) {
  observers.forEach(callback => callback(state));
}

// Auto-subscribe the summary renderer
subscribe((state) => {
  renderSummary(state);
});
