import {
  SET_ERROR,
  REMOVE_ERROR,
} from '@/actions/index';

const initState = {
  errorValue: '',
  isError: false,
};

const errorReducer = (state = initState, action) => {
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
