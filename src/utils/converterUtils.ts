import { IRates } from '@/types/apiResponces';

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
  let result = 0,
	shortCurrencyName = currency.substring(0, 3),
	shortNewCurrencyName = newCurrency.substring(0, 3);
  if (shortCurrencyName !== base && shortNewCurrencyName !== base) {
    result = calculateCurrencyFromBase(
      value / rates[shortCurrencyName],
      rates[shortNewCurrencyName]
    );
  } else if (shortCurrencyName === base && shortNewCurrencyName !== base) {
    result = calculateCurrencyFromBase(value, rates[shortNewCurrencyName]);
  } else if (shortCurrencyName !== base && shortNewCurrencyName === base) {
    result = calculateBaseValueFromCurrency(value, rates[currency]);
  }
  return result;
};
