import * as CheckboxRadix from '@radix-ui/react-checkbox';
import { styled } from '../../styles/stitches.config';
import Stitches from '@stitches/react';

export const CheckboxRoot = styled(CheckboxRadix.Root, {
  all: 'unset',
  backgroundColor: 'white',
  border: '2px solid',
  width: 24,
  height: 24,
  borderRadius: '$sm',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '$sm',
  cursor: 'pointer',
  transition: 'all 300ms ease',

  variants: {
    border: {
      true: {
        borderColor: `$primary`,
      },
      false: {
        borderColor: `transparent`,
      },
    },
    transparent: {
      true: {
        background: '$transparent40',
        '&:hover': { backgroundColor: '$transparent70' },
      },
    },
  },

  defaultVariants: {
    border: 'false',
  },

  '&:hover': { backgroundColor: '$primary100' },
  '&:disabled': {
    backgroundColor: '$white900',
    cursor: 'default',
  },
  '&:focus': { border: `2px solid $primary800` },
});

export type CheckboxVariants = Stitches.VariantProps<typeof CheckboxRoot>;
