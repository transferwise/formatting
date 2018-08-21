import { testWebpackSetup } from '.';

describe('Jest', () => {
  it('works', () => {
    expect(testWebpackSetup()).toBe(true);
  });
});
