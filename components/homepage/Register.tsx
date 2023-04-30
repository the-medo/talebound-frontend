import React, {useCallback, useMemo, useState} from "react";
import {Checkbox, Modal, styled, Text, useInput, useModal, Button} from "@nextui-org/react";
import {VerticalSemitransparent} from "../global/VerticalSemitransparent";
import {InputTransparent, PasswordTransparent} from "../global/InputTransparent";
import {HelperType} from "../../utils/form/nextUiTypes";
import {validateEmail} from "../../utils/form/validateEmail";
import {validateUsername} from "../../utils/form/validateUsername";
import {validatePassword, validatePasswordAgain} from "../../utils/form/validatePassword";
import PageTermsOfService from "../../screens/terms-of-service/PageTermsOfService";
import PagePrivacyPolicy from "../../screens/privacy-policy/PagePrivacyPolicy";
import { ClickableSpan } from "../global/ClickableSpan";


const RegisterBackground = styled('div', {
  position: 'relative',
  width: '$full',
  height: '600px',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  maskImage: 'linear-gradient(45deg, rgba(255, 255, 255, 0) 0%, #ffffff 35%, #ffffff 65%,  rgba(255, 255, 255, 0) 100%)',
  backgroundImage: '$$backgroundImage',

  '@xsMax': {
    maskImage: 'none',
  },
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

const RegisterCheckbox = styled(Checkbox, {
  '& .nextui-checkbox-mask': {
    color: '$white',
  }
});

interface HomepageRegisterProps {
    background?: boolean;
}

const Register: React.FC<HomepageRegisterProps> = ({background = false}) => {
  const [checked, setChecked] = useState(false);
  const { setVisible: setVisibleTos, bindings: bindingsTos } = useModal();
  const { setVisible: setVisiblePrivacy, bindings: bindingsPrivacy } = useModal();

  const { value: usernameValue, bindings: {onChange: onChangeUsername} } = useInput("");
  const { value: emailValue, bindings: {onChange: onChangeEmail} } = useInput("");
  const { value: password1Value, bindings: {onChange: onChangePassword1} } = useInput("");
  const { value: password2Value, bindings: {onChange: onChangePassword2} } = useInput("");

  const helperUsername: HelperType = useMemo(() => validateUsername(usernameValue), [usernameValue]);
  const helperEmail: HelperType = useMemo(() => validateEmail(emailValue), [emailValue]);
  const helperPassword1: HelperType = useMemo(() => validatePassword(password1Value), [password1Value]);
  const helperPassword2: HelperType = useMemo(() => validatePasswordAgain(password1Value, password2Value), [password1Value, password2Value]);

  const handleTOS = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setVisibleTos(true);
  }, []);

  const handlePrivacy = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setVisiblePrivacy(true);
  }, []);

  const handleCheckbox = useCallback((v: boolean) => {
    setChecked(v)
  }, []);

  const submitNewUser = useCallback(() => {
    if (!checked) return;
    if (usernameValue === "" || emailValue === "" || password1Value === "" || password2Value === "") return;

    console.log("submitNewUser", usernameValue, emailValue, password1Value, password2Value);

  }, [checked, usernameValue, emailValue, password1Value, password2Value]);

  return (
    <>
      <RegisterBackground id="register" css={{ $$backgroundImage: background ? 'url("../assets/images/register-bg.png")' : '' }}>
        <RegisterBox>
          <RegisterHeader>Sign up</RegisterHeader>

          <FieldWrapper>
            <RegisterLabel id="reg-username">Username
              <InputTransparent
                onChange={onChangeUsername}
                type="text"
                fullWidth
                clearable
                required
                shadow={false}
                animated={false}
                helperColor={helperUsername.color}
                helperText={helperUsername.text}
                aria-labelledby="reg-username"
              />
            </RegisterLabel>
          </FieldWrapper>

          <FieldWrapper>
            <RegisterLabel id="reg-email">Email
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
                helperColor={helperEmail.color}
                helperText={helperEmail.text}
                aria-labelledby="reg-email"
              />
            </RegisterLabel>
          </FieldWrapper>

          <FieldWrapper>
            <RegisterLabel id="reg-pass1">Password
              <PasswordTransparent
                onChange={onChangePassword1}
                type="password"
                fullWidth
                clearable
                required
                shadow={false}
                animated={false}
                helperColor={helperPassword1.color}
                helperText={helperPassword1.text}
                aria-labelledby="reg-pass1"
              />
            </RegisterLabel>
          </FieldWrapper>

          <FieldWrapper>
            <RegisterLabel id="reg-pass2">Password again
              <PasswordTransparent
                onChange={onChangePassword2}
                type="password"
                name="reg-pass2"
                id="reg-pass2"
                fullWidth
                clearable
                required
                shadow={false}
                animated={false}
                helperColor={helperPassword2.color}
                helperText={helperPassword2.text}
                aria-labelledby="reg-pass2"
              />
            </RegisterLabel>
          </FieldWrapper>
          <RegisterCheckbox size="md" onChange={handleCheckbox}>
            <Text size="xs" color="$white">
              I agree to the{' '}
              <ClickableSpan onClick={handleTOS}>Terms of Service</ClickableSpan>
              {' '}and I have read the{' '}
              <ClickableSpan onClick={handlePrivacy}>Privacy Policy</ClickableSpan>
          </Text>
        </RegisterCheckbox>
          <div>
            <Button color="primary" auto size="md" onPress={submitNewUser}  css={{
              opacity: checked ? '1' : '0.5',
              '&:hover': {
                opacity: checked ? '0.8' : '0.5',
              },
            }}><Text b size="$lg" color="$white">Sign up</Text></Button>
          </div>
        </RegisterBox>
      </RegisterBackground>

      <Modal
        closeButton
        scroll
        width="min(80%, 1000px)"
        aria-labelledby="modal-tos"
        {...bindingsTos}
      >
        <Modal.Body>
          <PageTermsOfService offset={0} />
        </Modal.Body>
      </Modal>

      <Modal
        closeButton
        scroll
        width="min(80%, 1000px)"
        aria-labelledby="modal-tos"
        {...bindingsPrivacy}
      >
        <Modal.Body>
          <PagePrivacyPolicy offset={0} />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Register;