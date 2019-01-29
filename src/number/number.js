import { DEFAULT_LOCALE } from '../defaults';

let numberLocaleSupported;

export function isNumberLocaleSupported() {
  if (numberLocaleSupported === undefined) {
    const number = 1234;
    const numberString = number.toLocaleString && number.toLocaleString(DEFAULT_LOCALE);
    numberLocaleSupported = numberString === '1,234';
  }
  return numberLocaleSupported;
}

/**
 * Formats a number precisely with valid fallback even if the
 * `toLocaleString` method is not supported by the actual browser
 * @param {Number|String} number
 * @param {Number} precision
 * @param {String} locale
 * @returns {String}
 */
export function formatNumber(number, precision, locale = DEFAULT_LOCALE) {
  if (!number) {
    return null;
  }

  if (typeof number === 'string' && Number(number)) {
    // eslint-disable-next-line no-param-reassign
    number = Number(number);
  }

  const options = {};
  if (typeof precision === 'number') {
    options.minimumFractionDigits = precision;
    options.maximumFractionDigits = precision;

    if (!isNumberLocaleSupported()) {
      return number.toFixed(precision);
    }
  }

  return number.toLocaleString(locale, options);
}
