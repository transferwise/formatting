import getRateEquation from './getRateEquation';

jest.mock('./config', () => ({
  BRL: { hasInversionEnabled: true },
  JPY: { hasInversionEnabled: true },
  IDR: { multiplierForEquation: 10000 },
}));

describe('Get Rate Equation', () => {
  it('returns equation without inversion or multiplication', () => {
    expect(getRateEquation(0.0023, 'VND', 'USD')).toEqual({
      lhsCurrency: 'VND',
      lhsValue: 1,
      rhsCurrency: 'USD',
      rhsValue: 0.0023,
    });
  });

  it('returns equation with inversion', () => {
    expect(getRateEquation(0.0023, 'BRL', 'USD')).toEqual({
      lhsCurrency: 'USD',
      lhsValue: 1,
      rhsCurrency: 'BRL',
      rhsValue: 434.7826086956522,
    });
  });

  it('returns equation with multiplication', () => {
    expect(getRateEquation(0.0023, 'IDR', 'USD')).toEqual({
      lhsCurrency: 'IDR',
      lhsValue: 10000,
      rhsCurrency: 'USD',
      rhsValue: 23.0,
    });
  });

  it('returns equation with inversion and multiplication', () => {
    expect(getRateEquation(131.28, 'JPY', 'IDR')).toEqual({
      lhsCurrency: 'IDR',
      lhsValue: 10000,
      rhsCurrency: 'JPY',
      rhsValue: 76.17306520414381,
    });
  });

  it('returns equation with incoming reference value', () => {
    expect(getRateEquation(0.0023, 'BRL', 'USD', { reference: 'source' })).toEqual({
      lhsCurrency: 'BRL',
      lhsValue: 1,
      rhsCurrency: 'USD',
      rhsValue: 0.0023,
    });
  });

  it('returns equation with incoming referenceMultiplier value', () => {
    expect(getRateEquation(0.0023, 'BRL', 'USD', { referenceMultiplier: 10 })).toEqual({
      lhsCurrency: 'USD',
      lhsValue: 10,
      rhsCurrency: 'BRL',
      rhsValue: 4347.826086956522,
    });
  });

  it('returns equation with incoming reference and referenceMultiplier value', () => {
    expect(
      getRateEquation(0.0023, 'BRL', 'USD', { reference: 'source', referenceMultiplier: 100 }),
    ).toEqual({
      lhsCurrency: 'BRL',
      lhsValue: 100,
      rhsCurrency: 'USD',
      rhsValue: 0.22999999999999998,
    });
  });
});
