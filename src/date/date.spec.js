import { formatDate } from '..';

import * as dateStringDetection from './support-detection/toLocaleDateString';
import * as selectedLocaleDetection from './support-detection/selectedLocale';
import * as fallback from './fallback-format/fallbackFormat';

describe('Date formatting', () => {
  const date = new Date();
  date.toLocaleDateString = jest.fn().mockReturnValue('trolo');
  fallback.getFallbackFormat = jest.fn().mockReturnValue('lolo');

  describe('when toLocaleDateString is supported', () => {
    beforeEach(() => {
      dateStringDetection.isToLocaleDateStringSupported = jest.fn().mockReturnValue(true);
    });

    it('should call toLocaleDateString with default params', () => {
      expect(formatDate(date)).toBe('trolo');
      expect(date.toLocaleDateString).lastCalledWith('en-GB', {});
    });

    it('should pass given params to toLocaleDateString', () => {
      formatDate(date, 'et', { whatever: true });
      expect(date.toLocaleDateString).lastCalledWith('et', { whatever: true });
    });
  });

  describe('when toLocaleDateString is supported, but locale is invalid', () => {
    beforeEach(() => {
      dateStringDetection.isToLocaleDateStringSupported = jest.fn().mockReturnValue(true);
      selectedLocaleDetection.isSelectedLocaleSupported = jest.fn().mockReturnValue(false);
    });

    it('should use default locale', () => {
      formatDate(date, 'my-awesome-locale');
      expect(date.toLocaleDateString).lastCalledWith('en-GB', {});
    });
  });

  describe('when toLocaleDateString is not supported', () => {
    beforeEach(() => {
      dateStringDetection.isToLocaleDateStringSupported = jest.fn().mockReturnValue(false);
    });

    it('should call fallback method', () => {
      expect(formatDate(date)).toBe('lolo');
      expect(fallback.getFallbackFormat).lastCalledWith(date, {});
    });
  });
});
