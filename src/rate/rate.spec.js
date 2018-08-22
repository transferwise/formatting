import { formatRate } from '..';

describe('Rate formatting', () => {
  it('always formats rate with five decimals', () => {
    expect(formatRate(1.23)).toBe('1.23000');
  });
});
