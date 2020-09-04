import { getTranslation } from './translator';

jest.mock(
  './translations.json',
  () => ({
    en: {
      'en-only': 'in {minutes} minutes',
    },
    fr: {
      'fr-only': 'dans {minutes} minutes. Dans {minutes} minutes!',
    },
    tr: {},
  }),
  { virtual: true },
);

describe('Get Translations', () => {
  it('Should fetch translations and interpolate all occurrences of variables', () => {
    expect(getTranslation('fr-only', { minutes: '3' }, 'fr')).toBe(
      'dans 3 minutes. Dans 3 minutes!',
    );
  });

  it('Should not replace anything if params are empty', () => {
    expect(getTranslation('fr-only', {}, 'fr')).toBe(
      'dans {minutes} minutes. Dans {minutes} minutes!',
    );
  });

  it('Should not replace anything if params are undefined', () => {
    expect(getTranslation('fr-only', undefined, 'fr')).toBe(
      'dans {minutes} minutes. Dans {minutes} minutes!',
    );
  });

  describe('falls back when translation is not available', () => {
    describe('falls back to en if possible', () => {
      it('when requested language is not available at all', () => {
        expect(getTranslation('en-only', { minutes: '3' }, 'de')).toBe('in 3 minutes');
      });

      it('when specific string is not available in the given language', () => {
        expect(getTranslation('en-only', { minutes: '3' }, 'tr')).toBe('in 3 minutes');
      });
    });

    describe('falls back to just the translation key if no english translation either', () => {
      it('when requested language is not available at all', () => {
        expect(getTranslation('no-lang', { minutes: '3' }, 'de')).toBe('no-lang');
      });

      it('when specific string is not available in the given language', () => {
        expect(getTranslation('no-lang', { minutes: '3' }, 'tr')).toBe('no-lang');
      });
    });
  });
});
