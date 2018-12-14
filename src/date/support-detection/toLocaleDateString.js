let dateLocaleSupported; // cache

// Combines official docs way of support check and actual return value check, because
// official way reports true for support in Node.js, but sometimes the value is incorrect
export function isToLocaleDateStringSupported() {
  if (dateLocaleSupported === undefined) {
    dateLocaleSupported =
      toLocaleDateStringSupportsLocales() && toLocaleDateStringReturnsCorrectValue();
  }
  return dateLocaleSupported;
}

// From official docs (https://mzl.la/2EboTo2)
function toLocaleDateStringSupportsLocales() {
  try {
    new Date().toLocaleDateString('i');
  } catch (e) {
    return e instanceof RangeError;
  }
  return false;
}

function toLocaleDateStringReturnsCorrectValue() {
  const date = new Date(2018, 11, 1);
  const dateString = date.toLocaleDateString('en-GB');
  return dateString === '01/12/2018';
}
