import {
  INIT_CHARTS_DATA,
  SELECT_CHECKBOX_CHART,
  REMOVE_SELECT_CHECKBOX_CHART,
  CHANGE_DISPLAY_CHARTS_DATA,
} from '@/actions/';
const initState = {
  ratesHistory: [],
  selectedCheckboxesCurrencies: [],
  mappedRates: [],
	selectedForTheChart: '',
};

const chartsReducer = (state = initState, action) => {
  switch (action.type) {
    case INIT_CHARTS_DATA: {
      return { ...state, ratesHistory: [...action.payload] };
    }
    case SELECT_CHECKBOX_CHART: {
      return {
        ...state,
        selectedCheckboxesCurrencies: [...state.selectedCheckboxesCurrencies, action.payload],
      };
    }
    case REMOVE_SELECT_CHECKBOX_CHART: {
      return {
        ...state,
        selectedCheckboxesCurrencies: state.selectedCheckboxesCurrencies.filter(
          (el) => el !== action.payload
        ),
      };
    }
    case CHANGE_DISPLAY_CHARTS_DATA: {
      return {
        ...state,
        mappedRates: [...action.payload],
      };
    }
    default:
      return state;
  }
};

export default chartsReducer;
