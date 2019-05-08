import config from '../config';
import {
  NUMBER_OF_EXCHANGE_RATE_SIGNIFICANT_DIGITS,
  EXCHANGE_RATE_INVERSION_THRESHOLD,
} from '../defaults';

export function formatRate(exchangeRate, sourceCurrency, targetCurrency, options) {
  const defaults = {
    skipExchangeRateInversion: false,
    numberOfSignificantDigits: NUMBER_OF_EXCHANGE_RATE_SIGNIFICANT_DIGITS,
  };
  options = Object.assign({}, defaults, options);

  if (
    sourceCurrency &&
    targetCurrency &&
    !options.skipExchangeRateInversion &&
    hasExchangeRateInversionEnabled(sourceCurrency) &&
    isBelowThreshold(exchangeRate)
  ) {
    return formatToInversedExchangeRate(exchangeRate, sourceCurrency, targetCurrency, options);
  }
  return formatToSignificantFigures(exchangeRate, options.numberOfSignificantDigits);
}

function formatToSignificantFigures(exchangeRate, numberOfSignificantDigits) {
  return exchangeRate.toPrecision(numberOfSignificantDigits);
}

function formatToInversedExchangeRate(exchangeRate, sourceCurrency, targetCurrency, options) {
  const inversedAndFormattedRate = formatToSignificantFigures(
    1 / exchangeRate,
    options.numberOfSignificantDigits,
  );
  return `1 ${targetCurrency.toUpperCase()} = ${inversedAndFormattedRate} ${sourceCurrency.toUpperCase()}`;
}

function isBelowThreshold(exchangeRate) {
  return exchangeRate <= EXCHANGE_RATE_INVERSION_THRESHOLD;
}

function hasExchangeRateInversionEnabled(currency) {
  const currencyConfig = config.currencies[currency.toUpperCase()];
  return currencyConfig && currencyConfig.hasExchangeRateInversionEnabled;
}
