import { IConverterState, IRateReducer } from 'src/types/reducersTypes/';

import {
  CURRENCY_RATES_RESPONCE,
  INIT_BASE_CURRENCY,
  UPDATE_INPUTED_DATA,
  ADD_SELECT_VALUE,
  UPDATE_CURRENCY_SELECTOR,
  DELETE_CURRENCY_FIELD,
  SET_CURRENT_GEOLOCATION,
  SWAP_CURRENCY_VIEWS,
  TConverterActionTypes,
} from '@/types/actionTypes';

const initState: IConverterState = {
  allCurrencies: [],
  inputedValues: [],
  localCurrency: {
    name: '',
    code: '',
    symbol: '',
    native: '',
    plural: '',
  },
  rate: {
    base: '',
    rates: {},
  },
};

const converterReducer = (
  state = initState,
  action: TConverterActionTypes
): IConverterState => {
  switch (action.type) {
    case CURRENCY_RATES_RESPONCE: {
      return {
        ...state,
        rate: { ...action.payload },
        allCurrencies: [...Object.keys((action.payload as IRateReducer).rates)],
      };
    }
    case INIT_BASE_CURRENCY: {
      return {
        ...state,
        inputedValues: [
          ...state.inputedValues,
          { currency: state.localCurrency.code, value: 1 },
        ],
      };
    }
    case ADD_SELECT_VALUE: {
      return { ...state, inputedValues: action.payload };
    }
    case UPDATE_CURRENCY_SELECTOR: {
      return { ...state, inputedValues: action.payload };
    }
    case UPDATE_INPUTED_DATA: {
      return { ...state, inputedValues: action.payload };
    }
    case DELETE_CURRENCY_FIELD: {
      return { ...state, inputedValues: action.payload };
    }
    case SET_CURRENT_GEOLOCATION: {
      return { ...state, localCurrency: { ...action.payload } };
    }
    case SWAP_CURRENCY_VIEWS: {
      return { ...state, inputedValues: action.payload };
    }
    default:
      return state;
  }
};

export default converterReducer;
