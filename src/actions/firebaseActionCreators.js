export const UPLOAD_RATES_REQUEST = 'UPLOAD_RATES_REQUEST';
export const REQUEST_FOR_GET_LAST_VALUE_DATABASE =
  'REQUEST_FOR_GET_LAST_VALUE_DATABASE';
export const REQUEST_FOR_GET_VALUES_DATABASE =
  'REQUEST_FOR_GET_VALUES_DATABASE';

export const uploadRatesRequest = () => ({ type: UPLOAD_RATES_REQUEST });
export const getLastValueDatabaseRequest = () => ({
  type: REQUEST_FOR_GET_LAST_VALUE_DATABASE,
});
export const getValuesDatabaseRequest = () => ({
  type: REQUEST_FOR_GET_VALUES_DATABASE,
});
