import { styled } from '../../styles/stitches.config';

export const Text = styled('span', {
  variants: {
    size: {
      xs: {
        fontSize: '$xs',
      },
      sm: {
        fontSize: '$sm',
      },
      md: {
        fontSize: '$md',
      },
      lg: {
        fontSize: '$lg',
      },
    },

    weight: {
      regular: {
        fontWeight: '$regular',
      },
      medium: {
        fontWeight: '$medium',
      },
      semibold: {
        fontWeight: '$semibold',
      },
      bold: {
        fontWeight: '$bold',
      },
    },

    color: {
      primary: {
        color: '$primary800',
      },
      secondary: {
        color: '$secondary800',
      },
      tertiary: {
        color: '$tertiary800',
      },
      success: {
        color: '$success500',
      },
      danger: {
        color: '$danger500',
      },
      info: {
        color: '$info500',
      },
      warning: {
        color: '$warning500',
      },
      white: {
        color: '$white',
      },
      black: {
        color: '$black',
      },
    },
  },

  defaultVariants: {
    size: 'md',
    weight: 'regular',
    color: 'black',
  },
});
