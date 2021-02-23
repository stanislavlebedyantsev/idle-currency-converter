export const INIT_DATA = "INIT_DATA";
export const INIT_BASE = "INIT_BASE";
export const REQUEST_FOR_CURRENCY = "REQUEST_FOR_CURRENCY";
export const REQUEST_FOR_GEOLOCATION = "REQUEST_FOR_GEOLOCATION";
export const UPDATE_INPUTED_DATA = "UPDATE_INPUTED_DATA";
export const ADD_SELECT_VALUE = "ADD_SELECT_VALUE";
export const UPDATE_CURRENCY_SELECTOR = "UPDATE_CURRENCY_SELECTOR";
export const DELETE_CURRENCY_FIELD = "DELETE_CURRENCY_FIELD";
export const SET_CURRENT_GEOLOCATION = "SET_CURRENT_GEOLOCATION"
export const UPDATE_SWAPPED_CURRENCYS = "UPDATE_SWAPPED_CURRENCYS"

export const initData = (data) => ({
  type: INIT_DATA,
  payload: data,
});
export const initBaseCurrency = (baseCurrency) => ({
  type: INIT_BASE,
  payload: baseCurrency,
});

export const currencyRateRequest = (baseCode) => ({
  type: REQUEST_FOR_CURRENCY,
  payload: baseCode
});
export const geolocationRequest = () => ({
  type: REQUEST_FOR_GEOLOCATION,
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
export const setCurrentGeolocation = (country) => ({
  type: SET_CURRENT_GEOLOCATION,
  payload: country,
});
export const updateSwappedCurrency = (swappedValues) => ({
  type: UPDATE_SWAPPED_CURRENCYS,
  payload: swappedValues,
});
