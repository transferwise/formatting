describe('Currency formatting', () => {
  let formatCurrency;
  let formatMoney;

  beforeEach(() => {
    reloadFormatting(); // As the module saves state, need to reload the module.
  });

  it('uses toLocaleString to format if it is supported', () => {
    expect(formatCurrency(fakeNumber(), 'eur', 'et-EE')).toBe(
      'formatted for et-EE and options {"minimumFractionDigits":2,"maximumFractionDigits":2}',
    );

    expect(formatCurrency(1234.5, 'gbp')).toBe('1,234.50'); // sanity check
  });

  it('uses toFixed to format if localeString not supported or acts weirdly', () => {
    const { toLocaleString } = Number.prototype;
    // eslint-disable-next-line no-extend-native
    Number.prototype.toLocaleString = null;

    expect(formatCurrency(fakeNumber(), 'jpy')).toBe('fixed for precision 0');

    reloadFormatting();

    // eslint-disable-next-line no-extend-native
    Number.prototype.toLocaleString = () => 'some weird value';

    expect(formatCurrency(1234.56, 'eur')).toBe('1234.56'); // sanity check

    // eslint-disable-next-line no-extend-native
    Number.prototype.toLocaleString = toLocaleString;
  });

  it('has a precision fallback for unknown currencies', () => {
    expect(formatCurrency(123.4, 'not existent', 'en-GB')).toBe('123.40');
  });

  it('formats money the same way as it formats currency, but with the currency code added', () => {
    expect(formatMoney(1234.5, 'gbp')).toBe('1,234.50 GBP');
  });

  function reloadFormatting() {
    jest.resetModules();
    // eslint-disable-next-line global-require
    const formatting = require('.');
    // eslint-disable-next-line prefer-destructuring
    formatCurrency = formatting.formatCurrency;
    // eslint-disable-next-line prefer-destructuring
    formatMoney = formatting.formatMoney;
  }

  function fakeNumber() {
    return {
      toLocaleString(locale, options) {
        return `formatted for ${locale} and options ${JSON.stringify(options)}`;
      },

      toFixed(precision) {
        return `fixed for precision ${precision}`;
      },
    };
  }
});
