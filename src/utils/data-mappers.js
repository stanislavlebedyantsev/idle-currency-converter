import {
  calculateCurrencyFromBase,
  calculateBaseValueFromCurrency,
} from "@utils/currencyConvert";

export const updateAfterChange = (id, newValue, base, rates, moneyValues) => {
  const copyValues = moneyValues.reduce((acc, el, index) => {
    let temp = {};
    if (id === index) {
      if (el.currency !== base && newValue !== base) {
        temp.value = calculateCurrencyFromBase(
          el.value / rates[el.currency],
          rates[newValue]
        );
      } else if (el.currency === base && newValue !== base) {
        temp.value = calculateCurrencyFromBase(el.value, rates[newValue]);
      } else if (el.currency !== base && newValue === base) {
        temp.value = calculateBaseValueFromCurrency(
          el.value,
          rates[el.currency]
        );
      }
      temp.currency = newValue;
    }
    !Object.keys(temp).length ?  acc.push(el) : acc.push(temp);
    return acc;
  }, []);
  return copyValues;
};

export const convertBeforInput = (valueForUpdate, base, rates, moneyValues) => {
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
};

export const updateCurrencyBeforeSelect = (
  base,
  rates,
  newCurrency,
  moneyValues
) => {
  const copyValues = [...moneyValues];
  let newValue;
  if (newCurrency !== base && !!copyValues.length) {
    newValue = calculateCurrencyFromBase(
      copyValues[0].value,
      rates[newCurrency]
    );
  } else if (newCurrency === base && !!copyValues.length) {
    newValue = calculateBaseValueFromCurrency(
      copyValues[0].value,
      rates[copyValues[0].currency]
    );
  } else if (!copyValues.length) {
    newValue = 1;
  }
  copyValues.push({
    currency: newCurrency,
    value: newValue,
  });
  return copyValues;
};

export const deleteCurrencyFromField = (id, inputValues) => {
  const copyInput = [...inputValues];
  copyInput.splice(id, 1);
  return copyInput;
};
