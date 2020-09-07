describe('Currency formatting', () => {
  let formatAmount: any;
  let formatMoney: any;

  let originalAbsoluteFunction: any;
  let originalNumberFormat: any;

  beforeEach(() => {
    reloadFormatting(); // As the module saves state, need to reload the module.
    originalAbsoluteFunction = Math.abs;
    originalNumberFormat = Intl.NumberFormat;
    // @ts-expect-error
    Math.abs = jest.fn(num => (num.isFake ? num : originalAbsoluteFunction(num)));
  });

  afterEach(() => {
    Math.abs = originalAbsoluteFunction;
    Intl.NumberFormat = originalNumberFormat;
  });

  it('uses toFixed to format if Intl.NumberFormat is not supported', () => {
    // @ts-expect-error
    Intl.NumberFormat = 'THIS_MAKES_isIntlNumberFormatSupported_FALSE';

    expect(formatAmount(fakeNumber(), 'jpy')).toBe('fixed for precision 0');

    reloadFormatting();

    expect(formatAmount(1234.56, 'eur')).toBe('1234.56'); // sanity check
  });

  it('has a precision fallback for unknown currencies', () => {
    expect(formatAmount(123.4, 'not existent', 'en-GB')).toBe('123.40');
  });

  it('displays negative amounts with a space between the minus and the amount', () => {
    expect(formatAmount(-1234.5, 'gbp')).toBe('- 1,234.50');
  });

  it('formats amounts with no decimals without decimals', () => {
    expect(formatAmount(1234, 'gbp')).toBe('1,234');
  });

  it('formats money the same way as it formats amounts, but with the currency code added', () => {
    expect(formatMoney(1234.5, 'gbp')).toBe('1,234.50 GBP');
  });

  it('formats money when passed zero values', () => {
    expect(formatMoney(0, 'gbp')).toBe('0 GBP');
  });

  describe('when different levels of precision are given', () => {
    let currency: any;

    describe('with a currency supporting a precision level of 2 decimals', () => {
      beforeEach(() => {
        currency = 'gbp';
      });

      it('formats money given 3 decimals', () => {
        expect(formatMoney(1.111, currency, 'en')).toBe('1.11 GBP');
      });

      it('formats money given 2 decimals', () => {
        expect(formatMoney(1.11, currency, 'en')).toBe('1.11 GBP');
      });

      it('formats money given 1 decimal', () => {
        expect(formatMoney(1.1, currency, 'en')).toBe('1.10 GBP');
      });

      it('formats money with no decimals without alwaysShowDecimals option', () => {
        expect(formatMoney(1, currency, 'en')).toBe('1 GBP');
      });

      it('formats money with no decimals, when given alwaysShowDecimals option', () => {
        expect(formatMoney(1, currency, 'en', { alwaysShowDecimals: true })).toBe('1.00 GBP');
      });
    });

    describe('with a currency supporting a precision level of 0 decimals', () => {
      beforeEach(() => {
        currency = 'huf';
      });

      it('formats money without options', () => {
        expect(formatMoney(1.111, currency, 'en')).toBe('1 HUF');
      });

      it('formats money when given alwaysShowDecimals option', () => {
        expect(formatMoney(1.11, currency, 'en', { alwaysShowDecimals: true })).toBe('1 HUF');
      });
    });
  });

  function reloadFormatting() {
    jest.resetModules();
    // eslint-disable-next-line global-require
    const formatting = require('./index');
    // eslint-disable-next-line prefer-destructuring
    formatAmount = formatting.formatAmount;
    // eslint-disable-next-line prefer-destructuring
    formatMoney = formatting.formatMoney;
  }

  function fakeNumber() {
    return {
      isFake: true,

      toFixed(precision: number) {
        return `fixed for precision ${precision}`;
      },
    };
  }
});
