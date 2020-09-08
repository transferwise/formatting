import formatRate from './formatRate';

describe('Rate formatting with no locale specified', () => {
  it('formats rate using default NUMBER_OF_RATE_SIGNIFICANT_DIGITS', () => {
    expect(formatRate(1.23)).toBe('1.23000');
    expect(formatRate(111.23)).toBe('111.230');
    expect(formatRate(10125.27)).toBe('10,125.3');
    expect(formatRate(0.000273)).toBe('0.000273000');
  });

  it('formats rate given significant figures', () => {
    expect(formatRate(1.23, { significantFigures: 5 })).toBe('1.2300');
    expect(formatRate(111.23, { significantFigures: 7 })).toBe('111.2300');
    expect(formatRate(0.000273, { significantFigures: 3 })).toBe('0.000273');
  });
});

describe('when a locale is set', () => {
  let originalNumberFormat: any;
  let format: any;
  let locale: any;

  beforeAll(() => {
    locale = 'some-LOCALE';

    originalNumberFormat = Intl.NumberFormat;
    format = (number: number) => jest.fn().mockReturnValue(`${number}Localized`)();
    // @ts-expect-error
    Intl.NumberFormat = jest.fn().mockImplementation(() => ({ format }));
  });

  afterAll(() => {
    Intl.NumberFormat = originalNumberFormat;
  });

  it('formats rate using default NUMBER_OF_RATE_SIGNIFICANT_DIGITS with locale', () => {
    expect(formatRate(657111.23, {})).toBe('657,111');
    expect(formatRate(10125.27, {}, locale)).toBe('10125.27Localized');
    expect(formatRate(0.000273, {}, locale)).toBe('0.000273Localized');
  });
});
