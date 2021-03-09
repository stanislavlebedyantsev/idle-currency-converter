export const calculateCurrencyFromBase = (baseValue, newCurrency) => {
  const value = Math.ceil(baseValue * newCurrency * 100) / 100;
  return value;
};
export const calculateBaseValueFromCurrency = (baseValue, newCurrency) => {
  const value = Math.ceil((baseValue / newCurrency) * 100) / 100;
  return value;
};
export const choiceConverterType = (currency, value, base, newCurrency, rates) => {
  if (currency !== base && newCurrency !== base) {
    return calculateCurrencyFromBase(
      value / rates[currency],
      rates[newCurrency]
    );
  } else if (currency === base && newCurrency !== base) {
    return calculateCurrencyFromBase(value, rates[newCurrency]);
  } else if (currency !== base && newCurrency === base) {
    return calculateBaseValueFromCurrency(
      value,
      rates[currency]
    );
  }
}