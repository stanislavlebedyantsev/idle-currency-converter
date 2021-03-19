import { TErrorResponce } from '@/types/reducersTypes';

export const SET_ERROR = 'SET_ERROR';
export const REMOVE_ERROR = 'REMOVE_ERROR';

interface ISetError {
  type: typeof SET_ERROR;
  payload: TErrorResponce;
}
interface IRemoveError {
  type: typeof REMOVE_ERROR;
}

export type TErrorActionTypes = ISetError | IRemoveError;
