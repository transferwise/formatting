export const DEFAULT_LOCALE = 'en-GB';
export const DEFAULT_PRECISION_TYPE = 'FractionDigits';
export const NUMBER_OF_RATE_SIGNIFICANT_DIGITS = 6;
export const DEFAULT_RATE_MULTIPLIER = 1;
export const PRECISION = {
  SIGNIFICANT_DIGITS: {
    TYPE: 'SignificantDigits' as PrecisionType,
    MIN_PRECISION: 1,
    MAX_PRECISION: 21,
  },
  FRACTION_DIGITS: {
    TYPE: 'FractionDigits' as PrecisionType,
    MIN_PRECISION: 0,
    MAX_PRECISION: 20,
  },
};
export type PrecisionType = 'SignificantDigits' | 'FractionDigits';
