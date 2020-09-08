let isSupported: boolean | undefined;

/**
 * Checks if Intl.NumberFormat is supported for a specific locale
 * @param {String} locale
 * @returns {Boolean}
 */
export function isIntlNumberFormatSupported(locale: string): boolean {
  if (isSupported === undefined) {
    isSupported =
      typeof Intl === 'object' &&
      Intl !== undefined &&
      typeof Intl.NumberFormat === 'function' &&
      Intl.NumberFormat &&
      typeof Intl.NumberFormat.supportedLocalesOf === 'function' &&
      Intl.NumberFormat.supportedLocalesOf &&
      Intl.NumberFormat.supportedLocalesOf(locale).length === 1;
  }
  return isSupported;
}
