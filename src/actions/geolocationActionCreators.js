export const SET_CURRENT_GEOLOCATION = 'SET_CURRENT_GEOLOCATION';
export const GEOLOCATION_REQUEST = 'GEOLOCATION_REQUEST';

export const geolocationRequest = () => ({
  type: GEOLOCATION_REQUEST,
});
export const setCurrentGeolocation = (country) => ({
  type: SET_CURRENT_GEOLOCATION,
  payload: country,
});
