import formatRate from './formatRate';
import { formatAmount } from '../currency';
import config from './config';
import { DEFAULT_RATE_MULTIPLIER } from '../defaults';

export default function(
  rate,
  sourceCurrency,
  targetCurrency,
  { lhs = 'auto', lhsMultiplier = null } = {},
) {
  if (!sourceCurrency || !targetCurrency) {
    return undefined;
  }

  let equation = {
    lhsCurrency: sourceCurrency,
    lhsValue: 1,
    rhsCurrency: targetCurrency,
    rhsValue: rate,
  };

  equation = invertEquationIfNeeded(equation, lhs, config);
  const multiplier = getMultiplier(equation, lhsMultiplier, config);
  equation = multiplyEquation(equation, multiplier);
  return format(equation);
}

function format({ lhsValue, lhsCurrency, rhsValue, rhsCurrency }) {
  return `${formatAmount(lhsValue, lhsCurrency)} ${lhsCurrency} = ${formatRate(
    rhsValue,
  )} ${rhsCurrency}`;
}

function invertEquationIfNeeded(equation, lhs, config) {
  if (
    lhs === 'target' ||
    (lhs !== 'source' &&
      config[equation.lhsCurrency] &&
      config[equation.lhsCurrency].hasInversionEnabled)
  ) {
    const invertedEquation = { ...equation };
    invertedEquation.lhsCurrency = equation.rhsCurrency;
    invertedEquation.rhsCurrency = equation.lhsCurrency;
    invertedEquation.rhsValue = 1 / equation.rhsValue;
    return invertedEquation;
  }
  return equation;
}

function getMultiplier(equation, lhsMultiplier, config) {
  let multiplier = DEFAULT_RATE_MULTIPLIER;

  // apply multiplier from configuration
  if (config[equation.lhsCurrency] && config[equation.lhsCurrency].multiplierForEquation) {
    multiplier = config[equation.lhsCurrency].multiplierForEquation;
  }
  // Override the config multiplier with incoming lhs multiplier
  if (lhsMultiplier) {
    multiplier = lhsMultiplier;
  }
  return multiplier;
}

function multiplyEquation(equation, multiplier) {
  const multipliedEquation = { ...equation };
  multipliedEquation.lhsValue = multiplier * equation.lhsValue;
  multipliedEquation.rhsValue = multiplier * equation.rhsValue;
  return multipliedEquation;
}
