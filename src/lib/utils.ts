export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function formatRubles(value: number) {
  const abs = Math.abs(value);
  if (abs < 10_000) {
    return `${value} ₽`;
  }

  return `${new Intl.NumberFormat("ru-RU").format(value)} ₽`;
}

export function calculateDiscountPercent(price: number, fullPrice: number) {
  if (fullPrice <= 0 || price >= fullPrice) {
    return 0;
  }

  return Math.round((1 - price / fullPrice) * 100);
}
