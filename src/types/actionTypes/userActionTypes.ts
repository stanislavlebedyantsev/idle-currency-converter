import { IUserData } from 'src/types/reducersTypes';

export const SIGN_IN_GOOGLE_REQUEST = 'SIGN_IN_GOOGLE_REQUEST';
export const SIGN_IN_EMAIL_REQUEST = 'SIGN_IN_EMAIL_REQUEST';
export const REGISTRATE_EMAIL_REQUEST = 'REGISTRATE_EMAIL_REQUEST';
export const SIGN_OUT_REQUEST = 'SIGN_OUT_REQUEST';
export const SAVE_USER_DATA = 'SAVE_USER_DATA';
export const REMOVE_USER_DATA = 'REMOVE_USER_DATA';

type TUserAuthData = {
  email: string;
  password: string;
};

interface ISignInGoogleAuthRequest {
  type: typeof SIGN_IN_GOOGLE_REQUEST;
}
interface ISignInEmailAuthRequest {
  type: typeof SIGN_IN_EMAIL_REQUEST;
  payload: TUserAuthData;
}
interface IRegistateEmailAuthRequest {
  type: typeof REGISTRATE_EMAIL_REQUEST;
  payload: TUserAuthData;
}
interface ISaveUserData {
  type: typeof SAVE_USER_DATA;
	payload: IUserData;
}
interface IRemoveUserData {
  type: typeof REMOVE_USER_DATA;
}
interface ISignOutRequest {
  type: typeof SIGN_OUT_REQUEST;
}

export type TUserActionTypes =
  | ISignInGoogleAuthRequest
  | ISignInEmailAuthRequest
  | IRegistateEmailAuthRequest
  | ISaveUserData
  | IRemoveUserData
  | ISignOutRequest;
