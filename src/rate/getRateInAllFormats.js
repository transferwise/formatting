import { NUMBER_OF_RATE_SIGNIFICANT_DIGITS } from '../defaults';
import formatRate from './formatRate';
import formatRateEquation from './formatRateEquation';
import getRateEquation from './getRateEquation';

export default function(
  rate,
  sourceCurrency,
  targetCurrency,
  {
    reference = 'auto',
    referenceMultiplier,
    significantFigures = NUMBER_OF_RATE_SIGNIFICANT_DIGITS,
  } = {},
) {
  const response = {
    suggested: {},
    formats: {},
  };

  response.formats.decimal = {
    output: formatRate(rate, { significantFigures }),
    significantFigures,
  };

  const equation = getRateEquation(rate, sourceCurrency, targetCurrency, {
    reference,
    referenceMultiplier,
  });

  response.formats.equation = {
    output: formatRateEquation(equation, { significantFigures }),
    reference: equation.lhsCurrency === sourceCurrency ? 'source' : 'target',
    referenceMultiplier: equation.lhsValue,
    calculationInDecimal: formatRate(equation.rhsValue, { significantFigures }),
  };

  if (equation.lhsCurrency === sourceCurrency && equation.lhsValue === 1) {
    response.suggested = {
      format: 'decimal',
      output: response.formats.decimal.output,
    };
  } else {
    response.suggested = {
      format: 'equation',
      output: response.formats.equation.output,
    };
  }

  return response;
}
