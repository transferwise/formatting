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

`formatRate` is to format the exchange rates with six significant figure accuracy. It also accepts the  `sourceCurrency` and `targetCurrency` parameters.

If the `sourceCurrency` is in the list of [RateInversionEnabledCurrencies](src/rate/rateInversionEnabledCurrencies.json) and also the exchange rate is below the threshold(0.30), then it will format the exchange rate in the inverted format.(For example: 1 USD = 112.359 JPY)

```javascript
import { formatRate } from '@transferwise/formatting';

console.log(formatRate(0.7658, 'USD', 'GBP'));
// '0.765800'

console.log(formatRate(0.0089, 'JPY', 'USD'));
// --> '1 USD = 112.359 JPY'

console.log(formatRate(0.1954, 'BRL', 'GBP'));
// --> '1 GBP = 5.11771 BRL'

/* To override the number of significant digits used in formatting */
console.log(formatRate(0.7658, 'USD', 'GBP', { numberOfSignificantDigits: 5 }));
// '0.76580'

console.log(formatRate(0.1954, 'BRL', 'GBP', { numberOfSignificantDigits: 5 }));
// --> '1 GBP = 5.1177 BRL'

console.log(formatRate(0.1954, 'BRL', 'GBP', { skipInversion: true }));
// --> '0.195400'

/* Deprecated: Clients are discouraged to pass only the `exchange rate`.
Pass the `sourceCurrency` and `targetCurrency` parameters wherever possible. */
console.log(formatRate(1.23456789));
// --> '1.23457'
console.log(formatRate(1.23));
// --> '1.23000'

console.log(formatRate(0.002));
// --> '0.00200000'
```

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
