import { NUMBER_OF_RATE_SIGNIFICANT_DIGITS, DEFAULT_LOCALE } from '../defaults';
import { formatNumberToSignificance } from '../number';
import { formatAmount } from '../currency';

export default function(
  { lhsValue, lhsCurrency, rhsValue, rhsCurrency },
  { significantFigures = NUMBER_OF_RATE_SIGNIFICANT_DIGITS } = {},
  locale = DEFAULT_LOCALE,
) {
  return `${formatAmount(
    lhsValue,
    lhsCurrency,
    locale,
  )} ${lhsCurrency} = ${formatNumberToSignificance(
    rhsValue,
    locale,
    significantFigures,
  )} ${rhsCurrency}`;
}
