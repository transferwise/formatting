import { isIntlSupported } from '.';

describe('Intl support detection', () => {
  let originalDateTimeFormat;
  const format = jest.fn().mockReturnValue('01/12/2018');

  beforeEach(() => {
    originalDateTimeFormat = Intl.DateTimeFormat;
    Intl.DateTimeFormat = jest.fn().mockImplementation(() => ({ format }));
  });

  afterEach(() => {
    Intl.DateTimeFormat = originalDateTimeFormat;
  });

  it('calls Intl.DateTimeFormat.format', () => {
    expect(isIntlSupported()).toBe(true);
    expect(format).toHaveBeenCalledTimes(1);
  });

  it('caches the result', () => {
    isIntlSupported();
    isIntlSupported();
    expect(format).toHaveBeenCalledTimes(1);
  });
});
