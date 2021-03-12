/* eslint-disable no-useless-escape */
export const emailValidator = (email) => {
  return email &&
    !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      email
    )
    ? 'Incorrect email'
    : '';
};

export const matchingPasswordsValidator = (password, passwordConfirm) => {
  return password !== passwordConfirm ? 'Password are different' : '';
};

export const passwordLengthValidation = (password) => {
  return password.length < 6 && password.length
    ? 'Password should be at least 6 characters'
    : '';
};
