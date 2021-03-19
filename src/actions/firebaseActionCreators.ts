import {
  REQUEST_FOR_GET_LAST_VALUE_DATABASE,
  REQUEST_FOR_GET_VALUES_DATABASE,
  UPLOAD_RATES_REQUEST,
  TFirebaseActionTypes,
} from '@/types/actionTypes';

export const uploadRatesRequest = (): TFirebaseActionTypes => ({
  type: UPLOAD_RATES_REQUEST,
});
export const getLastValueDatabaseRequest = (): TFirebaseActionTypes => ({
  type: REQUEST_FOR_GET_LAST_VALUE_DATABASE,
});
export const getValuesDatabaseRequest = (): TFirebaseActionTypes => ({
  type: REQUEST_FOR_GET_VALUES_DATABASE,
});
