import { isAWeakCurrency } from '../currency/weak-currencies';
import {
  NUMBER_OF_EXCHANGE_RATE_SIGNIFICANT_DIGITS,
  EXCHANGE_RATE_INVERSION_THRESHOLD,
} from '../defaults';

export function formatRate(exchangeRate, sourceCurrency, targetCurrency, options) {
  const defaults = {
    skipRateInvertion: false,
    numberOfSignificantDigits: NUMBER_OF_EXCHANGE_RATE_SIGNIFICANT_DIGITS,
  };
  options = Object.assign({}, defaults, options);

  if (
    sourceCurrency &&
    targetCurrency &&
    !options.skipRateInvertion &&
    isAWeakCurrency(sourceCurrency) &&
    isBelowThreshold(exchangeRate)
  ) {
    return formatWeakCurrencyRate(exchangeRate, sourceCurrency, targetCurrency, options);
  }
  return formatToSignificantFigures(exchangeRate, options.numberOfSignificantDigits);
}

function formatToSignificantFigures(exchangeRate, numberOfSignificantDigits) {
  return exchangeRate.toPrecision(numberOfSignificantDigits);
}

function formatWeakCurrencyRate(exchangeRate, sourceCurrency, targetCurrency, options) {
  return `1 ${targetCurrency.toUpperCase()} = ${formatToSignificantFigures(
    1 / exchangeRate,
    options.numberOfSignificantDigits,
  )} ${sourceCurrency.toUpperCase()}`;
}

function isBelowThreshold(exchangeRate) {
  return exchangeRate <= EXCHANGE_RATE_INVERSION_THRESHOLD;
}
