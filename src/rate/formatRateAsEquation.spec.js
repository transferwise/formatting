import formatRateAsEquation from './formatRateAsEquation';

jest.mock('./config', () => ({
  BRL: { hasInversionEnabled: true },
  JPY: { hasInversionEnabled: true },
  IDR: { multiplierForEquation: 10000 },
}));

describe('Rate formatting', () => {
  it('formats rate as equation without inversion or multiplication', () => {
    expect(formatRateAsEquation(0.0023, 'VND', 'USD')).toBe('1 VND = 0.00230000 USD');
  });

  it('formats rate as equation with inversion', () => {
    expect(formatRateAsEquation(0.0023, 'BRL', 'USD')).toBe('1 USD = 434.783 BRL');
  });

  it('formats rate as equation with multiplication', () => {
    expect(formatRateAsEquation(0.0023, 'IDR', 'USD')).toBe('10,000 IDR = 23.0000 USD');
  });

  it('formats rate as equation with inversion and multiplication', () => {
    expect(formatRateAsEquation(131.28, 'JPY', 'IDR')).toBe('10,000 IDR = 76.1731 JPY');
  });

  it('formats rate as equation with incoming lhs value', () => {
    expect(formatRateAsEquation(0.0023, 'BRL', 'USD', { lhs: 'source' })).toBe(
      '1 BRL = 0.00230000 USD',
    );
  });

  it('formats rate as equation with incoming lhsMultiplier value', () => {
    expect(formatRateAsEquation(0.0023, 'BRL', 'USD', { lhsMultiplier: 10 })).toBe(
      '10 USD = 4347.83 BRL',
    );
  });

  it('formats rate as equation with incoming lhs and lhsMultiplier value', () => {
    expect(formatRateAsEquation(0.0023, 'BRL', 'USD', { lhs: 'source', lhsMultiplier: 100 })).toBe(
      '100 BRL = 0.230000 USD',
    );
  });
});
