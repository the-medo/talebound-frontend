import { styled } from '../../styles/stitches.config';

export const Flex = styled('div', {
  display: 'flex',

  variants: {
    fullWidth: {
      true: {
        width: '100%',
      },
    },

    gap: {
      none: {
        gap: '0',
      },
      xs: {
        gap: '$xs',
      },
      sm: {
        gap: '$sm',
      },
      md: {
        gap: '$md',
      },
      lg: {
        gap: '$lg',
      },
      xl: {
        gap: '$xl',
      },
    },

    padding: {
      none: {
        gap: '0',
      },
      xs: {
        padding: '$xs',
      },
      sm: {
        padding: '$sm',
      },
      md: {
        padding: '$md',
      },
      lg: {
        padding: '$lg',
      },
      xl: {
        padding: '$xl',
      },
    },

    justifyContent: {
      start: {
        justifyContent: 'flex-start',
      },
      center: {
        justifyContent: 'center',
      },
      end: {
        justifyContent: 'flex-end',
      },
      between: {
        justifyContent: 'space-between',
      },
      around: {
        justifyContent: 'space-around',
      },
      evenly: {
        justifyContent: 'space-evenly',
      },
    },

    alignItems: {
      start: {
        alignItems: 'flex-start',
      },
      center: {
        alignItems: 'center',
      },
      end: {
        alignItems: 'flex-end',
      },
      stretch: {
        alignItems: 'stretch',
      },
      baseline: {
        alignItems: 'baseline',
      },
    },

    alignSelf: {
      start: {
        alignSelf: 'flex-start',
      },
      center: {
        alignSelf: 'center',
      },
      end: {
        alignSelf: 'flex-end',
      },
      stretch: {
        alignSelf: 'stretch',
      },
      baseline: {
        alignSelf: 'baseline',
      },
    },
  },

  defaultVariants: {
    fullWidth: 'false',
    gap: 'none',
  },
});

export const Col = styled(Flex, {
  flexDirection: 'column',
});

export const Row = styled(Flex, {
  flexDirection: 'row',

  defaultVariants: {
    alignItems: 'center',
  },
});
