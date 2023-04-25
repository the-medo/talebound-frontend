import React from "react";
import {styled} from "@nextui-org/react";
import {VerticalSemitransparent} from "../global/VerticalSemitransparent";
import {InputTransparent} from "../global/InputTransparent";
import {Button} from "../global/Button";


const LoginBox = styled(VerticalSemitransparent, {
  position: 'absolute',
  top: '50%',
  right: '0',
  transform: 'translate(0, -50%)',
  padding: '75px 10px 75px 10px',
  fontWeight: 'bold',
  fontSize: '1.2rem',
  color: 'rgba(20, 52, 47, 0.8)',
  textDecoration: 'none',
});

interface LoginProps {
}

const Login: React.FC<LoginProps> = () => {
  return (
    <LoginBox>
      <div className="login-header menu-item">
        Login
      </div>
      <InputTransparent type="text" placeholder="Username"/>
      <InputTransparent type="password" placeholder="Password"/>
      <Button>Login</Button>
    </LoginBox>
  );
}

export default Login;