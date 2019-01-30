import { DEFAULT_LOCALE, MIN_PRECISION, MAX_PRECISION } from '../defaults';
import { isIntlNumberFormatSupported } from './feature-detection';

/**
 * Returns the desired options object for
 * `Number.toLocaleString` and `Intl.NumberFormat` methods
 * @param {Number} precision
 */
function getPrecisionOptions(precision) {
  return {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  };
}

/**
 * Formats a number precisely with valid fallback even if the
 * `toLocaleString` method is not supported by the actual browser
 * @param {Number|String} number
 * @param {Number} precision - this may be a value between 0 and 20, inclusive
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

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed#Parameters
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat#Parameters
  const isPrecisionValid =
    precision &&
    typeof precision === 'number' &&
    precision >= MIN_PRECISION &&
    precision <= MAX_PRECISION;

  if (!isIntlNumberFormatSupported(locale)) {
    return isPrecisionValid ? number.toFixed(precision) : `${number}`;
  }

  return isPrecisionValid
    ? new Intl.NumberFormat(locale, getPrecisionOptions(precision)).format(number)
    : new Intl.NumberFormat(locale).format(number);
}
