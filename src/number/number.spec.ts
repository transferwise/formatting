import { DEFAULT_LOCALE } from '../defaults';
import { formatNumber, formatNumberToSignificantDigits } from './number';

describe('Number formatting, when Intl.NumberFormat is supported', () => {
  let number = 123456 as any;
  let locale = DEFAULT_LOCALE;
  let precision: any;

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
    let originalNumberFormat: any;
    let format: any;

    beforeAll(() => {
      locale = 'en_US';

      originalNumberFormat = Intl.NumberFormat;
      format = jest.fn().mockReturnValue('123456');
      // @ts-expect-error
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
    let originalNumberFormat: any;
    let format: any;

    beforeAll(() => {
      locale = 'es-ES';

      originalNumberFormat = Intl.NumberFormat;
      format = jest.fn().mockReturnValue('123456');
      // @ts-expect-error
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
      it('should format the value with the expected fixed precision', () => {
        expect(formatNumberToSignificantDigits(1.23, locale, 5)).toBe('1.2300');
        expect(formatNumberToSignificantDigits(111.23, locale, 7)).toBe('111.2300');
        expect(formatNumberToSignificantDigits(0.000273, locale, 3)).toBe('0.000273');
      });

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

    describe('and a precision is not supplied', () => {
      it('formats rate using default NUMBER_OF_RATE_SIGNIFICANT_DIGITS', () => {
        expect(formatNumberToSignificantDigits(1.23, locale)).toBe('1.23000');
        expect(formatNumberToSignificantDigits(111.23, locale)).toBe('111.230');
        expect(formatNumberToSignificantDigits(10125.27, locale)).toBe('10,125.3');
        expect(formatNumberToSignificantDigits(0.000273, locale)).toBe('0.000273000');
      });
    });
  });
});
