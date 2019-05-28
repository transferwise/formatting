import formatRate from './formatRate';
import { formatAmount } from '../currency';

export default function({ lhsValue, lhsCurrency, rhsValue, rhsCurrency }) {
  return `${formatAmount(lhsValue, lhsCurrency)} ${lhsCurrency} = ${formatRate(
    rhsValue,
  )} ${rhsCurrency}`;
}
