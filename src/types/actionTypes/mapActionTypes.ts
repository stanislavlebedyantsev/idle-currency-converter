import { ICountryData } from '@/types/reducersTypes';

export const REQUEST_FOR_COUNRY_DATA = 'REQUEST_FOR_COUNRY_DATA';
export const REQUEST_FOR_COUNRY_LIST = 'REQUEST_FOR_COUNRY_LIST';
export const UPDATE_MATCHED_VALUES_LIST_DATA =
  'UPDATE_MATCHED_VALUES_LIST_DATA';
export const UPDATE_COUNTRY_DATA = 'UPDATE_COUNTRY_DATA';
export const UPDATE_COUNTRY_LIST = 'UPDATE_COUNTRY_LIST';

interface IRequestCountryList {
  type: typeof REQUEST_FOR_COUNRY_LIST;
}
export interface IRequestForCountryData {
  type: typeof REQUEST_FOR_COUNRY_DATA;
  payload: string;
}
interface IUpdateCountryData {
  type: typeof UPDATE_COUNTRY_DATA;
  payload: ICountryData;
}
interface IUpdateMatchesValuesListData {
  type: typeof UPDATE_MATCHED_VALUES_LIST_DATA;
  payload: Array<string>;
}
interface IUpdateCountryList {
  type: typeof UPDATE_COUNTRY_LIST;
  payload: Array<string>;
} 

export type TMapActionTypes =
  | IRequestForCountryData
  | IUpdateCountryData
  | IUpdateMatchesValuesListData
  | IUpdateCountryList
  | IRequestCountryList;
