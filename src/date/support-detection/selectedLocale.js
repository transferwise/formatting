const supportedLocales = {}; // cache

export function isSelectedLocaleSupported(locale) {
  if (supportedLocales[locale] === undefined) {
    supportedLocales[locale] = checkForLocaleSupport(locale);
  }
  return supportedLocales[locale];
}

function checkForLocaleSupport(locale) {
  try {
    return Intl.DateTimeFormat.supportedLocalesOf([locale]).length > 0;
  } catch (e) {
    return false;
  }
}
