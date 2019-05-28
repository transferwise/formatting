import { NUMBER_OF_RATE_SIGNIFICANT_DIGITS } from '../defaults';

export default function(
  rate,
  { numberOfSignificantDigits = NUMBER_OF_RATE_SIGNIFICANT_DIGITS } = {},
) {
  return rate.toPrecision(numberOfSignificantDigits);
}
