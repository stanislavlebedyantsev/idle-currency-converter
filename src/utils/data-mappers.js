import {
  calculateCurrencyFromBase,
  calculateBaseValueFromCurrency,
  choiceConverterType,
} from '@/utils/';

export const updateAfterChange = (
  id,
  newCurrency,
  base,
  rates,
  moneyValues
) => {
  return moneyValues.reduce((acc, el, index) => {
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
  }, []);
};

export const convertBeforInput = (valueForUpdate, base, rates, moneyValues) => {
  if (valueForUpdate) {
    const { currency, value } = valueForUpdate;
    return moneyValues.reduce((acc, el) => {
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
  base,
  rates,
  newCurrency,
  moneyValues
) => {
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

export const deleteCurrencyFromField = (id, inputValues) => {
  return inputValues.filter((el, i) => i !== id);
};
