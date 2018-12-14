import { isToLocaleDateStringSupported, isSelectedLocaleSupported } from './support-detection';
import { getFallbackFormat } from './fallback-format';

const DEFAULT_LOCALE = 'en-GB';

export function formatDate(date, locale = DEFAULT_LOCALE, options = {}) {
  return isToLocaleDateStringSupported()
    ? date.toLocaleDateString(isSelectedLocaleSupported(locale) ? locale : DEFAULT_LOCALE, options)
    : getFallbackFormat(date, options);
}
