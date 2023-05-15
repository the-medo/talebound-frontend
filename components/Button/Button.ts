import { styled } from '@nextui-org/react';

export const Button = styled('button', {
  width: 'fit-content',
  fontFamily: '$heading',
  padding: '$xs $md',
  border: '$warningBorder',
  borderRadius: '$md',
  background: '$primary700',
  color: '$white',
  fontSize: '$md',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',

  '&:hover': {
    background: '$primary900',
    color: '$white300',
  },

  '&:focus': {
    outline: 'none',
    background: '$primary900',
    color: '$transparent80',
    boxShadow: '$focus',
  },
});
