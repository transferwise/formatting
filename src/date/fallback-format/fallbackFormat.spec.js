import { getFallbackFormat } from '.';

describe('Date format fallback', () => {
  let date = new Date(Date.UTC(2018, 11, 1));

  it('formats DMY by default', () => {
    const opts = { timeZone: 'UTC' };
    expect(getFallbackFormat(date, opts)).toBe('1/12/2018');
  });

  it('formats W', () => {
    const opts = { timeZone: 'UTC', weekday: true };
    expect(getFallbackFormat(date, opts)).toBe('Sat');
  });

  it('formats W, D', () => {
    const opts = { timeZone: 'UTC', weekday: true, day: true };
    expect(getFallbackFormat(date, opts)).toBe('Sat, 1');
  });

  it('formats W, DM', () => {
    const opts = { timeZone: 'UTC', weekday: true, month: true, day: true };
    expect(getFallbackFormat(date, opts)).toBe('Sat, 1/12');
  });

  it('formats W, DMY', () => {
    const opts = { timeZone: 'UTC', weekday: true, year: true, month: true, day: true };
    expect(getFallbackFormat(date, opts)).toBe('Sat, 1/12/2018');
  });

  it('formats Y', () => {
    const opts = { timeZone: 'UTC', year: true };
    expect(getFallbackFormat(date, opts)).toBe('2018');
  });

  it('formats MY', () => {
    const opts = { timeZone: 'UTC', year: true, month: true };
    expect(getFallbackFormat(date, opts)).toBe('12/2018');
  });

  it('formats DMY', () => {
    const opts = { timeZone: 'UTC', year: true, month: true, day: true };
    expect(getFallbackFormat(date, opts)).toBe('1/12/2018');
  });

  it('formats DM', () => {
    const opts = { timeZone: 'UTC', month: true, day: true };
    expect(getFallbackFormat(date, opts)).toBe('1/12');
  });

  it('formats D', () => {
    const opts = { timeZone: 'UTC', day: true };
    expect(getFallbackFormat(date, opts)).toBe('1');
  });

  it('formats MM', () => {
    const opts = { timeZone: 'UTC', month: 'short' };
    expect(getFallbackFormat(date, opts)).toBe('Dec');
  });

  it('formats MM D', () => {
    const opts = { timeZone: 'UTC', day: true, month: 'short' };
    expect(getFallbackFormat(date, opts)).toBe('Dec 1');
  });

  it('formats MM D YYYY', () => {
    const opts = { timeZone: 'UTC', day: true, month: 'short', year: true };
    expect(getFallbackFormat(date, opts)).toBe('Dec 1 2018');
  });

  it('works for non-UTC dates', () => {
    date = new Date('2018-12-01');
    const expectedOutput = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    expect(getFallbackFormat(date)).toBe(expectedOutput);
  });
});
