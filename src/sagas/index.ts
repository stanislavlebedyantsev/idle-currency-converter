import { all } from 'redux-saga/effects';
import { getChartsWatcher } from './chartsSagas';
import { countryDataWatcher } from './mapSagas';
import { getCurrencyRateWatcher } from './converterSagas';
import { getGeolocationWatcher } from './geolocationSagas';
import { userRequestsWatcher } from './userSagas';

export function* rootSaga(): Generator<unknown, void, unknown> {
  yield all([
    getCurrencyRateWatcher(),
    getChartsWatcher(),
    getGeolocationWatcher(),
    countryDataWatcher(),
    userRequestsWatcher(),
  ]);
}
