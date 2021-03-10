export const INIT_DATA = 'INIT_DATA';
export const INIT_BASE_CURRENCY = 'INIT_BASE_CURRENCY';
export const REQUEST_FOR_CURRENCY_RATES = 'REQUEST_FOR_CURRENCY_RATES';
export const UPDATE_INPUTED_DATA = 'UPDATE_INPUTED_DATA';
export const ADD_SELECT_VALUE = 'ADD_SELECT_VALUE';
export const UPDATE_CURRENCY_SELECTOR = 'UPDATE_CURRENCY_SELECTOR';
export const DELETE_CURRENCY_FIELD = 'DELETE_CURRENCY_FIELD';
export const UPDATE_SWAPPED_CURRENCIES = 'UPDATE_SWAPPED_CURRENCIES';

export const initData = (data) => ({
  type: INIT_DATA,
  payload: data,
});
export const initBaseCurrency = (baseCurrency) => ({
  type: INIT_BASE_CURRENCY,
  payload: baseCurrency,
});

export const currencyRateRequest = (baseCode) => ({
  type: REQUEST_FOR_CURRENCY_RATES,
  payload: baseCode,
});

export const updateInputedValue = (inputData) => ({
  type: UPDATE_INPUTED_DATA,
  payload: inputData,
});

export const addNewValueFromSelect = (selectValue) => ({
  type: ADD_SELECT_VALUE,
  payload: selectValue,
});
export const updateCurrencySelector = (newValue) => ({
  type: UPDATE_CURRENCY_SELECTOR,
  payload: newValue,
});
export const deleteCurrencyField = (newInput) => ({
  type: DELETE_CURRENCY_FIELD,
  payload: newInput,
});
export const updateSwappedCurrency = (swappedValues) => ({
  type: UPDATE_SWAPPED_CURRENCIES,
  payload: swappedValues,
});
