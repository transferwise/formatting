import { NUMBER_OF_RATE_SIGNIFICANT_DIGITS, DEFAULT_LOCALE } from '../defaults';
import { formatNumberToSignificantDigits } from '../number';
import formatRateEquation from './formatRateEquation';
import getRateEquation, { Reference } from './getRateEquation';

export default function(
  rate: number,
  sourceCurrency: string,
  targetCurrency: string,
  {
    reference = 'auto',
    referenceMultiplier,
    significantFigures = NUMBER_OF_RATE_SIGNIFICANT_DIGITS,
  }: { reference?: Reference; referenceMultiplier?: number; significantFigures?: number } = {},
  locale = DEFAULT_LOCALE,
) {
  const response = {
    suggested: {},
    formats: {} as Record<string, any>,
  };

  response.formats.decimal = {
    output: formatNumberToSignificantDigits(rate, locale, significantFigures),
    significantFigures,
  };

  const equation = getRateEquation(rate, sourceCurrency, targetCurrency, {
    reference,
    referenceMultiplier,
  });

  response.formats.equation = {
    output: formatRateEquation(equation, { significantFigures }, locale),
    reference: equation.lhsCurrency === sourceCurrency ? 'source' : 'target',
    referenceMultiplier: equation.lhsValue,
    calculationInDecimal: formatNumberToSignificantDigits(
      equation.rhsValue,
      locale,
      significantFigures,
    ),
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
