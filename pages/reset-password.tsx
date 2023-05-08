import Head from 'next/head';
import React, { useMemo } from 'react';
import Layout from '../components/layout/Layout';
import { Input, styled, useInput } from '@nextui-org/react';
import { HelperType } from '../utils/form/nextUiTypes';
import { validateEmail } from '../utils/form/validateEmail';

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
});

const MiddleContainer = styled('div', {
  width: 'min(600px, 80%)',
  display: 'flex',
  alignSelf: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  // justifyContent: 'center',
  flexGrow: 1,
  backgroundColor: 'white',
  borderRadius: '$md',
  margin: '1rem',
  padding: '1rem',
});

export default function ResetPassword() {
  const {
    value: emailValue,
    bindings: { onChange: onChangeEmail },
  } = useInput('');
  const helperEmail: HelperType = useMemo(() => validateEmail(emailValue), [emailValue]);

  return (
    <>
      <Head>
        <title>Talebound - reset password</title>
      </Head>
      <Layout>
        <MiddleContainer>
          <Header>Recover password</Header>

          <RegisterLabel id="reg-email">
            Email
            <Input
              onChange={onChangeEmail}
              type="text"
              name="reg-email"
              id="reg-email"
              fullWidth
              clearable
              required
              shadow={false}
              animated={false}
              helperColor={helperEmail.color}
              helperText={helperEmail.text}
              aria-labelledby="reg-email"
            />
          </RegisterLabel>
        </MiddleContainer>
      </Layout>
    </>
  );
}
