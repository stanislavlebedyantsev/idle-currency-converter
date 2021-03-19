import { TErrorResponce } from '@/types/reducersTypes';
import {
  SET_ERROR,
  REMOVE_ERROR,
  TErrorActionTypes,
} from '@/types/actionTypes';

export const setError = (msg: TErrorResponce): TErrorActionTypes => ({
  type: SET_ERROR,
  payload: { message: msg.message },
});
export const removeError = (): TErrorActionTypes => ({
  type: REMOVE_ERROR,
});
