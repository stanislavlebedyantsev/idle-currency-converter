import { IRatesHistory, IMappedRates } from '@/types/reducersTypes/';

export const INIT_CHARTS_DATA = 'INIT_CHARTS_DATA';
export const CHANGE_DISPLAY_CHARTS_DATA = 'CHANGE_DISPLAY_CHARTS_DATA';
export const SELECT_CHECKBOX_CHART = 'SELECT_CHECKBOX_CHART';
export const REMOVE_SELECT_CHECKBOX_CHART = 'REMOVE_SELECT_CHECKBOX_CHART';

interface IInitChartsData {
  type: typeof INIT_CHARTS_DATA;
  payload: Array<IRatesHistory>;
}
interface ISelectCheckboxChart {
  type: typeof SELECT_CHECKBOX_CHART;
  payload: string;
}
interface IRemoveSelectСheckboxChart {
  type: typeof REMOVE_SELECT_CHECKBOX_CHART;
  payload: string;
}
interface IChangeDispayCharsData {
  type: typeof CHANGE_DISPLAY_CHARTS_DATA;
  payload: Array<IMappedRates>;
}

export type TChartActionTypes =
  | IInitChartsData
  | ISelectCheckboxChart
  | IRemoveSelectСheckboxChart
  | IChangeDispayCharsData;
