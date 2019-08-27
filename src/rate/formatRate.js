import { NUMBER_OF_RATE_SIGNIFICANT_DIGITS, DEFAULT_LOCALE } from '../defaults';
import { formatNumberToSignificantDigits } from '../number';

export default function(
  rate,
  { significantFigures = NUMBER_OF_RATE_SIGNIFICANT_DIGITS } = {},
  locale = DEFAULT_LOCALE,
) {
  return formatNumberToSignificantDigits(rate, locale, significantFigures);
}
