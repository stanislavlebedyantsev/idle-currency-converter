import { call, put, takeEvery } from "redux-saga/effects";
import { filterCountryList } from "@utils/map/index";
import {
  REQUEST_FOR_COUNRY_DATA,
  REQUEST_FOR_COUNRY_LIST,
  updateCountryData,
  updateCountryList,
  requestForCountryData
} from "@actions/index";
import { mapApi } from "@api/index";

export function* countryDataWatcher() {
  yield takeEvery(REQUEST_FOR_COUNRY_DATA, getCountryData);
  yield takeEvery(REQUEST_FOR_COUNRY_LIST, getCountryList);
}

function* getCountryData(action) {
  try {
    const countryData = yield call(mapApi.fetchCountryData, action.payload);
    yield put(updateCountryData(countryData[0]));
  } catch (e) {
    console.log(e);
  }
}

function* getCountryList() {
  try {
    const countryList = yield call(mapApi.fetchCountryList);
    const filtredList = yield filterCountryList(countryList);
    yield put(requestForCountryData('Belarus'))
    yield put(updateCountryList(filtredList));
  } catch (e) {
    console.log(e);
  }
}
