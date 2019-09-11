# @transferwise/formatting

## Usage

### Number formatting

`formatNumber` is for only formatting numeric values and only alphanumeric strings. If you would like to format a currency related amount, use `formatAmount` - which uses `formatNumber` under the hood.

```javascript
import { formatNumber } from '@transferwise/formatting';

const number = 123456;

console.log(formatNumber(number, 'en-GB' /* Optional, defaults to en-GB */));
// --> '123,456'
console.log(formatNumber(number, 'es-ES', 0 /* Optional precision, defaults to 0 */));
// --> '123.456'
console.log(formatNumber(number, 'hu-HU', 0, 'FractionDigits' /* Optional precision type (FractionDigits or SignificantDigits), defaults to 'FractionDigits' */ ));
// --> '123 456'
```

`formatNumberToSignificantDigits` performs the same localization as `formatNumber`, but provides precision to significant digits instead of decimal precision. Used under the hood for localizing rates in `getRateInAllFormats`.

```javascript
import { formatNumberToSignificantDigits } from '@transferwise/formatting';

const number = 123456;

console.log(formatNumberToSignificantDigits(number, 'en-GB' /* Optional, defaults to en-GB */));
// --> '123,456'
console.log(formatNumberToSignificantDigits(number, 'es-ES', 8 /* Optional precision, defaults to 6 */));
// --> '123.456,00'
console.log(formatNumberToSignificantDigits(number, 'hu-HU', 8));
// --> '123 456,00'
```

### Amount formatting

```javascript
import { formatAmount } from '@transferwise/formatting';

console.log(formatAmount(1234.56, 'EUR', 'en-GB' /* Optional, defaults to en-GB */));
// --> '1,234.56'
```

### Money formatting

```javascript
import { formatMoney } from '@transferwise/formatting';

console.log(formatMoney(1234.56, 'EUR', 'en-GB' /* Optional, defaults to en-GB */));
// --> '1,234.56 EUR'
```

### Rate formatting

#### formatRate(rate, [options])
```js
formatRate(0.08682346801) === "0.0868235"
formatRate(0.08682346801, {significantFigures: 8}) === "0.086823468"
```

