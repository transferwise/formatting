import { DEFAULT_LOCALE } from '../defaults';
import { formatNumber } from './number';
import * as intl from './feature-detection/intl';

describe('Number formatting, when Intl.NumberFormat is not supported', () => {
  let number = 123456;
  let locale = DEFAULT_LOCALE;
  let precision;

  beforeAll(() => {
    intl.isIntlNumberFormatSupported = jest.fn().mockReturnValue(false);
  });

  describe('when no locale supplied', () => {
    it(`should use the ${DEFAULT_LOCALE}`, () => {
      expect(formatNumber(number)).toEqual('123456');
    });
  });

  describe('when en-GB locale supplied', () => {
    describe('and given an integer number', () => {
      it('should format the value', () => {
        expect(formatNumber(number, null, 'en-GB')).toEqual('123456');
      });
    });

    describe('and given a decimal number', () => {
      beforeEach(() => {
        number = 1234.56;
      });

      it('should format the value', () => {
        expect(formatNumber(number, null, 'en-GB')).toEqual('1234.56');
      });
    });

    describe('and given a numeric integer string', () => {
      beforeEach(() => {
        number = '123456';
      });

      it('should format the value', () => {
        expect(formatNumber(number, null, 'en-GB')).toEqual('123456');
      });
    });

    describe('and given a decimal numeric string', () => {
      beforeEach(() => {
        number = '1234.56';
      });

      it('should format the value', () => {
        expect(formatNumber(number, null, 'en-GB')).toEqual('1234.56');
      });
    });
  });

  describe('when es-ES locale supplied', () => {
    beforeEach(() => {
      locale = 'es-ES';
    });

    describe('and given an integer number', () => {
      beforeEach(() => {
        number = 123456;
      });

      it('should format the value', () => {
        expect(formatNumber(number, null, locale)).toEqual('123456');
      });
    });

    describe('and given a decimal number', () => {
      beforeEach(() => {
        number = 1234.56;
      });

      it('should format the value', () => {
        expect(formatNumber(number, null, locale)).toEqual('1234.56');
      });
    });

    describe('and given a numeric integer string', () => {
      beforeEach(() => {
        number = '123456';
      });

      it('should format the value', () => {
        expect(formatNumber(number, null, locale)).toEqual('123456');
      });
    });

    describe('and given a decimal numeric string', () => {
      beforeEach(() => {
        number = '1234.56';
      });

      it('should format the value', () => {
        expect(formatNumber(number, null, locale)).toEqual('1234.56');
      });
    });
  });

  describe('when a precision is supplied', () => {
    beforeEach(() => {
      locale = DEFAULT_LOCALE;
      number = '1234.5';
      precision = 2;
    });

    it('should format the value with the correct decimals', () => {
      expect(formatNumber(number, precision)).toEqual('1234.50');
    });
  });
});
