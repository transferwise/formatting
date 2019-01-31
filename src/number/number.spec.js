import { DEFAULT_LOCALE } from '../defaults';
import { formatNumber } from './number';

describe('Number formatting, when Intl.NumberFormat is supported', () => {
  let number = 123456;
  let locale = DEFAULT_LOCALE;
  let precision;

  describe('when no locale supplied', () => {
    it(`should use the ${DEFAULT_LOCALE}`, () => {
      expect(formatNumber(number)).toEqual('123,456');
    });
  });

  describe('when en-GB locale supplied', () => {
    describe('and given an integer number', () => {
      it('should format the value', () => {
        expect(formatNumber(number, 'en-GB')).toEqual('123,456');
      });
    });

    describe('and given a decimal number', () => {
      beforeEach(() => {
        number = 1234.56;
      });

      it('should format the value', () => {
        expect(formatNumber(number, 'en-GB')).toEqual('1,234.56');
      });
    });

    describe('and given a numeric integer string', () => {
      beforeEach(() => {
        number = '123456';
      });

      it('should format the value', () => {
        expect(formatNumber(number, 'en-GB')).toEqual('123,456');
      });
    });

    describe('and given a decimal numeric string', () => {
      beforeEach(() => {
        number = '1234.56';
      });

      it('should format the value', () => {
        expect(formatNumber(number, 'en-GB')).toEqual('1,234.56');
      });
    });
  });

  describe('when es-ES locale supplied', () => {
    let originalNumberFormat;
    let format;

    beforeAll(() => {
      locale = 'es-ES';

      originalNumberFormat = Intl.NumberFormat;
      format = jest.fn().mockReturnValue('123456');
      Intl.NumberFormat = jest.fn().mockImplementation(() => ({ format }));
    });

    afterAll(() => {
      Intl.NumberFormat = originalNumberFormat;
    });

    describe('and given an integer number', () => {
      beforeEach(() => {
        number = 123456;
      });

      it('should format the value', () => {
        formatNumber(number, locale);
        expect(Intl.NumberFormat).lastCalledWith('es-ES');
        expect(format).lastCalledWith(number);
      });
    });

    describe('and given a decimal number', () => {
      beforeEach(() => {
        number = 1234.56;
      });

      it('should format the value', () => {
        formatNumber(number, locale);
        expect(Intl.NumberFormat).lastCalledWith('es-ES');
        expect(format).lastCalledWith(number);
      });
    });

    describe('and given a numeric integer string', () => {
      beforeEach(() => {
        number = '123456';
      });

      it('should format the value', () => {
        formatNumber(number, locale);
        expect(Intl.NumberFormat).lastCalledWith('es-ES');
        expect(format).lastCalledWith(+number);
      });
    });

    describe('and given a decimal numeric string', () => {
      beforeEach(() => {
        number = '1234.56';
      });

      it('should format the value', () => {
        formatNumber(number, locale);
        expect(Intl.NumberFormat).lastCalledWith('es-ES');
        expect(format).lastCalledWith(+number);
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
      expect(formatNumber(number, locale, precision)).toEqual('1,234.50');
    });
  });
});
