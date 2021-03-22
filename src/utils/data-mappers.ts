import { calculateCurrencyFromBase, choiceConverterType } from '@/utils';
import { IRates } from '@/types/apiResponces';
import { IInputedCurrenciesValues } from '@/types/reducersTypes';

export const updateAfterChange = (
  id: number,
  newCurrency: string,
  base: string,
  rates: IRates,
  moneyValues: Array<IInputedCurrenciesValues>
): Array<IInputedCurrenciesValues> => {
  return moneyValues.reduce(
    (
      acc: Array<IInputedCurrenciesValues>,
      element: IInputedCurrenciesValues,
      index: number
    ) => {
      if (id === index) {
        element.value = choiceConverterType(
          element.currency,
          element.value,
          base,
          newCurrency,
          rates
        );
        element.currency = newCurrency;
      }
      acc.push(element);
      return acc;
    },
    []
  );
};

export const convertBeforInput = (
  valueForUpdate: IInputedCurrenciesValues,
  base: string,
  rates: IRates,
  moneyValues: Array<IInputedCurrenciesValues>
): Array<IInputedCurrenciesValues> => {
  if (valueForUpdate) {
    const { currency, value } = valueForUpdate;
    return moneyValues.reduce(
      (
        acc: Array<IInputedCurrenciesValues>,
        element: IInputedCurrenciesValues
      ) => {
        if (element.currency === currency) {
          element = valueForUpdate;
        } else if (element.currency !== currency && currency !== base) {
          element.value = calculateCurrencyFromBase(
            value / rates[currency],
            rates[element.currency] || 1
          );
        } else if (element.currency !== currency && currency === base) {
          element.value = calculateCurrencyFromBase(value, rates[element.currency]);
        }
        acc.push(element);
        return acc;
      },
      []
    );
  }
  return moneyValues;
};

export const updateCurrencyBeforeSelect = (
  base: string,
  rates: IRates,
  newCurrency: string,
  moneyValues: Array<IInputedCurrenciesValues>
): Array<IInputedCurrenciesValues> => {
  const copyValues = [...moneyValues];
  const newValue = choiceConverterType(
    copyValues[0]?.currency || newCurrency,
    copyValues[0]?.value || 1,
    base,
    newCurrency,
    rates
  );
  copyValues.push({
    currency: newCurrency,
    value: newValue,
  });
  return copyValues;
};

export const deleteCurrencyFromField = (
  id: number,
  inputValues: Array<IInputedCurrenciesValues>
): Array<IInputedCurrenciesValues> => {
  return inputValues.filter((el, i) => i !== id);
};
