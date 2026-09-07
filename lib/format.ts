/**
 * Polska odmiana rzeczownika „rok” po liczebniku: 1 rok, 2–4 lata, 5+ lat
 * (z wyjątkiem nastek: 12, 13, 14 → lat).
 */
export function years(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (count === 1) return "1 rok";
  const few = mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14);
  return `${count} ${few ? "lata" : "lat"}`;
}
