import { isIntlSupported, isSelectedLocaleSupported } from './support-detection';
import { getFallbackFormat } from './fallback-format';

const DEFAULT_LOCALE = 'en-GB';
const formatters = []; // cache, sample: { 'en-GB': Map {{options} => {formatter}} }

export function formatDate(date, locale = DEFAULT_LOCALE, options) {
  return isIntlSupported()
    ? getFormatter(getSupportedLocale(locale), options).format(date)
    : getFallbackFormat(date, options);
}

function getSupportedLocale(locale) {
  return isSelectedLocaleSupported(locale) ? locale : DEFAULT_LOCALE;
}

function getFormatter(locale, options) {
  if (!formatters[locale]) {
    formatters[locale] = new Map();
  }
  if (!formatters[locale].has(options)) {
    formatters[locale].set(options, new Intl.DateTimeFormat(locale, options));
  }
  return formatters[locale].get(options);
}
