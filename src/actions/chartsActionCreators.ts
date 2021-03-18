import {
  INIT_CHARTS_DATA,
  CHANGE_DISPLAY_CHARTS_DATA,
  SELECT_CHECKBOX_CHART,
  REMOVE_SELECT_CHECKBOX_CHART,
	TChartActionTypes,
} from 'src/types/actionTypes/';
import { IRatesHistory, IMappedRates } from 'src/types/reducersTypes/';

export const initChartsData = (chartsData: IRatesHistory[]): TChartActionTypes => ({
  type: INIT_CHARTS_DATA,
  payload: chartsData,
});
export const selectCheckboxChart = (currencyName: string): TChartActionTypes => ({
  type: SELECT_CHECKBOX_CHART,
  payload: currencyName,
});
export const removeSelectСheckboxChart = (currencyName: string): TChartActionTypes => ({
  type: REMOVE_SELECT_CHECKBOX_CHART,
  payload: currencyName,
});
export const changeDispayCharsData = (dataForDisplay: IMappedRates[]): TChartActionTypes => ({
  type: CHANGE_DISPLAY_CHARTS_DATA,
  payload: dataForDisplay,
});
