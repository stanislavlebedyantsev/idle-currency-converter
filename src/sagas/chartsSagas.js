import { put, select, takeEvery } from 'redux-saga/effects';
import { chartsUploadMapper, displayedCharts } from '@/utils/';
import {
  REQUEST_FOR_PUSH_DATABASE,
  REQUEST_FOR_GET_LAST_VALUE_DATABASE,
  REQUEST_FOR_GET_VALUES_DATABASE,
  initChartsData,
  changeDispayCharsData,
  setChartsError,
  removeError,
} from '@/actions/';
import {
  pushFirebaseDatabase,
  getValuesFirebaseDatabase,
} from '@/utils/';

function* getAllValuesFromDatabase() {
  try {
    const allRates = yield getValuesFirebaseDatabase();
    const { code } = yield select((state) => state.converter.localCurrency);
    const mappedDisplayCurrency = yield displayedCharts(code, allRates);
    //here call action for put values in state
    yield put(initChartsData(allRates));
    yield put(changeDispayCharsData(mappedDisplayCurrency));
    yield put(removeError('charts'));
  } catch (e) {
    yield put(setChartsError(e));
  }
}

function* pushValueToDatabase() {
  try {
    const { rate } = yield select((state) => state.converter);
    const ratesForCharts = yield chartsUploadMapper(rate.rates);
    yield pushFirebaseDatabase(ratesForCharts);
  } catch (e) {
    yield put(setChartsError(e));
  }
}
export function* getChartsWatcher() {
  yield takeEvery(REQUEST_FOR_PUSH_DATABASE, pushValueToDatabase);
  yield takeEvery(REQUEST_FOR_GET_LAST_VALUE_DATABASE, pushValueToDatabase);
  yield takeEvery(REQUEST_FOR_GET_VALUES_DATABASE, getAllValuesFromDatabase);
}
