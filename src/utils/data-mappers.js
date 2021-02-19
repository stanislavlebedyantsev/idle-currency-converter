export const updateAfterChange = (id, newValue, base, rates, moneyValues) => {
  return moneyValues.reduce((acc, el, index) => {
    if (index === id) {
      if (el.currency !== base) {
        el.value = Math.ceil((el.value / rates[el.currency]) * 100) / 100;
      } else {
        el.value = Math.ceil(el.value * rates[newValue] * 100) / 100;
      }
      el.currency = newValue;
    }
    acc.push(el);
    return acc;
  }, []);
};

export const convertBeforInput = (valueForUpdate, base, rates, moneyValues) => {
  const { currency, value } = valueForUpdate;
  return moneyValues.reduce((acc, el) => {
    if (el.currency === currency) {
      el = valueForUpdate;
    } else if (el.currency !== currency && currency !== base) {
      el.value =
        Math.ceil((value / rates[currency]) * (rates[el.currency] || 1) * 100) /
        100;
    } else if (el.currency !== currency && currency === base) {
      el.value = Math.ceil(value * rates[el.currency] * 100) / 100;
    }
    acc.push(el);
    return acc;
  }, []);
};

export const updateCurrencyBeforeSelect = (base, rates, newValue, moneyValues) => {
  const copyValues = moneyValues
  copyValues.push({
    currency: newValue,
    value: copyValues.reduce((acc, el) => {
      if (el.currency === base) {
        acc = Math.ceil(el.value * rates[newValue] * 100) / 100;
      }
      return acc;
    }, 0),
  });
  return copyValues;
};
