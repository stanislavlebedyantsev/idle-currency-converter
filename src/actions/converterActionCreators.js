import {
  GET_DATA,
  UPLOAD_DATA_TO_CACHE,
  REQUEST_FOR_CURRENCY,
  UPDATE_INPUTED_DATA,
  ADD_SELECT_VALUE
} from "@constants/actions";

export const getData = (data) => ({
  type: GET_DATA,
  payload: data,
});

export const uploadDataToCache = (data) => ({
  type: UPLOAD_DATA_TO_CACHE,
  payload: data,
});

export const currencyRateRequest = () => ({
  type: REQUEST_FOR_CURRENCY
});

export const updateInputedValue = (inputData) => ({
  type: UPDATE_INPUTED_DATA,
  payload: inputData
});
export const updateSelectValue = (selectValue) => ({
  type: ADD_SELECT_VALUE,
  payload: selectValue
});
