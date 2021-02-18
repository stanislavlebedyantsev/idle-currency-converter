import {call, fork, put, take} from 'redux-saga/effects'
import { converterApi } from '@api/converterApi';
import { REQUEST_FOR_CURRENCY } from '@constants/actions';
import { getData } from '@actions/converterActionCreators';

export function* getCurrencyRateWatcher(){
  yield take(REQUEST_FOR_CURRENCY)
  yield fork(getCurrencyRate)
}

function* getCurrencyRate(){
  try{
    const responce = yield call(converterApi.fetchCurrencyRate)
    yield put(getData(responce))
  }catch(e){
    console.log('Error ', e);
  }
}

export function* rootSaga(){
  yield call(getCurrencyRateWatcher)
}