import formatRateEquation from './formatRateEquation';

jest.mock('./config', () => ({
  BRL: { hasInversionEnabled: true },
  JPY: { hasInversionEnabled: true },
  IDR: { multiplierForEquation: 10000 },
}));

describe('Rate formatting', () => {
  it('formats rate equation', () => {
    expect(
      formatRateEquation({ lhsCurrency: 'VND', lhsValue: 1, rhsCurrency: 'USD', rhsValue: 0.0023 }),
    ).toBe('1 VND = 0.00230000 USD');
  });

  it('formats rate equation with currency specific formatting', () => {
    expect(
      formatRateEquation({
        lhsCurrency: 'IDR',
        lhsValue: 10000,
        rhsCurrency: 'USD',
        rhsValue: 23.0,
      }),
    ).toBe('10,000 IDR = 23.0000 USD');
  });
});
