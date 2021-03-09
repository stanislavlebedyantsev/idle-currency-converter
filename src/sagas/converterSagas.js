import { call, put, select, takeEvery } from "redux-saga/effects";
import { converterApi } from "@api/index";
import {
  REQUEST_FOR_CURRENCY,
  geolocationRequest,
  initData,
  initBaseCurrency,
  updateInputedValue,
  setConverterError,
  removeError,
} from "@actions/index";
import { checkLastUpload } from "@utils/charts/index";
import { pushDatabaseRequest } from "@actions/index";
import { getLastFirebaseDatabase } from "@utils/firebase/firebase";
import { convertBeforInput } from "@utils/data-mappers";

export function* getCurrencyRateWatcher() {
  yield takeEvery(REQUEST_FOR_CURRENCY, getCurrencyRate);
}

function* getCurrencyRate() {
  try {
  //currency request
  const currencyResponce = yield call(converterApi.fetchCurrencyRate);
  const localStorageData = localStorage.getItem("state");
  //geolocation request
  yield put(geolocationRequest());
  yield put(initData(currencyResponce));
  const { inputedValues, rate } = yield select((state) => state.converter);
  //if we have values on converter => update their values
  const updatedValues = yield convertBeforInput(
    inputedValues[0],
    rate.base,
    rate.rates,
    inputedValues
  );
  if (updatedValues) {
    yield put(updateInputedValue(updatedValues));
  }
  //get last value from database
  const lastValue = yield getLastFirebaseDatabase();
  //push value to database if last was uploaded >= 6 hours
  if (lastValue) {
    if (yield checkLastUpload(lastValue[0].date)) {
      yield put(pushDatabaseRequest());
    }
  } else {
    yield put(pushDatabaseRequest());
  }

  if (!localStorageData) {
    yield put(initBaseCurrency(currencyResponce.base));
  }
  yield put(removeError("converter"));
  } catch (e) {
    yield put(setConverterError(e))
  }
}
