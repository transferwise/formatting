import { formatRate } from './formatRate';
import { NUMBER_OF_RATE_SIGNIFICANT_DIGITS, DEFAULT_RATE_MULTIPLIER } from '../defaults';
import { formatRateAsEquation, getRateEquation } from './formatRateAsEquation';

export function getRateInAllFormats(
  rate,
  sourceCurrency,
  targetCurrency,
  { reference = 'auto', referenceMultiplier = null } = {},
) {
  const response = {
    default: {},
    formats: {},
  };

  response.formats.decimal = {
    output: formatRate(rate),
    significantFigures: NUMBER_OF_RATE_SIGNIFICANT_DIGITS,
  };

  const equation = getRateEquation(rate, sourceCurrency, targetCurrency, {
    reference,
    referenceMultiplier,
  });

  response.formats.equation = {
    output: formatRateAsEquation(rate, sourceCurrency, targetCurrency, {
      reference,
      referenceMultiplier,
    }),
    isInverted: equation.lhsCurrency !== sourceCurrency,
    rateMultiplier: equation.lhsValue,
    rateInDecimal: formatRate(equation.rhsValue),
  };

  if (equation.lhsCurrency === sourceCurrency && equation.lhsValue === DEFAULT_RATE_MULTIPLIER) {
    response.default = {
      format: 'decimal',
      output: response.formats.decimal.output,
    };
  } else {
    response.default = {
      format: 'equation',
      output: response.formats.equation.output,
    };
  }
  return response;
}
