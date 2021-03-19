import {
  IRateReducer,
  IInputedValues,
  ILocalCurrency,
} from '@/types/reducersTypes/';

export const CURRENCY_RATES_RESPONCE = 'CURRENCY_RATES_RESPONCE';
export const INIT_BASE_CURRENCY = 'INIT_BASE_CURRENCY';
export const CURRENCY_RATES_REQUEST = 'CURRENCY_RATES_REQUEST';
export const UPDATE_INPUTED_DATA = 'UPDATE_INPUTED_DATA';
export const ADD_SELECT_VALUE = 'ADD_SELECT_VALUE';
export const UPDATE_CURRENCY_SELECTOR = 'UPDATE_CURRENCY_SELECTOR';
export const DELETE_CURRENCY_FIELD = 'DELETE_CURRENCY_FIELD';
export const SWAP_CURRENCY_VIEWS = 'SWAP_CURRENCY_VIEWS ';
export const SET_CURRENT_GEOLOCATION = 'SET_CURRENT_GEOLOCATION';
export const GEOLOCATION_REQUEST = 'GEOLOCATION_REQUEST';

interface IGeolocationRequest {
  type: typeof GEOLOCATION_REQUEST;
}
interface ISetCurrentGeolocation {
  type: typeof SET_CURRENT_GEOLOCATION;
  payload: ILocalCurrency;
}

interface ICurrencyRatesResponce {
  type: typeof CURRENCY_RATES_RESPONCE;
  payload: IRateReducer;
}
interface IInitBaseCurrency {
  type: typeof INIT_BASE_CURRENCY;
}
interface ICurrencyRateRequest {
  type: typeof CURRENCY_RATES_REQUEST;
}
interface IUpdateInputedValue {
  type: typeof UPDATE_INPUTED_DATA;
  payload: Array<IInputedValues>;
}
interface IAddNewValueFromSelect {
  type: typeof ADD_SELECT_VALUE;
  payload: Array<IInputedValues>;
}
interface IUpdateCurrencySelector {
  type: typeof UPDATE_CURRENCY_SELECTOR;
  payload: Array<IInputedValues>;
}
interface IDeleteCurrencyField {
  type: typeof DELETE_CURRENCY_FIELD;
  payload: Array<IInputedValues>;
}
interface ISwapCurrencyViews {
  type: typeof SWAP_CURRENCY_VIEWS;
  payload: Array<IInputedValues>;
}

export type TConverterActionTypes =
  | ICurrencyRatesResponce
  | IInitBaseCurrency
  | ICurrencyRateRequest
  | IUpdateInputedValue
  | IAddNewValueFromSelect
  | IDeleteCurrencyField
  | ISwapCurrencyViews
  | IUpdateCurrencySelector
  | IGeolocationRequest
  | ISetCurrentGeolocation;
