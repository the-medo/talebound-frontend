import {styled} from "@nextui-org/react";

export const InputTransparent = styled('input', {
  fontFamily: '$heading',
  padding: '$5',
  border: 'none',
  borderRadius: '$md',
  background: '$transparent40',
  color: '$primary800',
  fontSize: '$md',
  fontWeight: '$bold',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  width: '$full',

  '&:hover': {
    background: '$transparent50',
  },

  '&:focus': {
    outline: 'none',
    background: '$transparent50',
    boxShadow: '$focus',
  }
});