export function formatRate(exchangeRate, sourceCurrency, targetCurrency) {
  if (!sourceCurrency || !targetCurrency) {
    return defaultFormatRate(exchangeRate);
  }

  return isAWeakCurrency(sourceCurrency)
    ? formatWeakCurrencyRate(exchangeRate, sourceCurrency, targetCurrency)
    : defaultFormatRate(exchangeRate);
}

function defaultFormatRate(exchangeRate) {
  return exchangeRate.toFixed(5);
}

function formatWeakCurrencyRate(exchangeRate, sourceCurrency, targetCurrency) {
  return `1 ${targetCurrency} = ${defaultFormatRate(1 / exchangeRate)} ${sourceCurrency}`;
}

function isAWeakCurrency(currency) {
  return ['BRL', 'INR', 'JPY'].indexOf(currency) !== -1;
}
