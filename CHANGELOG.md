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
