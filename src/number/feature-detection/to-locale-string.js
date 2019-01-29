function toLocaleStringSupportsLocales() {
  const number = 0;
  try {
    number.toLocaleString('i');
  } catch (e) {
    return e.name === 'RangeError';
  }
  return false;
}

function toLocaleStringSupportsOptions() {
  return !!(typeof Intl === 'object' && Intl && typeof Intl.NumberFormat === 'function');
}

export function isNumberToLocaleStringSupported() {
  return (
    typeof Number.toLocaleString === 'function' &&
    Number.toLocaleString &&
    toLocaleStringSupportsLocales() &&
    toLocaleStringSupportsOptions()
  );
}
