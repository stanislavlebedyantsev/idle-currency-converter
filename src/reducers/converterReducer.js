import {
  GET_DATA,
  UPDATE_INPUTED_DATA,
  ADD_SELECT_VALUE,
  UPDATE_CURRENCY_SELECTOR,
} from "@constants/actions";

const initState = {
  allCurrs: [],
  availableCurrs: [],
  inputedValues: [],
  error: "",
};

const converterReducer = (state = initState, action) => {
  let copyState = { ...state };
  switch (action.type) {
    case GET_DATA: {
      copyState.availableCurrs = [...Object.keys(copyState.rate.rates)];
      copyState.allCurrs = [...Object.keys(copyState.rate.rates)];
      copyState.allCurrs.push(copyState.rate.base);
      return copyState;
    }
    case ADD_SELECT_VALUE: {
      copyState.availableCurrs.delete(action.payload);
      return { ...copyState, inputedValues: [...action.payload] };
    }
    case UPDATE_CURRENCY_SELECTOR: {
      return { ...copyState, inputedValues: [...action.payload] };
    }
    case UPDATE_INPUTED_DATA: {
      return { ...copyState, inputedValues: [...action.payload] };
    }
    default:
      return state;
  }
};

export default converterReducer;
