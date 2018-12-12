import { isSelectedLocaleSupported } from '.';

describe('Selected locale support detection', () => {
  let originaltoLocaleDateString;

  beforeEach(() => {
    originaltoLocaleDateString = Date.prototype.toLocaleDateString;
    Date.prototype.toLocaleDateString = jest.fn().mockReturnValue(true);
  });

  afterEach(() => {
    Date.prototype.toLocaleDateString = originaltoLocaleDateString;
  });

  it('tries to use given locale on toLocaleDateString', () => {
    expect(isSelectedLocaleSupported('et')).toBe(true);
    expect(Date.prototype.toLocaleDateString).lastCalledWith('et');
    expect(Date.prototype.toLocaleDateString.mock.calls.length).toBe(1);
  });

  it('caches the result', () => {
    isSelectedLocaleSupported('xx-XX');
    isSelectedLocaleSupported('xx-XX');
    expect(Date.prototype.toLocaleDateString.mock.calls.length).toBe(1);
  });
});
