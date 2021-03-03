export const REQUEST_FOR_PUSH_DATABASE = "REQUEST_FOR_INIT_DATABASE";
export const REQUEST_FOR_GET_LAST_VALUE_DATABASE =
  "REQUEST_FOR_GET_LAST_VALUE_DATABASE";
  export const REQUEST_FOR_GET_VALUES_DATABASE =
  "REQUEST_FOR_GET_VALUES_DATABASE";

export const pushDatabaseRequest = () => ({ type: REQUEST_FOR_PUSH_DATABASE });
export const getLastValueDatabaseRequest = () => ({
  type: REQUEST_FOR_GET_LAST_VALUE_DATABASE,
});
export const getValuesDatabaseRequest = () => ({
  type: REQUEST_FOR_GET_VALUES_DATABASE,
});
