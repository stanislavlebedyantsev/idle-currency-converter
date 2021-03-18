import { call, put, takeEvery } from 'redux-saga/effects';
import { geolocationApi } from '@/api/';
import {
  setCurrentGeolocation,
  setError,
  requestForCountryData,
} from '@/actions/';
import { GEOLOCATION_REQUEST } from '@/types/actionTypes/';

function* getGeolocation() {
  try {
    const geolocationResponce = yield call(geolocationApi.fetchGeolocation);
    yield put(setCurrentGeolocation(geolocationResponce.currency));
    yield put(requestForCountryData(geolocationResponce.country_name));
  } catch (e) {
    yield put(setError(e));
  }
}

export function* getGeolocationWatcher() {
  yield takeEvery(GEOLOCATION_REQUEST, getGeolocation);
}
