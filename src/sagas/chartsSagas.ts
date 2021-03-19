import {
  put,
  select,
  takeEvery,
  SimpleEffect,
  SelectEffectDescriptor,
  PutEffect,
} from 'redux-saga/effects';
import { chartsUploadMapper, predisplayedChartsMapper } from '@/utils/';
import {
  UPLOAD_RATES_REQUEST,
  REQUEST_FOR_GET_LAST_VALUE_DATABASE,
  REQUEST_FOR_GET_VALUES_DATABASE,
} from '@/types/actionTypes';
import { initChartsData, changeDispayCharsData, setError } from '@/actions/';
import { pushFirebaseDatabase, getValuesFirebaseDatabase } from '@/utils/';
import {
  ILocalCurrency,
  IRatesHistory,
  IMappedRates,
} from '@/types/reducersTypes';
import { TChartActionTypes, TErrorActionTypes } from '@/types/actionTypes/';

type TGeneratorTypes =
  | Promise<void | unknown[]>
  | ILocalCurrency
  | SimpleEffect<'SELECT', SelectEffectDescriptor>
  | IMappedRates[]
  | PutEffect<TChartActionTypes | TErrorActionTypes>
  | IRatesHistory
  | void;

function* getAllValuesFromDatabase(): Generator<TGeneratorTypes, void, never> {
  try {
    const allRates: IRatesHistory[] = yield getValuesFirebaseDatabase();
    const localCurr: ILocalCurrency = yield select(
      (state) => state.converter.localCurrency
    );
    if (!allRates && !localCurr) {
      throw new Error('We cant load data. Try again later');
    }
    const mappedDisplayCurrency = yield predisplayedChartsMapper(
      localCurr.code,
      allRates
    );
    //here call action for put values in state
    yield put(initChartsData(allRates));
    yield put(changeDispayCharsData(mappedDisplayCurrency));
  } catch (e) {
    yield put(setError(e));
  }
}

function* pushValueToDatabase(): Generator<TGeneratorTypes, void, never> {
  try {
    const { rate } = yield select((state) => state.converter);
    const { rates } = rate;
    const ratesForCharts = yield chartsUploadMapper(rates);
    yield pushFirebaseDatabase(ratesForCharts);
  } catch (e) {
    yield put(setError(e));
  }
}
export function* getChartsWatcher(): Generator<unknown, void, unknown> {
  yield takeEvery(UPLOAD_RATES_REQUEST, pushValueToDatabase);
  yield takeEvery(REQUEST_FOR_GET_LAST_VALUE_DATABASE, pushValueToDatabase);
  yield takeEvery(REQUEST_FOR_GET_VALUES_DATABASE, getAllValuesFromDatabase);
}
