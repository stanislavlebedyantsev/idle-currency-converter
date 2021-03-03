import { call, fork, put, select, take, takeEvery } from "redux-saga/effects";
import { converterApi } from "@api/converterApi";
import { geolocationApi } from "@api/geolocationApi";
import {
  REQUEST_FOR_CURRENCY,
  REQUEST_FOR_GEOLOCATION,
  geolocationRequest,
  initData,
  initBaseCurrency,
  setCurrentGeolocation,
  updateInputedValue,
} from "@actions/converterActionCreators";
import {
  REQUEST_FOR_PUSH_DATABASE,
  REQUEST_FOR_GET_LAST_VALUE_DATABASE,
  REQUEST_FOR_GET_VALUES_DATABASE,
  pushDatabaseRequest,
} from "@actions/firebaseActionCreators";
import { initChartsData, selectChart } from "@actions/chartsActionCreators";
import { convertBeforInput } from "@utils/data-mappers";
import { chartsUploadMapper, checkLastUpload } from "@utils/charts/index";
import {
  pushFirebaseDatabase,
  getLastFirebaseDatabase,
  getValuesFirebaseDatabase,
} from "@utils/firebase/firebase";

export function* getCurrencyRateWatcher() {
  yield takeEvery(REQUEST_FOR_CURRENCY, getCurrencyRate);
  //yield fork(getCurrencyRate);
  yield takeEvery(REQUEST_FOR_GEOLOCATION, getGeolocation);
  yield takeEvery(REQUEST_FOR_PUSH_DATABASE, pushValueToDatabase);
  yield takeEvery(REQUEST_FOR_GET_LAST_VALUE_DATABASE, pushValueToDatabase);
  yield takeEvery(REQUEST_FOR_GET_VALUES_DATABASE, getAllValuesFromDatabase);
  //yield fork(getGeolocation);
}

function* getAllValuesFromDatabase() {
  const allRates = yield getValuesFirebaseDatabase();
  yield put(initChartsData(allRates));
  //yield put(selectChart('BYN'))
  //here call action for put values in state
}

function* pushValueToDatabase() {
  const { rate } = yield select((state) => state.converter);
  const ratesForCharts = yield chartsUploadMapper(rate.rates);
  yield pushFirebaseDatabase(ratesForCharts);
}

function* getGeolocation() {
  try {
    const geolocationResponce = yield call(geolocationApi.fetchGeolocation);
    yield put(setCurrentGeolocation(geolocationResponce));
  } catch (e) {}
}

function* getCurrencyRate() {
  try {
    //currency request
    //const currencyResponce = yield call(converterApi.fetchCurrencyRate);
    const localStorageData = localStorage.getItem("state");
    //geolocation request
    yield put(geolocationRequest());
    //yield put(initData(currencyResponce));
    const { inputedValues, rate } = yield select((state) => state.converter);
    const updatedValues = yield convertBeforInput(
      inputedValues[0],
      rate.base,
      rate.rates,
      inputedValues
    );
    //get last value from database
    const lastValue = yield getLastFirebaseDatabase();
    //push value to database if last was uploaded >= 6 hours
    if (yield checkLastUpload(lastValue.date)) {
      yield put(pushDatabaseRequest());
    }

    yield put(updateInputedValue(updatedValues));
    if (!localStorageData) {
      //yield put(initBaseCurrency(currencyResponce.base));
    }
  } catch (e) {
    console.log("Error ", e);
  }
}

export function* rootSaga() {
  yield call(getCurrencyRateWatcher);
}
