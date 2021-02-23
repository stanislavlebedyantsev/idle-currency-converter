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
  updateInputedValue
} from "@actions/converterActionCreators";
import {
  convertBeforInput,
} from "@utils/data-mappers";

export function* getCurrencyRateWatcher() {
  yield takeEvery(REQUEST_FOR_CURRENCY, getCurrencyRate);
  //yield fork(getCurrencyRate);
  yield takeEvery(REQUEST_FOR_GEOLOCATION, getGeolocation);
  //yield fork(getGeolocation);
}

function* getGeolocation() {
  try {
    const geolocationResponce = yield call(geolocationApi.fetchGeolocation);
    yield put(setCurrentGeolocation(geolocationResponce));
  } catch (e) {}
}

function* getCurrencyRate() {
  try {
    const currencyResponce = yield call(converterApi.fetchCurrencyRate);
    const localStorageData = localStorage.getItem("state");
      yield put(geolocationRequest());
      yield put(initData(currencyResponce));
      const {inputedValues, rate} = yield select((state) => state.converter)
      const updatedValues = yield call(convertBeforInput,
        inputedValues[0],
        rate.base,
        rate.rates,
        inputedValues
      )
      yield put(updateInputedValue(updatedValues))
      if(!localStorageData){
        yield put(initBaseCurrency(currencyResponce.base));
      }
    
  } catch (e) {
    console.log("Error ", e);
  }
}

export function* rootSaga() {
  yield call(getCurrencyRateWatcher);
}
