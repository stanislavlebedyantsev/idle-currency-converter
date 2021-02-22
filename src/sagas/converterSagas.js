import { call, fork, put, take, all, takeEvery } from "redux-saga/effects";
import { converterApi } from "@api/converterApi";
import { geolocationApi } from "@api/geolocationApi";
import {
  REQUEST_FOR_CURRENCY,
  REQUEST_FOR_GEOLOCATION,
  currencyRateRequest,
  initData,
  initBaseCurrency,
  setCurrentGeolocation,
} from "@actions/converterActionCreators";

export function* getCurrencyRateWatcher(baseCode) {
  yield take(REQUEST_FOR_GEOLOCATION);
  yield fork(getGeolocation);
  yield takeEvery(REQUEST_FOR_CURRENCY, getCurrencyRate, baseCode);
  //yield fork(getCurrencyRate, baseCode);
}


function* getGeolocation() {
  try {
    const geolocationResponce = yield call(geolocationApi.fetchGeolocation);
    const localStorageData = localStorage.getItem("state");
    if (!localStorageData) {
      yield put(setCurrentGeolocation(geolocationResponce));
      yield put(currencyRateRequest(geolocationResponce.currency.code));
    }
  } catch (e) {}
}

function* getCurrencyRate(baseCode) {
  try {
    const currencyResponce = yield call(converterApi.fetchCurrencyRate, baseCode);
    yield put(initData(currencyResponce));
    yield put(initBaseCurrency(currencyResponce.base));
  } catch (e) {
    console.log("Error ", e);
  }
}

export function* rootSaga() {
  yield call(getCurrencyRateWatcher);
}
