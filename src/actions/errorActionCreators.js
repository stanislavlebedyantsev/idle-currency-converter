export const SET_ERROR = 'SET_MAP_ERROR';
export const REMOVE_ERROR = 'REMOVE_ERROR';

export const setError = (msg) => ({
  type: SET_ERROR,
  payload: msg,
});
export const removeError = () => ({
  type: REMOVE_ERROR,
});
