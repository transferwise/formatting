import getRateInAllFormats from './getRateInAllFormats';

jest.mock('./config', () => ({
  BRL: { hasInversionEnabled: true },
  JPY: { hasInversionEnabled: true },
  IDR: { multiplierForEquation: 10000 },
}));

describe('Get rate in all formats', () => {
  it('returns suggested output as decimal when reference is sourceCurrency and referenceMultiplier is 1', () => {
    expect(getRateInAllFormats(23354.7, 'USD', 'VND').suggested).toEqual({
      output: '23,354.7',
      format: 'decimal',
    });
  });

  it('returns suggested output as equation when reference is targetCurrency', () => {
    expect(getRateInAllFormats(0.0023, 'BRL', 'USD').suggested).toEqual({
      output: '1 USD = 434.783 BRL',
      format: 'equation',
    });
  });

  it('returns suggested output as equation when referenceMultiplier is not 1', () => {
    expect(getRateInAllFormats(0.0023, 'IDR', 'USD').suggested).toEqual({
      output: '10,000 IDR = 23.0000 USD',
      format: 'equation',
    });
  });

  it('returns suggested output and other formats', () => {
    const { formats } = getRateInAllFormats(0.0023, 'BRL', 'USD');
    expect(formats.equation).toEqual({
      output: '1 USD = 434.783 BRL',
      reference: 'target',
      referenceMultiplier: 1,
      calculationInDecimal: '434.783',
    });
    expect(formats.decimal).toEqual({ output: '0.00230000', significantFigures: 6 });
  });

  it('allows configuring reference currency as an option', () => {
    // 'auto' behaves the same as unpassed.
    expect(getRateInAllFormats(9.8765, 'ABC', 'DEF', { reference: 'auto' })).toEqual(
      getRateInAllFormats(9.8765, 'ABC', 'DEF'),
    );

    expect(getRateInAllFormats(9.8765, 'ABC', 'DEF', { reference: 'source' })).toMatchObject({
      suggested: {
        format: 'decimal',
        output: '9.87650',
      },
      formats: {
        equation: {
          output: '1 ABC = 9.87650 DEF',
          calculationInDecimal: '9.87650',
        },
        decimal: {
          output: '9.87650',
        },
      },
    });
  });

  it('allows configuring reference multiplier as an option', () => {
    expect(getRateInAllFormats(9.8765, 'ABC', 'DEF', { referenceMultiplier: 10 })).toMatchObject({
      suggested: {
        format: 'equation',
        output: '10 ABC = 98.7650 DEF',
      },
      formats: {
        equation: {
          output: '10 ABC = 98.7650 DEF',
          calculationInDecimal: '98.7650',
        },
        decimal: {
          output: '9.87650',
        },
      },
    });
  });

  it('allows configuring significant figures as an option', () => {
    expect(getRateInAllFormats(0.12345, 'ABC', 'DEF', { significantFigures: 4 })).toMatchObject({
      formats: {
        equation: {
          output: '1 ABC = 0.1235 DEF',
          calculationInDecimal: '0.1235',
        },
        decimal: {
          output: '0.1235',
          significantFigures: 4,
        },
      },
    });
    expect(getRateInAllFormats(0.12345, 'ABC', 'DEF', { significantFigures: 10 })).toMatchObject({
      formats: {
        equation: {
          output: '1 ABC = 0.1234500000 DEF',
          calculationInDecimal: '0.1234500000',
        },
        decimal: {
          output: '0.1234500000',
          significantFigures: 10,
        },
      },
    });
  });
});
