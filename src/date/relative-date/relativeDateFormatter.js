import isToday from '../isToday';
import { formatDate } from '../date';
import { getTranslation } from '../../translations/translator';
import { DEFAULT_LOCALE } from '../../defaults';

export function formatRelativeDate(date, locale = DEFAULT_LOCALE) {
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

function shouldFormatRelative(date) {
  return isToday(date) && isWithinHours(date, 12);
}

function isWithinHours(date, boundary) {
  const now = new Date(Date.now());
  const diff = date - now;
  return getDifferenceIn(diff, timeUnit.HOUR) <= boundary;
}

function formatRelative(date, locale) {
  const now = new Date(Date.now());
  const diff = date - now;

  if (getDifferenceIn(diff, timeUnit.SECOND) < 60) {
    return formatSeconds(locale);
  }

  const differenceInMinutes = getDifferenceIn(diff, timeUnit.MINUTE);
  if (differenceInMinutes < 60) {
    return formatTimeUnit(differenceInMinutes, locale, timeUnit.MINUTE);
  }

  return formatTimeUnit(getDifferenceIn(diff, timeUnit.HOUR), locale, timeUnit.HOUR);
}

function formatAbsolute(date, locale) {
  const params = {
    formattedDate: formatDate(date, locale, { month: 'short', day: 'numeric' }),
  };
  return getTranslation('relative-format-by', params, locale);
}

function getDifferenceIn(diff, timeUnitValue) {
  const millisecondsMap = {
    [timeUnit.HOUR]: 3600000,
    [timeUnit.MINUTE]: 60000,
    [timeUnit.SECOND]: 1000,
  };
  return Math.ceil(diff / millisecondsMap[timeUnitValue]);
}

function formatTimeUnit(value, locale, timeUnit) {
  if (value === 1) {
    return getTranslation(`relative-format-in-${timeUnit}`, {}, locale);
  }
  return getTranslation(`relative-format-in-${timeUnit}s`, { [`${timeUnit}s`]: value }, locale);
}

function formatSeconds(locale) {
  return getTranslation('relative-format-in-seconds', {}, locale);
}

const timeUnit = {
  SECOND: 'second',
  MINUTE: 'minute',
  HOUR: 'hour',
};
