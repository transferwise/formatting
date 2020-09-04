// eslint-disable-next-line import/no-unresolved
import translations from './translations.json';

export function getTranslation(
  translationKey: string,
  params: Record<string, string> = {},
  locale: string,
): string {
  let translatedMessage: string | undefined;
  if (hasTranslation(locale, translationKey)) {
    translatedMessage = (translations as Record<string, Record<string, string>>)[locale][
      translationKey
    ];
  } else if (hasTranslation('en', translationKey)) {
    translatedMessage = (translations as Record<string, Record<string, string>>).en[translationKey];
  } else {
    translatedMessage = translationKey;
  }

  if (translatedMessage && params) {
    Object.keys(params).forEach(key => {
      translatedMessage = (translatedMessage as string).replace(
        new RegExp(`{${key}}`, 'g'),
        params[key],
      );
    });
  }

  return translatedMessage || translationKey;
}

function hasTranslation(locale: string, translationKey: string): boolean {
  return (
    hasOwnProperty(translations, locale) &&
    hasOwnProperty((translations as Record<string, Record<string, string>>)[locale], translationKey)
  );
}

function hasOwnProperty(obj: any, key: string) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
