import { isToLocaleDateStringSupported, isSelectedLocaleSupported } from './support-detection';
import { getFallbackFormat } from './fallback-format';

const DEFAULT_LOCALE = 'en-GB';

export function formatDate(date, locale = DEFAULT_LOCALE, options = {}) {
  const { isUTC, ...opts } = options; // extract isUTC out of options
  // to disable UTC `isUTC` must be explicitly set to false
  if (isUTC !== false) {
    opts.timeZone = 'UTC';
  }
  return isToLocaleDateStringSupported()
    ? date.toLocaleDateString(isSelectedLocaleSupported(locale) ? locale : DEFAULT_LOCALE, opts)
    : getFallbackFormat(date, opts);
}
