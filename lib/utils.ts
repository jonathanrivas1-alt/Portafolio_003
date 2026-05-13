import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility para componer classNames con tailwind-merge.
 * Evita duplicados y conflictos entre clases tailwind.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formato de año para timeline / certificaciones */
export function formatYear(year: number) {
  return String(year);
}

/** Trunca un string preservando palabras completas */
export function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(' ', max)) + '…';
}

/** Sleep helper para secuencias cinematográficas */
export const wait = (ms: number) => new Promise(r => setTimeout(r, ms));
