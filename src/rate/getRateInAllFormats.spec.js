import getRateInAllFormats from './getRateInAllFormats';

jest.mock('./config', () => ({
  BRL: { hasInversionEnabled: true },
  JPY: { hasInversionEnabled: true },
  IDR: { multiplierForEquation: 10000 },
}));

describe('Get Rate In All Formats', () => {
  it('returns default output as decimal when reference is sourceCurrency and referenceMultiplier is 1', () => {
    expect(getRateInAllFormats(23354.7, 'USD', 'VND').default).toEqual({
      output: '23354.7',
      format: 'decimal',
    });
  });

  it('returns default output as equation when reference is targetCurrency', () => {
    expect(getRateInAllFormats(0.0023, 'BRL', 'USD').default).toEqual({
      output: '1 USD = 434.783 BRL',
      format: 'equation',
    });
  });

  it('returns default output as equation when referenceMultiplier is not 1', () => {
    expect(getRateInAllFormats(0.0023, 'IDR', 'USD').default).toEqual({
      output: '10,000 IDR = 23.0000 USD',
      format: 'equation',
    });
  });

  it('returns default output and other formats', () => {
    const { formats } = getRateInAllFormats(0.0023, 'BRL', 'USD');
    expect(formats.equation).toEqual({
      output: '1 USD = 434.783 BRL',
      isInverted: true,
      rateInDecimal: '434.783',
      rateMultiplier: 1,
    });
    expect(formats.decimal).toEqual({ output: '0.00230000', significantFigures: 6 });
  });
});
