import {
  GET_DATA,
  REQUEST_FOR_CURRENCY,
  UPDATE_INPUTED_DATA,
  ADD_SELECT_VALUE,
  UPDATE_CURRENCY_SELECTOR,
} from "@constants/actions";

export const getData = (data) => ({
  type: GET_DATA,
  payload: data,
});

export const currencyRateRequest = () => ({
  type: REQUEST_FOR_CURRENCY,
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
