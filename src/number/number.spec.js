import { DEFAULT_LOCALE } from '../defaults';
import { formatNumber, isNumberLocaleSupported } from './number';

describe('Number formatting, ', () => {
  let number = 123456;
  let locale = DEFAULT_LOCALE;
  let precision;

  describe('when no locale supplied', () => {
    it(`should use the ${DEFAULT_LOCALE}`, () => {
      if (isNumberLocaleSupported()) {
        expect(formatNumber(number)).toEqual('123,456');
      } else {
        expect(formatNumber(number)).toEqual('123456');
      }
    });
  });

  describe('when en-GB locale supplied', () => {
    describe('and given an integer number', () => {
      it('should format the value', () => {
        if (isNumberLocaleSupported()) {
          expect(formatNumber(number)).toEqual('123,456');
        } else {
          expect(formatNumber(number)).toEqual('123456');
        }
      });
    });

    describe('and given a decimal number', () => {
      beforeEach(() => {
        number = 1234.56;
      });

      it('should format the value', () => {
        if (isNumberLocaleSupported()) {
          expect(formatNumber(number)).toEqual('1,234.56');
        } else {
          expect(formatNumber(number)).toEqual('1234.56');
        }
      });
    });

    describe('and given a numeric integer string', () => {
      beforeEach(() => {
        number = '123456';
      });

      it('should format the value', () => {
        if (isNumberLocaleSupported()) {
          expect(formatNumber(number)).toEqual('123,456');
        } else {
          expect(formatNumber(number)).toEqual('123456');
        }
      });
    });

    describe('and given a decimal numeric string', () => {
      beforeEach(() => {
        number = '1234.56';
      });

      it('should format the value', () => {
        if (isNumberLocaleSupported()) {
          expect(formatNumber(number)).toEqual('1,234.56');
        } else {
          expect(formatNumber(number)).toEqual('1234.56');
        }
      });
    });
  });

  describe('when es-ES locale supplied', () => {
    beforeAll(() => {
      locale = 'es-ES';
    });

    describe('and given an integer number', () => {
      beforeEach(() => {
        number = 123456;
      });

      it('should format the value', () => {
        if (isNumberLocaleSupported()) {
          expect(formatNumber(number, null, locale)).toEqual('123.456');
        } else {
          expect(formatNumber(number, null, locale)).toEqual('123456');
        }
      });
    });

    describe('and given a decimal number', () => {
      beforeEach(() => {
        number = 1234.56;
      });

      it('should format the value', () => {
        if (isNumberLocaleSupported()) {
          expect(formatNumber(number, null, locale)).toEqual('1.234,56');
        } else {
          expect(formatNumber(number, null, locale)).toEqual('1234.56');
        }
      });
    });

    describe('and given a numeric integer string', () => {
      beforeEach(() => {
        number = '123456';
      });

      it('should format the value', () => {
        if (isNumberLocaleSupported()) {
          expect(formatNumber(number, null, locale)).toEqual('123.456');
        } else {
          expect(formatNumber(number, null, locale)).toEqual('123456');
        }
      });
    });

    describe('and given a decimal numeric string', () => {
      beforeEach(() => {
        number = '1234.56';
      });

      it('should format the value', () => {
        if (isNumberLocaleSupported()) {
          expect(formatNumber(number, null, locale)).toEqual('1.234,56');
        } else {
          expect(formatNumber(number, null, locale)).toEqual('1234.56');
        }
      });
    });
  });

  describe('when a precision is supplied', () => {
    beforeEach(() => {
      number = '1234.5';
      precision = 2;
    });

    it('should format the value with the correct decimals', () => {
      if (isNumberLocaleSupported()) {
        expect(formatNumber(number, precision)).toEqual('1,234.50');
      } else {
        expect(formatNumber(number, precision)).toEqual('1234.50');
      }
    });
  });
});
