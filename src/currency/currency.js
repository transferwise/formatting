import { DEFAULT_LOCALE } from '../defaults';
import { formatNumber } from '../number';

const currencyDecimals = {
  BIF: 0,
  BYR: 0,
  CLP: 0,
  DJF: 0,
  GNF: 0,
  JPY: 0,
  KMF: 0,
  KRW: 0,
  MGA: 0,
  PYG: 0,
  RWF: 0,
  VND: 0,
  VUV: 0,
  XAF: 0,
  XOF: 0,
  XPF: 0,
  // technically HUF does have decimals, but due to the exchange rate banks
  // do not accept decimal amounts
  HUF: 0,

  BHD: 3,
  JOD: 3,
  KWD: 3,
  OMR: 3,
  TND: 3,
};

const DEFAULT_CURRENCY_DECIMALS = 2;

function getCurrencyDecimals(currency = '') {
  const upperCaseCurrency = currency.toUpperCase();
  if (Object.prototype.hasOwnProperty.call(currencyDecimals, upperCaseCurrency)) {
    return currencyDecimals[upperCaseCurrency];
  }
  return DEFAULT_CURRENCY_DECIMALS;
}

function amountHasNoDecimals(amount) {
  return amount % 1 === 0;
}

function getPrecision(amount, currencyCode, alwaysShowDecimals) {
  if (amountHasNoDecimals(amount) && !alwaysShowDecimals) {
    return 0;
  }

  return getCurrencyDecimals(currencyCode);
}

export function formatAmount(
  amount,
  currencyCode,
  locale = DEFAULT_LOCALE,
  options = { alwaysShowDecimals: false },
) {
  const availablePrecision = getPrecision(amount, currencyCode, options.alwaysShowDecimals);
  const isNegative = amount < 0;
  const absoluteAmount = Math.abs(amount);

  const formattedAbsoluteAmount = formatNumber(absoluteAmount, locale, availablePrecision);

  return isNegative ? `- ${formattedAbsoluteAmount}` : formattedAbsoluteAmount;
}

export function formatMoney(
  amount,
  currencyCode,
  locale = DEFAULT_LOCALE,
  options = { alwaysShowDecimals: false },
) {
  return `${formatAmount(amount, currencyCode, locale, options)} ${(
    currencyCode || ''
  ).toUpperCase()}`;
}
