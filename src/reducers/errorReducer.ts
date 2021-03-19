import { IErrorState } from '@/types/reducersTypes';
import {
  SET_ERROR,
  REMOVE_ERROR,
  TErrorActionTypes,
} from '@/types/actionTypes';

const initState: IErrorState = {
  errorValue: '',
  isError: false,
};

const errorReducer = (
  state = initState,
  action: TErrorActionTypes
): IErrorState => {
  switch (action.type) {
    case SET_ERROR: {
      return { ...state, errorValue: action.payload.message, isError: true };
    }
    case REMOVE_ERROR: {
      return { ...state, errorValue: '', isError: false };
    }
    default:
      return state;
  }
};

export default errorReducer;