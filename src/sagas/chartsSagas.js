import { put, select, takeEvery } from 'redux-saga/effects';
import { chartsUploadMapper, predisplayedChartsMapper } from '@/utils/';
import {
  UPLOAD_RATES_REQUEST,
  REQUEST_FOR_GET_LAST_VALUE_DATABASE,
  REQUEST_FOR_GET_VALUES_DATABASE,
} from '@/types/actionTypes';
import {
  initChartsData,
  changeDispayCharsData,
  setError,
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
  yield takeEvery(UPLOAD_RATES_REQUEST, pushValueToDatabase);
  yield takeEvery(REQUEST_FOR_GET_LAST_VALUE_DATABASE, pushValueToDatabase);
  yield takeEvery(REQUEST_FOR_GET_VALUES_DATABASE, getAllValuesFromDatabase);
}
