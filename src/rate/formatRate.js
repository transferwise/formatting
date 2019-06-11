import { NUMBER_OF_RATE_SIGNIFICANT_DIGITS } from '../defaults';

export default function(rate, { significantFigures = NUMBER_OF_RATE_SIGNIFICANT_DIGITS } = {}) {
  return rate.toPrecision(significantFigures);
}
