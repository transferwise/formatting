import config from './config';
import { DEFAULT_RATE_MULTIPLIER } from '../defaults';

export type Reference = 'auto' | 'source' | 'target';

export default function(
  rate: number,
  sourceCurrency: string,
  targetCurrency: string,
  {
    reference = 'auto',
    referenceMultiplier,
  }: { reference?: Reference; referenceMultiplier?: number } = {},
) {
  validateParameters();

  if (shouldInvertEquation(reference, sourceCurrency)) {
    return {
      // inverted.
      lhsCurrency: targetCurrency,
      lhsValue: getMultiplier(referenceMultiplier, targetCurrency),
      rhsCurrency: sourceCurrency,
      rhsValue: getMultiplier(referenceMultiplier, targetCurrency) / rate,
    };
  }
  return {
    // normal.
    lhsCurrency: sourceCurrency,
    lhsValue: getMultiplier(referenceMultiplier, sourceCurrency),
    rhsCurrency: targetCurrency,
    rhsValue: rate * getMultiplier(referenceMultiplier, sourceCurrency),
  };

  function validateParameters(): void {
    if (!rate) throw new Error(`rate parameter is mandatory (got ${rate} instead).`);
    if (!sourceCurrency)
      throw new Error(`sourceCurrency parameter is mandatory (got ${sourceCurrency} instead).`);
    if (!targetCurrency)
      throw new Error(`targetCurrency parameter is mandatory (got ${targetCurrency} instead).`);
    if (referenceMultiplier && typeof referenceMultiplier !== 'number') {
      throw new Error(
        `referenceMultiplier must be a number (got ${typeof referenceMultiplier} ${referenceMultiplier} instead)`,
      );
    }
    // Let shouldInvertEquation() handle `reference`.
  }
}

function shouldInvertEquation(referenceConfig: Reference, sourceCurrency: string): boolean {
  if (referenceConfig === 'source') return false;
  if (referenceConfig === 'target') return true;
  if (['auto', undefined, null].indexOf(referenceConfig) > -1)
    return !!(config[sourceCurrency] || {}).hasInversionEnabled;
  throw new Error(
    `Unrecognized reference config value: ${referenceConfig} (valid values are auto, source, target).`,
  );
}

function getMultiplier(
  referenceMultiplierOverride: number | undefined,
  lhsCurrency: string,
): number {
  return (
    referenceMultiplierOverride ||
    (config[lhsCurrency] || {}).multiplierForEquation ||
    DEFAULT_RATE_MULTIPLIER
  );
}
