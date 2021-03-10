import { put, select, takeEvery } from 'redux-saga/effects';
import { chartsUploadMapper, predisplayedChartsMapper } from '@/utils/';
import {
  PUSH_DATA_IN_DATABASE,
  REQUEST_FOR_GET_LAST_VALUE_DATABASE,
  REQUEST_FOR_GET_VALUES_DATABASE,
  initChartsData,
  changeDispayCharsData,
  setError,
  removeError,
} from '@/actions/';
import { pushFirebaseDatabase, getValuesFirebaseDatabase } from '@/utils/';

function* getAllValuesFromDatabase() {
  try {
    const allRates = yield getValuesFirebaseDatabase();
    const { code } = yield select((state) => state.converter.localCurrency);
    const mappedDisplayCurrency = yield predisplayedChartsMapper(
      code,
      allRates
    );
    //here call action for put values in state
    yield put(initChartsData(allRates));
    yield put(changeDispayCharsData(mappedDisplayCurrency));
    yield put(removeError());
  } catch (e) {
    yield put(setError(e));
  }
}

function* pushValueToDatabase() {
  try {
    const { rate } = yield select((state) => state.converter);
    const ratesForCharts = yield chartsUploadMapper(rate.rates);
    yield pushFirebaseDatabase(ratesForCharts);
  } catch (e) {
    yield put(setError(e));
  }
}
export function* getChartsWatcher() {
  yield takeEvery(PUSH_DATA_IN_DATABASE, pushValueToDatabase);
  yield takeEvery(REQUEST_FOR_GET_LAST_VALUE_DATABASE, pushValueToDatabase);
  yield takeEvery(REQUEST_FOR_GET_VALUES_DATABASE, getAllValuesFromDatabase);
}
