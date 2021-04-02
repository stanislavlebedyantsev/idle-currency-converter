import {
  INIT_CHARTS_DATA,
  SELECT_CHECKBOX_CHART,
  REMOVE_SELECT_CHECKBOX_CHART,
  CHANGE_DISPLAY_CHARTS_DATA,
  TChartActionTypes,
} from '@/types/actionTypes/';
import { IChartsState } from '@/types/reducersTypes';
const initState: IChartsState = {
  ratesHistory: [],
  selectedCurrencies: '',
  mappedRates: [],
};

const chartsReducer = (
  state = initState,
  action: TChartActionTypes
): IChartsState => {
  switch (action.type) {
    case INIT_CHARTS_DATA: {
      return { ...state, ratesHistory: [...action.payload] };
    }
    case SELECT_CHECKBOX_CHART: {
      return {
        ...state,
        selectedCurrencies: action.payload,
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
