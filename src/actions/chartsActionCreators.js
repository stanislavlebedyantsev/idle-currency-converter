export const INIT_CHARTS_DATA = 'INIT_CHARTS_DATA'
export const SELECT_CHART = 'SELECT_CHART'

export const initChartsData = (chartsData) => ({
  type: INIT_CHARTS_DATA,
  payload: chartsData
})
export const selectChart = (chart) => ({
  type: SELECT_CHART,
  payload: chart
})
