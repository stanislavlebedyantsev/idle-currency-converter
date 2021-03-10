import { call, put, takeEvery } from 'redux-saga/effects';
import { filterCountryList } from '@/utils/';
import {
  REQUEST_FOR_COUNRY_DATA,
  REQUEST_FOR_COUNRY_LIST,
  updateCountryData,
  updateCountryList,
  requestForCountryData,
  removeError,
  setMapError,
} from '@/actions/';
import { mapApi } from '@/api/';

function* getCountryData(action) {
  try {
    const countryData = yield call(mapApi.fetchCountryData, action.payload);
    yield put(updateCountryData(countryData[0]));
  } catch (e) {
    console.log(e);
  }
}

function* getCountryList() {
  try {
    const countryList = yield call(mapApi.fetchCountryList);
    const filtredList = yield filterCountryList(countryList);
    yield put(updateCountryList(filtredList));
    yield put(removeError('map'));
  } catch (e) {
    yield put(setMapError(e));
  }
}

export function* countryDataWatcher() {
  yield takeEvery(REQUEST_FOR_COUNRY_DATA, getCountryData);
  yield takeEvery(REQUEST_FOR_COUNRY_LIST, getCountryList);
}
