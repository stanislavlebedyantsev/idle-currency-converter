export const INIT_CHARTS_DATA = 'INIT_CHARTS_DATA';
export const CHANGE_DISPLAY_CHARTS_DATA = 'CHANGE_DISPLAY_CHARTS_DATA';
export const SELECT_CHECKBOX_CHART = 'SELECT_CHECKBOX_CHART';
export const REMOVE_SELECT_CHECKBOX_CHART = 'REMOVE_SELECT_CHECKBOX_CHART';

export const initChartsData = (chartsData) => ({
  type: INIT_CHARTS_DATA,
  payload: chartsData,
});
export const selectCheckboxChart = (currencyName) => ({
  type: SELECT_CHECKBOX_CHART,
  payload: currencyName,
});
export const removeSelectСheckboxChart = (currencyName) => ({
  type: REMOVE_SELECT_CHECKBOX_CHART,
  payload: currencyName,
});
export const changeDispayCharsData = (dataForDisplay) => ({
  type: CHANGE_DISPLAY_CHARTS_DATA,
  payload: dataForDisplay,
});
