import React, { useCallback, useMemo } from 'react';
import { styled, Text, useInput, Button } from '@nextui-org/react';
import { VerticalSemitransparent } from '../global/VerticalSemitransparent';
import { InputTransparent, PasswordTransparent } from '../global/InputTransparent';
import Link from 'next/link';
import { useLogin } from '../../api/useLogin';

const LoginBox = styled(VerticalSemitransparent, {
  position: 'absolute',
  top: '50%',
  right: '0',
  transform: 'translate(0, -50%)',
  padding: '$2xl $md',
  fontWeight: '$bold',
  fontSize: '$xl',
  color: '$primary800',
  textDecoration: 'none',
  width: '200px',

  '@media (max-width: 600px)': {
    bottom: '0',
    top: '100px',
    right: '0',
    transform: 'translate(0, 0)',
    width: '100%',
    gap: '$md',
    justifyContent: 'flex-end',

    '& h3': {
      marginBottom: '$0',
      display: 'none',
    },

    [`& ${InputTransparent}`]: {
      maxWidth: '400px',
      width: '75%',
    },
  },
});

const LoginButtonWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$xs',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',

  '@media (max-width: 600px)': {
    flexDirection: 'row',
    gap: '$lg',
    fontSize: '$lg',
    lineHeight: '$fontSize$lg',

    '& p': {
      fontSize: '$sm',
      lineHeight: '$fontSize$sm',
    },
  },
});

const Login: React.FC = () => {
  const login = useLogin();

  const {
    value: usernameValue,
    bindings: { onChange: onChangeUsername },
  } = useInput('');

  const {
    value: passwordValue,
    bindings: { onChange: onChangePassword },
  } = useInput('');

  const buttonDisabled = useMemo(
    () => !passwordValue || !usernameValue || login.isLoading,
    [login, passwordValue, usernameValue],
  );

  const submitLogin = useCallback(() => {
    if (usernameValue === '' || passwordValue === '') return;

    login.mutate({
      username: usernameValue,
      password: passwordValue,
    });
  }, [usernameValue, passwordValue]);

  return (
    <LoginBox>
      <h3 id="login">Login</h3>
      <InputTransparent
        onChange={onChangeUsername}
        aria-labelledby="login"
        placeholder="Username"
        fullWidth
        clearable
        required
        shadow={false}
        animated={false}
      />
      <PasswordTransparent
        onChange={onChangePassword}
        aria-labelledby="login"
        placeholder="Password"
        fullWidth
        required
        shadow={false}
        animated={false}
      />
      <LoginButtonWrapper>
        <Button
          color="primary"
          auto
          size="md"
          onPress={submitLogin}
          css={{
            opacity: !buttonDisabled ? '1' : '0.5',
            '&:hover': {
              opacity: !buttonDisabled ? '0.8' : '0.5',
            },
          }}
        >
          <Text b size="$lg" color="$white">
            {login.isLoading ? 'Signing in...' : 'Sign in'}
          </Text>
        </Button>
        <Text size="$sm">or</Text>
        <Link href="/#register">Sign up</Link>

        {login.isError && !login.isLoading && <Text color="error">Something went wrong.</Text>}
      </LoginButtonWrapper>
    </LoginBox>
  );
};

export default Login;
