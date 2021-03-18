/* eslint-disable no-useless-escape */
export const emailValidator = (email: string): string => {
  return email &&
    !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      email
    )
    ? 'Incorrect email'
    : '';
};

export const matchingPasswordsValidator = (
  password: string,
  passwordConfirm: string
): string => {
  return password !== passwordConfirm ? 'Password are different' : '';
};

export const passwordLengthValidation = (password: string): string => {
  return password.length < 6 && password.length
    ? 'Password should be at least 6 characters'
    : '';
};
