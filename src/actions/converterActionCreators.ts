import { IRateReducer, IInputedValues } from '@/types/reducersTypes/';
import {
  CURRENCY_RATES_RESPONCE,
  INIT_BASE_CURRENCY,
  CURRENCY_RATES_REQUEST,
  UPDATE_INPUTED_DATA,
  ADD_SELECT_VALUE,
  UPDATE_CURRENCY_SELECTOR,
  DELETE_CURRENCY_FIELD,
  SWAP_CURRENCY_VIEWS,
  TConverterActionTypes,
} from '@/types/actionTypes/';

export const currencyRateResponce = (
  data: IRateReducer
): TConverterActionTypes => ({
  type: CURRENCY_RATES_RESPONCE,
  payload: { base: data.base, rates: data.rates },
});
export const initBaseCurrency = (): TConverterActionTypes => ({
  type: INIT_BASE_CURRENCY,
});

export const currencyRateRequest = (): TConverterActionTypes => ({
  type: CURRENCY_RATES_REQUEST,
});

export const updateInputedValue = (
  inputData: Array<IInputedValues>
): TConverterActionTypes => ({
  type: UPDATE_INPUTED_DATA,
  payload: inputData,
});

export const addNewValueFromSelect = (
  selectValue: Array<IInputedValues>
): TConverterActionTypes => ({
  type: ADD_SELECT_VALUE,
  payload: selectValue,
});
export const updateCurrencySelector = (
  newValue: Array<IInputedValues>
): TConverterActionTypes => ({
  type: UPDATE_CURRENCY_SELECTOR,
  payload: newValue,
});
export const deleteCurrencyField = (
  newInput: Array<IInputedValues>
): TConverterActionTypes => ({
  type: DELETE_CURRENCY_FIELD,
  payload: newInput,
});
export const swapCurrencyViews = (
  swappedValues: Array<IInputedValues>
): TConverterActionTypes => ({
  type: SWAP_CURRENCY_VIEWS,
  payload: swappedValues,
});
