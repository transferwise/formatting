import { NUMBER_OF_RATE_SIGNIFICANT_DIGITS } from '../defaults';
import formatRate from './formatRate';
import { formatAmount } from '../currency';

export default function(
  { lhsValue, lhsCurrency, rhsValue, rhsCurrency },
  { significantFigures = NUMBER_OF_RATE_SIGNIFICANT_DIGITS } = {},
) {
  return `${formatAmount(lhsValue, lhsCurrency)} ${lhsCurrency} = ${formatRate(rhsValue, {
    significantFigures,
  })} ${rhsCurrency}`;
}
