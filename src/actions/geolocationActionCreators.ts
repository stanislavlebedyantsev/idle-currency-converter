import {
  GEOLOCATION_REQUEST,
  SET_CURRENT_GEOLOCATION,
  TConverterActionTypes,
} from '@/types/actionTypes';
import { ILocalCurrency } from '@/types/reducersTypes';

export const geolocationRequest = (): TConverterActionTypes => ({
  type: GEOLOCATION_REQUEST,
});
export const setCurrentGeolocation = (
  country: ILocalCurrency
): TConverterActionTypes => ({
  type: SET_CURRENT_GEOLOCATION,
  payload: country,
});
