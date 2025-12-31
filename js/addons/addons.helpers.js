export function iconoIncluido(incluido) {
  return incluido
    ? '<svg class="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>'
    : '<svg class="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2"></circle><line x1="8" y1="12" x2="16" y2="12" stroke-width="2"></line></svg>';
}

export function textoClase(incluido) {
  return incluido ? "text-slate-700" : "text-slate-400";
}
