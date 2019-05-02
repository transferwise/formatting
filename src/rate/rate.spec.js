import { formatRate } from '..';

describe('Rate formatting', () => {
  it('formats rate with five decimals if sourceCurrency is not given', () => {
    expect(formatRate(1.23)).toBe('1.23000');
  });

  it('inverses the exchange rate if the sourceCurrency is in weakerCurrency list', () => {
    expect(formatRate(0.52, 'JPY', 'USD')).toBe('1 USD = 1.92308 JPY');
    expect(formatRate(0.5, 'BRL', 'GBP')).toBe('1 GBP = 2.00000 BRL');
    expect(formatRate(0.01432, 'INR', 'EUR')).toBe('1 EUR = 69.83240 INR');
  });

  it('returns formatted Exchange Rate if the sourceCurrency is not in weakerCurrency list', () => {
    expect(formatRate(1.92307, 'USD', 'JPY')).toBe('1.92307');
  });
});
