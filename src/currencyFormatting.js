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

let numberLocaleSupported;

function isNumberLocaleSupported() {
  if (numberLocaleSupported === undefined) {
    const number = 1234;
    const numberString = number.toLocaleString && number.toLocaleString('en-GB');
    numberLocaleSupported = numberString === '1,234';
  }
  return numberLocaleSupported;
}

function getCurrencyDecimals(currency = '') {
  const upperCaseCurrency = currency.toUpperCase();
  if (Object.prototype.hasOwnProperty.call(currencyDecimals, upperCaseCurrency)) {
    return currencyDecimals[upperCaseCurrency];
  }
  return DEFAULT_CURRENCY_DECIMALS;
}

export function formatAmount(amount, currencyCode, locale = 'en-GB') {
  const precision = getCurrencyDecimals(currencyCode);
  const isNegative = amount < 0;
  const absoluteAmount = Math.abs(amount);

  const formattedAbsoluteAmount = isNumberLocaleSupported()
    ? absoluteAmount.toLocaleString(locale, {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
      })
    : absoluteAmount.toFixed(precision);

  return isNegative ? `- ${formattedAbsoluteAmount}` : formattedAbsoluteAmount;
}

export function formatMoney(amount, currencyCode, locale = 'en-GB') {
  return `${formatAmount(amount, currencyCode, locale)} ${(currencyCode || '').toUpperCase()}`;
}
