# v1.6.0
## Add ability to format rate for weaker currencies in inverted form.

# v1.5.0
## Add ability to format currencies with alwaysShowDecimals option

# v1.4.3
## Checking number formatting locales for validity

# v1.4.2
## Fix zero value formatting

# v1.4.1
## Fix typo in README.md and in CHANGELOG.md

# v1.4.0
## Formatting numbers

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

# v1.3.2
## Date formatting performance improvements

# v1.3.1
## Date default timezone not UTC

# v1.3.0
## Formatting dates

```javascript
import { formatDate } from '@transferwise/formatting';

const date = new Date(Date.UTC(2018, 11, 1));

console.log(formatDate(date, 'en-GB' /* Optional, defaults to en-GB */));
// --> '01/12/2018'
console.log(formatDate(date, 'en-GB', { weekday: 'short' }));
// --> 'Sat'
console.log(formatDate(date, 'en-GB', { month: 'long', year: 'numeric' }));
// --> 'December 2018'
```

# v1.2.1
## Fix floating numbers percentage

# v1.2.0
## Formatting percentages

```javascript
import { formatPercentage } from '@transferwise/formatting';

console.log(formatPercentage(0.23456789));
// --> '23.46%'
console.log(formatPercentage(0.2340));
// --> '23.4%'
console.log(formatPercentage(0.2300));
// --> '23%'
```

# v1.1.0
## Formatting rates

```javascript
import { formatRate } from '@transferwise/formatting';

console.log(formatRate(1.23456789));
// --> '1.23457'
console.log(formatRate(1.23));
// --> '1.23000'
```

# v1.0.2
## Formatting amounts with no decimals without decimals

Before:
```js
formatAmount(1234, 'gbp') // 1,234.00
```

After:
```js
formatAmount(1234, 'gbp') // 1,234
```

# v1.0.1
## Number formatting and SSR fixes

Negative numbers now have a space between the minus and the number. In addition, SSR is now supported.


# v1.0.0
## Number formatting

Initial release with number formatting.
