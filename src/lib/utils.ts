export function onEnter(ev: KeyboardEvent, callback: () => void) {
  if (ev.key === 'Enter') {
    ev.preventDefault();
    callback();
  }
}

export function formatCurrency(value: string) {
  return Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(Number(value));
}