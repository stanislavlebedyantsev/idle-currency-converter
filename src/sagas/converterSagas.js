import { call, put, select, takeEvery } from 'redux-saga/effects';
import { converterApi } from '@/api/index';
import {
  geolocationRequest,
  currencyRateResponce,
  initBaseCurrency,
  updateInputedValue,
  setError,
  removeError,
  uploadRatesRequest,
} from '@/actions/';
import { CURRENCY_RATES_REQUEST } from '@/types/actionTypes/converterActionTypes';
import {
  getLastFirebaseDatabase,
  convertBeforInput,
  checkLastUpload,
} from '@/utils/';

function* getCurrencyRates() {
  try {
    //currency request
    const currencyResponce = yield call(converterApi.fetchCurrencyRate);
    if (!Object.keys(currencyResponce).length) {
      throw new Error(
        'Something goes wrong. We cant found all rates. Try again later'
      );
    }
    const localStorageData = localStorage.getItem('state');
    //geolocation request
    yield put(geolocationRequest());
    yield put(currencyRateResponce(currencyResponce));
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
        yield put(uploadRatesRequest());
      }
    } else {
      yield put(uploadRatesRequest());
    }

    if (!localStorageData || !inputedValues.length) {
      yield put(initBaseCurrency(currencyResponce?.base));
    }
    yield put(removeError());
  } catch (e) {
    yield put(setError(e));
  }
}

export function* getCurrencyRateWatcher() {
  yield takeEvery(CURRENCY_RATES_REQUEST, getCurrencyRates);
}
