const supportedLocales = { 'en-GB': true }; // cache

export function isSelectedLocaleSupported(locale) {
  if (supportedLocales[locale] === undefined) {
    supportedLocales[locale] = !toLocaleDateStringFails(locale);
  }
  return supportedLocales[locale];
}

function toLocaleDateStringFails(locale) {
  try {
    new Date().toLocaleDateString(locale);
    return false;
  } catch (error) {
    return true;
  }
}
