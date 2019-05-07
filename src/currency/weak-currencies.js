export const weakCurrencies = ['BRL', 'INR', 'JPY'];

export function isAWeakCurrency(currency) {
  return currency && weakCurrencies.indexOf(currency.toUpperCase()) !== -1;
}
