import { call, put, select, takeEvery } from "redux-saga/effects";
import { converterApi } from "@api/converterApi";
import {
  REQUEST_FOR_CURRENCY,
  geolocationRequest,
  initData,
  initBaseCurrency,
  updateInputedValue,
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
    const updatedValues = yield convertBeforInput(
      inputedValues[0],
      rate.base,
      rate.rates,
      inputedValues
    );
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

    yield put(updateInputedValue(updatedValues));
    if (!localStorageData) {
      yield put(initBaseCurrency(currencyResponce.base));
    }
  } catch (e) {
    console.log("Error ", e);
  }
}
