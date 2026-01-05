export function iconoIncluido(incluido, icono = iconoCheck) {
  return incluido
    ? '<span class="text-green-600 font-bold">' + icono + '</span>'
    : '<span class="text-gray-400 font-bold">' + iconoCross + '</span>';
}

export function textoClase(incluido) {
  return incluido ? 'text-gray-700' : 'text-gray-400';
}

// formato svg para icono de check
export const iconoCheck = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="orange">
  <path d="M12,2C6.477,2,2,6.477,2,12c0,5.523,4.477,10,10,10s10-4.477,10-10C22,6.477,17.523,2,12,2z M10,17.414l-4.707-4.707 l1.414-1.414L10,14.586l7.293-7.293l1.414,1.414L10,17.414z"></path>
</svg>`;

export const iconoCross = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="gray" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2m4.95 13.536-1.414 1.414L12 13.414 8.464 16.95 7.05 15.536 10.586 12 7.05 8.464 8.464 7.05 12 10.586l3.536-3.536 1.414 1.414L13.414 12z"/></svg>`;