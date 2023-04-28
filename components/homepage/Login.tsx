import React from "react";
import {styled, Text} from "@nextui-org/react";
import {VerticalSemitransparent} from "../global/VerticalSemitransparent";
import {InputTransparent} from "../global/InputTransparent";
import {Button} from "../global/Button";
import Link from "next/link";



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
    }
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

interface LoginProps {
}

const Login: React.FC<LoginProps> = () => {
  return (
    <LoginBox>
      <h3>Login</h3>
      <InputTransparent type="text" placeholder="Username"/>
      <InputTransparent type="password" placeholder="Password"/>
      <LoginButtonWrapper>
        <Button>Login</Button>
        <Text size="$sm">or</Text>
        <Link href="/#register">Sign up</Link>
      </LoginButtonWrapper>
    </LoginBox>
  )
}

export default Login;