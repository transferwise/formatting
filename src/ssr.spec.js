/**
 * @jest-environment node
 */
import * as formatting from '../dist/formatting';

describe('SSR', () => {
  it('does not crash', () => {
    expect(formatting).toBeDefined();
  });
});
