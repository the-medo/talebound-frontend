import React from "react";
import {Container, styled, Text} from "@nextui-org/react";
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
});

interface LoginProps {
}

const Login: React.FC<LoginProps> = () => {
  return (
    <LoginBox>
      <h3>Login</h3>
      <InputTransparent type="text" placeholder="Username"/>
      <InputTransparent type="password" placeholder="Password"/>
      <Container display="flex" justify="center" alignItems="center" direction="column">
        <Button>Login</Button>
        <Text size="$sm">or</Text>
        <Link href="/#register">Sign up</Link>
      </Container>
    </LoginBox>
  )
}

export default Login;