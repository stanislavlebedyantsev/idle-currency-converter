export const UPLOAD_RATES_REQUEST = 'UPLOAD_RATES_REQUEST';
export const REQUEST_FOR_GET_LAST_VALUE_DATABASE =
  'REQUEST_FOR_GET_LAST_VALUE_DATABASE';
export const REQUEST_FOR_GET_VALUES_DATABASE =
  'REQUEST_FOR_GET_VALUES_DATABASE';

interface IUploadRatesRequest {
  type: typeof UPLOAD_RATES_REQUEST;
}
interface IGetLastValueDatabaseRequest {
  type: typeof REQUEST_FOR_GET_LAST_VALUE_DATABASE;
}
interface IGetValuesDatabaseRequest {
  type: typeof REQUEST_FOR_GET_VALUES_DATABASE;
}
export type TFirebaseActionTypes =
  | IUploadRatesRequest
  | IGetLastValueDatabaseRequest
  | IGetValuesDatabaseRequest;
