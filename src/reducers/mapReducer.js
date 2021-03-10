import {
  UPDATE_COUNTRY_DATA,
  UPDATE_MATCHED_VALUES_LIST_DATA,
  UPDATE_COUNTRY_LIST,
} from '@/actions/index';

const initState = {
  matchedValues: [],
  countryList: [],
  countryData: {},
};

const mapReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_COUNTRY_LIST: {
      return { ...state, countryList: [...action.payload] };
    }
    case UPDATE_MATCHED_VALUES_LIST_DATA: {
      return { ...state, matchedValues: [...action.payload] };
    }
    case UPDATE_COUNTRY_DATA: {
      return { ...state, countryData: action.payload };
    }
    default:
      return state;
  }
};

export default mapReducer;
