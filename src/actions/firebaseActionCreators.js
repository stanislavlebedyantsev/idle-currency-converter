export const PUSH_DATA_IN_DATABASE = 'PUSH_DATA_IN_DATABASE';
export const REQUEST_FOR_GET_LAST_VALUE_DATABASE =
  'REQUEST_FOR_GET_LAST_VALUE_DATABASE';
export const REQUEST_FOR_GET_VALUES_DATABASE =
  'REQUEST_FOR_GET_VALUES_DATABASE';

export const pushDatabaseRequest = () => ({ type: PUSH_DATA_IN_DATABASE });
export const getLastValueDatabaseRequest = () => ({
  type: REQUEST_FOR_GET_LAST_VALUE_DATABASE,
});
export const getValuesDatabaseRequest = () => ({
  type: REQUEST_FOR_GET_VALUES_DATABASE,
});
