export const CURRENCY_RATES_RESPONCE = 'CURRENCY_RATES_RESPONCE';
export const INIT_BASE_CURRENCY = 'INIT_BASE_CURRENCY';
export const CURRENCY_RATES_REQUEST = 'CURRENCY_RATES_REQUEST';
export const UPDATE_INPUTED_DATA = 'UPDATE_INPUTED_DATA';
export const ADD_SELECT_VALUE = 'ADD_SELECT_VALUE';
export const UPDATE_CURRENCY_SELECTOR = 'UPDATE_CURRENCY_SELECTOR';
export const DELETE_CURRENCY_FIELD = 'DELETE_CURRENCY_FIELD';
export const SWAP_CURRENCY_VIEWS = 'SWAP_CURRENCY_VIEWS ';

export const currencyRateResponce = (data) => ({
  type: CURRENCY_RATES_RESPONCE,
  payload: data,
});
export const initBaseCurrency = (baseCurrency) => ({
  type: INIT_BASE_CURRENCY,
  payload: baseCurrency,
});

export const currencyRateRequest = (baseCode) => ({
  type: CURRENCY_RATES_REQUEST,
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
export const swapCurrencyViews = (swappedValues) => ({
  type: SWAP_CURRENCY_VIEWS ,
  payload: swappedValues,
});
