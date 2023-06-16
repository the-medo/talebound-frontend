import Head from 'next/head';
import React, { useCallback, useMemo } from 'react';
import Layout from '../components/Layout/Layout';
import { HelperType } from '../utils/form/nextUiTypes';
import { validateEmail } from '../utils/form/validateEmail';
import ReCaptcha from 'react-google-recaptcha';
import { getRecaptchaSiteKey } from '../utils/functions/config';
import { useResetPassword } from '../api/useResetPassword';
import { styled } from '../styles/stitches.config';
import { useInput } from '../hooks/useInput';
import Input from '../components/Input/Input';
import { Button } from '../components/Button/Button';
import { Text } from '../components/Typography/Text';
import { TitleH3 } from '../components/Typography/Title';

const RegisterLabel = styled('label', {
  color: '$primary800',
  fontFamily: '$heading',
  fontSize: '$md',
  textTransform: 'uppercase',
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

export default function ResetPassword() {
  const { value: emailValue, onChange: onChangeEmail } = useInput('');
  const helperEmail: HelperType = useMemo(() => validateEmail(emailValue), [emailValue]);

  const resetPasswordSendCode = useResetPassword();

  console.log('process.env.RECAPTCHA_SITE_KEY', process.env.RECAPTCHA_SITE_KEY);

  const buttonDisabled = false;

  const submitResetPassword = useCallback(() => {
    if (buttonDisabled) return;
    if (emailValue === '') return;

    resetPasswordSendCode.mutate({
      email: emailValue,
    });
  }, [buttonDisabled, emailValue]);

  return (
    <>
      <Head>
        <title>Talebound - reset password</title>
      </Head>
      <Layout mandatoryLoggedOut={true}>
        <MiddleContainer>
          <TitleH3>Recover password</TitleH3>

          {resetPasswordSendCode.isSuccess && (
            <>
              <h5>Success!</h5>
              <h5> Email should arrive shortly.</h5>
            </>
          )}
          {!resetPasswordSendCode.isSuccess && (
            <>
              <RegisterLabel id="reg-email">
                Email
                <Input
                  onChange={onChangeEmail}
                  type="text"
                  name="reg-email"
                  id="reg-email"
                  fullWidth
                  required
                  // helperColor={helperEmail.color}
                  // helperText={helperEmail.text}
                  aria-labelledby="reg-email"
                />
              </RegisterLabel>
              <ReCaptcha sitekey={getRecaptchaSiteKey()} />
              <Button
                color="primary"
                size="md"
                onClick={submitResetPassword}
                disabled={buttonDisabled}
              >
                <Text weight="bold" size="lg" color="white">
                  {resetPasswordSendCode.isLoading ? 'Sending...' : 'Send reset link'}
                </Text>
              </Button>

              {resetPasswordSendCode.isError && (
                <Text color="danger">
                  Error when recovering password. Please refresh and try again. If the problem
                  persists, please contact support at support@talebound.net
                </Text>
              )}
            </>
          )}
        </MiddleContainer>
      </Layout>
    </>
  );
}
