import Head from 'next/head';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Text } from '@nextui-org/react';
import {
  useResetPasswordVerifyCode,
  useResetPasswordVerifyCodeValidity,
} from '../api/useResetPassword';
import { useRouter } from 'next/router';
import PasswordChangeInputs, {
  PasswordChangeStatus,
} from '../components/PasswordChangeInputs/PasswordChangeInputs';
import Layout from '../components/Layout/Layout';
import { styled } from '../styles/stitches.config';
import Loading from '../components/Loading/Loading';
import { Row } from '../components/Flex/Flex';
import { Button } from '../components/Button/Button';

const Header = styled('h3', {
  fontFamily: '$heading',
  color: '$primary',
  textDecoration: 'underline',
  '@media(max-width: 400px)': {
    fontSize: '$lg',
  },
});

const MiddleContainer = styled('div', {
  width: 'min(600px, 80%)',
  display: 'flex',
  alignSelf: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  // flexGrow: 1,
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

  const [passwordValue, setPasswordValue] = React.useState<string>('');
  const [externalButtonDisabled, setExternalButtonDisabled] = React.useState<boolean>(true);

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
    () => resetPassword.isLoading || externalButtonDisabled,
    [resetPassword.isLoading, externalButtonDisabled],
  );

  const submitResetPassword = useCallback(() => {
    if (buttonDisabled) return;
    if (secretCode.length === 0) return;

    resetPassword.mutate({
      secretCode,
      newPassword: passwordValue,
    });
  }, [buttonDisabled, resetPassword, secretCode, passwordValue]);

  const display: PasswordChangeStatus = useMemo(() => {
    if (resetPassword.isSuccess) return PasswordChangeStatus.PasswordSuccess;
    if (resetPasswordVerifyCodeValidity.isLoading) return PasswordChangeStatus.CodeVerify;
    if (resetPasswordVerifyCodeValidity.isError || wrongCodeParam || !codeValid)
      return PasswordChangeStatus.CodeInvalid;
    return PasswordChangeStatus.PasswordForm;
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
      <Layout mandatoryLoggedOut={true} centered>
        <MiddleContainer>
          <Header>Reset password</Header>
          {display === PasswordChangeStatus.PasswordSuccess && (
            <h5>Success! You can now sign in.</h5>
          )}
          {display === PasswordChangeStatus.CodeVerify && (
            <Row>
              <Loading color="secondary" />
              Verifying code...
            </Row>
          )}
          {display === PasswordChangeStatus.CodeInvalid && (
            <h5>Code is invalid or expired. Please try again</h5>
          )}
          {display === PasswordChangeStatus.PasswordForm && (
            <>
              <PasswordChangeInputs
                display={display}
                setPasswordValue={setPasswordValue}
                setButtonDisabled={setExternalButtonDisabled}
                successMessage="Success! You can now sign in."
              />
              <Button disabled={buttonDisabled} size="md" onClick={submitResetPassword}>
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
