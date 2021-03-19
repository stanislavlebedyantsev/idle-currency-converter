import { ForkEffect, put, PutEffect, takeEvery } from 'redux-saga/effects';
import {
  SIGN_IN_GOOGLE_REQUEST,
  SIGN_OUT_REQUEST,
  REGISTRATE_EMAIL_REQUEST,
  SIGN_IN_EMAIL_REQUEST,
  TUserActionTypes,
  TErrorActionTypes,
  ISignInEmailAuthRequest,
  IRegistateEmailAuthRequest,
} from '@/types/actionTypes';
import { saveUserData, removeUserData, setError } from '@/actions';
import {
  signInByGoogleAuthFirebase,
  signOutFirebase,
  signInByEmailAuthFirebase,
  createUserWithEmailAndPassword,
} from '@/utils/';
import firebase from '@/utils/firebase/firebase';

type TGeneratorTypes =
  | Promise<firebase.auth.UserCredential | firebase.User | null>
  | PutEffect<TUserActionTypes>
  | PutEffect<TErrorActionTypes>
  | Promise<void>;

function* userSignInGoogleAuth(): Generator<TGeneratorTypes, void, never> {
  try {
    const userData = yield signInByGoogleAuthFirebase();
    yield put(saveUserData(userData));
  } catch (e) {
    yield put(setError(e));
  }
}

function* userSignOutGoogleAuth(): Generator<TGeneratorTypes, void, unknown> {
  try {
    yield signOutFirebase();
    yield put(removeUserData());
  } catch (e) {
    yield put(setError(e));
  }
}

function* userSignInEmailAuth({
  payload,
}: ISignInEmailAuthRequest): Generator<TGeneratorTypes, void, never> {
  try {
    const userData = yield signInByEmailAuthFirebase(
      payload.email,
      payload.password
    );
    yield put(saveUserData(userData));
  } catch (e) {
    yield put(setError(e));
  }
}
function* registrateByEmailAndPassword({
  payload,
}: IRegistateEmailAuthRequest) {
  try {
    yield createUserWithEmailAndPassword(payload.email, payload.password);
  } catch (e) {
    yield put(setError(e));
  }
}

export function* userRequestsWatcher(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeEvery(SIGN_IN_GOOGLE_REQUEST, userSignInGoogleAuth);
  yield takeEvery(SIGN_OUT_REQUEST, userSignOutGoogleAuth);
  yield takeEvery(SIGN_IN_EMAIL_REQUEST, userSignInEmailAuth);
  yield takeEvery(REGISTRATE_EMAIL_REQUEST, registrateByEmailAndPassword);
}
