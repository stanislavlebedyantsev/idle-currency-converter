export const SET_MAP_ERROR = 'SET_MAP_ERROR';
export const SET_CONVERTER_ERROR = 'SET_CONVERTER_ERROR';
export const SET_GEOLOCATION_ERROR = 'SET_GEOLOCATION_ERROR';
export const SET_CHARTS_ERROR = 'SET_GEOLOCATION_ERROR';
export const REMOVE_ERROR = 'REMOVE_ERROR';

export const setMapError = (msg) => ({
  type: SET_MAP_ERROR,
  payload: msg,
});
export const setConverterError = (msg) => ({
  type: SET_CONVERTER_ERROR,
  payload: msg,
});
export const setGeolocationError = (msg) => ({
  type: SET_GEOLOCATION_ERROR,
  payload: msg,
});
export const setChartsError = (msg) => ({
  type: SET_CHARTS_ERROR,
  payload: msg,
});
export const removeError = (msgType) => ({
  type: REMOVE_ERROR,
  payload: msgType,
});
