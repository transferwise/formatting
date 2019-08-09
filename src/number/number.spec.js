import { DEFAULT_LOCALE } from '../defaults';
import { formatNumber, formatNumberToSignificantDigits } from './number';

describe('Number formatting, when Intl.NumberFormat is supported', () => {
  let number = 123456;
  let locale = DEFAULT_LOCALE;
  let precision;

  describe('when no locale supplied', () => {
    it(`should use the ${DEFAULT_LOCALE}`, () => {
      expect(formatNumber(number)).toEqual('123,456');
    });
  });

  describe('when an invalid locale', () => {
    it(`should use the ${DEFAULT_LOCALE}`, () => {
      expect(formatNumber(number, 'invalid_locale')).toEqual('123,456');
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

    describe('and given a zero valued number', () => {
      beforeEach(() => {
        number = 0.0;
      });

      it('should format the value', () => {
        expect(formatNumber(number, 'en-GB')).toEqual('0');
      });
    });

    describe('and given a string zero valued number', () => {
      beforeEach(() => {
        number = '0';
      });

      it('should format the value', () => {
        expect(formatNumber(number, 'en-GB')).toEqual('0');
      });
    });
  });

  describe('when an invalid locale supplied', () => {
    let originalNumberFormat;
    let format;

    beforeAll(() => {
      locale = 'en_US';

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

      it('should format the value with a valid locale', () => {
        formatNumber(number, locale);
        expect(Intl.NumberFormat).lastCalledWith('en-US');
        expect(format).lastCalledWith(number);
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
    beforeAll(() => {
      locale = DEFAULT_LOCALE;
      precision = 2;
    });

    describe('and given a value with decimals', () => {
      beforeEach(() => {
        number = '1234.5';
      });

      it('should format the value with the expected fixed precision', () => {
        expect(formatNumber(number, locale, precision)).toEqual('1,234.50');
      });
    });

    describe('and given a value with no decimals', () => {
      beforeEach(() => {
        number = 10;
      });

      it('should format the value with the expected fixed precision', () => {
        expect(formatNumber(number, locale, precision)).toEqual('10.00');
      });
    });

    describe('and given a zero value', () => {
      beforeEach(() => {
        number = 0;
      });

      it('should format the value with the expected fixed precision', () => {
        expect(formatNumber(number, locale, precision)).toEqual('0.00');
      });
    });

    describe('and given an undefined value', () => {
      beforeEach(() => {
        number = undefined;
      });

      it('should return null', () => {
        expect(formatNumber(number, locale, precision)).toEqual(null);
      });
    });
  });

  describe('when formatting to significant figures', () => {
    beforeAll(() => {
      precision = 6;
    });

    describe('and a precision is supplied', () => {
      describe('and given a value with decimals', () => {
        beforeEach(() => {
          number = '1234.5';
        });

        it('should format the value with the expected fixed precision', () => {
          expect(formatNumberToSignificantDigits(number, locale, precision)).toEqual('1,234.50');
        });
      });

      describe('and given a value with no decimals', () => {
        beforeEach(() => {
          number = 10;
        });

        it('should format the value with the expected fixed precision', () => {
          expect(formatNumberToSignificantDigits(number, locale, precision)).toEqual('10.0000');
        });
      });

      describe('and given a zero value', () => {
        beforeEach(() => {
          number = 0;
        });

        it('should format the value with the expected fixed precision', () => {
          expect(formatNumberToSignificantDigits(number, locale, precision)).toEqual('0.00000');
        });
      });

      describe('and given an undefined value', () => {
        beforeEach(() => {
          number = undefined;
        });

        it('should return null', () => {
          expect(formatNumberToSignificantDigits(number, locale, precision)).toEqual(null);
        });
      });
    });
  });
});
