import config from './config';
import { NUMBER_OF_RATE_SIGNIFICANT_DIGITS, RATE_INVERSION_THRESHOLD } from '../defaults';

export function formatRate(
  exchangeRate,
  sourceCurrency,
  targetCurrency,
  { skipInversion = false, numberOfSignificantDigits = NUMBER_OF_RATE_SIGNIFICANT_DIGITS } = {},
) {
  if (
    sourceCurrency &&
    targetCurrency &&
    !skipInversion &&
    isRateInversionEnabled(sourceCurrency) &&
    isBelowThreshold(exchangeRate)
  ) {
    return formatToInversedRate(
      exchangeRate,
      sourceCurrency,
      targetCurrency,
      numberOfSignificantDigits,
    );
  }
  return formatToSignificantFigures(exchangeRate, numberOfSignificantDigits);
}

function formatToSignificantFigures(exchangeRate, numberOfSignificantDigits) {
  return exchangeRate.toPrecision(numberOfSignificantDigits);
}

function formatToInversedRate(
  exchangeRate,
  sourceCurrency,
  targetCurrency,
  numberOfSignificantDigits,
) {
  const inversedAndFormattedRate = formatToSignificantFigures(
    1 / exchangeRate,
    numberOfSignificantDigits,
  );
  return `1 ${targetCurrency.toUpperCase()} = ${inversedAndFormattedRate} ${sourceCurrency.toUpperCase()}`;
}

function isBelowThreshold(exchangeRate) {
  return exchangeRate < RATE_INVERSION_THRESHOLD;
}

function isRateInversionEnabled(currency) {
  return config.rateInversionEnabledCurrencies.indexOf(currency.toUpperCase()) !== -1;
}
