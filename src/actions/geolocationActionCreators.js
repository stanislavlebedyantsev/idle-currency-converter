export const SET_CURRENT_GEOLOCATION = "SET_CURRENT_GEOLOCATION"
export const REQUEST_FOR_GEOLOCATION = "REQUEST_FOR_GEOLOCATION";

export const geolocationRequest = () => ({
  type: REQUEST_FOR_GEOLOCATION,
});
export const setCurrentGeolocation = (country) => ({
  type: SET_CURRENT_GEOLOCATION,
  payload: country,
});