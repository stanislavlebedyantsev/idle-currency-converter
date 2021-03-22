import {
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  takeEvery,
} from 'redux-saga/effects';
import { filterCountryList, TCountryData } from '@/utils';
import {
  IRequestForCountryData,
  REQUEST_FOR_COUNRY_DATA,
  REQUEST_FOR_COUNRY_LIST,
  TErrorActionTypes,
  TMapActionTypes,
} from '@/types/actionTypes';
import { updateCountryData, updateCountryList, setError } from '@/actions';
import { mapsApi } from '@/api';
import { ICountryData } from '@/types/reducersTypes';

type TGeneratorTypes =
  | CallEffect<ICountryData | Array<string>>
  | Array<string>
  | PutEffect<TMapActionTypes>
  | PutEffect<TErrorActionTypes>;

function* getCountryData(
  action: IRequestForCountryData
): Generator<TGeneratorTypes, void, any> {
  try {
    const countryData = yield call(mapsApi.fetchCountryData, action.payload);
    yield put(updateCountryData(countryData[0]));
  } catch (e) {
    yield put(setError(e));
  }
}

function* getCountryList(): Generator<
  TGeneratorTypes,
  void,
  Array<string> & TCountryData[]
> {
  try {
    const countryList = yield call(mapsApi.fetchCountryList);
    const filtredList = yield filterCountryList(countryList);
    yield put(updateCountryList(filtredList));
  } catch (e) {
    yield put(setError(e));
  }
}

export function* countryDataWatcher(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeEvery(REQUEST_FOR_COUNRY_DATA, getCountryData);
  yield takeEvery(REQUEST_FOR_COUNRY_LIST, getCountryList);
}
