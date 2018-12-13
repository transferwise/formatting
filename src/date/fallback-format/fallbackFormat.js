const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Sample outputs: 'Sat, 1/12/2018', '1/12/2018', '12/2018', Sat, 1'
export function getFallbackFormat(date, options = {}) {
  const isUTC = options.timeZone === 'UTC';
  let fallbackDate = '';
  const dateParts = [];
  if (options.day) dateParts.push(isUTC ? date.getUTCDate() : date.getDate());
  if (options.month) dateParts.push((isUTC ? date.getUTCMonth() : date.getMonth()) + 1);
  if (options.year) dateParts.push(isUTC ? date.getUTCFullYear() : date.getUTCFullYear());
  fallbackDate = dateParts.join('/');
  if (options.weekday) {
    const dayName = WEEKDAYS[isUTC ? date.getUTCDay() : date.getDay()];
    fallbackDate = fallbackDate ? `${dayName}, ${fallbackDate}` : dayName;
  }
  return (
    fallbackDate ||
    getFallbackFormat(date, { timeZone: options.timeZone, day: true, month: true, year: true })
  );
}
