import { call, put, takeEvery } from "redux-saga/effects";
import { geolocationApi } from "@api/geolocationApi";
import {
  REQUEST_FOR_GEOLOCATION,
  setCurrentGeolocation,
} from "@actions/index";

export function* getGeolocationWatcher() {
  yield takeEvery(REQUEST_FOR_GEOLOCATION, getGeolocation);
}

function* getGeolocation() {
  try {
    const geolocationResponce = yield call(geolocationApi.fetchGeolocation);
    yield put(setCurrentGeolocation(geolocationResponce));
  } catch (e) {}
}
