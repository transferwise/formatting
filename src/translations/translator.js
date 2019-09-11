// eslint-disable-next-line import/no-unresolved
import translations from './translations.json';

export function getTranslation(translationKey, params, locale) {
  let translatedMessage;
  if (hasTranslation(locale, translationKey)) {
    translatedMessage = translations[locale][translationKey];
  } else if (hasTranslation('en', translationKey)) {
    translatedMessage = translations.en[translationKey];
  } else {
    translatedMessage = translationKey;
  }

  if (params) {
    Object.keys(params).forEach(key => {
      translatedMessage = translatedMessage.replace(new RegExp(`{${key}}`, 'g'), params[key]);
    });
  }

  return translatedMessage;
}

function hasTranslation(locale, translationKey) {
  return (
    hasOwnProperty(translations, locale) && hasOwnProperty(translations[locale], translationKey)
  );
}

function hasOwnProperty(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
