export const SIGN_IN_GOOGLE_REQUEST = 'SIGN_IN_GOOGLE_REQUEST';
export const SIGN_IN_EMAIL_REQUEST = 'SIGN_IN_EMAIL_REQUEST';
export const REGISTRATE_EMAIL_REQUEST = 'REGISTRATE_EMAIL_REQUEST';
export const SIGN_OUT_REQUEST = 'SIGN_OUT_REQUEST';
export const SAVE_USER_DATA = 'SAVE_USER_DATA';
export const REMOVE_USER_DATA = 'REMOVE_USER_DATA';

export const signInGoogleAuthRequest = () => ({
  type: SIGN_IN_GOOGLE_REQUEST,
});
export const signInEmailAuthRequest = (email, password) => ({
  type: SIGN_IN_EMAIL_REQUEST,
  payload: { email, password },
});
export const registateEmailAuthRequest = (email, password) => ({
  type: REGISTRATE_EMAIL_REQUEST,
  payload: { email, password },
});

export const saveUserData = (userData) => ({
  type: SAVE_USER_DATA,
  payload: userData,
});

export const removeUserData = () => ({
  type: REMOVE_USER_DATA,
});

export const signOutRequest = () => ({
  type: SIGN_OUT_REQUEST,
});
