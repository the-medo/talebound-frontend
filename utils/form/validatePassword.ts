import { helperOK, HelperType } from './nextUiTypes';

const passwordHelperOK: HelperType = {
  ...helperOK,
  text: '(6 - 100 characters)',
};

const passwordAgainHelperOK: HelperType = helperOK;

export const validatePassword = (password: string): HelperType => {
  if (!password) return passwordHelperOK;

  const isValidLength = password.length >= 6 && password.length <= 100;
  if (!isValidLength) {
    return {
      text: 'Needs to be between 6 and 100 characters',
      color: 'error',
    };
  }

  return passwordHelperOK;
};

export const validatePasswordAgain = (password1: string, password2: string): HelperType => {
  if (!password1) return passwordAgainHelperOK;
  if (!password2) return passwordAgainHelperOK;

  if (password1 !== password2) {
    return {
      text: "Passwords don't match",
      color: 'error',
    };
  }

  return passwordAgainHelperOK;
};
