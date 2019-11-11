/**
 * @jest-environment node
 */

/* eslint-disable-next-line import/no-unresolved */
import * as formatting from '../dist/formatting';

describe('SSR', () => {
  it('does not crash', () => {
    expect(formatting).toBeDefined();
  });
});
