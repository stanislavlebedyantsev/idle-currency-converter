import {
  INIT_CHARTS_DATA,
  SELECT_CHART,
  REMOVE_SELECT_CHART,
  CHANGE_DISPLAY_CHARTS_DATA
} from "@actions/chartsActionCreators";
const initState = {
  ratesHistory: [],
  selectedCurrency: [],
  mappedRates: [],
};

const chartsReducer = (state = initState, action) => {
  let copyState = state;
  switch (action.type) {
    case INIT_CHARTS_DATA: {
      return { ...state, ratesHistory: [...action.payload] };
    }
    case SELECT_CHART: {
      return {
        ...copyState,
        selectedCurrency: [...copyState.selectedCurrency, action.payload],
      };
    }
    case REMOVE_SELECT_CHART: {
      return {
        ...copyState,
        selectedCurrency: copyState.selectedCurrency.filter(el => el !== action.payload),
      };
    }
    case CHANGE_DISPLAY_CHARTS_DATA: {
      return {
        ...copyState,
        mappedRates: [...action.payload],
      };
    }
    default:
      return copyState;
  }
};

export default chartsReducer;
