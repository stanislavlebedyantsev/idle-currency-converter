import {
  GEOLOCATION_REQUEST,
  SET_CURRENT_GEOLOCATION,
  TConverterActionTypes,
} from 'src/types/actionTypes';
import { ILocalCurrency } from 'src/types/reducersTypes';

export const geolocationRequest = (): TConverterActionTypes => ({
  type: GEOLOCATION_REQUEST,
});
export const setCurrentGeolocation = (
  country: ILocalCurrency
): TConverterActionTypes => ({
  type: SET_CURRENT_GEOLOCATION,
  payload: country,
});
