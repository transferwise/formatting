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
