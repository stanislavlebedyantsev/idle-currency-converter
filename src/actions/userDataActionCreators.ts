import {
  SIGN_IN_GOOGLE_REQUEST,
  SIGN_IN_EMAIL_REQUEST,
  REGISTRATE_EMAIL_REQUEST,
  SIGN_OUT_REQUEST,
  SAVE_USER_DATA,
  REMOVE_USER_DATA,
  TUserActionTypes,
} from '@/types/actionTypes';

import { IUserData } from 'src/types/reducersTypes';

export const signInGoogleAuthRequest = (): TUserActionTypes => ({
  type: SIGN_IN_GOOGLE_REQUEST,
});
export const signInEmailAuthRequest = (
  email: string,
  password: string
): TUserActionTypes => ({
  type: SIGN_IN_EMAIL_REQUEST,
  payload: { email, password },
});
export const registateEmailAuthRequest = (
  email: string,
  password: string
): TUserActionTypes => ({
  type: REGISTRATE_EMAIL_REQUEST,
  payload: { email, password },
});

export const saveUserData = (userData: IUserData): TUserActionTypes => ({
  type: SAVE_USER_DATA,
  payload: userData,
});

export const removeUserData = (): TUserActionTypes => ({
  type: REMOVE_USER_DATA,
});

export const signOutRequest = (): TUserActionTypes => ({
  type: SIGN_OUT_REQUEST,
});
