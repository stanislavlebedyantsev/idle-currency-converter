import {
  INIT_DATA,
  INIT_BASE,
  UPDATE_INPUTED_DATA,
  ADD_SELECT_VALUE,
  UPDATE_CURRENCY_SELECTOR,
  DELETE_CURRENCY_FIELD,
  SET_CURRENT_GEOLOCATION,
  UPDATE_SWAPPED_CURRENCYS,
} from '@/actions/index';

const initState = {
  allCurrs: [],
  inputedValues: [],
  error: '',
	localCurrency: {},
};

const converterReducer = (state = initState, action) => {
  switch (action.type) {
    case INIT_DATA: {
      return {
        ...state,
        rate: { ...action.payload },
        allCurrs: [...Object.keys(action.payload.rates)],
      };
    }
    case INIT_BASE: {
      return {
        ...state,
        inputedValues: [
          ...state.inputedValues,
          { currency: state.localCurrency.code, value: 1 },
        ],
      };
    }
    case ADD_SELECT_VALUE: {
      return { ...state, inputedValues: [...action.payload] };
    }
    case UPDATE_CURRENCY_SELECTOR: {
      return { ...state, inputedValues: [...action.payload] };
    }
    case UPDATE_INPUTED_DATA: {
      return { ...state, inputedValues: [...action.payload] };
    }
    case DELETE_CURRENCY_FIELD: {
      return { ...state, inputedValues: [...action.payload] };
    }
    case SET_CURRENT_GEOLOCATION: {
      return { ...state, localCurrency: { ...action.payload.currency } };
    }
    case UPDATE_SWAPPED_CURRENCYS: {
      return { ...state, inputedValues: [...action.payload] };
    }
    default:
      return state;
  }
};

export default converterReducer;
