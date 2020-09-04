import isToday from '../isToday';
import { formatDate } from '../date';
import { getTranslation } from '../../translations/translator';
import { DEFAULT_LOCALE } from '../../defaults';

export function formatRelativeDate(date: Date, locale = DEFAULT_LOCALE): string {
  if (date < new Date(Date.now())) {
    return '';
  }

  let formatted;
  if (shouldFormatRelative(date)) {
    formatted = formatRelative(date, locale);
  } else {
    formatted = formatAbsolute(date, locale);
  }
  return formatted;
}

function shouldFormatRelative(date: Date): boolean {
  return isToday(date) && isWithinHours(date, 12);
}

function isWithinHours(date: Date, boundary: number): boolean {
  const now = new Date(Date.now());
  //@ts-expect-error date maths
  const diff = date - now;
  return getDifferenceIn(diff, TimeUnit.HOUR) <= boundary;
}

function formatRelative(date: Date, locale: string): string {
  const now = new Date(Date.now());
  //@ts-expect-error date maths
  const diff = date - now;

  if (getDifferenceIn(diff, TimeUnit.SECOND) < 60) {
    return formatSeconds(locale);
  }

  const differenceInMinutes = getDifferenceIn(diff, TimeUnit.MINUTE);
  if (differenceInMinutes < 60) {
    return formatTimeUnit(differenceInMinutes, locale, TimeUnit.MINUTE);
  }

  return formatTimeUnit(getDifferenceIn(diff, TimeUnit.HOUR), locale, TimeUnit.HOUR);
}

function formatAbsolute(date: Date, locale: string): string {
  const params = {
    formattedDate: formatDate(date, locale, { month: 'short', day: 'numeric' }),
  };
  return getTranslation('relative-format-by', params, locale);
}

function getDifferenceIn(diff: number, timeUnitValue: TimeUnit): number {
  const millisecondsMap = {
    [TimeUnit.HOUR]: 3600000,
    [TimeUnit.MINUTE]: 60000,
    [TimeUnit.SECOND]: 1000,
  };
  return Math.ceil(diff / millisecondsMap[timeUnitValue]);
}

function formatTimeUnit(value: number, locale: string, timeUnit: string): string {
  if (value === 1) {
    return getTranslation(`relative-format-in-${timeUnit}`, {}, locale);
  }
  return getTranslation(
    `relative-format-in-${timeUnit}s`,
    { [`${timeUnit}s`]: `${value}` },
    locale,
  );
}

function formatSeconds(locale: string) {
  return getTranslation('relative-format-in-seconds', {}, locale);
}

enum TimeUnit {
  SECOND = 'second',
  MINUTE = 'minute',
  HOUR = 'hour',
}
