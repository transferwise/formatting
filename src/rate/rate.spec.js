import { formatRate } from '..';

describe('Rate formatting', () => {
  it('formats rate with five decimals if sourceCurrency is not given', () => {
    expect(formatRate(1.23)).toBe('1.23000');
  });

  it('inverses the exchange rate if the sourceCurrency is in weakerCurrency list', () => {
    expect(formatRate(0.009, 'JPY', 'USD')).toBe('1 USD = 111.111 JPY');
    expect(formatRate(0.2, 'BRL', 'GBP')).toBe('1 GBP = 5.00000 BRL');
    expect(formatRate(0.01432, 'INR', 'EUR')).toBe('1 EUR = 69.8324 INR');
    expect(formatRate(0.009, 'jpy', 'usd')).toBe('1 USD = 111.111 JPY');
    expect(formatRate(0.2, 'brl', 'gbp')).toBe('1 GBP = 5.00000 BRL');
  });

  it('returns formatted Exchange Rate if the sourceCurrency is not in weakerCurrency list', () => {
    expect(formatRate(1.92307, 'USD', 'JPY')).toBe('1.92307');
    expect(formatRate(1.92307, 'usd', 'jpy')).toBe('1.92307');
  });
});
