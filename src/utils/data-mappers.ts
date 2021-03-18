import { calculateCurrencyFromBase, choiceConverterType } from 'src/utils/';
import { IRates } from 'src/types/apiResponces';
import { IInputedValues } from 'src/types/reducersTypes/';

export const updateAfterChange = (
  id: number,
  newCurrency: string,
  base: string,
  rates: IRates,
  moneyValues: IInputedValues[]
): IInputedValues[] => {
  return moneyValues.reduce(
    (acc: IInputedValues[], el: IInputedValues, index: number) => {
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
  moneyValues: IInputedValues[]
): IInputedValues[] | undefined => {
  if (valueForUpdate) {
    const { currency, value } = valueForUpdate;
    return moneyValues.reduce((acc: IInputedValues[], el: IInputedValues) => {
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
    }, []);
  }
};

export const updateCurrencyBeforeSelect = (
  base: string,
  rates: IRates,
  newCurrency: string,
  moneyValues: IInputedValues[]
): IInputedValues[] => {
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
  inputValues: IInputedValues[]
): IInputedValues[] => {
  return inputValues.filter((el, i) => i !== id);
};
