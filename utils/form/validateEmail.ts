import { helperOK, HelperType } from './nextUiTypes';

export const validateEmailRegex = (value: string) => {
  return value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
};

export const validateEmail = (email: string): HelperType => {
  if (!email) return helperOK;

  const isValidRegex = validateEmailRegex(email);
  if (!isValidRegex) {
    return {
      text: 'Enter valid email',
      color: 'error',
    };
  }

  const isValidLength = email.length >= 6 && email.length <= 200;
  if (!isValidLength) {
    return {
      text: 'Needs to be between 6 and 200 characters',
      color: 'error',
    };
  }

  return helperOK;
};
