import * as CheckboxRadix from '@radix-ui/react-checkbox';
import { styled } from '../../styles/stitches.config';

export const CheckboxRoot = styled(CheckboxRadix.Root, {
  all: 'unset',
  backgroundColor: 'white',
  border: '2px solid',
  width: 25,
  height: 25,
  borderRadius: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '$sm',
  cursor: 'pointer',

  variants: {
    border: {
      true: {
        borderColor: `$primary`,
      },
      false: {
        borderColor: `transparent`,
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
