import { formatPercentage } from '..';

describe('Percentage formatting', () => {
  it('formats percentage without zeros at the end', () => {
    expect(formatPercentage(0.23)).toBe('23%');
    expect(formatPercentage(0.2304)).toBe('23.04%');
    expect(formatPercentage(0.231)).toBe('23.1%');
    expect(formatPercentage(0.0)).toBe('0%');
  });
});
