import { CSS, Input, styled } from '@nextui-org/react';

const InputProps: CSS = {
  background: '$transparent40',
  fontFamily: '$heading',
  paddingRight: '$5',
  borderRadius: '$md',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',

  '.nextui-input-wrapper': {
    background: 'transparent',
  },
};

export const InputTransparent = styled(Input, InputProps);
export const PasswordTransparent = styled(Input.Password, InputProps);
