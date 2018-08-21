# @transferwise/formatting

## Usage

### Currency formatting

```javascript
import { formatCurrency } from '@transferwise/formatting';

console.log(formatCurrency(123.45, 'EUR', 'en-GB' /* Optional, defaults to en-GB */));
// --> '123.45'
```

### Money formatting

```javascript
import { formatMoney } from '@transferwise/formatting';

console.log(formatMoney(123.45, 'EUR', 'en-GB' /* Optional, defaults to en-GB */));
// --> '123.45 EUR'
```

## Developing

As usual, `npm install` to install dependencies.
Then, use `npm run test:watch` to work with livereloading tests.
