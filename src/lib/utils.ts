export function onEnter(ev: KeyboardEvent, callback: () => void) {
  if (ev.key === 'Enter') {
    ev.preventDefault();
    callback();
  }
}

export function formatCurrency(value: string) {
  Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2
  }).format(Number(value));
}