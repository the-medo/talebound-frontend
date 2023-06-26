import { styled } from '../../styles/stitches.config';

export const Button = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$sm',
  fontFamily: '$heading',
  borderRadius: '$md',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',

  '& svg': {
    fontSize: '1.25em',
  },

  '&:focus': {
    boxShadow: '$focus',
  },

  '&:disabled': {
    opacity: 0.7,
    cursor: 'not-allowed',
  },

  variants: {
    type: {
      primaryFill: {
        background: '$primary700',
        border: '1px solid $primary700',
        color: '$white',

        '&:hover': {
          background: '$primary900',
          color: '$white300',
        },

        '&:focus': {
          outline: '1px solid $primary900',
        },
      },
      primaryOutline: {
        background: '$white',
        border: '1px solid $primary700',
        color: '$primary700',

        '&:hover': {
          background: '$primary900',
          color: '$white300',
        },

        '&:focus': {
          outline: '1px solid $primary900',
        },
      },
      secondaryFill: {
        background: '$secondary700',
        border: '1px solid $secondary700',
        color: '$white',

        '&:hover': {
          background: '$secondary900',
          color: '$white300',
        },

        '&:focus': {
          outline: '1px solid $secondary900',
        },
      },
      secondaryOutline: {
        background: '$white',
        border: '1px solid $secondary700',
        color: '$secondary700',

        '&:hover': {
          background: '$secondary900',
          color: '$white300',
        },

        '&:focus': {
          outline: '1px solid $secondary900',
        },
      },
      dangerFill: {
        background: '$danger',
        border: '1px solid $danger',
        color: '$white',

        '&:hover': {
          background: '$danger800',
          color: '$white500',
        },

        '&:focus': {
          outline: '1px solid $danger',
        },
      },
      dangerOutline: {
        background: '$white',
        border: '1px solid $danger',
        color: '$danger',

        '&:hover': {
          background: '$danger',
          color: '$white500',
        },

        '&:focus': {
          outline: '1px solid $danger',
        },
      },
    },

    size: {
      sm: {
        height: '24px',
        paddingLeft: '$sm',
        paddingRight: '$sm',
        fontSize: '$sm',
      },
      md: {
        height: '32px',
        paddingLeft: '$md',
        paddingRight: '$md',
        fontSize: '$md',
      },
      lg: {
        height: '40px',
        paddingLeft: '$md',
        paddingRight: '$md',
        fontSize: '$md',
      },
      xl: {
        height: '48px',
        paddingLeft: '$xl',
        paddingRight: '$xl',
        fontSize: '$lg',
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

    // disabled: {
    //   true: {
    //     opacity: 0.7,
    //     cursor: 'not-allowed',
    //   },
    // },
  },

  defaultVariants: {
    type: 'primaryFill',
    size: 'md',
    fullWidth: false,
  },
});
