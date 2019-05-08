import { formatRate } from '..';

jest.mock('./rateInversionEnabledCurrencies.json', () => ['JPY', 'ARS']);

describe('Rate formatting', () => {
  it('formats rate with significant figures when source currency is not given', () => {
    expect(formatRate(1.23)).toBe('1.23000');
    expect(formatRate(111.23)).toBe('111.230');
    expect(formatRate(10125.27)).toBe('10125.3');
    expect(formatRate(0.000273)).toBe('0.000273000');
  });

  it('inverses the exchange rate when exchange rate inversion is enabled for source currency', () => {
    expect(formatRate(0.009, 'JPY', 'USD')).toBe('1 USD = 111.111 JPY');
    expect(formatRate(0.2, 'BRL', 'GBP')).toBe('0.200000');
    expect(formatRate(0.00002, 'IDR', 'GBP')).toBe('0.0000200000');
    expect(formatRate(0.009, 'jpy', 'usd')).toBe('1 USD = 111.111 JPY');
    expect(formatRate(0.2, 'brl', 'gbp')).toBe('0.200000');
  });

  it('formats rate with significant figures when exchange rate inversion is not enabled for source currency', () => {
    expect(formatRate(1.92307, 'USD', 'JPY')).toBe('1.92307');
    expect(formatRate(1.92307, 'idr', 'jpy')).toBe('1.92307');
  });

  it('formats rate with given number of significant figures', () => {
    const options = { numberOfSignificantDigits: 5 };
    expect(formatRate(0.009, 'JPY', 'USD', options)).toBe('1 USD = 111.11 JPY');
    expect(formatRate(0.2, 'BRL', 'GBP', options)).toBe('0.20000');
  });

  it('formats rate with signicant figures if the skipInversion flag is passed', () => {
    const options = { skipInversion: true };
    expect(formatRate(0.009, 'JPY', 'USD', options)).toBe('0.00900000');
  });
});
