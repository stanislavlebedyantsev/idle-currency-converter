import {
  REQUEST_FOR_COUNRY_DATA,
  REQUEST_FOR_COUNRY_LIST,
  UPDATE_MATCHED_VALUES_LIST_DATA,
  UPDATE_COUNTRY_DATA,
  UPDATE_COUNTRY_LIST,
  TMapActionTypes,
} from 'src/types/actionTypes';
import { ICountryData } from 'src/types/reducersTypes';

export const requestForCountryData = (code: string): TMapActionTypes => ({
  type: REQUEST_FOR_COUNRY_DATA,
  payload: code,
});
export const requestCountryList = (): TMapActionTypes => ({
  type: REQUEST_FOR_COUNRY_LIST,
});
export const updateCountryData = (
  countryData: ICountryData
): TMapActionTypes => ({
  type: UPDATE_COUNTRY_DATA,
  payload: countryData,
});
export const updateMatchesValuesListData = (
  inputData: string[]
): TMapActionTypes => ({
  type: UPDATE_MATCHED_VALUES_LIST_DATA,
  payload: inputData,
});
export const updateCountryList = (countryList: string[]): TMapActionTypes => ({
  type: UPDATE_COUNTRY_LIST,
  payload: countryList,
});
