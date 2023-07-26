import { HelperMessage, helperOK, HelperType } from './helperTypes';

const passwordHelperOK: HelperMessage = {
  ...helperOK,
  text: '(6 - 100 characters)',
};

const passwordAgainHelperOK: HelperMessage = helperOK;

export const validatePassword = (password: string): HelperMessage => {
  if (!password) return passwordHelperOK;

  const isValidLength = password.length >= 6 && password.length <= 100;
  if (!isValidLength) {
    return {
      text: 'Needs to be between 6 and 100 characters',
      type: HelperType.Danger,
    };
  }

  return passwordHelperOK;
};

export const validatePasswordAgain = (password1: string, password2: string): HelperMessage => {
  if (!password1) return passwordAgainHelperOK;
  if (!password2) return passwordAgainHelperOK;

  if (password1 !== password2) {
    return {
      text: "Passwords don't match",
      type: HelperType.Danger,
    };
  }

  return passwordAgainHelperOK;
};
