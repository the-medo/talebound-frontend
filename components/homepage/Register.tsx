import React from "react";
import {styled} from "../../stitches.config";
import {VerticalSemitransparent} from "../global/VerticalSemitransparent";
import {Button} from "../global/Button";
import {InputTransparent} from "../global/InputTransparent";
import {Column} from "../global/Column";


const RegisterBackground = styled('div', {
    position: 'relative',
    width: '100%',
    height: '600px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    maskImage: 'linear-gradient(45deg, rgba(255, 255, 255, 0) 0%, #ffffff 35%, #ffffff 65%,  rgba(255, 255, 255, 0) 100%)',
    backgroundImage: '$$backgroundImage',
});

const RegisterBox = styled(VerticalSemitransparent, {
  gap: '.25rem',
  position: 'absolute',
  top: '0',
  bottom: '0',
  left: '50%',
  transform: 'translate(-50%, 0%)',
  padding: '75px 30px 75px 30px',
  fontWeight: 'bold',
  fontSize: '75%',
  color: 'rgba(20, 52, 47, 0.8)',
  textDecoration: 'none',

});

const RegisterHeader = styled('h2', {
  color: 'white',
});

const RegisterLabel = styled('label', {
  color: 'rgba(20, 52, 47, 0.8)',
  fontFamily: 'Gudea, sans-serif',
  width: '100%',
  fontSize: '125%',
  textTransform: 'uppercase',
});

interface HomepageRegisterProps {
    background?: boolean;
}

const Register: React.FC<HomepageRegisterProps> = ({background = false}) => {
  return (
    <RegisterBackground css={{ $$backgroundImage: background ? 'url("../assets/header/header-v8.png")' : '' }}>
      <RegisterBox>
        <RegisterHeader>Sign up</RegisterHeader>

        <RegisterLabel htmlFor="reg-username">Username</RegisterLabel>
        <InputTransparent css={{marginBottom: '1rem'}}  type="text" name="reg-username" id="reg-username"/>

        <RegisterLabel htmlFor="reg-email">Email</RegisterLabel>
        <InputTransparent css={{marginBottom: '1rem'}} type="text" name="reg-email" id="reg-email"/>

        <RegisterLabel htmlFor="reg-pass1">Password</RegisterLabel>
        <InputTransparent css={{marginBottom: '1rem'}} type="password" name="reg-pass1" id="reg-pass1"/>

        <RegisterLabel htmlFor="reg-pass2">Password again</RegisterLabel>
        <InputTransparent css={{marginBottom: '1rem'}} type="password" name="reg-pass2" id="reg-pass2"/>

        Are you ready to embark on an epic journey?
        <Button>Sign up</Button>
      </RegisterBox>
    </RegisterBackground>
  );
}

export default Register;