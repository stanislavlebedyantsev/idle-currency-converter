import { ICountryData } from 'src/types/reducersTypes/';

export const REQUEST_FOR_COUNRY_DATA = 'REQUEST_FOR_COUNRY_DATA';
export const REQUEST_FOR_COUNRY_LIST = 'REQUEST_FOR_COUNRY_LIST';
export const UPDATE_MATCHED_VALUES_LIST_DATA =
  'UPDATE_MATCHED_VALUES_LIST_DATA';
export const UPDATE_COUNTRY_DATA = 'UPDATE_COUNTRY_DATA';
export const UPDATE_COUNTRY_LIST = 'UPDATE_COUNTRY_LIST';

interface IRequestForCountryData {
  type: typeof REQUEST_FOR_COUNRY_DATA;
  payload: string;
}
interface IRequestCountryList {
  type: typeof REQUEST_FOR_COUNRY_LIST;
}
interface IUpdateCountryData {
  type: typeof UPDATE_COUNTRY_DATA;
  payload: ICountryData;
}
interface IUpdateMatchesValuesListData {
  type: typeof UPDATE_MATCHED_VALUES_LIST_DATA;
  payload: string[];
}
interface IUpdateCountryList {
  type: typeof UPDATE_COUNTRY_LIST;
  payload: string[];
}

export type TMapActionTypes =
  | IRequestForCountryData
  | IRequestCountryList
  | IUpdateCountryData
  | IUpdateMatchesValuesListData
  | IUpdateCountryList;
