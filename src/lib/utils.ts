import type { Weekday } from "./types";

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

export function getWeekday(): Weekday {
  const date = new Date();
  const day = date.getDay();
  const weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  return weekdays[day];
}