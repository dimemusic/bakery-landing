const price = new Intl.NumberFormat("uk-UA", { maximumFractionDigits: 0 });

export const formatPrice = (n: number) => `${price.format(n)} грн`;
/** 1 позиція, 2–4 позиції, 5+ позицій (11–14 → позицій) */
export function positionsLabel(n: number) {
  const last = n % 10;
  const tens = n % 100;
  if (last === 1 && tens !== 11) return `${n} позиція`;
  if (last >= 2 && last <= 4 && (tens < 12 || tens > 14)) return `${n} позиції`;
  return `${n} позицій`;
}

export const piecesLabel = (n: number) => `${n} шт.`;
