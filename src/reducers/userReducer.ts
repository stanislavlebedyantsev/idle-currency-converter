import {
  SAVE_USER_DATA,
  REMOVE_USER_DATA,
  TUserActionTypes,
} from '@/types/actionTypes';
import { IUserState } from '@/types/reducersTypes';

const initState: IUserState = {
  user: {
    uid: '',
    email: '',
  },
  isAuth: false,
  isExist: false,
};

const userReducer = (
  state = initState,
  action: TUserActionTypes
): IUserState => {
  switch (action.type) {
    case SAVE_USER_DATA: {
      return { ...state, user: action.payload, isAuth: true };
    }
    case REMOVE_USER_DATA: {
      return {
        user: {
          uid: '',
          email: '',
        },
        isAuth: false,
        isExist: false,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
