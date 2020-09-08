import { isSelectedLocaleSupported } from '.';

describe('Selected locale support detection', () => {
  let originalSupportedLocalesOf: any;
  let supportedLocalesOf: any;

  beforeEach(() => {
    originalSupportedLocalesOf = Intl.DateTimeFormat.supportedLocalesOf;
    supportedLocalesOf = jest.fn().mockReturnValue(['trololo']);
    Intl.DateTimeFormat.supportedLocalesOf = supportedLocalesOf;
  });

  afterEach(() => {
    Intl.DateTimeFormat.supportedLocalesOf = originalSupportedLocalesOf;
  });

  it('calls Intl.DateTimeFormat.supportedLocalesOf', () => {
    expect(isSelectedLocaleSupported('et')).toBe(true);
    expect(supportedLocalesOf).toHaveBeenCalledTimes(1);
    expect(supportedLocalesOf).lastCalledWith(['et']);
  });

  it('caches the result', () => {
    isSelectedLocaleSupported('xx-XX');
    isSelectedLocaleSupported('xx-XX');
    expect(supportedLocalesOf).toHaveBeenCalledTimes(1);
  });
});
