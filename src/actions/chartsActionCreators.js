export const INIT_CHARTS_DATA = 'INIT_CHARTS_DATA'
export const CHANGE_DISPLAY_CHARTS_DATA = 'CHANGE_DISPLAY_CHARTS_DATA'
export const SELECT_CHART = 'SELECT_CHART'
export const REMOVE_SELECT_CHART = 'REMOVE_SELECT_CHART'

export const initChartsData = (chartsData) => ({
  type: INIT_CHARTS_DATA,
  payload: chartsData
})
export const selectChart = (currencyName) => ({
  type: SELECT_CHART,
  payload: currencyName
})
export const removeSelectChart = (currencyName) => ({
  type: REMOVE_SELECT_CHART,
  payload: currencyName
})
export const changeDispayCharsData = (dataForDisplay) => ({
  type: CHANGE_DISPLAY_CHARTS_DATA,
  payload: dataForDisplay
})
