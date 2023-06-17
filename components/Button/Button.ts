import { styled } from '../../styles/stitches.config';

export const Button = styled('button', {
  fontFamily: '$heading',
  borderRadius: '$md',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',

  '&:focus': {
    outline: 'none',
    background: '$primary900',
    color: '$transparent80',
    boxShadow: '$focus',
  },

  variants: {
    type: {
      primary: {
        background: '$primary700',
        border: '1px solid transparent',
        color: '$white',

        '&:hover': {
          background: '$primary900',
          color: '$white300',
        },
      },
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

    size: {
      sm: {
        padding: '$xs $sm',
        fontSize: '$sm',
      },
      md: {
        padding: '$sm $md',
        fontSize: '$md',
      },
    },

    fullWidth: {
      true: {
        width: '100%',
      },
      false: {
        width: 'fit-content',
      },
    },

    disabled: {
      true: {
        opacity: 0.7,
      },
    },
  },

  defaultVariants: {
    type: 'primary',
    size: 'md',
  },
});
