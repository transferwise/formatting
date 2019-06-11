import config from './config';
import { DEFAULT_RATE_MULTIPLIER } from '../defaults';

export default function(
  rate,
  sourceCurrency,
  targetCurrency,
  { reference = 'auto', referenceMultiplier } = {},
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

  function validateParameters() {
    if (!rate || !sourceCurrency || !targetCurrency) {
      throw new Error('Parameters rate, sourceCurrency and targetCurrency are mandatory');
    }
    if (referenceMultiplier && typeof referenceMultiplier !== 'number') {
      throw new Error('referenceMultiplier must be a number');
    }
    // Let shouldInvertEquation() handle `reference`.
  }
}

function shouldInvertEquation(referenceConfig, sourceCurrency) {
  switch (referenceConfig) {
    case 'source':
      return false;
    case 'target':
      return true;
    case 'auto':
    case undefined:
    case null:
      return (config[sourceCurrency] || {}).hasInversionEnabled;
    default:
      throw new Error(
        'Unrecognized reference config value (valid values are auto, source, target).',
      );
  }
}

function getMultiplier(referenceMultiplierOverride, lhsCurrency) {
  return (
    referenceMultiplierOverride ||
    (config[lhsCurrency] || {}).multiplierForEquation ||
    DEFAULT_RATE_MULTIPLIER
  );
}
