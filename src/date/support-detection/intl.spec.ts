import { isIntlSupported } from '.';

describe('Intl support detection', () => {
  let originalDateTimeFormat: any;
  const format = jest.fn().mockReturnValue('01/12/2018');

  beforeEach(() => {
    originalDateTimeFormat = Intl.DateTimeFormat;
    // @ts-expect-error
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
