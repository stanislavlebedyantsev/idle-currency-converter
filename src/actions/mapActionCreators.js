export const REQUEST_FOR_COUNRY_DATA = 'REQUEST_FOR_COUNRY_DATA';
export const REQUEST_FOR_COUNRY_LIST = 'REQUEST_FOR_COUNRY_LIST';
export const UPDATE_MATCHED_VALUES_LIST_DATA = 'UPDATE_MATCHED_VALUES_LIST_DATA';
export const UPDATE_COUNTRY_DATA = 'UPDATE_COUNTRY_DATA';
export const UPDATE_COUNTRY_LIST = 'UPDATE_COUNTRY_LIST';

export const requestForCountryData = (code) => ({
  type: REQUEST_FOR_COUNRY_DATA,
  payload: code,
});
export const requestCountryList = () => ({
  type: REQUEST_FOR_COUNRY_LIST,
});
export const updateCountryData = (countryData) => ({
  type: UPDATE_COUNTRY_DATA,
  payload: countryData,
});
export const updateMatchesValuesListData = (inputData) => ({
  type: UPDATE_MATCHED_VALUES_LIST_DATA,
  payload: inputData,
});
export const updateCountryList = (countryList) => ({
  type: UPDATE_COUNTRY_LIST,
  payload: countryList,
});
