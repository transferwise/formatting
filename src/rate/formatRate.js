import { NUMBER_OF_RATE_SIGNIFICANT_DIGITS } from '../defaults';

export function formatRate(
  rate,
  { numberOfSignificantDigits = NUMBER_OF_RATE_SIGNIFICANT_DIGITS } = {},
) {
  return rate.toPrecision(numberOfSignificantDigits);
}
