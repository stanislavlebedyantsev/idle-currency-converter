import { all } from "redux-saga/effects";
import { getChartsWatcher } from "./chartsSagas";
import { getCurrencyRateWatcher } from "./converterSagas";
import { getGeolocationWatcher } from "./geolocationSagas";

export function* rootSaga() {
  yield all([getCurrencyRateWatcher(), getChartsWatcher(), getGeolocationWatcher()]);
}
