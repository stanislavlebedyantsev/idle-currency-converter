import {
  SAVE_USER_DATA,
  REMOVE_USER_DATA,
} from '@/actions/';

const initState = {
  user: {},
  isAuth: false,
  isExist: false,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case SAVE_USER_DATA: {
      return { ...state, user: action.payload, isAuth: true };
    }
    case REMOVE_USER_DATA: {
      return initState;
    }
    default:
      return state;
  }
};

export default userReducer;
