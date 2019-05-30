import formatRate from './formatRate';

describe('Rate formatting', () => {
  it('formats rate using default NUMBER_OF_RATE_SIGNIFICANT_DIGITS', () => {
    expect(formatRate(1.23)).toBe('1.23000');
    expect(formatRate(111.23)).toBe('111.230');
    expect(formatRate(10125.27)).toBe('10125.3');
    expect(formatRate(0.000273)).toBe('0.000273000');
  });

  it('formats rate given significant figures', () => {
    expect(formatRate(1.23, { significantFigures: 5 })).toBe('1.2300');
    expect(formatRate(111.23, { significantFigures: 7 })).toBe('111.2300');
    expect(formatRate(0.000273, { significantFigures: 3 })).toBe('0.000273');
  });
});
