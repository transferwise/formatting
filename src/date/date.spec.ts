import { formatDate } from './date';

import * as intlDetection from './support-detection/intl';
import * as selectedLocaleDetection from './support-detection/selectedLocale';
import * as fallback from './fallback-format/fallbackFormat';

describe('Date formatting', () => {
  let originalDateTimeFormat: any;
  let format: any;
  const date = new Date();
  // @ts-expect-error
  fallback.getFallbackFormat = jest.fn().mockReturnValue('lolo');

  beforeEach(() => {
    originalDateTimeFormat = Intl.DateTimeFormat;
    format = jest.fn().mockReturnValue('01/12/2018');
    // @ts-expect-error
    Intl.DateTimeFormat = jest.fn().mockImplementation(() => ({ format }));
  });

  afterEach(() => {
    Intl.DateTimeFormat = originalDateTimeFormat;
  });

  describe('when intl is supported', () => {
    beforeEach(() => {
      // @ts-expect-error
      intlDetection.isIntlSupported = jest.fn().mockReturnValue(true);
      // @ts-expect-error
      selectedLocaleDetection.isSelectedLocaleSupported = jest.fn().mockReturnValue(true);
    });

    it('should call toLocaleDateString with default params', () => {
      expect(formatDate(date)).toBe('01/12/2018');
      expect(Intl.DateTimeFormat).lastCalledWith('en-GB', undefined);
      expect(format).lastCalledWith(date);
    });

    it('should pass given params to toLocaleDateString', () => {
      formatDate(date, 'et', { month: 'short' });
      expect(Intl.DateTimeFormat).lastCalledWith('et', { month: 'short' });
      expect(format).lastCalledWith(date);
    });

    it('should cache formatter', () => {
      const options = { month: 'short' };
      formatDate(new Date(1990, 1, 1), 'et', options);
      formatDate(new Date(1990, 1, 2), 'et', options);
      expect(Intl.DateTimeFormat).toHaveBeenCalledTimes(1);
    });

    it('should cache formatter when no options provided', () => {
      formatDate(new Date(1990, 1, 1), 'et');
      formatDate(new Date(1990, 1, 2), 'et');
      expect(Intl.DateTimeFormat).toHaveBeenCalledTimes(1);
    });
  });

  describe('when intl is supported, but locale is invalid', () => {
    beforeEach(() => {
      // @ts-expect-error
      intlDetection.isIntlSupported = jest.fn().mockReturnValue(true);
      // @ts-expect-error
      selectedLocaleDetection.isSelectedLocaleSupported = jest.fn().mockReturnValue(false);
    });

    it('should use default locale', () => {
      formatDate(date, 'my-awesome-locale', {});
      expect(Intl.DateTimeFormat).lastCalledWith('en-GB', {});
      expect(format).toHaveBeenCalled();
    });
  });

  describe('when intl is not supported', () => {
    beforeEach(() => {
      // @ts-expect-error
      intlDetection.isIntlSupported = jest.fn().mockReturnValue(false);
    });

    it('should call fallback method', () => {
      expect(formatDate(date, 'en-GB', {})).toBe('lolo');
      expect(fallback.getFallbackFormat).lastCalledWith(date, {});
    });
  });
});
