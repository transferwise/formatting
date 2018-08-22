# @transferwise/formatting

## Usage

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

```javascript
import { formatRate } from '@transferwise/formatting';

console.log(formatRate(1.23456789));
// --> '1.23457'
console.log(formatRate(1.23));
// --> '1.23000'
```

## Developing

As usual, `npm install` to install dependencies.
Then, use `npm run test:watch` to work with livereloading tests.
