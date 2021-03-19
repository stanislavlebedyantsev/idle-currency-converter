import { calculateCurrencyFromBase, choiceConverterType } from '@/utils/';
import { IRates } from '@/types/apiResponces';
import { IInputedValues } from '@/types/reducersTypes/';

export const updateAfterChange = (
  id: number,
  newCurrency: string,
  base: string,
  rates: IRates,
  moneyValues: Array<IInputedValues>
): Array<IInputedValues> => {
  return moneyValues.reduce(
    (acc: Array<IInputedValues>, el: IInputedValues, index: number) => {
      if (id === index) {
        el.value = choiceConverterType(
          el.currency,
          el.value,
          base,
          newCurrency,
          rates
        );
        el.currency = newCurrency;
      }
      acc.push(el);
      return acc;
    },
    []
  );
};

export const convertBeforInput = (
  valueForUpdate: IInputedValues,
  base: string,
  rates: IRates,
  moneyValues: Array<IInputedValues>
): Array<IInputedValues> => {
  if (valueForUpdate) {
    const { currency, value } = valueForUpdate;
    return moneyValues.reduce(
      (acc: Array<IInputedValues>, el: IInputedValues) => {
        if (el.currency === currency) {
          el = valueForUpdate;
        } else if (el.currency !== currency && currency !== base) {
          el.value = calculateCurrencyFromBase(
            value / rates[currency],
            rates[el.currency] || 1
          );
        } else if (el.currency !== currency && currency === base) {
          el.value = calculateCurrencyFromBase(value, rates[el.currency]);
        }
        acc.push(el);
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
  moneyValues: Array<IInputedValues>
): Array<IInputedValues> => {
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
  inputValues: Array<IInputedValues>
): Array<IInputedValues> => {
  return inputValues.filter((el, i) => i !== id);
};
