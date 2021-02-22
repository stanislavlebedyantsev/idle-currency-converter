export const calculateCurrencyFromBase = (baseValue, newCurrency) => {
  const value = Math.ceil(baseValue * newCurrency * 100) / 100;
  return value;
};
export const calculateBaseValueFromCurrency = (baseValue, newCurrency) => {
  const value = Math.ceil((baseValue / newCurrency) * 100) / 100;
  return value;
};
