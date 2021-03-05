import { put, select, takeEvery } from "redux-saga/effects";
import { chartsUploadMapper, displayedCharts } from "@utils/charts/index";
import {
  initChartsData,
  changeDispayCharsData,
} from "@actions/index";
import {
  REQUEST_FOR_PUSH_DATABASE,
  REQUEST_FOR_GET_LAST_VALUE_DATABASE,
  REQUEST_FOR_GET_VALUES_DATABASE,
} from "@actions/index";
import {
  pushFirebaseDatabase,
  getValuesFirebaseDatabase,
} from "@utils/firebase/firebase";

export function* getChartsWatcher() {
  //yield fork(getCurrencyRate);
  yield takeEvery(REQUEST_FOR_PUSH_DATABASE, pushValueToDatabase);
  yield takeEvery(REQUEST_FOR_GET_LAST_VALUE_DATABASE, pushValueToDatabase);
  yield takeEvery(REQUEST_FOR_GET_VALUES_DATABASE, getAllValuesFromDatabase);
  //yield fork(getGeolocation);
}

function* getAllValuesFromDatabase() {
  const allRates = yield getValuesFirebaseDatabase();
  const { code } = yield select((state) => state.converter.localCurrency);
  const mappedDisplayCurrency = yield displayedCharts(code, allRates);
  //here call action for put values in state
  yield put(initChartsData(allRates));
  yield put(changeDispayCharsData(mappedDisplayCurrency));
}

function* pushValueToDatabase() {
  const { rate } = yield select((state) => state.converter);
  const ratesForCharts = yield chartsUploadMapper(rate.rates);
  yield pushFirebaseDatabase(ratesForCharts);
}
