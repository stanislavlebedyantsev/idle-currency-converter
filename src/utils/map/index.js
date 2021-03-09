export const filterBeforeSave = (allCountry, typedValue) => {
  if (typedValue.length === 0) {
    return [];
  }
  return allCountry.reduce((acc, el) => {
    if (el.toUpperCase().startsWith(typedValue.toUpperCase())) {
      acc.push(el);
    }
    return acc;
  }, []);
};

export const filterCountryList = (countryList) => {
  return countryList.reduce((acc, el) => {
    acc.push(el.name);
    return acc;
  }, []);
};

export const isCurrencyExist = (allRates, localCurrs) => {
  let result = [];
  try {
    localCurrs.map((el) => {
      if (allRates[el.code])
        result.push({ currency: el.code, value: allRates[el.code] });
      return el;
    });
  } catch (e) {
    result = false;
  }
  return result;
};
