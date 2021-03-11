import { call, put, select, takeEvery } from 'redux-saga/effects';
import {
  SIGN_IN_GOOGLE_REQUEST,
  SIGN_OUT_REQUEST,
  REGISTRATE_EMAIL_REQUEST,
  SIGN_IN_EMAIL_REQUEST,
  saveUserData,
  removeUserData,
  registateEmailAuthRequest,
  signInEmailAuthRequest,
  setError,
} from '@/actions/';
import {
  signInByGoogleAuthFirebase,
  signOutFirebase,
  signInByEmailAuthFirebase,
  createUserWithEmailAndPassword,
} from '@/utils/';

function* userSignInGoogleAuth() {
  const userData = yield signInByGoogleAuthFirebase();
  yield put(saveUserData(userData));
}

function* userSignOutGoogleAuth() {
  yield signOutFirebase();
  yield put(removeUserData());
}

function* userSignInEmailAuth({ payload }) {
  try {
    const userData = yield signInByEmailAuthFirebase(
      payload.email,
      payload.password
    );
    yield put(saveUserData(userData));
  } catch (e) {
    if (e.code.includes('user-not-found')) {
      yield put(registateEmailAuthRequest(payload.email, payload.password));
    } else {
      yield put(setError(e.message));
    }
  }
}
function* registrateByEmailAndPassword({ payload }) {
  try {
    yield createUserWithEmailAndPassword(payload.email, payload.password);
    yield put(signInEmailAuthRequest(payload.email, payload.password));
  } catch (e) {
    yield put(setError(e.message));
  }
}

export function* userRequestsWatcher() {
  yield takeEvery(SIGN_IN_GOOGLE_REQUEST, userSignInGoogleAuth);
  yield takeEvery(SIGN_OUT_REQUEST, userSignOutGoogleAuth);
  yield takeEvery(SIGN_IN_EMAIL_REQUEST, userSignInEmailAuth);
  yield takeEvery(REGISTRATE_EMAIL_REQUEST, registrateByEmailAndPassword);
}
