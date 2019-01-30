describe('Currency formatting', () => {
  let formatAmount;
  let formatMoney;

  let originalAbsoluteFunction;

  beforeEach(() => {
    reloadFormatting(); // As the module saves state, need to reload the module.
    originalAbsoluteFunction = Math.abs;
    Math.abs = jest.fn(num => (num.isFake ? num : originalAbsoluteFunction(num)));
  });

  afterEach(() => {
    Math.abs = originalAbsoluteFunction;
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

  function reloadFormatting() {
    jest.resetModules();
    // eslint-disable-next-line global-require
    const formatting = require('..');
    // eslint-disable-next-line prefer-destructuring
    formatAmount = formatting.formatAmount;
    // eslint-disable-next-line prefer-destructuring
    formatMoney = formatting.formatMoney;
  }
});
