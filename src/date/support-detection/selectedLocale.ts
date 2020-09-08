const supportedLocales: Record<string, boolean> = {}; // cache

export function isSelectedLocaleSupported(locale: string): boolean {
  if (supportedLocales[locale] === undefined) {
    supportedLocales[locale] = checkForLocaleSupport(locale);
  }
  return supportedLocales[locale];
}

function checkForLocaleSupport(locale: string): boolean {
  try {
    return Intl.DateTimeFormat.supportedLocalesOf([locale]).length > 0;
  } catch (e) {
    return false;
  }
}
