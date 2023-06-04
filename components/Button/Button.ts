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

  variants: {
    type: {
      secondary: {
        background: '$white',
        border: '1px solid $primary200',
        color: '$primary500',

        '&:hover': {
          background: '$gray200',
          color: '$primary500',
        },
      },
    },
    fullWidth: {
      true: {
        width: '100%',
      },
    },
  },

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