Limits a rate to a certain amount of precision for display (6 significant figures by default). It will always return a numberstring (string that's parseable as a number).

This is a dumb, low-level formatter for just the rate number value, and it's kept around mostly for older implementations. For typical rate display purposes, you may instead wish to make use of `getRateInAllFormats`, because it can suggest showing the rate inverted and/or multiplied if it makes sense for that currency pair.

At the moment the only configurable option is `significantFigures`, you can set it if you don't like the default of 6 significant figures.

#### getRateInAllFormats(rate, sourceCurrency, targetCurrency, [options], locale)

```js
const rateFormats = getRateInAllFormats(0.00230, 'BRL', 'USD');

// For countries with small-value currencies like BRL/JPY/INR, residents typically prefer the rate quoted with the target currency as the reference if it's stronger. E.g. Brazilians want to know how much BRL is 1 USD, rather than how much USD is 1 BRL.

// A format that's appropriate for the currency pair will be suggested.
rateFormats.formats[suggested.format].output // "1 USD = 434.783 BRL"
// or simply...
rateFormats.suggested.output // "1 USD = 434.783 BRL"

// If you always want the equation format...
rateFormats.formats.equation.output // "1 USD = 434.783 BRL"
// If you always want the source-to-target number format (identical to formatNumberToSignificantDigits(rate, locale, significantFigures))...
rateFormats.formats.decimal.output  // "0.00230000"
```

Here's an example of the entire object that's returned from calling `getRateInAllFormats`:

```js
{
  "suggested": {
    "format": "equation", // either `equation` or `decimal`
    "output": "1 USD = 434.783 BRL",
  },

  "formats": {
    "decimal": {
      "output": "0.00230000", // Equivalent to the output of formatNumberToSignificantDigits(rate, locale, significantFigures)
      "significantFigures": 6,
    },
    "equation": {
      "output": "1 USD = 434.783 BRL",
      "reference": "target", // a.k.a. which currency is the left-hand side.
      "referenceMultiplier": 1 // a.k.a. left-hand anchor value.
      "calculationInDecimal": "434.783", // a.k.a. right-hand value.
    }
  }
}
```

An optional `options` object can be passed as the last argument to `getRateInAllFormats`. Available options are:

Option | Default | Allowed | Description
-- | -- | -- | --
`reference` | 'auto' | one of 'auto', 'source', or 'target' | Control which currency appears on the left-hand side as the reference. If 'auto' (the default), it will rely on currency norms [configured here](./src/rate/config.js).
`referenceMultiplier` | Depends on currency, but usually 1 | Any number, but typically 1, 10, 100, 1000, etc. | Controls the amount of the left-hand reference currency. Currency norms for the default are [configured here](./src/rate/config.js).
`significantFigures` | 6 | Any positive integer | Controls the displayed precision of calculated values.

Thus, depending on your needs, it's possible to get your rate in any of these formats:

_(Assume a from-VND transfer)_

- `"1 VND = 0.0000332345 GBP"` (equation)
- `"100,000 VND = 3.32345 GBP"` (multiplied equation)
- `"1 GBP = 30,382.67 VND"` (target-reference a.k.a. inverted equation)
- `"100 HUF = 8,080.73 VND"` (inverted and multiplied equation)
- `"0.0000332345"` (decimal)
- `"30,382.67"` (inverted decimal)

All outputted strings are localized using the provided `locale` (defaults to `en-GB`).

_**When does `getRateInAllFormats` suggest a decimal format, and when does it suggest an equation format?**_

To avoid changing the behaviour of many existing currency pairs, `getRateInAllFormats` will suggest the decimal format (which is what we've historically shown) when:

1. the resulting `reference` is `'source'` (whether calculated by currency norms, or explicitly overriden by the user), and
2. the resulting `referenceMultiplier` is 1 (whether calculated by currency norms, or explicitly overriden by the user)

These 2 conditions will typically be true for "strong" source currencies like GBP, EUR, USD, AUD, SGD, etc. If at least 1 of these conditions are not true, then it will suggest the equation format.

### Percentage formatting

```javascript
import { formatPercentage } from '@transferwise/formatting';

console.log(formatPercentage(0.23456789));
// --> '23.46%'
console.log(formatPercentage(0.2340));
// --> '23.4%'
console.log(formatPercentage(0.2300));
// --> '23%'
```

### Date formatting

```javascript
import { formatDate } from '@transferwise/formatting';

const date = new Date(2018, 11, 1);

console.log(formatDate(date, 'en-GB' /* Optional, defaults to en-GB */));
// --> '01/12/2018'
console.log(formatDate(date, 'en-GB', { weekday: 'short' }));
// --> 'Sat'
console.log(formatDate(date, 'en-GB', { month: 'long', year: 'numeric' }));
// --> 'December 2018'
```
For third parameter pass in the same [options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat#Parameters) as for `Intl.DateTimeFormat` and for best performance use the same object (pass in reference), for example:
```javascript
const options = { weekday: 'short' };
formatDate(new Date(), 'en-GB', options);
formatDate(new Date(), 'en-GB', options);
```

### Relative Date formatting
Formats future dates using a relative description of time, e.g. 'in seconds'.
A relative description will be used as long as the instant of time being formatted is on the same calendar date as today in the clients timezone and the time is within 12 hours (inclusive). 

```javascript
import { formatRelativeDate } from '@transferwise/formatting';

console.log(formatRelativeDate(new Date(Date.now() + 1000))); // --> 'in seconds'
```

| Same Calendar Date | Time Range (inclusive)               | Sample Output                   |
|--------------------| -------------------------------------|---------------------------------|
| Yes                | In the past                          | ''                              |
| Yes                | 00:00:00.000 -> 00:00:59.000         | 'in seconds'                    |
| Yes                | 00:00:59.001 -> 00:01:00.000         | 'in 1 minute'                   |
| Yes                | 00:01:00.001 -> 00:02:00.000         | 'in 2 minutes'                  |
| Yes                | 00:02:00.001 -> 00:58:00.000         | 'in x minutes' (3-58)           |
| Yes                | 00:58:00.001 -> 00:59:00.000         | 'in 59 minutes'                 |
| Yes                | 00:59:00.001 -> 01:00:00.000         | 'in 1 hour'                     |
| Yes                | 01:00:00.001 -> 02:00:00.000         | 'in 2 hours'                    |
| Yes                | 02:00:00.001 -> 10:00:00.000         | 'in x hours' (3-10)             |
| Yes                | 10:00:00.001 -> 11:00:00.000         | 'in 11 hours'                   |
| Yes                | 11:00:00.001 -> 12:00:00.000         | 'in 12 hours'                   |
| Yes                | 12:00:00.001 -> End of calendar date | 'by Aug 23'                     |
| No                 | Any                                  | 'by Aug 23'                     |

## Developing

As usual, `npm install` to install dependencies.
Then, use `npm run test:watch` to work with livereloading tests.
