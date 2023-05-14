import React, { useEffect, useMemo } from 'react';
import { Button, Input, Loading, styled, Text, useInput } from '@nextui-org/react';
import { HelperType } from '../../utils/form/nextUiTypes';
import { validatePassword, validatePasswordAgain } from '../../utils/form/validatePassword';

const RegisterLabel = styled('label', {
  color: '$primary800',
  fontFamily: '$heading',
  fontSize: '$md',
  textTransform: 'uppercase',
  width: 'min(75%, 20rem)',
  marginBottom: '$md',
});

export enum PasswordChangeStatus {
  PasswordSuccess = 'password-success',
  CodeVerify = 'code-verify',
  CodeInvalid = 'code-invalid',
  PasswordForm = 'password-form',
}

interface PasswordChangeInputsProps {
  display: PasswordChangeStatus;
  setPasswordValue?: React.Dispatch<React.SetStateAction<string>>;
  setButtonDisabled?: React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordChangeInputs: React.FC<PasswordChangeInputsProps> = ({
  display,
  setPasswordValue,
  setButtonDisabled,
}) => {
  const {
    value: password1Value,
    bindings: { onChange: onChangePassword1 },
  } = useInput('');

  const {
    value: password2Value,
    bindings: { onChange: onChangePassword2 },
  } = useInput('');

  const helperPassword1: HelperType = useMemo(
    () => validatePassword(password1Value),
    [password1Value],
  );
  const helperPassword2: HelperType = useMemo(
    () => validatePasswordAgain(password1Value, password2Value),
    [password1Value, password2Value],
  );

  useEffect(() => {
    if (setPasswordValue) setPasswordValue(password1Value);
  }, [password1Value, setPasswordValue]);

  const buttonDisabled = useMemo(
    () =>
      password1Value === '' ||
      password2Value === '' ||
      password1Value !== password2Value ||
      password1Value.length < 6,
    [password1Value, password2Value],
  );

  useEffect(() => {
    if (setButtonDisabled) setButtonDisabled(buttonDisabled);
  }, [buttonDisabled, setButtonDisabled]);

  return (
    <>
      {display === PasswordChangeStatus.PasswordSuccess && <h5>Success! You can now sign in.</h5>}
      {display === PasswordChangeStatus.CodeVerify && (
        <Loading color="secondary">Verifying code...</Loading>
      )}
      {display === PasswordChangeStatus.CodeInvalid && (
        <h5>Code is invalid or expired. Please try again</h5>
      )}
      {display === PasswordChangeStatus.PasswordForm && (
        <>
          <RegisterLabel id="reg-pass1">
            Password
            <Input.Password
              onChange={onChangePassword1}
              name="reg-pass1"
              id="reg-pass1"
              fullWidth
              required
              shadow={false}
              animated={false}
              helperColor={helperPassword1.color}
              helperText={helperPassword1.text}
              aria-labelledby="reg-pass1"
            />
          </RegisterLabel>
          <RegisterLabel id="reg-pass2">
            Password again
            <Input.Password
              onChange={onChangePassword2}
              name="reg-pass2"
              id="reg-pass2"
              fullWidth
              required
              shadow={false}
              animated={false}
              helperColor={helperPassword2.color}
              helperText={helperPassword2.text}
              aria-labelledby="reg-pass2"
            />
          </RegisterLabel>
        </>
      )}
    </>
  );
};

export default PasswordChangeInputs;
