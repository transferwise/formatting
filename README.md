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
console.log(formatNumber(number, 'hu-HU'));
// --> '123 456'
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

### 1. formatRate(rate)
```js
formatRate(0.08682346801) === "0.0868234"
```

The existing formatter. **Always guaranteed to return a string that's parseable as a number.** Old clients can continue to use it as it is. Technically they might see a "breaking change" in the form of switching from 5 decimal points to 6 significant figures, but we also want to include this optional change, because we believe that it'll practically improve things across the board, yet not make anything worse.

### 2. getRateInAllFormats(rate, sourceCurrency, targetCurrency, options)

```js
getRateInAllFormats(0.00230, 'BRL', 'USD', {}) === {
  // Default format suggested based on the currency configuration and/or options passed
  "default": {
    "format": "equation", // either `equation` or `decimal`
    "output": "1 USD = 434.783 BRL",
   },

   "formats": {
     "decimal": {
       "output": "0.00230000", // Equivalent to the output of formatRate(rate)
       "significantFigures": 6,
     },
     "equation": {
       "output": "1 USD = 434.783 BRL",
       "isInverted": true,
       "rateInDecimal": "434.783", // formatted rate in the equation.
       "rateMultiplier": 1,
     },
   }
}
```
The options are below:
```js
options = {
  reference: one of 'auto' (default), 'source', or 'target'
  referenceMultiplier: a number (1 by default, 10 100 1000 etc. are typical alternatives),
}
```
> You can think of **reference** being synonymous with the left-hand side of the equation pretty much.

This method chooses whether we should be using an equationstring or a numberstring.

##### Number Format
Practically, it will choose a numberstring only in 1 specific case when both these conditions are true:

1. The `reference` currency happens to be the **source** currency *(ie: `hasInversionEnabled` is not set for `sourceCurrency` in [config.js](./src/rate/config.js) or `reference` option passed is not `target`), and*
2. The `referenceMultiplier` happens to be **one.** *(ie: `multiplierForEquation` is not set for  `sourceCurrency` in [config.js](./src/rate/config.js) or `referenceMultiplier` option passed is equal than `1`)*

(It just happens that this specific case is also the majority case nowadays)

##### Equation Format
These outputs are all possible equation outputs from this method: (assuming sending from-VND)

- `1 VND = 0.0000332345 GBP`
- `100,000 VND = 3.32345 GBP` (multiplied)
- `1 GBP = 30,382.67 VND` (inverted)
- `100 HUF = 8,080.73 VND` (inverted and multiplied)

Furthermore, depending on what you pass (or didn't pass) in `options` and currency specific configuration from [config.js](./src/rate/config.js), it would mean you could either let the formatter decide whether to invert and/or multiply, or override a particular choice yourself if necessary.

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

## Developing

As usual, `npm install` to install dependencies.
Then, use `npm run test:watch` to work with livereloading tests.
