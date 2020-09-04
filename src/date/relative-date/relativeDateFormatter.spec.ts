import { formatRelativeDate } from './relativeDateFormatter';
import { isIntlSupported } from '../support-detection/intl';

const NOW = '2019-01-01T00:00:00.000Z';

jest.mock(
  '../../translations/translations.json',
  () => ({
    en: {
      'relative-format-in-seconds': 'in seconds',
      'relative-format-in-minutes': 'in {minutes} minutes',
      'relative-format-in-hours': 'in {hours} hours',
      'relative-format-in-minute': 'in 1 minute',
      'relative-format-in-hour': 'in 1 hour',
      'relative-format-by': 'by {formattedDate}',
    },
  }),
  { virtual: true },
);
jest.mock('../support-detection/intl');

describe('relative date formatting', () => {
  beforeEach(() => {
    jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(NOW).valueOf());
  });

  it('Returns blank for past dates', () => {
    expect(formatRelativeDate(new Date('2018-12-31T23:59:59.999Z'), 'en')).toEqual('');
  });

  describe('Formats relative for same day, <= 12 hours', () => {
    [
      { lowerBound: '00:00:00.000', upperBound: '00:00:59.000', expected: 'in seconds' },
      { lowerBound: '00:00:59.001', upperBound: '00:01:00.000', expected: 'in 1 minute' },
      { lowerBound: '00:01:00.001', upperBound: '00:02:00.000', expected: 'in 2 minutes' },
      { lowerBound: '00:02:00.001', upperBound: '00:03:00.000', expected: 'in 3 minutes' },
      // ...
      { lowerBound: '00:58:00.001', upperBound: '00:59:00.000', expected: 'in 59 minutes' },
      { lowerBound: '00:59:00.001', upperBound: '01:00:00.000', expected: 'in 1 hour' },
      { lowerBound: '01:00:00.001', upperBound: '02:00:00.000', expected: 'in 2 hours' },
      { lowerBound: '02:00:00.001', upperBound: '03:00:00.000', expected: 'in 3 hours' },
      // ...
      { lowerBound: '10:00:00.001', upperBound: '11:00:00.000', expected: 'in 11 hours' },
      { lowerBound: '11:00:00.001', upperBound: '12:00:00.000', expected: 'in 12 hours' },
    ].forEach(params => {
      it(`'${params.expected}': lower bound of ${params.lowerBound}`, () => {
        expect(formatRelativeDate(nowPlusDuration(params.lowerBound), 'en')).toEqual(
          params.expected,
        );
      });

      it(`'${params.expected}': ${params.lowerBound} is the true lower bound`, () => {
        // i.e. shifting backward 1ms has a different output
        expect(formatRelativeDate(nowPlusDuration(params.lowerBound, -1), 'en')).not.toEqual(
          params.expected,
        );
      });

      it(`'${params.expected}': upper bound of ${params.lowerBound}`, () => {
        expect(formatRelativeDate(nowPlusDuration(params.upperBound), 'en')).toEqual(
          params.expected,
        );
      });

      it(`'${params.expected}': ${params.upperBound} is the true upper bound`, () => {
        // i.e. shifting forward 1ms has a different output
        expect(formatRelativeDate(nowPlusDuration(params.upperBound, 1), 'en')).not.toEqual(
          params.expected,
        );
      });
    });
  });

  // Intentionally testing the implementation of date, to catch any changes to the date formatting module
  describe('formats absolute when not todays date, or >12 hours away', () => {
    describe('should format absolutely when today but > 12 hours away', () => {
      it('with Intl support', () => {
        // setup:
        // @ts-expect-error
        isIntlSupported.mockReturnValue(true);

        // expect:
        expect(formatRelativeDate(nowPlusDuration('12:00:00.001'), 'et')).toEqual('by Jan 1');
      });

      it('without Intl support', () => {
        // setup:
        // @ts-expect-error
        isIntlSupported.mockReturnValue(false);

        // expect:
        expect(formatRelativeDate(nowPlusDuration('12:00:00.001'), 'et')).toEqual('by Jan 1');
      });
    });

    it('should format absolutely when not todays date', () => {
      // setup:
      // @ts-expect-error
      isIntlSupported.mockReturnValue(true);

      // expect:
      expect(formatRelativeDate(new Date('2019-01-02T00:00:00.000Z'), 'et')).toEqual('by Jan 2');
    });
  });
});

function nowPlusDuration(time: string, offsetMs = 0) {
  const durationInMs = new Date(`1970-01-01T${time}Z`).valueOf();
  return new Date(new Date(NOW).valueOf() + durationInMs + offsetMs);
}
