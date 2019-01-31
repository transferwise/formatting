import { DEFAULT_LOCALE } from '../../defaults';

let intlSupported; // cache

export function isIntlSupported() {
  if (intlSupported === undefined) {
    intlSupported = intlDateTimeFormatReturnsCorrectValue();
  }
  return intlSupported;
}

function intlDateTimeFormatReturnsCorrectValue() {
  try {
    const date = new Date(2018, 11, 1);
    const dateString = new Intl.DateTimeFormat(DEFAULT_LOCALE).format(date);
    return dateString === '01/12/2018';
  } catch (e) {
    return false;
  }
}
