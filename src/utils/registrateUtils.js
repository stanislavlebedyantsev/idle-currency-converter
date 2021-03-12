/* eslint-disable no-useless-escape */
export const emailValidator = (email) => {
  return email &&
    !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      email
    )
    ? 'The email address is badly formatted.'
    : undefined;
};

export const passwordValidator = (password, passwordConfirm) => {
  if (password !== passwordConfirm) {
    return 'Password are different';
  }
  if (password.length < 6 && passwordConfirm.length < 6) {
    return 'Password should be at least 6 characters';
  }
  return undefined;
};
