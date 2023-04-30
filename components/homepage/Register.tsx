import React, {useMemo} from "react";
import {styled, Input, useInput, InputProps} from "@nextui-org/react";
import {VerticalSemitransparent} from "../global/VerticalSemitransparent";
import {Button} from "../global/Button";
import {InputTransparent, PasswordTransparent} from "../global/InputTransparent";


const RegisterBackground = styled('div', {
    position: 'relative',
    width: '$full',
    height: '600px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    maskImage: 'linear-gradient(45deg, rgba(255, 255, 255, 0) 0%, #ffffff 35%, #ffffff 65%,  rgba(255, 255, 255, 0) 100%)',
    backgroundImage: '$$backgroundImage',
});

const RegisterBox = styled(VerticalSemitransparent, {
  gap: '$md',
  position: 'absolute',
  top: '$0',
  bottom: '$0',
  left: '50%',
  transform: 'translate(-50%, 0%)',
  padding: '$2xl $xl',
  fontWeight: '$bold',
  fontSize: '$xs',
  color: '$white600',
  textDecoration: 'none',
  minWidth: '33%',


  '@xsMax': {
    left: '$0',
    right: '$0',
    transform: 'translate(0%, 0%)',
  },
  '& .nextui-input-helper-text-container': {
    width: '$full',
    display: 'flex',
    justifyContent: 'flex-end',
  },

});

const RegisterHeader = styled('h2', {
  color: '$white',
});

const RegisterLabel = styled('label', {
  color: '$primary800',
  fontFamily: '$heading',
  fontSize: '$md',
  textTransform: 'uppercase',
});

const FieldWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '$full',
  marginBottom: '$md',
});

interface HomepageRegisterProps {
    background?: boolean;
}

const Register: React.FC<HomepageRegisterProps> = ({background = false}) => {


  const { value: usernameValue, bindings: {onChange: onChangeUsername} } = useInput("");
  const { value: emailValue, bindings: {onChange: onChangeEmail} } = useInput("");

  const validateEmail = (value: string) => {
    return value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
  };

  const helper: {
    text: string;
    color?: InputProps["helperColor"];
  } = useMemo(() => {
    if (!emailValue)
      return {
        text: "",
        color: undefined,
      };
    const isValid = validateEmail(emailValue);
    return {
      text: isValid ? "Correct email" : "Enter a valid email",
      color: isValid ? "success" : "error",
    };
  }, [emailValue]);

  return (
    <RegisterBackground id="register" css={{ $$backgroundImage: background ? 'url("../assets/images/register-bg.png")' : '' }}>
      <RegisterBox>
        <RegisterHeader>Sign up</RegisterHeader>

        <FieldWrapper>
          <RegisterLabel htmlFor="reg-username">Username</RegisterLabel>
          <InputTransparent
            onChange={onChangeUsername}
            type="text"
            name="reg-username"
            id="reg-username"
            fullWidth
            clearable
            required
            shadow={false}
            animated={false}
            helperText="(3-32 characters, letters and underscores)"
          />
        </FieldWrapper>

        <FieldWrapper>
          <RegisterLabel htmlFor="reg-email">Email</RegisterLabel>
          <InputTransparent
            onChange={onChangeEmail}
            type="text"
            name="reg-email"
            id="reg-email"
            fullWidth
            clearable
            required
            shadow={false}
            animated={false}
            helperColor={helper.color}
            helperText={helper.text}
          />
        </FieldWrapper>

        <FieldWrapper>
          <RegisterLabel htmlFor="reg-pass1">Password</RegisterLabel>
          <PasswordTransparent
            type="password"
            name="reg-pass1"
            id="reg-pass1"
            fullWidth
            clearable
            required
            shadow={false}
            animated={false}
            helperText="(6 - 100 characters)"
          />
        </FieldWrapper>


        <FieldWrapper>
          <RegisterLabel htmlFor="reg-pass2">Password again</RegisterLabel>
          <PasswordTransparent
            type="password"
            name="reg-pass2"
            id="reg-pass2"
            fullWidth
            clearable
            required
            shadow={false}
            animated={false}
          />
        </FieldWrapper>

        Are you ready to embark on an epic journey?
        <Button>Sign up</Button>
      </RegisterBox>
    </RegisterBackground>
  );
}

export default Register;