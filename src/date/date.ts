import { isIntlSupported, isSelectedLocaleSupported } from './support-detection';
import { getFallbackFormat } from './fallback-format';
import { DEFAULT_LOCALE } from '../defaults';

const formatters: Record<string, Map<any, any>> = {}; // cache, sample: { 'en-GB': Map {{options} => {formatter}} }

export function formatDate(
  date: Date,
  locale = DEFAULT_LOCALE,
  options?: Intl.DateTimeFormatOptions,
): string {
  return isIntlSupported()
    ? getFormatter(getSupportedLocale(locale), options).format(date)
    : getFallbackFormat(date, options);
}

function getSupportedLocale(locale: string) {
  return isSelectedLocaleSupported(locale) ? locale : DEFAULT_LOCALE;
}

function getFormatter(locale: string, options?: Intl.DateTimeFormatOptions) {
  if (!formatters[locale]) {
    formatters[locale] = new Map();
  }
  if (!formatters[locale].has(options)) {
    formatters[locale].set(options, new Intl.DateTimeFormat(locale, options));
  }
  return formatters[locale].get(options);
}
