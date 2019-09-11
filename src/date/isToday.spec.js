import isToday from './isToday';

describe('determines whether it is today or not', () => {
  beforeEach(() => {
    jest
      .spyOn(global.Date, 'now')
      .mockImplementation(() => Date.parse('2019-08-31T00:00:00.000Z').valueOf());
  });

  it('returns true if the same calendar date', () => {
    expect(isToday(new Date('2019-08-31T00:00:00.000Z'))).toEqual(true);
  });

  it('returns false if not the same calendar date', () => {
    expect(isToday(new Date('2019-08-30T00:00:00.000Z'))).toEqual(false);
  });
});
