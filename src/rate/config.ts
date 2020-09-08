export default {
  BRL: {
    hasInversionEnabled: true,
  },
  INR: {
    hasInversionEnabled: true,
  },
  JPY: {
    hasInversionEnabled: true,
  },
  IDR: {
    multiplierForEquation: 10000,
  },
  HUF: {
    hasInversionEnabled: true,
  },
  RON: {
    hasInversionEnabled: true,
  },
} as Record<string, { hasInversionEnabled?: boolean; multiplierForEquation?: number }>;
