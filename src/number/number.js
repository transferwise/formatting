import { DEFAULT_LOCALE, PRECISION } from '../defaults';
import { isIntlNumberFormatSupported } from './feature-detection';

const { SIGNIFICANT_DIGITS, FRACTION_DIGITS } = PRECISION;

const formatters = {}; // cache, sample: { 'en-GB': formatter, 'en-GB2': formatter }

/**
 * Returns a formatter for the specified locale and NumberFormatOptions
 * @param {String} locale
 * @param {Intl.NumberFormatOptions} options
 * @param {String} precisionType - `FractionDigits|SignificantDigits` to differentiate formatters in cache
 * @returns {Intl.NumberFormat}
 */
function getFormatter(locale, options, precisionType) {
  const cacheKey = options
    ? `${locale}${precisionType}${options[`minimum${precisionType}`]}`
    : locale;
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
 * @param {String} precisionType - `FractionDigits|SignificantDigits`
 */
function getPrecisionOptions(precision, precisionType) {
  return {
    [`minimum${precisionType}`]: precision,
    [`maximum${precisionType}`]: precision,
  };
}

/**
 * Returns the locale that was passed in if it works
 * with `toLocaleString` or otherwise falls back to `DEFAULT_LOCALE`
 * @param {String} locale
 */
function getValidLocale(locale) {
  try {
    const noUnderscoreLocale = locale.replace(/_/, '-');

    Intl.NumberFormat(noUnderscoreLocale);
    return noUnderscoreLocale;
  } catch (e) {
    return DEFAULT_LOCALE;
  }
}

/**
 * Formats the number as a fallback for when `toLocaleString` method is not supported
 * by the browser. Will use `toFixed` to format `FractionDigits` precisionType and `toPrecision`
 * to format `SignificantDigits` precision type.
 * @param {Number} number
 * @param {Number} precision - this may be a value between 0 and 20 for `FractionDigits` or 1 and 21 for `SignificantDigits`
 * @param {String} precisionType - `FractionDigits|SignificantDigits`
 * @returns {String}
 */
function formatNumberWithFallback(number, precision, precisionType) {
  if (precisionType === SIGNIFICANT_DIGITS.TYPE) return number.toPrecision(precision);
  return number.toFixed(precision);
}

/**
 * Formats a number to a significant number of digits with valid fallback even if the
 * `toLocaleString` method is not supported by the actual browser
 * @param {Number|String} number
 * @param {Number} significantDigits - this may be a value between 1 and 21, inclusive
 * @param {String} locale
 * @returns {String}
 */
export function formatNumberToSignificance(number, locale = DEFAULT_LOCALE, significantDigits) {
  return formatNumber(number, locale, significantDigits, SIGNIFICANT_DIGITS.TYPE);
}

/**
 * Formats a number precisely with valid fallback even if the
 * `toLocaleString` method is not supported by the actual browser
 * @param {Number|String} number
 * @param {String} locale
 * @param {Number} precision - this may be a value between 0 and 20 for `FractionDigits` or 1 and 21 for `SignificantDigits`
 * @param {String} precisionType - `FractionDigits|SignificantDigits`
 * @returns {String}
 */
export function formatNumber(
  number,
  locale = DEFAULT_LOCALE,
  precision,
  precisionType = FRACTION_DIGITS.TYPE,
) {
  if (!number && number !== 0) {
    return null;
  }

  if (typeof number === 'string' && Number(number)) {
    // eslint-disable-next-line no-param-reassign
    number = Number(number);
  }

  const { MIN_PRECISION, MAX_PRECISION } =
    precisionType === SIGNIFICANT_DIGITS.TYPE ? SIGNIFICANT_DIGITS : FRACTION_DIGITS;

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed#Parameters
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat#Parameters
  const isPrecisionValid =
    precision !== undefined &&
    precision !== null &&
    typeof precision === 'number' &&
    precision >= MIN_PRECISION &&
    precision <= MAX_PRECISION;

  const validatedLocale = getValidLocale(locale);

  if (!isIntlNumberFormatSupported(validatedLocale)) {
    return isPrecisionValid
      ? formatNumberWithFallback(number, precision, precisionType)
      : `${number}`;
  }

  const formatter = isPrecisionValid
    ? getFormatter(validatedLocale, getPrecisionOptions(precision, precisionType), precisionType)
    : getFormatter(validatedLocale);

  return formatter.format(number);
}
