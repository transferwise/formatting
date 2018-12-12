import { isToLocaleDateStringSupported } from '.';

describe('LocaleDateString support detection', () => {
  let originaltoLocaleDateString;

  beforeEach(() => {
    originaltoLocaleDateString = Date.prototype.toLocaleDateString;
    Date.prototype.toLocaleDateString = jest.fn().mockReturnValue(false);
  });

  afterEach(() => {
    Date.prototype.toLocaleDateString = originaltoLocaleDateString;
  });

  it('tries to use incorrect locale on toLocaleDateString', () => {
    expect(isToLocaleDateStringSupported()).toBe(false);
    expect(Date.prototype.toLocaleDateString).lastCalledWith('i');
  });

  it('caches the result', () => {
    isToLocaleDateStringSupported();
    isToLocaleDateStringSupported();
    expect(Date.prototype.toLocaleDateString.mock.calls.length).toBe(0);
  });
});
