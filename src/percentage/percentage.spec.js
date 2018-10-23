import { formatPercentage } from '..';

describe('Percentage formatting', () => {
  it('formats percentage without decimals', () => {
    expect(formatPercentage(0.23)).toBe('23%');
  });

  it('formats percentage with one decimal', () => {
    expect(formatPercentage(0.231)).toBe('23.1%');
  });

  it('formats percentage with two or more decimals', () => {
    expect(formatPercentage(0.2304)).toBe('23.04%');
  });

  it('formats percentage with value 0', () => {
    expect(formatPercentage(0.0)).toBe('0%');
  });
});
