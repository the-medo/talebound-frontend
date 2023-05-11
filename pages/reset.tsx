import Head from 'next/head';
import React, { useCallback, useEffect, useMemo } from 'react';
import Layout from '../components/layout/Layout';
import { Button, Input, Loading, styled, Text, useInput } from '@nextui-org/react';
import {
  useResetPasswordVerifyCode,
  useResetPasswordVerifyCodeValidity,
} from '../api/useResetPassword';
import { useRouter } from 'next/router';
import { HelperType } from '../utils/form/nextUiTypes';
import { validatePassword, validatePasswordAgain } from '../utils/form/validatePassword';

const Header = styled('h3', {
  fontFamily: '$heading',
  color: '$primary',
  textDecoration: 'underline',
  '@media(max-width: 400px)': {
    fontSize: '$lg',
  },
});

const RegisterLabel = styled('label', {
  color: '$primary800',
  fontFamily: '$heading',
  fontSize: '$md',
  textTransform: 'uppercase',
  width: '75%',
  marginBottom: '$md',
});

const MiddleContainer = styled('div', {
  width: 'min(600px, 80%)',
  display: 'flex',
  alignSelf: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  flexGrow: 1,
  backgroundColor: 'white',
  borderRadius: '$md',
  margin: '1rem',
  padding: '1rem',
  gap: '1rem',
});

export default function ResetPasswordVerify() {
  const router = useRouter();
  const { code } = router.query;

  const [codeValid, setCodeValid] = React.useState<boolean>();
  const [wrongCodeParam, setWrongCodeParam] = React.useState<boolean>(false);

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

  const resetPassword = useResetPasswordVerifyCode();
  const resetPasswordVerifyCodeValidity = useResetPasswordVerifyCodeValidity({
    onSuccess: ({ data }) => {
      setCodeValid(data.success);
    },
  });

  const secretCode = useMemo(() => {
    if (typeof code === 'string' && code.length > 0) {
      setWrongCodeParam(false);
      return code;
    }
    setWrongCodeParam(true);
    return '';
  }, [code]);

  useEffect(() => {
    if (secretCode.length > 0) {
      resetPasswordVerifyCodeValidity.mutate(secretCode);
    }
  }, [secretCode]);

  const buttonDisabled = useMemo(
    () =>
      resetPassword.isLoading ||
      password1Value === '' ||
      password2Value === '' ||
      password1Value !== password2Value ||
      password1Value.length < 6,
    [resetPassword.isLoading, password1Value, password2Value],
  );

  const submitResetPassword = useCallback(() => {
    if (buttonDisabled) return;
    if (secretCode.length === 0) return;

    resetPassword.mutate({
      secretCode,
      newPassword: password1Value,
    });
  }, [buttonDisabled, secretCode, password1Value]);

  const display = useMemo(() => {
    if (resetPassword.isSuccess) return 'password-success';
    if (resetPasswordVerifyCodeValidity.isLoading) return 'code-verify';
    if (resetPasswordVerifyCodeValidity.isError || wrongCodeParam || !codeValid)
      return 'code-invalid';
    return 'password-form';
  }, [
    resetPassword.isSuccess,
    resetPasswordVerifyCodeValidity.isLoading,
    resetPasswordVerifyCodeValidity.isError,
    wrongCodeParam,
    codeValid,
  ]);

  return (
    <>
      <Head>
        <title>Talebound - reset password</title>
      </Head>
      <Layout mandatoryLoggedOut={true}>
        <MiddleContainer>
          <Header>Reset password</Header>
          {display === 'password-success' && <h5>Success! You can now sign in.</h5>}
          {display === 'code-verify' && <Loading color="secondary">Verifying code...</Loading>}
          {display === 'code-invalid' && <h5>Code is invalid or expired. Please try again</h5>}
          {display === 'password-form' && (
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
              <Button
                color="primary"
                auto
                size="md"
                onPress={submitResetPassword}
                css={{
                  opacity: !buttonDisabled ? '1' : '0.5',
                  '&:hover': {
                    opacity: !buttonDisabled ? '0.8' : '0.5',
                  },
                }}
              >
                {resetPassword.isLoading ? (
                  <Loading color="currentColor" size="sm" />
                ) : (
                  <Text b size="$lg" color="$white">
                    Save
                  </Text>
                )}
              </Button>

              {resetPassword.isError && (
                <Text color="error">
                  Error when resetting password. Please check the fields and try again.
                </Text>
              )}
            </>
          )}
        </MiddleContainer>
      </Layout>
    </>
  );
}
