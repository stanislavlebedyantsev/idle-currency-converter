import {
  INIT_DATA,
  INIT_BASE,
  UPDATE_INPUTED_DATA,
  ADD_SELECT_VALUE,
  UPDATE_CURRENCY_SELECTOR,
  DELETE_CURRENCY_FIELD,
  SET_CURRENT_GEOLOCATION
} from "@actions/converterActionCreators";

const initState = {
  allCurrs: [],
  inputedValues: [],
  error: "",
  geolocation:{}
};

const converterReducer = (state = initState, action) => {
  let copyState = { ...state };
  switch (action.type) {
    case INIT_DATA: {
      return {
        ...copyState,
        rate: { ...action.payload },
        allCurrs: [action.payload.base, ...Object.keys(action.payload.rates)],
      };
    }
    case INIT_BASE: {
      return {
        ...copyState,
        inputedValues: [
          ...copyState.inputedValues,
          { currency: action.payload, value: 1 },
        ],
      };
    }
    case ADD_SELECT_VALUE: {
      return { ...copyState, inputedValues: [...action.payload] };
    }
    case UPDATE_CURRENCY_SELECTOR: {
      return { ...copyState, inputedValues: [...action.payload] };
    }
    case UPDATE_INPUTED_DATA: {
      return { ...copyState, inputedValues: [...action.payload] };
    }
    case DELETE_CURRENCY_FIELD: {
      return { ...copyState, inputedValues: [...action.payload] };
    }
    case SET_CURRENT_GEOLOCATION:{
      return {...copyState, localCurrency: {...action.payload.currency}};
    }
    default:
      return state;
  }
};

export default converterReducer;
