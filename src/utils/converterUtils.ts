import { IRates } from 'src/types/apiResponces';

interface ICalculateCurrency {
  (baseValue: number, newCurrency: number): number;
}

export const calculateCurrencyFromBase: ICalculateCurrency = (
  baseValue: number,
  newCurrency: number
) => {
  const value = Math.ceil(baseValue * newCurrency * 100) / 100;
  return value;
};
export const calculateBaseValueFromCurrency: ICalculateCurrency = (
  baseValue: number,
  newCurrency: number
) => {
  const value = Math.ceil((baseValue / newCurrency) * 100) / 100;
  return value;
};

export const choiceConverterType = (
  currency: string,
  value: number,
  base: string,
  newCurrency: string,
  rates: IRates
): number => {
  let result = 0;
  if (currency !== base && newCurrency !== base) {
    result = calculateCurrencyFromBase(
      value / rates[currency],
      rates[newCurrency]
    );
  } else if (currency === base && newCurrency !== base) {
    result = calculateCurrencyFromBase(value, rates[newCurrency]);
  } else if (currency !== base && newCurrency === base) {
    result = calculateBaseValueFromCurrency(value, rates[currency]);
  }
  return result;
};
