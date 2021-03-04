import {
  INIT_DATA,
  INIT_BASE,
  UPDATE_INPUTED_DATA,
  ADD_SELECT_VALUE,
  UPDATE_CURRENCY_SELECTOR,
  DELETE_CURRENCY_FIELD,
  SET_CURRENT_GEOLOCATION,
  UPDATE_SWAPPED_CURRENCYS
} from "@actions/converterActionCreators";

const initState = {
  allCurrs: [],
  inputedValues: [],
  error: "",
};

const converterReducer = (state = initState, action) => {
  let copyState = { ...state };
  switch (action.type) {
    case INIT_DATA: {
      return {
        ...copyState,
        rate: { ...action.payload },
        allCurrs: [...Object.keys(action.payload.rates)],
      };
    }
    case INIT_BASE: {
      return {
        ...copyState,
        inputedValues: [
          ...copyState.inputedValues,
          { currency: copyState.localCurrency.code, value: 1 },
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
    case UPDATE_SWAPPED_CURRENCYS:{
      return { ...copyState, inputedValues: [...action.payload] };
    }
    default:
      return state;
  }
};

export default converterReducer;
