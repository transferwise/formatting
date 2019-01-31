import { DEFAULT_LOCALE, MIN_PRECISION, MAX_PRECISION } from '../defaults';
import { isIntlNumberFormatSupported } from './feature-detection';

const formatters = {}; // cache, sample: { 'en-GB': formatter, 'en-GB2': formatter }

/**
 * Returns a formatter for the specified locale and NumberFormatOptions
 * @param {String} locale
 * @param {Intl.NumberFormatOptions} options
 * @returns {Intl.NumberFormat}
 */
function getFormatter(locale, options) {
  const cacheKey = options ? `${locale}${options.minimumFractionDigits}` : locale;
  if (!formatters[cacheKey]) {
    formatters[cacheKey] = options
      ? new Intl.NumberFormat(locale, options)
      : new Intl.NumberFormat(locale);
  }
  return formatters[cacheKey];
}

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
    precision !== undefined &&
    precision !== null &&
    typeof precision === 'number' &&
    precision >= MIN_PRECISION &&
    precision <= MAX_PRECISION;

  if (!isIntlNumberFormatSupported(locale)) {
    return isPrecisionValid ? number.toFixed(precision) : `${number}`;
  }

  const formatter = isPrecisionValid
    ? getFormatter(locale, getPrecisionOptions(precision))
    : getFormatter(locale);

  return formatter.format(number);
}
