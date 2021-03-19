import {
  call,
  CallEffect,
  put,
  PutEffect,
  takeEvery,
} from 'redux-saga/effects';
import { geolocationApi } from '@/api/';
import {
  setCurrentGeolocation,
  setError,
  requestForCountryData,
} from '@/actions/';
import {
  GEOLOCATION_REQUEST,
  TConverterActionTypes,
  TErrorActionTypes,
  TMapActionTypes,
} from '@/types/actionTypes/';
import { ILocalCurrency } from '@/types/reducersTypes';

type TGeneratorTypes =
  | CallEffect<ILocalCurrency>
  | PutEffect<TConverterActionTypes | TMapActionTypes | TErrorActionTypes>;

function* getGeolocation(): Generator<TGeneratorTypes, void, any> {
  try {
    const geolocationResponce = yield call(geolocationApi.fetchGeolocation);
    yield put(setCurrentGeolocation(geolocationResponce.currency));
    yield put(requestForCountryData(geolocationResponce.country_name));
  } catch (e) {
    yield put(setError(e));
  }
}

export function* getGeolocationWatcher(): Generator<unknown, void, unknown> {
  yield takeEvery(GEOLOCATION_REQUEST, getGeolocation);
}
