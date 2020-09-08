export function formatPercentage(value: number) {
  return `${parseFloat((value * 100).toFixed(2))}%`;
}
