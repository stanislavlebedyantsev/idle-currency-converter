import {
  call,
  put,
  select,
  takeEvery,
  CallEffect,
  PutEffect,
  SimpleEffect,
  SelectEffectDescriptor,
} from 'redux-saga/effects';
import { converterApi } from '@/api/index';
import {
  geolocationRequest,
  currencyRateResponce,
  initBaseCurrency,
  updateInputedValue,
  setError,
  uploadRatesRequest,
} from '@/actions';
import {
  CURRENCY_RATES_REQUEST,
  TConverterActionTypes,
} from '@/types/actionTypes/converterActionTypes';
import {
  getLastFirebaseDatabase,
  convertBeforInput,
  checkLastUpload,
} from '@/utils';
import { IInputedCurrenciesValues, IRateReducer } from '@/types/reducersTypes';
import { TErrorActionTypes, TFirebaseActionTypes } from '@/types/actionTypes';

type TGeneratorTypes =
  | Promise<IRateReducer>
  | PutEffect<TConverterActionTypes | TFirebaseActionTypes | TErrorActionTypes>
  | CallEffect<IRateReducer>
  | Array<IInputedCurrenciesValues>
  | SimpleEffect<'SELECT', SelectEffectDescriptor>
  | Promise<boolean | unknown[]>
  | boolean;

function* getCurrencyRates(): Generator<TGeneratorTypes, void, any> {
  try {
    //currency request
    const currencyResponce: IRateReducer = yield call(
      converterApi.fetchCurrencyRate
    );
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
      yield put(initBaseCurrency());
    }
  } catch (e) {
    yield put(setError(e));
  }
}

export function* getCurrencyRateWatcher(): Generator<unknown, void, unknown> {
  yield takeEvery(CURRENCY_RATES_REQUEST, getCurrencyRates);
}
